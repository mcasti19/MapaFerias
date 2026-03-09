import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Feria, FilterState, FeriaStatus } from '@/types';
import { getFeriaStatus } from '@/lib/feriaUtils';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { FERIAS_MOCK } from '@/data/ferias';
import { getCurrentMes, getCurrentJornada, getCurrentAnio } from '@/lib/dateUtils';

interface FeriasStore {
    // Data
    ferias: Feria[];
    // Filters
    filters: FilterState;
    // Actions
    setFerias: (ferias: Feria[]) => void;
    addFeria: (feria: Feria) => void;
    setFilter: <K extends keyof FilterState>(key: K, value: FilterState[ K ]) => void;
    resetFilters: () => void;
    // Derived (computed)
    filteredFerias: () => Feria[];
    getStatusCounts: () => Record<FeriaStatus, number>;

    // Layout UI State
    isSidebarCollapsed: boolean;
    isMobileSidebarOpen: boolean;
    toggleSidebarCollapse: () => void;
    setMobileSidebarOpen: (isOpen: boolean) => void;
}

const DEFAULT_FILTERS: FilterState = {
    estado: '',
    tipoFeria: '',
    estatus: [ 'En Proceso', 'Por Ejecutar', 'Ejecutada', 'No ejecutada' ],
    fechaDesde: '',
    fechaHasta: '',
    busqueda: '',
    mes: '',
    jornada: [],
};

export const useFeriasStore = create<FeriasStore>()(
    persist(
        (set, get) => ({
            ferias: FERIAS_MOCK,
            filters: { ...DEFAULT_FILTERS },

            setFerias: (ferias) => set({ ferias }),

            addFeria: (feria) =>
                set((state) => ({
                    ferias: [ ...state.ferias, {
                        ...feria,
                        mes: feria.mes || getCurrentMes(),
                        jornada: feria.jornada || getCurrentJornada(),
                        anio: feria.anio || getCurrentAnio(),
                    } ]
                })),

            setFilter: (key, value) =>
                set((state) => ({
                    filters: { ...state.filters, [ key ]: value },
                })),

            resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),

            filteredFerias: () => {
                const { ferias, filters } = get();

                return ferias.filter((feria) => {
                    const status = getFeriaStatus(feria);

                    // Filter by estatus
                    if (filters.estatus.length > 0 && !filters.estatus.includes(status)) {
                        return false;
                    }

                    // Filter by estado
                    if (filters.estado && feria.estado !== filters.estado) {
                        return false;
                    }

                    // Filter by tipoFeria
                    if (filters.tipoFeria && feria.tipoFeria !== filters.tipoFeria) {
                        return false;
                    }

                    // Filter by busqueda
                    if (
                        filters.busqueda &&
                        !feria.sector.toLowerCase().includes(filters.busqueda.toLowerCase()) &&
                        !feria.parroquia.toLowerCase().includes(filters.busqueda.toLowerCase())
                    ) {
                        return false;
                    }

                    // Filter by date range
                    if (filters.fechaDesde && filters.fechaHasta) {
                        const feriaStart = parseISO(feria.fechaInicio);
                        const feriaEnd = parseISO(feria.fechaFin);
                        const rangeStart = startOfDay(parseISO(filters.fechaDesde));
                        const rangeEnd = endOfDay(parseISO(filters.fechaHasta));

                        // Feria overlaps with the selected date range
                        const overlaps =
                            feriaStart <= rangeEnd && feriaEnd >= rangeStart;
                        if (!overlaps) return false;
                    } else if (filters.fechaDesde) {
                        const rangeStart = startOfDay(parseISO(filters.fechaDesde));
                        if (parseISO(feria.fechaFin) < rangeStart) return false;
                    } else if (filters.fechaHasta) {
                        const rangeEnd = endOfDay(parseISO(filters.fechaHasta));
                        if (parseISO(feria.fechaInicio) > rangeEnd) return false;
                    }

                    // Filter by mes
                    if (filters.mes && feria.mes && feria.mes !== filters.mes) {
                        return false;
                    }

                    // Filter by jornada (array)
                    const activeJornadas = filters.jornada || [];
                    if (activeJornadas.length > 0 && feria.jornada && !activeJornadas.includes(feria.jornada)) {
                        return false;
                    }

                    return true;
                });
            },

            getStatusCounts: () => {
                const { ferias } = get();
                const counts: Record<FeriaStatus, number> = {
                    'En Proceso': 0,
                    'Por Ejecutar': 0,
                    'Ejecutada': 0,
                    'No ejecutada': 0,
                };
                ferias.forEach((feria) => {
                    counts[ getFeriaStatus(feria) ]++;
                });
                return counts;
            },

            // Layout UI state
            isSidebarCollapsed: false,
            isMobileSidebarOpen: false,
            toggleSidebarCollapse: () =>
                set((state) => ({
                    isSidebarCollapsed: !state.isSidebarCollapsed,
                })),
            setMobileSidebarOpen: (isOpen) =>
                set({ isMobileSidebarOpen: isOpen }),
        }),
        {
            name: 'ferias-storage', // Key for localStorage
        }
    )
);
