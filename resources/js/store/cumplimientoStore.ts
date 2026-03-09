import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CumplimientoEstado, CumplimientoGuardado, CUMPLIMIENTO_ESTADOS_TEMPLATE } from '@/data/cumplimiento';
import { getCurrentMes, getCurrentJornada, getCurrentAnio, MESES } from '@/lib/dateUtils';

interface CumplimientoStore {
    // Current draft
    estados: CumplimientoEstado[];
    selectedMes: string;
    selectedJornada: number;
    selectedAnio: number;

    // History of saved Cumplimientos
    cumplimientosGuardados: CumplimientoGuardado[];

    isInitialized: boolean;

    // Actions
    initializeCumplimiento: () => void;
    setSelectedMesJornada: (mes: string, jornada: number, anio?: number) => void;
    updateEstado: (id: string, updates: Partial<CumplimientoEstado>) => void;
    guardarCumplimiento: () => void;
    loadCumplimiento: (mes: string, jornada: number, anio: number) => void;

    // Getters
    getTotals: () => {
        totalPlanificadas: number;
        totalEmblematicas: number;
        totalPuntoDistribucion: number;
        totalFeriasRealizadas: number;
        totalToneladas: number;
        totalComunidadPlanificados: number;
        totalComunidadAtendidos: number;
        totalComunidadSinAtender: number;
        totalFamilias: number;
        totalPersonas: number;
        totalCombos: number;
        totalNoRealizados: number;
        porcentajeCumplimientoGlobal: number;
    };
}

export const useCumplimientoStore = create<CumplimientoStore>()(
    persist(
        (set, get) => ({
            estados: [],
            selectedMes: getCurrentMes(),
            selectedJornada: getCurrentJornada(),
            selectedAnio: getCurrentAnio(),
            cumplimientosGuardados: [],
            isInitialized: false,

            initializeCumplimiento: () => {
                const { isInitialized, estados } = get();
                if (!isInitialized || estados.length === 0) {
                    set({
                        estados: JSON.parse(JSON.stringify(CUMPLIMIENTO_ESTADOS_TEMPLATE)),
                        isInitialized: true,
                    });
                }
            },

            setSelectedMesJornada: (mes, jornada, anio) => {
                set({
                    selectedMes: mes,
                    selectedJornada: jornada,
                    selectedAnio: anio ?? get().selectedAnio,
                });
                // Try to load existing data for this combination
                get().loadCumplimiento(mes, jornada, anio ?? get().selectedAnio);
            },

            loadCumplimiento: (mes, jornada, anio) => {
                const saved = get().cumplimientosGuardados.find(
                    (c) => c.mes === mes && c.jornada === jornada && c.anio === anio
                );
                if (saved) {
                    set({ estados: JSON.parse(JSON.stringify(saved.estados)) });
                } else {
                    // Load blank template
                    set({ estados: JSON.parse(JSON.stringify(CUMPLIMIENTO_ESTADOS_TEMPLATE)) });
                }
            },

            updateEstado: (id, updates) => {
                set((state) => ({
                    estados: state.estados.map((e) =>
                        e.id === id ? { ...e, ...updates } : e
                    ),
                }));
            },

            guardarCumplimiento: () => {
                const state = get();
                const now = new Date().toISOString();

                // Find existing entry for this mes/jornada/anio
                const existingIndex = state.cumplimientosGuardados.findIndex(
                    (c) => c.mes === state.selectedMes && c.jornada === state.selectedJornada && c.anio === state.selectedAnio
                );

                const entry: CumplimientoGuardado = {
                    id: existingIndex >= 0
                        ? state.cumplimientosGuardados[ existingIndex ].id
                        : `cumpl-${Date.now()}`,
                    mes: state.selectedMes,
                    jornada: state.selectedJornada,
                    anio: state.selectedAnio,
                    estados: JSON.parse(JSON.stringify(state.estados)),
                    createdAt: existingIndex >= 0
                        ? state.cumplimientosGuardados[ existingIndex ].createdAt
                        : now,
                    updatedAt: now,
                };

                if (existingIndex >= 0) {
                    // Update existing
                    const updated = [ ...state.cumplimientosGuardados ];
                    updated[ existingIndex ] = entry;
                    set({ cumplimientosGuardados: updated });
                } else {
                    // Insert new
                    set({
                        cumplimientosGuardados: [ ...state.cumplimientosGuardados, entry ],
                    });
                }
            },

            getTotals: () => {
                const { estados } = get();
                const totalPlanificadas = estados.reduce((a, c) => a + c.ferias_planificadas, 0);
                const totalEmblematicas = estados.reduce((a, c) => a + c.ferias_emblematicas, 0);
                const totalPuntoDistribucion = estados.reduce((a, c) => a + c.ferias_punto_distribucion, 0);
                const totalFeriasRealizadas = estados.reduce((a, c) => a + c.ferias_realizadas_total, 0);
                const totalToneladas = estados.reduce((a, c) => a + c.toneladas_despachadas, 0);
                const totalComunidadPlanificados = estados.reduce((a, c) => a + c.comunidad_planificados, 0);
                const totalComunidadAtendidos = estados.reduce((a, c) => a + c.comunidad_atendidos, 0);
                const totalComunidadSinAtender = estados.reduce((a, c) => a + c.comunidad_sin_atender, 0);
                const totalFamilias = estados.reduce((a, c) => a + c.beneficiarios_familias, 0);
                const totalPersonas = estados.reduce((a, c) => a + c.beneficiarios_personas, 0);
                const totalCombos = estados.reduce((a, c) => a + c.beneficiarios_combos, 0);
                const totalNoRealizados = estados.reduce((a, c) => a + c.no_realizados, 0);
                const porcentajeCumplimientoGlobal = totalPlanificadas > 0
                    ? Math.round((totalFeriasRealizadas / totalPlanificadas) * 100)
                    : 0;

                return {
                    totalPlanificadas,
                    totalEmblematicas,
                    totalPuntoDistribucion,
                    totalFeriasRealizadas,
                    totalToneladas,
                    totalComunidadPlanificados,
                    totalComunidadAtendidos,
                    totalComunidadSinAtender,
                    totalFamilias,
                    totalPersonas,
                    totalCombos,
                    totalNoRealizados,
                    porcentajeCumplimientoGlobal,
                };
            },
        }),
        {
            name: 'cumplimiento-storage-v1',
            partialize: (state) => ({
                estados: state.estados,
                selectedMes: state.selectedMes,
                selectedJornada: state.selectedJornada,
                selectedAnio: state.selectedAnio,
                cumplimientosGuardados: state.cumplimientosGuardados,
                isInitialized: state.isInitialized,
            }),
        }
    )
);
