import { MapPin, Plus, RefreshCw, LayoutDashboard, Map, User, LogOut } from 'lucide-react';
import SummaryPanel from '@/Components/summary/SummaryPanel';
import { useFeriasStore } from '@/store/feriasStore';
import FilterPanel from '@/Components/filters/FilterPanel';
import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ui/ThemeToggle';

interface SidebarProps {
    onRegisterClick: () => void;
}

export default function Sidebar({ onRegisterClick }: SidebarProps) {
    const resetFilters = useFeriasStore((s) => s.resetFilters);

    return (
        <aside
            className="flex flex-col w-[340px] min-w-[340px] h-full bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl transition-colors duration-300"
            style={{ zIndex: 10 }}
        >
            {/* Header / Brand */}
            <div className="flex-shrink-0 px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-sm shrink-0">
                        <img src="/MercalMarker.png" alt="Mercal Logo" className="w-8 h-8 object-contain drop-shadow-sm" />
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-slate-800 dark:text-white leading-tight tracking-wide">
                            Ferias Mercal
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Sistema de Gestión
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-shrink-0 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-1 transition-colors duration-300">
                <Link
                    href={route('dashboard')}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${(route as any)().current('dashboard')
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/50'
                        }`}
                >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                </Link>
                <Link
                    href={route('ferias')}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${(route as any)().current('ferias')
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/50'
                        }`}
                >
                    <Map className="w-4 h-4" />
                    Mapa de Ferias
                </Link>
                {/* <Link
                    href={route('historico-ferias')}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${(route as any)().current('ferias')
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/50'
                        }`}
                >
                    <Map className="w-4 h-4" />
                    Historial de Ferias
                </Link> */}
            </nav>

            {/* Register button */}
            {(route as any)().current('ferias') && (
                <div className="flex-shrink-0 px-4 py-3 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
                    <button
                        onClick={onRegisterClick}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-400
                text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-blue-500/30 dark:shadow-blue-900/40
                hover:shadow-blue-500/50 dark:hover:shadow-blue-900/60 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Plus className="w-4 h-4" />
                        Registrar Nueva Feria
                    </button>
                </div>
            )}

            {/* Scrollable content (Filters only visible on Ferias map) */}
            <div className="flex-1 overflow-y-auto">
                {(route as any)().current('ferias') ? (
                    <>
                        {/* Summary */}
                        <div className="px-4 pt-4 pb-2">
                            <SummaryPanel />
                        </div>

                        {/* Divider */}
                        <div className="mx-4 border-t border-slate-200 dark:border-slate-800 my-2 transition-colors duration-300" />

                        {/* Filters */}
                        <div className="px-4 pb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                    Filtros
                                </h2>
                                <button
                                    onClick={resetFilters}
                                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                                >
                                    <RefreshCw className="w-3 h-3" />
                                    Limpiar
                                </button>
                            </div>
                            <FilterPanel />
                        </div>
                    </>
                ) : (
                    <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                        Utiliza el panel de navegación para ver el mapa de ferias.
                    </div>
                )}
            </div>

            {/* Footer with User Actions */}
            <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col transition-colors duration-300">
                <Link
                    href={route('profile.edit')}
                    className="flex items-center gap-3 px-5 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors border-b border-slate-200 dark:border-slate-800"
                >
                    <User className="w-4 h-4" />
                    Perfil
                </Link>
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="flex items-center gap-3 px-5 py-3 text-sm text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-slate-100 dark:hover:text-red-300 dark:hover:bg-slate-800 transition-colors border-b border-slate-200 dark:border-slate-800 text-left w-full"
                >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                </Link>
                <div className="px-5 py-3 flex items-center justify-between">
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                        MPPC Venezuela · {new Date().getFullYear()}
                    </p>
                    <ThemeToggle />
                </div>
            </div>
        </aside>
    );
}
