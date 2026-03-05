import { Search, X } from 'lucide-react';
import { useFeriasStore } from '@/store/feriasStore';
import { ESTADOS_VENEZUELA, TIPOS_FERIA } from '@/types/constants';
import { FeriaStatus } from '@/types';

const STATUS_OPTIONS: { value: FeriaStatus; label: string; color: string }[] = [
    { value: 'activa', label: 'Activas', color: 'text-green-600 dark:text-green-400' },
    { value: 'programada', label: 'Programadas', color: 'text-yellow-600 dark:text-yellow-400' },
    { value: 'historica', label: 'Históricas', color: 'text-slate-600 dark:text-slate-400' },
];

export default function FilterPanel() {
    const { filters, setFilter } = useFeriasStore();

    const toggleEstatus = (status: FeriaStatus) => {
        const current = filters.estatus;
        if (current.includes(status)) {
            setFilter('estatus', current.filter((s) => s !== status));
        } else {
            setFilter('estatus', [ ...current, status ]);
        }
    };

    return (
        <div className="space-y-4">
            {/* Search */}
            <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Buscar Feria
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <input
                        type="text"
                        value={filters.busqueda}
                        onChange={(e) => setFilter('busqueda', e.target.value)}
                        placeholder="Sector o Parroquia..."
                        className="w-full pl-8 pr-8 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white
              placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30
              transition-all shadow-sm dark:shadow-none"
                    />
                    {filters.busqueda && (
                        <button
                            onClick={() => setFilter('busqueda', '')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Estado dropdown */}
            <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Estado
                </label>
                <select
                    value={filters.estado}
                    onChange={(e) =>
                        setFilter('estado', e.target.value as typeof filters.estado)
                    }
                    className="w-full py-2 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white
            focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30
            transition-all appearance-none cursor-pointer shadow-sm dark:shadow-none"
                >
                    <option value="">Todos los estados</option>
                    {ESTADOS_VENEZUELA.map((estado) => (
                        <option key={estado} value={estado}>
                            {estado}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tipo de Feria */}
            <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Tipo de Feria
                </label>
                <select
                    value={filters.tipoFeria}
                    onChange={(e) =>
                        setFilter('tipoFeria', e.target.value as typeof filters.tipoFeria)
                    }
                    className="w-full py-2 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white
            focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30
            transition-all appearance-none cursor-pointer shadow-sm dark:shadow-none"
                >
                    <option value="">Todos los tipos</option>
                    {TIPOS_FERIA.map((tipo) => (
                        <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                </select>
            </div>

            {/* Estatus checkboxes */}
            <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                    Estatus
                </label>
                <div className="space-y-2">
                    {STATUS_OPTIONS.map(({ value, label, color }) => (
                        <label
                            key={value}
                            className="flex items-center gap-2.5 cursor-pointer group"
                        >
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.estatus.includes(value)}
                                    onChange={() => toggleEstatus(value)}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all
                    ${filters.estatus.includes(value)
                                            ? 'bg-blue-600 border-blue-600'
                                            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-blue-400'
                                        }`}
                                >
                                    {filters.estatus.includes(value) && (
                                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                                            <path d="M10 3L5 8.5 2 5.5l-.7.7 3.5 3.5 5.5-6z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className={`text-sm font-semibold ${color}`}>{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Date range */}
            <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Rango de Fechas
                </label>
                <div className="space-y-2">
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-600 mb-1 tracking-wider">Desde</p>
                        <input
                            type="date"
                            value={filters.fechaDesde}
                            onChange={(e) => setFilter('fechaDesde', e.target.value)}
                            className="w-full py-2 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white
                focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30
                transition-all [color-scheme:light] dark:[color-scheme:dark] shadow-sm dark:shadow-none"
                        />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-600 mb-1 tracking-wider">Hasta</p>
                        <input
                            type="date"
                            value={filters.fechaHasta}
                            onChange={(e) => setFilter('fechaHasta', e.target.value)}
                            className="w-full py-2 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white
                focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30
                transition-all [color-scheme:light] dark:[color-scheme:dark] shadow-sm dark:shadow-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
