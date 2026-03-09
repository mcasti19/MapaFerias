/**
 * Planificacion Store v3 – Read-only & Reactive.
 *
 * Instead of holding editable draft states, this store now:
 *  1. Reads Ferias from `feriasStore` for a selected Mes/Jornada/Anio.
 *  2. Aggregates them by Estado into the `PlanificacionEstado` shape.
 *  3. Provides computed totals.
 *  4. Is completely read-only (no updateEstado, no guardar).
 *
 * The old `planificacionesGuardadas` history is kept for backward
 * compatibility with the Dashboard, but new data comes from Ferias.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useFeriasStore } from '@/store/feriasStore';
import { getCurrentMes, getCurrentJornada, getCurrentAnio } from '@/lib/dateUtils';
import { PlanificacionEstado } from '@/types';
import { ESTADOS_VENEZUELA } from '@/types/constants';
import { PERSONAS_FACTOR, TONELADAS_FACTOR } from '@/lib/feriaUtils';

export interface PlanificacionGuardada {
    id: string;
    mes: string;         // New field
    jornada: number;     // New field
    anio: number;        // New field
    fechaDesde?: string; // Optional for backward compat
    fechaHasta?: string; // Optional for backward compat
    estados: PlanificacionEstado[];
    createdAt: string;
}

interface PlanificacionStore {
    // Selection filters
    selectedMes: string;
    selectedJornada: number;
    selectedAnio: number;

    // History (kept for Dashboard backward compat)
    planificacionesGuardadas: PlanificacionGuardada[];

    isInitialized: boolean;
    initializePlanificacion: () => void;
    setSelectedMesJornada: (mes: string, jornada: number, anio?: number) => void;

    // Read-only computed from feriasStore
    getEstadosFromFerias: () => PlanificacionEstado[];

    // Save & Retrieve snapshots for Cumplimiento
    guardarPlanificacion: () => void;
    getPlanificacionGuardada: (mes: string, jornada: number, anio: number) => PlanificacionGuardada | undefined;

    // Totals from computed states
    getTotalEmblematicas: () => number;
    getTotalPuntosDistribucion: () => number;
    getTotalGlobalFerias: () => number;
    getTotalClap: () => number;
    getTotalFamilias: () => number;
    getTotalPersonas: () => number;
    getTotalCombos: () => number;
    getTotalToneladas: () => number;
}

export const usePlanificacionStore = create<PlanificacionStore>()(
    persist(
        (set, get) => ({
            selectedMes: getCurrentMes(),
            selectedJornada: getCurrentJornada(),
            selectedAnio: getCurrentAnio(),
            planificacionesGuardadas: [],
            isInitialized: false,

            initializePlanificacion: () => {
                if (!get().isInitialized) {
                    set({ isInitialized: true });
                }
            },

            setSelectedMesJornada: (mes, jornada, anio) => {
                set({
                    selectedMes: mes,
                    selectedJornada: jornada,
                    selectedAnio: anio ?? get().selectedAnio,
                });
            },

            /**
             * Build PlanificacionEstado[] by aggregating ferias that match
             * the selected Mes + Jornada + Anio, grouped by estado.
             */
            getEstadosFromFerias: () => {
                const { selectedMes, selectedJornada, selectedAnio } = get();
                const ferias = useFeriasStore.getState().ferias;

                // Use ESTADOS_VENEZUELA as the base (to get all 24 states + Distrito Capital at 0)
                const estadoMap = new Map<string, PlanificacionEstado>();

                ESTADOS_VENEZUELA.forEach((estadoNombre) => {
                    const id = estadoNombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
                    const estado_id = id.substring(0, 3).toUpperCase();

                    estadoMap.set(estadoNombre.toUpperCase(), {
                        id,
                        estado_id,
                        nombre_estado: estadoNombre.toUpperCase(),
                        emblematicas: 0,
                        puntos_distribucion: 0,
                        clap: 0,
                        familias: 0,
                        observaciones: '',
                    });
                });

                // Filter ferias for this jornada
                const matchingFerias = ferias.filter(
                    (f) => f.mes === selectedMes && f.jornada === selectedJornada && f.anio === selectedAnio
                );

                if (matchingFerias.length > 0) {
                    // Aggregate ferias into each state
                    matchingFerias.forEach((feria) => {
                        const key = (feria.estado || '').toUpperCase();
                        // Try to find matching state from template
                        const existing = estadoMap.get(key);
                        if (existing) {
                            // Each feria counts as 1 feria for the state
                            if (feria.tipoFeria === 'Integral' || feria.tipoFeria === 'Víveres') {
                                existing.emblematicas += 1;
                            } else {
                                existing.puntos_distribucion += 1;
                            }
                            // CLAP increments with each feria
                            existing.clap += 1;
                            // Familias – use a reasonable default per feria of ~500
                            existing.familias += 500;
                        }
                    });
                }

                return Array.from(estadoMap.values());
            },

            guardarPlanificacion: () => {
                const { selectedMes, selectedJornada, selectedAnio, planificacionesGuardadas, getEstadosFromFerias } = get();
                const estadosCalculados = getEstadosFromFerias();

                const newPlanificacion: PlanificacionGuardada = {
                    id: crypto.randomUUID(),
                    mes: selectedMes,
                    jornada: selectedJornada,
                    anio: selectedAnio,
                    estados: estadosCalculados,
                    createdAt: new Date().toISOString(),
                };

                // Check if one already exists for this mes/jornada/anio and replace it, or add new
                const existingIndex = planificacionesGuardadas.findIndex(
                    p => p.mes === selectedMes && p.jornada === selectedJornada && p.anio === selectedAnio
                );

                let newHistory = [ ...planificacionesGuardadas ];
                if (existingIndex >= 0) {
                    newHistory[ existingIndex ] = newPlanificacion;
                } else {
                    newHistory.push(newPlanificacion);
                }

                set({ planificacionesGuardadas: newHistory });
            },

            getPlanificacionGuardada: (mes, jornada, anio) => {
                return get().planificacionesGuardadas.find(
                    p => p.mes === mes && p.jornada === jornada && p.anio === anio
                );
            },

            getTotalEmblematicas: () => {
                return get().getEstadosFromFerias().reduce((a, c) => a + (Number(c.emblematicas) || 0), 0);
            },

            getTotalPuntosDistribucion: () => {
                return get().getEstadosFromFerias().reduce((a, c) => a + (Number(c.puntos_distribucion) || 0), 0);
            },

            getTotalGlobalFerias: () => {
                return get().getTotalEmblematicas() + get().getTotalPuntosDistribucion();
            },

            getTotalClap: () => {
                return get().getEstadosFromFerias().reduce((a, c) => a + (Number(c.clap) || 0), 0);
            },

            getTotalFamilias: () => {
                return get().getEstadosFromFerias().reduce((a, c) => a + (Number(c.familias) || 0), 0);
            },

            getTotalPersonas: () => {
                return get().getTotalFamilias() * PERSONAS_FACTOR;
            },

            getTotalCombos: () => {
                return get().getTotalFamilias();
            },

            getTotalToneladas: () => {
                const raw = get().getEstadosFromFerias().reduce((acc, curr) => {
                    const fams = Number(curr.familias) || 0;
                    if (fams > 0) acc += fams * TONELADAS_FACTOR;
                    return acc;
                }, 0);
                return Math.round(raw * 1000) / 1000;
            },
        }),
        {
            name: 'planificacion-storage-v3',
            partialize: (state) => ({
                selectedMes: state.selectedMes,
                selectedJornada: state.selectedJornada,
                selectedAnio: state.selectedAnio,
                planificacionesGuardadas: state.planificacionesGuardadas,
                isInitialized: state.isInitialized,
            }),
        }
    )
);
