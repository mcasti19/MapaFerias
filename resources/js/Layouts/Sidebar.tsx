import { MapPin, RefreshCw, LayoutDashboard, Map, User, LogOut, ChevronLeft, ChevronRight, X, ClipboardCheck, ChevronDown, FileText, FolderEdit } from 'lucide-react';
import SummaryPanel from '@/Components/summary/SummaryPanel';
import { useFeriasStore } from '@/store/feriasStore';
import FilterPanel from '@/Components/filters/FilterPanel';
import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ui/ThemeToggle';
import { useEffect, useState } from 'react';

interface SidebarProps {
    onRegisterClick?: () => void;
}

export default function Sidebar({ onRegisterClick }: SidebarProps) {
    const {
        resetFilters,
        isSidebarCollapsed,
        toggleSidebarCollapse,
        isMobileSidebarOpen,
        setMobileSidebarOpen
    } = useFeriasStore();

    // Responsive helper: close mobile sidebar automatically on resize to desktop sizes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMobileSidebarOpen) {
                setMobileSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [ isMobileSidebarOpen, setMobileSidebarOpen ]);

    const isCurrent = (routeName: string) => {
        return (route as any)().current(routeName);
    };

    const isReportesActive = isCurrent('planificacion') || isCurrent('cumplimiento');
    const isGestionActive = isCurrent('registro') || isCurrent('seguimiento');

    const [ isReportesOpen, setIsReportesOpen ] = useState(isReportesActive);
    const [ isGestionOpen, setIsGestionOpen ] = useState(isGestionActive);

    // Ensure submenus are open if their routes are active (e.g., initial load)
    useEffect(() => {
        if (isReportesActive) setIsReportesOpen(true);
        if (isGestionActive) setIsGestionOpen(true);
    }, [ isReportesActive, isGestionActive ]);

    return (
        <>
            {/* Mobile Backdrop */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden transition-opacity"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            <aside
                className={`flex flex-col h-full bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 ease-in-out z-50
                    fixed inset-y-0 left-0 md:relative 
                    ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    ${isSidebarCollapsed ? 'w-20 min-w-5rem' : 'w-[320px] min-w-[320px]'}
                `}
            >
                {/* Desktop Collapse Toggle Button */}
                <button
                    onClick={toggleSidebarCollapse}
                    className="hidden md:flex absolute -right-3 top-6 z-20 items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 transition-colors shadow-sm"
                    aria-label={isSidebarCollapsed ? "Expandir menú" : "Contraer menú"}
                >
                    {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                </button>

                {/* Mobile Close Button */}
                <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="md:hidden absolute right-4 top-4 z-20 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header / Brand */}
                <div className="shrink-0 px-4 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300">
                    <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 shadow-sm shrink-0 transition-all">
                            <img src="/MercalMarker.png" alt="Mercal Logo" className="w-6 h-6 object-contain drop-shadow-sm" />
                        </div>
                        {!isSidebarCollapsed && (
                            <div className="overflow-hidden whitespace-nowrap opacity-100 transition-opacity duration-300">
                                <h1 className="text-base font-bold text-slate-800 dark:text-white leading-tight tracking-wide">
                                    Ferias Mercal
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    Sistema de Gestión
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="shrink-0 px-3 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-1 transition-all duration-300">
                    <Link
                        href={route('dashboard')}
                        title="Dashboard"
                        className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-lg text-sm font-medium transition-colors group relative ${isCurrent('dashboard')
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5 shrink-0" />
                        {!isSidebarCollapsed && <span>Dashboard</span>}
                        {isSidebarCollapsed && (
                            <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                Dashboard
                            </div>
                        )}
                    </Link>
                    <Link
                        href={route('ferias')}
                        title="Mapa de Ferias"
                        className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-lg text-sm font-medium transition-colors group relative ${isCurrent('ferias') && !isCurrent('lista-ferias')
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                            }`}
                    >
                        <MapPin className="w-5 h-5 shrink-0" />
                        {!isSidebarCollapsed && <span>Mapa de Ferias</span>}
                        {isSidebarCollapsed && (
                            <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                Mapa de Ferias
                            </div>
                        )}
                    </Link>
                    {/* Gestión de Ferias Collapsible */}
                    <div className="flex flex-col gap-1 pt-1">
                        <button
                            onClick={() => {
                                setIsGestionOpen(!isGestionOpen);
                                if (isSidebarCollapsed) toggleSidebarCollapse();
                            }}
                            className={`flex justify-between items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative ${isGestionActive
                                ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                                }`}
                            title="Gestión de Ferias"
                        >
                            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center w-full' : 'gap-3'}`}>
                                <FolderEdit className="w-5 h-5 shrink-0" />
                                {!isSidebarCollapsed && <span>Gestión de Ferias</span>}
                            </div>
                            {!isSidebarCollapsed && (
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isGestionOpen ? 'rotate-180' : ''}`} />
                            )}
                            {isSidebarCollapsed && (
                                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                    Gestión de Ferias
                                </div>
                            )}
                        </button>

                        <div className={`grid transition-all duration-300 ease-in-out ${isGestionOpen && !isSidebarCollapsed ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden flex flex-col gap-1">
                                <Link
                                    href={route('registro')}
                                    className={`flex items-center gap-3 pl-11 pr-3 py-2 rounded-lg text-sm font-medium transition-colors ${isCurrent('registro')
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30'
                                        }`}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                                    <span>Registro</span>
                                </Link>
                                <Link
                                    href={route('seguimiento')}
                                    className={`flex items-center gap-3 pl-11 pr-3 py-2 rounded-lg text-sm font-medium transition-colors ${isCurrent('seguimiento')
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30'
                                        }`}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                                    <span>Seguimiento</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Reportes Collapsible */}
                    <div className="flex flex-col gap-1 pt-1">
                        <button
                            onClick={() => {
                                setIsReportesOpen(!isReportesOpen);
                                if (isSidebarCollapsed) toggleSidebarCollapse();
                            }}
                            className={`flex justify-between items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative ${isReportesActive
                                ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                                }`}
                            title="Reportes"
                        >
                            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center w-full' : 'gap-3'}`}>
                                <FileText className="w-5 h-5 shrink-0" />
                                {!isSidebarCollapsed && <span>Reportes</span>}
                            </div>
                            {!isSidebarCollapsed && (
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isReportesOpen ? 'rotate-180' : ''}`} />
                            )}
                            {isSidebarCollapsed && (
                                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                    Reportes
                                </div>
                            )}
                        </button>

                        <div className={`grid transition-all duration-300 ease-in-out ${isReportesOpen && !isSidebarCollapsed ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden flex flex-col gap-1">
                                <Link
                                    href={route('planificacion')}
                                    className={`flex items-center gap-3 pl-11 pr-3 py-2 rounded-lg text-sm font-medium transition-colors ${isCurrent('planificacion')
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30'
                                        }`}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                                    <span>Planificación</span>
                                </Link>
                                <Link
                                    href={route('cumplimiento')}
                                    className={`flex items-center gap-3 pl-11 pr-3 py-2 rounded-lg text-sm font-medium transition-colors ${isCurrent('cumplimiento')
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30'
                                        }`}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                                    <span>Cumplimiento</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Link
                        href={route('lista-ferias')}
                        title="Historial de Ferias"
                        className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-lg text-sm font-medium transition-colors group relative ${isCurrent('lista-ferias') || isCurrent('ferias.show')
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                            }`}
                    >
                        <Map className="w-5 h-5 shrink-0" />
                        {!isSidebarCollapsed && <span>Historial de Ferias</span>}
                        {isSidebarCollapsed && (
                            <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                Historial de Ferias
                            </div>
                        )}
                    </Link>
                </nav>



                {/* Scrollable content (Filters only visible on Ferias map) */}
                <div className={`flex-1 overflow-y-auto overflow-x-hidden modern-scrollbar ${isSidebarCollapsed ? 'hidden md:block' : ''}`}>
                    {isCurrent('ferias') && !isSidebarCollapsed ? (
                        <div className="animate-in fade-in duration-300">
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
                        </div>
                    ) : isSidebarCollapsed ? (
                        <div className="h-full flex items-center justify-center opacity-30">
                            {/* Empty space filler for collapsed state */}
                            <div className="w-1 h-32 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        </div>
                    ) : (
                        <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                            Utiliza el panel de navegación para ver el mapa o estadísticas.
                        </div>
                    )}
                </div>

                {/* Footer with User Actions */}
                <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col transition-all duration-300">
                    <Link
                        href={route('profile.edit')}
                        title="Perfil"
                        className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-200 dark:border-slate-800 relative group`}
                    >
                        <User className="w-4 h-4 shrink-0" />
                        {!isSidebarCollapsed && <span>Perfil</span>}
                        {isSidebarCollapsed && (
                            <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                Perfil
                            </div>
                        )}
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        title="Cerrar Sesión"
                        className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 text-sm text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-red-50 dark:hover:text-red-300 dark:hover:bg-red-900/20 transition-colors border-b border-slate-200 dark:border-slate-800 w-full relative group`}
                    >
                        <LogOut className="w-4 h-4 shrink-0" />
                        {!isSidebarCollapsed && <span>Cerrar Sesión</span>}
                        {isSidebarCollapsed && (
                            <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                Cerrar Sesión
                            </div>
                        )}
                    </Link>
                    <div className={`py-3 flex items-center ${isSidebarCollapsed ? 'justify-center flex-col gap-2 px-0' : 'justify-between px-4'}`}>
                        {!isSidebarCollapsed && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                                Mercal C.A. · {new Date().getFullYear()}
                            </p>
                        )}
                        <ThemeToggle />
                    </div>
                </div>
            </aside>
        </>
    );
}
