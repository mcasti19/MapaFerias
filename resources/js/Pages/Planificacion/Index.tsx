import React, { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Layouts/Sidebar';
import MobileNavbar from '@/Layouts/MobileNavbar';
import { usePlanificacionStore } from '@/store/planificacionStore';
import { PERSONAS_FACTOR, TONELADAS_FACTOR } from '@/lib/feriaUtils';
import { MESES, isAllowedToSave } from '@/lib/dateUtils';
import { exportTableToPdf } from '@/lib/pdfExport';
import { Calendar as CalendarIcon, MapPin, Users, Target, FileDown, Eye, Save, CheckCircle2 } from 'lucide-react';

export default function PlanificacionIndex() {
    const {
        selectedMes,
        selectedJornada,
        selectedAnio,
        isInitialized,
        initializePlanificacion,
        setSelectedMesJornada,
        getEstadosFromFerias,
        getTotalEmblematicas,
        getTotalPuntosDistribucion,
        getTotalGlobalFerias,
        getTotalClap,
        getTotalFamilias,
        getTotalPersonas,
        getTotalToneladas,
        guardarPlanificacion,
    } = usePlanificacionStore();

    const [ isSaving, setIsSaving ] = useState(false);
    const [ showSuccess, setShowSuccess ] = useState(false);

    useEffect(() => {
        initializePlanificacion();
    }, [ initializePlanificacion ]);

    const estados = useMemo(() => getEstadosFromFerias(), [ selectedMes, selectedJornada, selectedAnio, getEstadosFromFerias ]);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            guardarPlanificacion();
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 500);
    };

    const canSave = isAllowedToSave(selectedMes, selectedJornada, selectedAnio);

    const handleExportPdf = () => {
        const headers = [ 'Estado', 'Emblemáticas', 'Punto Dist.', 'Total Ferias', 'CLAP', 'Familias', 'Personas', 'Toneladas', 'Observaciones' ];
        const rows = estados.map((e) => {
            const totalFerias = Number(e.emblematicas) + Number(e.puntos_distribucion);
            const personas = Number(e.familias) * PERSONAS_FACTOR;
            const toneladas = Number(e.familias) > 0 ? (Number(e.familias) * TONELADAS_FACTOR) : 0;
            return [
                e.nombre_estado,
                e.emblematicas,
                e.puntos_distribucion,
                totalFerias,
                e.clap,
                e.familias,
                personas,
                toneladas.toFixed(3),
                e.observaciones || '-',
            ];
        });
        const totalsRow = [
            'TOTAL',
            getTotalEmblematicas(),
            getTotalPuntosDistribucion(),
            getTotalGlobalFerias(),
            getTotalClap(),
            getTotalFamilias(),
            getTotalPersonas(),
            getTotalToneladas().toFixed(3),
            '',
        ];
        exportTableToPdf({
            title: `Planificación de Ferias del Campo Soberano`,
            subtitle: `${selectedMes} ${selectedAnio} – Jornada ${selectedJornada}`,
            headers,
            rows,
            totalsRow,
            fileName: `Planificacion_${selectedMes}_J${selectedJornada}_${selectedAnio}.pdf`,
        });
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

                        {/* Header */}
                        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-600 dark:bg-blue-500 rounded-xl shadow-sm text-white">
                                        <CalendarIcon className="w-6 h-6" />
                                    </div>
                                    Planificación de Ferias
                                </h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                                        <Eye className="w-3 h-3" />
                                        Solo Lectura
                                    </span>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                        Compilado reactivo de las ferias cargadas por jornada.
                                    </p>
                                </div>
                            </div>

                            {/* Controls: Mes, Jornada, PDF */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-sm w-full xl:w-auto shrink-0">
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <select
                                        value={selectedMes}
                                        onChange={(e) => setSelectedMesJornada(e.target.value, selectedJornada)}
                                        className="text-sm font-medium bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 dark:text-slate-200 cursor-pointer dark:bg-slate-800"
                                    >
                                        {MESES.map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={selectedJornada}
                                        onChange={(e) => setSelectedMesJornada(selectedMes, Number(e.target.value))}
                                        className="text-sm font-medium bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 dark:text-slate-200 cursor-pointer dark:bg-slate-800"
                                    >
                                        {[ 1, 2, 3, 4 ].map((j) => (
                                            <option key={j} value={j}>Jornada {j}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleExportPdf}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 hover:shadow-red-600/40"
                                    >
                                        <FileDown className="w-4 h-4" />
                                        <span>PDF</span>
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving || !canSave}
                                        title={!canSave ? "Solo se permite guardar la jornada actual o la anterior" : ""}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden ${showSuccess
                                            ? 'bg-green-500 text-white shadow-md shadow-green-500/20'
                                            : !canSave
                                                ? 'bg-slate-400 text-white'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 hover:shadow-blue-600/40'
                                            } disabled:opacity-60 disabled:cursor-not-allowed`}
                                    >
                                        {isSaving ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : showSuccess ? (
                                            <CheckCircle2 className="w-4 h-4" />
                                        ) : (
                                            <Save className="w-4 h-4" />
                                        )}
                                        <span>{showSuccess ? 'Guardado' : 'Guardar'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Summary Cards */}
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

                        {/* Read-only Table */}
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-3xl shadow-sm overflow-hidden flex flex-col">
                            <div className="p-5 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
                                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Desglose Territorial</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    Datos compilados de las ferias cargadas para <strong>{selectedMes} {selectedAnio}</strong> – <strong>Jornada {selectedJornada}</strong>.
                                </p>
                            </div>

                            <div className="overflow-x-auto relative no-scrollbar">
                                <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
                                    <thead className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] text-slate-500 dark:text-slate-400">
                                        <tr>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300">Estado</th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center">Emblemáticas</th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center">Punto Dist.</th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/10">Total Ferias</th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center">CLAP</th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center">Familias</th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center">Personas</th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10">Toneladas</th>
                                            <th className="font-bold p-4 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700/50">Observaciones</th>
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
                                                    <td className="p-4 text-center font-medium text-slate-700 dark:text-slate-300">
                                                        {estado.emblematicas || <span className="text-slate-300 dark:text-slate-600">0</span>}
                                                    </td>
                                                    <td className="p-4 text-center font-medium text-slate-700 dark:text-slate-300">
                                                        {estado.puntos_distribucion || <span className="text-slate-300 dark:text-slate-600">0</span>}
                                                    </td>
                                                    <td className="p-4 text-center font-bold text-orange-600 dark:text-orange-400 bg-orange-50/30 dark:bg-orange-900/10">
                                                        {totalFerias > 0 ? totalFerias : <span className="text-orange-300 dark:text-orange-800">0</span>}
                                                    </td>
                                                    <td className="p-4 text-center font-medium text-slate-700 dark:text-slate-300">
                                                        {estado.clap || <span className="text-slate-300 dark:text-slate-600">0</span>}
                                                    </td>
                                                    <td className="p-4 text-center font-bold text-purple-700 dark:text-purple-400">
                                                        {estado.familias > 0 ? estado.familias.toLocaleString('es-VE') : <span className="text-slate-300 dark:text-slate-600">0</span>}
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

                            {/* Total Footer */}
                            <div className="bg-slate-900 text-white p-6 mt-auto">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-lg font-bold flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                            TOTALES GENERALES
                                        </h4>
                                        <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider font-semibold">{selectedMes} {selectedAnio} – Jornada {selectedJornada}</p>
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
