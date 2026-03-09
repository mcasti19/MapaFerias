import React, { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Layouts/Sidebar';
import MobileNavbar from '@/Layouts/MobileNavbar';
import { useCumplimientoStore } from '@/store/cumplimientoStore';
import { CumplimientoEstado } from '@/data/cumplimiento';
import { useFeriasStore } from '@/store/feriasStore';
import { usePlanificacionStore } from '@/store/planificacionStore';
import { PlanificacionEstado } from '@/types';
import { PERSONAS_FACTOR, TONELADAS_FACTOR } from '@/lib/feriaUtils';
import { MESES, isAllowedToSave } from '@/lib/dateUtils';
import { exportTableToPdf } from '@/lib/pdfExport';
import {
    Calendar as CalendarIcon, Save, FileDown, CheckCircle2,
    Target, Users, MapPin, Edit3
} from 'lucide-react';

export default function CumplimientoIndex() {
    const {
        estados,
        selectedMes,
        selectedJornada,
        selectedAnio,
        isInitialized,
        initializeCumplimiento,
        setSelectedMesJornada,
        updateEstado,
        guardarCumplimiento,
        getTotals,
    } = useCumplimientoStore();

    const [ isSaving, setIsSaving ] = useState(false);
    const [ showSuccess, setShowSuccess ] = useState(false);

    useEffect(() => {
        initializeCumplimiento();
    }, [ initializeCumplimiento ]);

    const ferias = useFeriasStore((state) => state.ferias);
    const planificacionesGuardadas = usePlanificacionStore((state) => state.planificacionesGuardadas);

    // Get the saved snapshot if it exists
    const savedPlan = useMemo(() => {
        return planificacionesGuardadas.find(
            p => p.mes === selectedMes && p.jornada === selectedJornada && p.anio === selectedAnio
        );
    }, [ planificacionesGuardadas, selectedMes, selectedJornada, selectedAnio ]);

    // Calculates planificacion data from the snapshot or falls back to ferias on the fly
    const planificacionMap = useMemo(() => {
        const estadoMap = new Map<string, { emblematicas: number, puntos_distribucion: number, clap: number }>();

        if (savedPlan) {
            // 1. Use saved Planificacion (priority)
            savedPlan.estados.forEach(e => {
                estadoMap.set(e.nombre_estado.toUpperCase(), {
                    emblematicas: Number(e.emblematicas) || 0,
                    puntos_distribucion: Number(e.puntos_distribucion) || 0,
                    clap: Number(e.clap) || 0
                });
            });
        } else {
            // 2. Fallback to active ferias computation (for demos and quick previews)
            const matchingFerias = ferias.filter(
                (f) => f.mes === selectedMes && f.jornada === selectedJornada && f.anio === selectedAnio
            );

            matchingFerias.forEach((feria) => {
                const key = (feria.estado || '').toUpperCase();
                if (!estadoMap.has(key)) {
                    estadoMap.set(key, { emblematicas: 0, puntos_distribucion: 0, clap: 0 });
                }
                const existing = estadoMap.get(key)!;
                if (feria.tipoFeria === 'Integral' || feria.tipoFeria === 'Víveres') {
                    existing.emblematicas += 1;
                } else {
                    existing.puntos_distribucion += 1;
                }
                existing.clap += 1;
            });
        }

        return estadoMap;
    }, [ ferias, selectedMes, selectedJornada, selectedAnio, savedPlan ]);

    // Apply calculated readonly fields on top of the editable state
    const estadosConCalculos = useMemo(() => {
        return estados.map(e => {
            const plan = planificacionMap.get(e.nombre_estado.toUpperCase()) || { emblematicas: 0, puntos_distribucion: 0, clap: 0 };
            const planif = plan.emblematicas + plan.puntos_distribucion;
            const emblem = plan.emblematicas;
            const clapPlanif = plan.clap;

            const ptoDist = e.ferias_punto_distribucion || 0;
            const totalFerias = emblem + ptoDist;
            const familias = e.beneficiarios_familias || 0;
            const personas = familias * 4;
            const noReal = planif - totalFerias;
            const porc = planif > 0 ? Math.round((totalFerias / planif) * 100) : 0;

            return {
                ...e,
                ferias_planificadas: planif,
                ferias_emblematicas: emblem,
                ferias_realizadas_total: totalFerias,
                comunidad_planificados: clapPlanif,
                beneficiarios_personas: personas,
                no_realizados: noReal,
                porcentaje_cumplimiento: porc
            };
        });
    }, [ estados, planificacionMap ]);

    const totals = useMemo(() => {
        const totalPlanificadas = estadosConCalculos.reduce((a, c) => a + c.ferias_planificadas, 0);
        const totalEmblematicas = estadosConCalculos.reduce((a, c) => a + c.ferias_emblematicas, 0);
        const totalPuntoDistribucion = estadosConCalculos.reduce((a, c) => a + c.ferias_punto_distribucion, 0);
        const totalFeriasRealizadas = estadosConCalculos.reduce((a, c) => a + c.ferias_realizadas_total, 0);
        const totalToneladas = estadosConCalculos.reduce((a, c) => a + c.toneladas_despachadas, 0);
        const totalComunidadPlanificados = estadosConCalculos.reduce((a, c) => a + c.comunidad_planificados, 0);
        const totalComunidadAtendidos = estadosConCalculos.reduce((a, c) => a + c.comunidad_atendidos, 0);
        const totalComunidadSinAtender = estadosConCalculos.reduce((a, c) => a + c.comunidad_sin_atender, 0);
        const totalFamilias = estadosConCalculos.reduce((a, c) => a + c.beneficiarios_familias, 0);
        const totalPersonas = estadosConCalculos.reduce((a, c) => a + c.beneficiarios_personas, 0);
        const totalCombos = estadosConCalculos.reduce((a, c) => a + c.beneficiarios_combos, 0);
        const totalNoRealizados = estadosConCalculos.reduce((a, c) => a + c.no_realizados, 0);
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
    }, [ estadosConCalculos ]);

    const handleUpdate = (id: string, field: keyof CumplimientoEstado, value: number) => {
        updateEstado(id, { [ field ]: value });
    };

    const handleSave = () => {
        setIsSaving(true);
        // Persist readonly calculated fields into the store state so they are saved
        estadosConCalculos.forEach(e => {
            updateEstado(e.id, {
                ferias_planificadas: e.ferias_planificadas,
                ferias_emblematicas: e.ferias_emblematicas,
                ferias_realizadas_total: e.ferias_realizadas_total,
                comunidad_planificados: e.comunidad_planificados,
                beneficiarios_personas: e.beneficiarios_personas,
                no_realizados: e.no_realizados,
                porcentaje_cumplimiento: e.porcentaje_cumplimiento
            });
        });

        setTimeout(() => {
            guardarCumplimiento();
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 500);
    };

    const canSave = isAllowedToSave(selectedMes, selectedJornada, selectedAnio);

    const handleExportPdf = () => {
        const headers = [
            'Estado', 'Planif.', 'Emblem.', 'Pto.Dist.', 'Total',
            'Ton. Desp.', 'Com.Plan.', 'Com.Atend.', 'Sin Atend.',
            'Familias', 'Personas', 'Combos', 'No Real.', '% Cumpl.', 'Obs.'
        ];
        const rows = estadosConCalculos.map((e) => [
            e.nombre_estado,
            e.ferias_planificadas,
            e.ferias_emblematicas,
            e.ferias_punto_distribucion,
            e.ferias_realizadas_total,
            e.toneladas_despachadas.toFixed(2),
            e.comunidad_planificados,
            e.comunidad_atendidos,
            e.comunidad_sin_atender,
            e.beneficiarios_familias,
            e.beneficiarios_personas,
            e.beneficiarios_combos,
            e.no_realizados,
            `${e.porcentaje_cumplimiento}%`,
            e.observaciones || '-',
        ]);
        const totalsRow = [
            'TOTAL',
            totals.totalPlanificadas,
            totals.totalEmblematicas,
            totals.totalPuntoDistribucion,
            totals.totalFeriasRealizadas,
            totals.totalToneladas.toFixed(2),
            totals.totalComunidadPlanificados,
            totals.totalComunidadAtendidos,
            totals.totalComunidadSinAtender,
            totals.totalFamilias,
            totals.totalPersonas,
            totals.totalCombos,
            totals.totalNoRealizados,
            `${totals.porcentajeCumplimientoGlobal}%`,
            '',
        ];
        exportTableToPdf({
            title: `Cumplimiento de Ferias del Campo Soberano`,
            subtitle: `${selectedMes} ${selectedAnio} – Jornada ${selectedJornada}`,
            headers,
            rows,
            totalsRow,
            fileName: `Cumplimiento_${selectedMes}_J${selectedJornada}_${selectedAnio}.pdf`,
        });
    };

    if (!isInitialized) return null;

    // Compact editable input with negative number support
    const EditCell = ({ value, onChange, className = '' }: { value: number; onChange: (v: number) => void; className?: string }) => {
        const [ localVal, setLocalVal ] = useState(value?.toString() || '0');

        useEffect(() => {
            if (parseFloat(localVal) !== value && localVal !== '-' && localVal.trim() !== '') {
                setLocalVal(value?.toString() || '0');
            }
        }, [ value ]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            setLocalVal(val);
            if (val === '-' || val === '') {
                onChange(0);
            } else {
                const parsed = parseFloat(val);
                if (!isNaN(parsed)) onChange(parsed);
            }
        };

        return (
            <div className="max-w-[70px] mx-auto">
                <input
                    type="number"
                    step="any"
                    className={`w-full p-1.5 text-center bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-blue-500 dark:hover:border-slate-600 dark:focus:border-blue-400 focus:ring-0 outline-none transition-colors font-medium text-slate-700 dark:text-slate-300 text-xs ${className}`}
                    value={localVal === '0' && value === 0 ? '0' : localVal}
                    onChange={handleChange}
                />
            </div>
        );
    };

    // Read-only cell
    const ReadCell = ({ value, className = '' }: { value: number | string; className?: string }) => (
        <td className={`p-3 text-center font-bold text-xs ${className}`}>
            {value}
        </td>
    );

    return (
        <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden text-slate-800 dark:text-white transition-colors duration-300">
            <Head title="Cumplimiento - Mercal" />
            <Sidebar onRegisterClick={() => { }} />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <MobileNavbar />

                <div className="flex-1 overflow-y-auto w-full no-scrollbar bg-slate-50 dark:bg-slate-900/50 p-4 md:p-8">
                    <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">

                        {/* Header */}
                        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                    <div className="p-2.5 bg-red-600 dark:bg-red-500 rounded-lg shadow-sm text-white">
                                        <CalendarIcon className="w-6 h-6" />
                                    </div>
                                    Cumplimiento de Ferias
                                </h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                                        <Edit3 className="w-3 h-3" />
                                        Editable
                                    </span>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                        Registra el cumplimiento real de la jornada seleccionada.
                                    </p>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm w-full xl:w-auto shrink-0">
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
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20"
                                    >
                                        <FileDown className="w-4 h-4" />
                                        <span>PDF</span>
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving || !canSave}
                                        title={!canSave ? "Solo se permite guardar la jornada actual o la anterior" : ""}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 overflow-hidden ${showSuccess
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
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                                <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-lg text-orange-600 dark:text-orange-400">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ferias Realizadas</p>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{totals.totalFeriasRealizadas}</h3>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                                <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Familias Beneficiadas</p>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{totals.totalFamilias.toLocaleString('es-VE')}</h3>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                                <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Toneladas Desp.</p>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{totals.totalToneladas.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</h3>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                                <div className={`p-3 rounded-lg ${totals.porcentajeCumplimientoGlobal >= 75 ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : totals.porcentajeCumplimientoGlobal >= 50 ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">% Cumplimiento</p>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{totals.porcentajeCumplimientoGlobal}%</h3>
                                </div>
                            </div>
                        </div>

                        {/* Editable Table */}
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden flex flex-col">
                            <div className="p-5 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
                                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Cumplimiento por Estado</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    Edita las casillas para registrar el cumplimiento real de <strong>{selectedMes} {selectedAnio}</strong> – <strong>Jornada {selectedJornada}</strong>.
                                </p>
                            </div>

                            <div className="overflow-x-auto relative no-scrollbar">
                                <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
                                    <thead className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
                                        {/* Group headers */}
                                        <tr className="text-slate-500 dark:text-slate-400">
                                            <th rowSpan={2} className="font-bold p-3 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 min-w-[120px]">Estado</th>
                                            <th colSpan={4} className="font-bold p-2 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-red-50/50 dark:bg-red-900/10 text-red-700 dark:text-red-400">Ferias</th>
                                            <th rowSpan={2} className="font-bold p-2 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10 min-w-[70px]">Ton. Desp.</th>
                                            <th colSpan={3} className="font-bold p-2 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-green-50/50 dark:bg-green-900/10 text-green-700 dark:text-green-400">Comunidad/CLAP/Inst.</th>
                                            <th colSpan={3} className="font-bold p-2 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-purple-50/50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-400">Beneficiarios</th>
                                            <th rowSpan={2} className="font-bold p-2 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center min-w-[55px]">No Real.</th>
                                            <th rowSpan={2} className="font-bold p-2 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 min-w-[65px]">% Cumpl.</th>
                                            <th rowSpan={2} className="font-bold p-2 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 min-w-[100px]">Obs.</th>
                                        </tr>
                                        <tr className="text-slate-500 dark:text-slate-400">
                                            <th className="font-bold p-2 uppercase text-[9px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-red-50/30 dark:bg-red-900/5">Planif.</th>
                                            <th className="font-bold p-2 uppercase text-[9px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-red-50/30 dark:bg-red-900/5">Emblem.</th>
                                            <th className="font-bold p-2 uppercase text-[9px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-red-50/30 dark:bg-red-900/5">Pto.Dist.</th>
                                            <th className="font-bold p-2 uppercase text-[9px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-red-50/30 dark:bg-red-900/5 text-orange-600 dark:text-orange-400">Total</th>
                                            <th className="font-bold p-2 uppercase text-[9px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-green-50/30 dark:bg-green-900/5">Planif.</th>
                                            <th className="font-bold p-2 uppercase text-[9px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-green-50/30 dark:bg-green-900/5">Atend.</th>
                                            <th className="font-bold p-2 uppercase text-[9px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-green-50/30 dark:bg-green-900/5">Sin At.</th>
                                            <th className="font-bold p-2 uppercase text-[9px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-purple-50/30 dark:bg-purple-900/5">Familias</th>
                                            <th className="font-bold p-2 uppercase text-[9px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-purple-50/30 dark:bg-purple-900/5">Personas</th>
                                            <th className="font-bold p-2 uppercase text-[9px] tracking-wider border-b border-slate-200 dark:border-slate-700/50 text-center bg-purple-50/30 dark:bg-purple-900/5">Combos</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                        {estadosConCalculos.map((e) => {
                                            const isZero = e.ferias_planificadas === 0 && e.ferias_realizadas_total === 0;
                                            return (
                                                <tr key={e.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors group">
                                                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200 uppercase text-[11px] flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isZero ? 'bg-red-500' : 'bg-green-500'}`} />
                                                        {e.nombre_estado}
                                                    </td>
                                                    {/* Ferias */}
                                                    <ReadCell value={e.ferias_planificadas} className="bg-red-50/10 dark:bg-red-900/5 text-slate-600 dark:text-slate-400" />
                                                    <ReadCell value={e.ferias_emblematicas} className="bg-red-50/10 dark:bg-red-900/5 text-slate-600 dark:text-slate-400" />
                                                    <td className="p-1"><EditCell value={e.ferias_punto_distribucion} onChange={(v) => handleUpdate(e.id, 'ferias_punto_distribucion', v)} /></td>
                                                    <td className="p-3 text-center font-bold text-orange-600 dark:text-orange-400 bg-orange-50/30 dark:bg-orange-900/10 text-xs">
                                                        {e.ferias_realizadas_total}
                                                    </td>
                                                    {/* Toneladas */}
                                                    <td className="p-1 bg-blue-50/20 dark:bg-blue-900/5"><EditCell value={e.toneladas_despachadas} onChange={(v) => handleUpdate(e.id, 'toneladas_despachadas', v)} /></td>
                                                    {/* Comunidad */}
                                                    <ReadCell value={e.comunidad_planificados} className="bg-green-50/10 dark:bg-green-900/5 text-slate-600 dark:text-slate-400" />
                                                    <td className="p-1 bg-green-50/20 dark:bg-green-900/5"><EditCell value={e.comunidad_atendidos} onChange={(v) => handleUpdate(e.id, 'comunidad_atendidos', v)} /></td>
                                                    <td className="p-1 bg-green-50/20 dark:bg-green-900/5"><EditCell value={e.comunidad_sin_atender} onChange={(v) => handleUpdate(e.id, 'comunidad_sin_atender', v)} /></td>
                                                    {/* Beneficiarios */}
                                                    <td className="p-1 bg-purple-50/20 dark:bg-purple-900/5"><EditCell value={e.beneficiarios_familias} onChange={(v) => handleUpdate(e.id, 'beneficiarios_familias', v)} /></td>
                                                    <ReadCell value={e.beneficiarios_personas} className="bg-purple-50/10 dark:bg-purple-900/5 text-slate-600 dark:text-slate-400" />
                                                    <td className="p-1 bg-purple-50/20 dark:bg-purple-900/5"><EditCell value={e.beneficiarios_combos} onChange={(v) => handleUpdate(e.id, 'beneficiarios_combos', v)} /></td>
                                                    {/* No realizados */}
                                                    <ReadCell value={e.no_realizados} className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400" />
                                                    {/* % Cumplimiento */}
                                                    <td className="p-3 text-center font-bold text-xs bg-emerald-50/30 dark:bg-emerald-900/10">
                                                        <span className={`${e.porcentaje_cumplimiento >= 75 ? 'text-green-600 dark:text-green-400' : e.porcentaje_cumplimiento >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                                            {e.porcentaje_cumplimiento}%
                                                        </span>
                                                    </td>
                                                    {/* Observaciones */}
                                                    <td className="p-1">
                                                        <input
                                                            type="text"
                                                            className="w-full p-1.5 bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-blue-500 dark:hover:border-slate-600 dark:focus:border-blue-400 focus:ring-0 outline-none transition-colors font-medium text-slate-700 dark:text-slate-300 text-xs"
                                                            value={e.observaciones}
                                                            onChange={(ev) => updateEstado(e.id, { observaciones: ev.target.value })}
                                                            placeholder="—"
                                                        />
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
                                            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                                            TOTALES CUMPLIMIENTO
                                        </h4>
                                        <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider font-semibold">{selectedMes} {selectedAnio} – Jornada {selectedJornada}</p>
                                    </div>

                                    <div className="flex items-center gap-6 xl:gap-10 flex-wrap">
                                        <div className="text-right">
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Ferias Realizadas</p>
                                            <div className="text-xl font-bold">{totals.totalFeriasRealizadas}</div>
                                        </div>
                                        <div className="w-px h-8 bg-slate-700 hidden sm:block" />
                                        <div className="text-right">
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Comunidad Atend.</p>
                                            <div className="text-xl font-bold">{totals.totalComunidadAtendidos.toLocaleString('es-VE')}</div>
                                        </div>
                                        <div className="w-px h-8 bg-slate-700 hidden sm:block" />
                                        <div className="text-right">
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Familias</p>
                                            <div className="text-xl font-bold text-purple-400">{totals.totalFamilias.toLocaleString('es-VE')}</div>
                                        </div>
                                        <div className="w-px h-8 bg-slate-700 hidden sm:block" />
                                        <div className="text-right">
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Toneladas</p>
                                            <div className="text-2xl font-black text-blue-400">{totals.totalToneladas.toLocaleString('es-VE', { minimumFractionDigits: 2 })} <span className="text-sm font-medium text-slate-500">TM</span></div>
                                        </div>
                                        <div className="w-px h-8 bg-slate-700 hidden sm:block" />
                                        <div className="text-right">
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">% Global</p>
                                            <div className={`text-2xl font-black ${totals.porcentajeCumplimientoGlobal >= 75 ? 'text-green-400' : totals.porcentajeCumplimientoGlobal >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{totals.porcentajeCumplimientoGlobal}%</div>
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
