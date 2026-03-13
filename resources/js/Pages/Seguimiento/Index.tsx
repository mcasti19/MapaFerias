import { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Layouts/Sidebar';
import MobileNavbar from '@/Layouts/MobileNavbar';
import { useFeriasStore } from '@/store/feriasStore';
import { ESTADOS_VENEZUELA } from '@/types/constants';
import { getCurrentJornada } from '@/lib/dateUtils';
import { MapPin, Filter, Search, Calendar, ChevronRight } from 'lucide-react';
import { Feria } from '@/types';

export default function SeguimientoFerias() {
    const { ferias } = useFeriasStore();
    const [selectedEstado, setSelectedEstado] = useState<string>('');
    const currentJornada = getCurrentJornada();

    // Filtramos las ferias:
    // 1. Debe coincidir con la jornada (despliegue actual)
    // 2. Si hay un estado seleccionado, debe coincidir con el estado
    const feriasSeguimiento = useMemo(() => {
        if (!selectedEstado) return [];
        
        return ferias.filter(feria => {
            const matchesEstado = feria.estado === selectedEstado;
            // Aseguramos que coincide con la jornada actual (despliegue vivo)
            const matchesJornada = feria.jornada === currentJornada;
            
            return matchesEstado && matchesJornada;
        });
    }, [ferias, selectedEstado, currentJornada]);

    return (
        <>
            <Head title="Seguimiento de Ferias" />

            <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
                <Sidebar />

                <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                    <MobileNavbar />

                    <div className="flex-1 overflow-y-auto w-full modern-scrollbar bg-slate-50 dark:bg-slate-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                            
                            {/* Header Section */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <div className="p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                                    <div>
                                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                            Seguimiento de Despliegue
                                        </h1>
                                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                                            Monitoree las ferias correspondientes a la jornada actual.
                                        </p>
                                    </div>
                                    <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-2.5 rounded-lg text-sm font-semibold border border-blue-100 dark:border-blue-800/50">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Jornada Actual: {currentJornada}
                                    </div>
                                </div>
                            </div>

                            {/* Filters Section */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                                <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-blue-500" />
                                    Filtro Principal
                                </h2>
                                
                                <div className="max-w-md">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Estado de Despliegue
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedEstado}
                                            onChange={(e) => setSelectedEstado(e.target.value)}
                                            className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all font-medium"
                                        >
                                            <option value="">Seleccione el estado a monitorear...</option>
                                            {ESTADOS_VENEZUELA.map((estado) => (
                                                <option key={estado} value={estado}>{estado}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Results Section */}
                            {selectedEstado ? (
                                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                            Ferias programadas para {selectedEstado}
                                        </h3>
                                        <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 py-1.5 px-3 rounded-full text-xs font-bold">
                                            {feriasSeguimiento.length} Resultados
                                        </span>
                                    </div>

                                    {feriasSeguimiento.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {feriasSeguimiento.map((feria) => (
                                                <div key={feria.id_feria} className="flex flex-col border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-slate-50/50 dark:bg-slate-800/50">
                                                    <div className="p-5 flex-1">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                                                                {feria.tipoFeria || 'Feria Libre'}
                                                            </span>
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                                feria.compliance 
                                                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                                                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                                                            }`}>
                                                                {feria.compliance ? 'Ejecutada' : 'Por Ejecutar'}
                                                            </span>
                                                        </div>
                                                        <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 mb-2">
                                                            {feria.sector}
                                                        </h4>
                                                        <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                                                            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                                                            <p className="line-clamp-2">
                                                                {feria.parroquia}, {feria.municipio}. {feria.estado}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-16 flex flex-col items-center justify-center text-center">
                                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                                <Search className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                                Sin ferias programadas
                                            </h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                                                No hay ferias asignadas para <b>{selectedEstado}</b> durante la <b>{currentJornada}</b>.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
                                    <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-800">
                                        <Filter className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        Seleccione un Estado
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                        Por favor, seleccione un estado en el panel superior para visualizar el despliegue de ferias correspondientes a la semana en curso.
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
