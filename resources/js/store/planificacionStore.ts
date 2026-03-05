import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlanificacionEstado, PLANIFICACION_MOCK, TONELADAS_FACTOR, PERSONAS_FACTOR } from '@/data/planificacion';
import { format, addDays } from 'date-fns';

export interface PlanificacionGuardada {
    id: string; // unique ID like "plan-16345..."
    fechaDesde: string;
    fechaHasta: string;
    estados: PlanificacionEstado[];
    createdAt: string;
}

interface PlanificacionStore {
    // Current Draft (Borrador)
    estados: PlanificacionEstado[];
    fechaDesde: string;
    fechaHasta: string;

    // History
    planificacionesGuardadas: PlanificacionGuardada[];

    isInitialized: boolean;
    initializePlanificacion: () => void;
    updateEstado: (id: string, updates: Partial<PlanificacionEstado>) => void;
    setFechasBorrador: (desde: string, hasta: string) => void;
    guardarPlanificacion: () => void;

    // Getters / Computed for Current Draft
    getTotalEmblematicas: () => number;
    getTotalPuntosDistribucion: () => number;
    getTotalGlobalFerias: () => number;
    getTotalClap: () => number;
    getTotalFamilias: () => number;
    getTotalPersonas: () => number;
    getTotalCombos: () => number;
    getTotalToneladas: () => number;
}

const todayStr = format(new Date(), 'yyyy-MM-dd');
const nextWeekStr = format(addDays(new Date(), 6), 'yyyy-MM-dd');

export const usePlanificacionStore = create<PlanificacionStore>()(
    persist(
        (set, get) => ({
            estados: [],
            fechaDesde: todayStr,
            fechaHasta: nextWeekStr,
            planificacionesGuardadas: [],
            isInitialized: false,

            initializePlanificacion: () => {
                const { isInitialized, estados } = get();
                if (!isInitialized || estados.length === 0) {
                    set({ estados: [ ...PLANIFICACION_MOCK ], isInitialized: true });
                }
            },

            updateEstado: (id, updates) => {
                set((state) => ({
                    estados: state.estados.map((estado) =>
                        estado.id === id ? { ...estado, ...updates } : estado
                    ),
                }));
            },

            setFechasBorrador: (desde, hasta) => {
                set({ fechaDesde: desde, fechaHasta: hasta });
            },

            guardarPlanificacion: () => {
                const state = get();
                if (!state.fechaDesde || !state.fechaHasta) return;

                const nuevaPlanificacion: PlanificacionGuardada = {
                    id: `plan-${Date.now()}`,
                    fechaDesde: state.fechaDesde,
                    fechaHasta: state.fechaHasta,
                    // deep copy current states
                    estados: JSON.parse(JSON.stringify(state.estados)),
                    createdAt: new Date().toISOString()
                };

                // Add to history (could also overwrite if same dates, but append for now)
                set((s) => ({
                    planificacionesGuardadas: [ ...s.planificacionesGuardadas, nuevaPlanificacion ]
                }));
            },

            getTotalEmblematicas: () => {
                return get().estados.reduce((acc, curr) => acc + (Number(curr.emblematicas) || 0), 0);
            },

            getTotalPuntosDistribucion: () => {
                return get().estados.reduce((acc, curr) => acc + (Number(curr.puntos_distribucion) || 0), 0);
            },

            getTotalGlobalFerias: () => {
                return get().getTotalEmblematicas() + get().getTotalPuntosDistribucion();
            },

            getTotalClap: () => {
                return get().estados.reduce((acc, curr) => acc + (Number(curr.clap) || 0), 0);
            },

            getTotalFamilias: () => {
                return get().estados.reduce((acc, curr) => acc + (Number(curr.familias) || 0), 0);
            },

            getTotalPersonas: () => {
                return get().getTotalFamilias() * PERSONAS_FACTOR;
            },

            getTotalCombos: () => {
                return get().getTotalFamilias();
            },

            getTotalToneladas: () => {
                const rawFactor = get().estados.reduce((acc, curr) => {
                    const fams = Number(curr.familias) || 0;
                    if (fams > 0) {
                        acc += fams * TONELADAS_FACTOR;
                    }
                    return acc;
                }, 0);
                return Math.round(rawFactor * 1000) / 1000;
            }
        }),
        {
            name: 'planificacion-storage-v2', // bump version to not collide with old cache optionally
            partialize: (state) => ({
                estados: state.estados,
                fechaDesde: state.fechaDesde,
                fechaHasta: state.fechaHasta,
                planificacionesGuardadas: state.planificacionesGuardadas,
                isInitialized: state.isInitialized
            }),
        }
    )
);
