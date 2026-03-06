import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Layouts/Sidebar';
import MobileNavbar from '@/Layouts/MobileNavbar';
import { usePlanificacionStore } from '@/store/planificacionStore';
import { PlanificacionEstado, PERSONAS_FACTOR, TONELADAS_FACTOR } from '@/data/planificacion';
import { Calendar as CalendarIcon, Save, CalendarRange, MapPin, Users, Target, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

export default function PlanificacionIndex() {
    const {
        estados,
        fechaDesde,
        fechaHasta,
        isInitialized,
        initializePlanificacion,
        updateEstado,
        setFechasBorrador,
        guardarPlanificacion,
        getTotalEmblematicas,
        getTotalPuntosDistribucion,
        getTotalGlobalFerias,
        getTotalClap,
        getTotalFamilias,
        getTotalPersonas,
        getTotalToneladas
    } = usePlanificacionStore();

    const [ isSaving, setIsSaving ] = useState(false);
    const [ showSuccess, setShowSuccess ] = useState(false);

    useEffect(() => {
        initializePlanificacion();
    }, [ initializePlanificacion ]);

    const handleUpdate = (id: string, field: keyof PlanificacionEstado, value: string) => {
        const numValue = parseInt(value, 10);
        updateEstado(id, { [ field ]: isNaN(numValue) ? 0 : numValue });
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate network delay for better UX
        setTimeout(() => {
            guardarPlanificacion();
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 600);
    };

    if (!isInitialized) return null;

    return (
        <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden text-slate-800 dark:text-white transition-colors duration-300">
            <Head title="Planificación Semanal - Mercal" />

            <Sidebar onRegisterClick={() => { }} />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <MobileNavbar />

                <div className="flex-1 overflow-y-auto w-full no-scrollbar bg-slate-50 dark:bg-slate-900/50 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

                        {/* Modern Header Layout */}
                        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-600 dark:bg-blue-500 rounded-xl shadow-sm text-white">
                                        <CalendarIcon className="w-6 h-6" />
                                    </div>
                                    Planificación de Ferias
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-2xl font-medium">
                                    Gestiona la proyección de operativos e inventarios a nivel nacional. Los cambios se reflejarán instantáneamente en tu Dashboard al ser guardados como históricos.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-sm w-full xl:w-auto shrink-0">
                                <div className="flex items-center w-full sm:w-auto">
                                    <div className="pl-3 pr-2 text-slate-400"><CalendarRange className="w-4 h-4" /></div>
                                    <input
                                        type="date"
                                        value={fechaDesde}
                                        onChange={(e) => setFechasBorrador(e.target.value, fechaHasta)}
                                        className="text-sm font-medium bg-transparent border-none rounded-lg focus:ring-0 outline-none w-full sm:w-auto text-slate-700 dark:text-slate-200 cursor-pointer"
                                    />
                                    <span className="text-sm font-bold text-slate-300 dark:text-slate-600 mx-1">-</span>
                                    <input
                                        type="date"
                                        value={fechaHasta}
                                        onChange={(e) => setFechasBorrador(fechaDesde, e.target.value)}
                                        className="text-sm font-medium bg-transparent border-none rounded-lg focus:ring-0 outline-none w-full sm:w-auto text-slate-700 dark:text-slate-200 cursor-pointer"
                                    />
                                </div>

                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className={`relative ml-auto sm:ml-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden ${showSuccess
                                        ? 'bg-green-500 text-white shadow-md shadow-green-500/20'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 hover:shadow-blue-600/40'
                                        } disabled:opacity-70 disabled:cursor-not-allowed`}
                                >
                                    {isSaving ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : showSuccess ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    <span className="relative z-10">{showSuccess ? 'Guardado Exitoso' : 'Guardar Semanal'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Top Summary Cards (Draft state) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                                <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-xl text-orange-600 dark:text-orange-400">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Ferias</p>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{getTotalGlobalFerias()}</h3>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                                <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Familias Global</p>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{getTotalFamilias().toLocaleString('es-VE')}</h3>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                                <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Toneladas Proyectadas</p>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{getTotalToneladas().toLocaleString('es-VE', { minimumFractionDigits: 1, maximumFractionDigits: 3 })}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Modern Sleek Table */}
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-3xl shadow-sm overflow-hidden flex flex-col">
                            <div className="p-5 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
                                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Desglose Territorial</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Edita las casillas para re-calcular métricas instantáneamente.</p>
                            </div>

                            <div className="overflow-x-auto relative no-scrollbar">
                                <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
                                    {/* Glassmorphic header */}
                                    <thead className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] text-slate-500 dark:text-slate-400">
                                        <tr>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300">
                                                Estado
                                            </th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center">
                                                Emblemáticas
                                            </th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center">
                                                Punto Dist.
                                            </th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/10">
                                                Total Ferias
                                            </th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center">
                                                CLAP
                                            </th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center">
                                                Familias
                                            </th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center">
                                                Personas
                                            </th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10">
                                                Toneladas
                                            </th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50">
                                                Observaciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                        {estados.map((estado) => {
                                            const totalFerias = Number(estado.emblematicas) + Number(estado.puntos_distribucion);
                                            const personas = Number(estado.familias) * PERSONAS_FACTOR;
                                            const toneladas = Number(estado.familias) > 0 ? (Number(estado.familias) * TONELADAS_FACTOR) : 0;

                                            const isZero = Number(estado.familias) === 0;

                                            return (
                                                <tr key={estado.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors group">
                                                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200 uppercase text-xs flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${isZero ? 'bg-red-500' : 'bg-green-500'}`} />
                                                        {estado.nombre_estado}
                                                    </td>
                                                    <td className="p-2 transition-all">
                                                        <div className="relative group-hover:scale-105 transition-transform max-w-[80px] mx-auto">
                                                            <input
                                                                type="number" min="0"
                                                                className={`w-full p-2 text-center bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-blue-500 dark:hover:border-slate-600 dark:focus:border-blue-400 focus:ring-0 outline-none transition-colors font-medium text-slate-700 dark:text-slate-300 ${isZero && estado.emblematicas === 0 ? 'text-slate-300 dark:text-slate-600' : ''}`}
                                                                value={estado.emblematicas || ''}
                                                                onChange={(e) => handleUpdate(estado.id, 'emblematicas', e.target.value)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="relative group-hover:scale-105 transition-transform max-w-[80px] mx-auto">
                                                            <input
                                                                type="number" min="0"
                                                                className={`w-full p-2 text-center bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-blue-500 dark:hover:border-slate-600 dark:focus:border-blue-400 focus:ring-0 outline-none transition-colors font-medium ${isZero && estado.puntos_distribucion === 0 ? 'text-slate-300 dark:text-slate-600' : 'text-slate-700 dark:text-slate-300'}`}
                                                                value={estado.puntos_distribucion || ''}
                                                                onChange={(e) => handleUpdate(estado.id, 'puntos_distribucion', e.target.value)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-center font-bold text-orange-600 dark:text-orange-400 bg-orange-50/30 dark:bg-orange-900/10">
                                                        {totalFerias > 0 ? totalFerias : <span className="text-orange-300 dark:text-orange-800">0</span>}
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="relative group-hover:scale-105 transition-transform max-w-[80px] mx-auto">
                                                            <input
                                                                type="number" min="0"
                                                                className={`w-full p-2 text-center bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-blue-500 dark:hover:border-slate-600 dark:focus:border-blue-400 focus:ring-0 outline-none transition-colors font-medium ${isZero && estado.clap === 0 ? 'text-slate-300 dark:text-slate-600' : 'text-slate-700 dark:text-slate-300'}`}
                                                                value={estado.clap || ''}
                                                                onChange={(e) => handleUpdate(estado.id, 'clap', e.target.value)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="relative group-hover:scale-105 transition-transform max-w-[100px] mx-auto">
                                                            <input
                                                                type="number" min="0"
                                                                className={`w-full p-2 text-center bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-bold ${isZero ? 'text-slate-400 dark:text-slate-500 border-dashed' : 'text-purple-700 dark:text-purple-400 shadow-sm'}`}
                                                                value={estado.familias || ''}
                                                                onChange={(e) => handleUpdate(estado.id, 'familias', e.target.value)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-center text-slate-600 dark:text-slate-400 font-medium">
                                                        {personas > 0 ? personas.toLocaleString('es-VE') : '0'}
                                                    </td>
                                                    <td className="p-4 text-center font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10">
                                                        {toneladas > 0 ? toneladas.toLocaleString('es-VE', { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : <span className="text-blue-300 dark:text-blue-800">0,000</span>}
                                                    </td>
                                                    <td className="p-4 text-xs whitespace-nowrap">
                                                        {isZero ? (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 uppercase tracking-wider">
                                                                {estado.observaciones || 'Sin Inventario'}
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-400 font-medium italic">{estado.observaciones}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Modern Total Footer integrated smoothly */}
                            <div className="bg-slate-900 text-white p-6 mt-auto">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-lg font-bold flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                            TOTALES GENERALES
                                        </h4>
                                        <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider font-semibold">Semana: {format(new Date(fechaDesde), 'dd MMM yyyy')} - {format(new Date(fechaHasta), 'dd MMM yyyy')}</p>
                                    </div>

                                    <div className="flex items-center gap-6 xl:gap-12 flex-wrap">
                                        <div className="text-right">
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Ferias Proyectadas</p>
                                            <div className="text-xl font-bold">{getTotalGlobalFerias()}</div>
                                        </div>
                                        <div className="w-px h-8 bg-slate-700 hidden sm:block" />
                                        <div className="text-right">
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Claps Atendidos</p>
                                            <div className="text-xl font-bold">{getTotalClap().toLocaleString('es-VE')}</div>
                                        </div>
                                        <div className="w-px h-8 bg-slate-700 hidden sm:block" />
                                        <div className="text-right">
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Familias</p>
                                            <div className="text-xl font-bold text-purple-400">{getTotalFamilias().toLocaleString('es-VE')}</div>
                                        </div>
                                        <div className="w-px h-8 bg-slate-700 hidden sm:block" />
                                        <div className="text-right">
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Toneladas Totales</p>
                                            <div className="text-2xl font-black text-blue-400">{getTotalToneladas().toLocaleString('es-VE', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} <span className="text-sm font-medium text-slate-500">TM</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
