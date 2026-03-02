import { create } from 'zustand';
import { Feria, FilterState, FeriaStatus } from '@/types';
import { FERIAS_MOCK } from '@/data/ferias';
import { getFeriaStatus } from '@/lib/feriaUtils';
import { parseISO, startOfDay, endOfDay } from 'date-fns';

interface FeriasStore {
    // Data
    ferias: Feria[];
    // Filters
    filters: FilterState;
    // Actions
    addFeria: (feria: Feria) => void;
    setFilter: <K extends keyof FilterState>(key: K, value: FilterState[ K ]) => void;
    resetFilters: () => void;
    // Derived (computed)
    filteredFerias: () => Feria[];
    getStatusCounts: () => Record<FeriaStatus, number>;
    // Theme
    mapTheme: 'light' | 'dark';
    toggleMapTheme: () => void;
}

const DEFAULT_FILTERS: FilterState = {
    estado: '',
    tipoFeria: '',
    estatus: [ 'activa', 'programada', 'historica' ],
    fechaDesde: '',
    fechaHasta: '',
    busqueda: '',
};

export const useFeriasStore = create<FeriasStore>((set, get) => ({
    ferias: FERIAS_MOCK,
    filters: { ...DEFAULT_FILTERS },

    addFeria: (feria) =>
        set((state) => ({ ferias: [ ...state.ferias, feria ] })),

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
                !feria.nombre.toLowerCase().includes(filters.busqueda.toLowerCase())
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

            return true;
        });
    },

    getStatusCounts: () => {
        const { ferias } = get();
        const counts: Record<FeriaStatus, number> = {
            activa: 0,
            programada: 0,
            historica: 0,
        };
        ferias.forEach((f) => {
            counts[ getFeriaStatus(f) ]++;
        });
        return counts;
    },

    // Theme state
    mapTheme: 'dark',
    toggleMapTheme: () =>
        set((state) => ({
            mapTheme: state.mapTheme === 'dark' ? 'light' : 'dark',
        })),
}));
