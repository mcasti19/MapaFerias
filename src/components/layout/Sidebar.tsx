import { MapPin, Plus, RefreshCw } from 'lucide-react';
import SummaryPanel from '@/components/summary/SummaryPanel';
import FilterPanel from '@/components/filters/FilterPanel';
import { useFeriasStore } from '@/store/feriasStore';

interface SidebarProps {
    onRegisterClick: () => void;
}

export default function Sidebar({ onRegisterClick }: SidebarProps) {
    const resetFilters = useFeriasStore((s) => s.resetFilters);

    return (
        <aside
            className="flex flex-col w-[340px] min-w-[340px] h-full bg-slate-900 border-r border-slate-700/60 overflow-hidden shadow-2xl"
            style={{ zIndex: 10 }}
        >
            {/* Header / Brand */}
            <div className="flex-shrink-0 px-5 py-4 border-b border-slate-700/60 bg-slate-900">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 shadow-lg shadow-green-900/40">
                        <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-white leading-tight tracking-wide">
                            Ferias Mercal
                        </h1>
                        <p className="text-xs text-slate-400 font-medium">
                            Sistema de Gestión
                        </p>
                    </div>
                </div>
            </div>

            {/* Register button */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-slate-700/60">
                <button
                    onClick={onRegisterClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
            bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500
            text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-green-900/40
            hover:shadow-green-900/60 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus className="w-4 h-4" />
                    Registrar Nueva Feria
                </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
                {/* Summary */}
                <div className="px-4 pt-4 pb-2">
                    <SummaryPanel />
                </div>

                {/* Divider */}
                <div className="mx-4 border-t border-slate-700/60 my-2" />

                {/* Filters */}
                <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                            Filtros
                        </h2>
                        <button
                            onClick={resetFilters}
                            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            <RefreshCw className="w-3 h-3" />
                            Limpiar
                        </button>
                    </div>
                    <FilterPanel />
                </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-5 py-3 border-t border-slate-700/60 bg-slate-900/80">
                <p className="text-xs text-slate-600 text-center">
                    MPPC Venezuela · {new Date().getFullYear()}
                </p>
            </div>
        </aside>
    );
}
