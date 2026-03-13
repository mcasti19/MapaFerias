import { Head } from '@inertiajs/react';
import Sidebar from '@/Layouts/Sidebar';
import MobileNavbar from '@/Layouts/MobileNavbar';
import { Activity, MapPin, Target, Users } from 'lucide-react';
import { useFeriasStore } from '@/store/feriasStore';
import { getFeriaStatus } from '@/lib/feriaUtils';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useMemo, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

import { useThemeStore } from '@/store/themeStore';
import { MESES } from '@/lib/dateUtils';

export default function Dashboard() {
    const { ferias, filters, setFilter } = useFeriasStore();
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    // Chart colors based on theme
    const chartColors = {
        text: isDark ? '#94a3b8' : '#64748b',
        grid: isDark ? '#334155' : '#e2e8f0',
        tooltipBg: isDark ? '#1e293b' : '#ffffff',
        tooltipText: isDark ? '#f8fafc' : '#1e293b',
    };

    // Get filtered ferias properly
    const filteredList = useMemo(() => {
        // We use the store's current state to calculate this without triggering
        // a re-render from inside the render phase. 
        // We depend on ferias and filters to recalculate when they change.
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
                const feriaStartStr = feria.fechaInicio.substring(0, 10);
                const overlaps = feriaStartStr >= filters.fechaDesde && feriaStartStr <= filters.fechaHasta;
                if (!overlaps) return false;
            } else if (filters.fechaDesde) {
                if (feria.fechaInicio.substring(0, 10) < filters.fechaDesde) return false;
            } else if (filters.fechaHasta) {
                if (feria.fechaInicio.substring(0, 10) > filters.fechaHasta) return false;
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
    }, [ ferias, filters ]);

    const totalFerias = filteredList.length;

    // Process data similar to the Mercal Excel Report
    const dataPorEstado = useMemo(() => {
        const stats: Record<string, any> = {};

        filteredList.forEach(feria => {
            const estado = feria.estado as string;
            if (!stats[ estado ]) {
                stats[ estado ] = {
                    estado,
                    planificadas: 0,
                    realizadas: 0,
                    toneladas: 0,
                    familias: 0,
                };
            }

            const status = getFeriaStatus(feria);

            // All registered ferias count as 'planificadas'
            stats[ estado ].planificadas++;

            // Only those marked as executed count towards realized
            if (status === 'Ejecutada') {
                stats[ estado ].realizadas++;
            }
        });

        return Object.values(stats).map(s => {
            // Formula metrics for Dashboard preview
            s.toneladas = s.realizadas * 2.5;
            s.familias = s.realizadas * 250;
            s.personas = s.familias * 4;
            s.combos = s.familias;

            const total = s.planificadas;
            s.cumplimiento = total > 0 ? Math.round((s.realizadas / total) * 100) : 0;

            return s;
        }).sort((a, b) => b.realizadas - a.realizadas); // Sort by realizadas desc
    }, [ filteredList ]);

    const globalStats = useMemo(() => {
        return dataPorEstado.reduce((acc, curr) => {
            acc.realizadas += curr.realizadas;
            return acc;
        }, { realizadas: 0 });
    }, [ dataPorEstado ]);

    const dashboardStats = useMemo(() => {
        const ferias = filteredList.length;
        const familias = ferias * 500;
        const toneladas = familias * 0.002185;

        return {
            ferias,
            familias,
            toneladas: Math.round(toneladas * 1000) / 1000,
        };
    }, [ filteredList ]);

    const dataPorTipo = useMemo(() => {
        const stats: Record<string, number> = {};
        filteredList.forEach(feria => {
            const tipo = feria.tipoFeria;
            if (tipo) {
                stats[ tipo ] = (stats[ tipo ] || 0) + 1;
            }
        });
        return Object.entries(stats).map(([ name, value ]) => ({ name, value })).sort((a, b) => b.value - a.value);
    }, [ filteredList ]);

    const pieData = [
        { name: 'Realizadas', value: globalStats.realizadas, color: '#3b82f6' },
        { name: 'Planificadas', value: dashboardStats.ferias, color: '#f97316' }
    ];

    return (
        <>
            <Head title="Dashboard dinámico - Ferias Mercal" />

            <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden text-slate-800 dark:text-white transition-colors duration-300">
                <Sidebar onRegisterClick={() => { }} />

                <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                    <MobileNavbar />

                    <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 dark:bg-slate-800 p-4 md:p-8 transition-colors duration-300 no-scrollbar">
                        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                            {/* Header & Date Filters (Desktop title stays, mobile Menu removed as it's in Navbar) */}
                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                                <div className="hidden md:block">
                                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2 tracking-tight">Reporte Estadístico Mercal</h1>
                                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium">Control de seguimiento de Ferias del Campo Soberano.</p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3 flex-wrap bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/60 w-full xl:w-auto">
                                    {/* Rango de Fechas */}
                                    <div className="flex items-center gap-2 border-r border-slate-200 dark:border-slate-700/60 pr-3">
                                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">Rango de fechas:</span>
                                        <input
                                            type="date"
                                            value={filters.fechaDesde}
                                            onChange={(e) => setFilter('fechaDesde', e.target.value)}
                                            className="text-sm bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto text-slate-700 dark:text-slate-200"
                                        />
                                        <span className="text-sm text-slate-400 hidden sm:inline">a</span>
                                        <input
                                            type="date"
                                            value={filters.fechaHasta}
                                            onChange={(e) => setFilter('fechaHasta', e.target.value)}
                                            className="text-sm bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto mt-2 sm:mt-0 text-slate-700 dark:text-slate-200"
                                        />
                                    </div>

                                    {/* Mes y Jornadas */}
                                    <div className="flex items-center gap-3">
                                        <select
                                            value={filters.mes || ''}
                                            onChange={(e) => setFilter('mes', e.target.value)}
                                            className="text-sm font-medium bg-slate-50 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 dark:text-slate-200 cursor-pointer"
                                        >
                                            <option value="">Todos los meses</option>
                                            {MESES.map((m) => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </select>

                                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                            {[ 1, 2, 3, 4 ].map((j) => {
                                                const currentJornadas = filters.jornada || [];
                                                const isActive = currentJornadas.includes(j);
                                                return (
                                                    <button
                                                        key={`j${j}`}
                                                        onClick={() => {
                                                            setFilter('jornada', isActive ? currentJornadas.filter(v => v !== j) : [ ...currentJornadas, j ]);
                                                        }}
                                                        className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${isActive
                                                            ? 'bg-blue-500 text-white shadow-sm'
                                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        J{j}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {(filters.fechaDesde || filters.fechaHasta || filters.mes || (filters.jornada || []).length > 0) && (
                                        <button
                                            onClick={() => {
                                                setFilter('fechaDesde', '');
                                                setFilter('fechaHasta', '');
                                                setFilter('mes', '');
                                                setFilter('jornada', []);
                                            }}
                                            className="text-xs text-red-500 hover:text-red-700 ml-2 font-medium"
                                        >
                                            Limpiar
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{totalFerias}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total de Ferias (Rango)</p>
                                </div>

                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                                            <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{globalStats.realizadas}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Ferias Realizadas</p>
                                </div>

                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                                            <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{dashboardStats.ferias}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Ferias Planificadas (Mes Actual)</p>
                                </div>

                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{dashboardStats.familias.toLocaleString()}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Familias Beneficiadas (Mes Actual)</p>
                                </div>
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Bar Chart */}
                                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm transition-colors duration-300">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Despacho por Estado (Toneladas)</h2>
                                    <div className="h-72 w-full min-h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                            <BarChart data={dataPorEstado} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} opacity={isDark ? 0.2 : 0.5} />
                                                <XAxis dataKey="estado" tick={{ fontSize: 12, fill: chartColors.text }} axisLine={false} tickLine={false} />
                                                <YAxis tick={{ fontSize: 12, fill: chartColors.text }} axisLine={false} tickLine={false} />
                                                <Tooltip
                                                    contentStyle={{
                                                        borderRadius: '8px',
                                                        border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                                                        backgroundColor: chartColors.tooltipBg,
                                                        color: chartColors.tooltipText,
                                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                    }}
                                                    itemStyle={{ color: chartColors.tooltipText }}
                                                    cursor={{ fill: isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(203, 213, 225, 0.2)' }}
                                                />
                                                <Bar dataKey="toneladas" name="Toneladas" fill="#3b82f6" radius={[ 4, 4, 0, 0 ]} maxBarSize={50} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Pie Chart */}
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm transition-colors duration-300">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Estatus Global</h2>
                                    <div className="h-72 w-full min-h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} stroke={isDark ? '#0f172a' : '#fff'} strokeWidth={2} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{
                                                        borderRadius: '8px',
                                                        border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                                                        backgroundColor: chartColors.tooltipBg,
                                                        color: chartColors.tooltipText,
                                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                    }}
                                                    itemStyle={{ color: chartColors.tooltipText }}
                                                />
                                                <Legend
                                                    verticalAlign="bottom"
                                                    height={36}
                                                    iconType="circle"
                                                    formatter={(value) => <span className="text-slate-600 dark:text-slate-400 font-medium text-xs">{value}</span>}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Tipo de Feria Chart */}
                                <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm transition-colors duration-300">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Distribución por Tipo de Feria</h2>
                                    <div className="h-64 w-full min-h-[250px]">
                                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                            <BarChart data={dataPorTipo} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={chartColors.grid} opacity={isDark ? 0.2 : 0.5} />
                                                <XAxis type="number" tick={{ fontSize: 12, fill: chartColors.text }} axisLine={false} tickLine={false} />
                                                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: chartColors.text }} axisLine={false} tickLine={false} width={80} />
                                                <Tooltip
                                                    contentStyle={{
                                                        borderRadius: '8px',
                                                        border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                                                        backgroundColor: chartColors.tooltipBg,
                                                        color: chartColors.tooltipText,
                                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                    }}
                                                    itemStyle={{ color: chartColors.tooltipText }}
                                                    cursor={{ fill: isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(203, 213, 225, 0.2)' }}
                                                />
                                                <Bar dataKey="value" name="Cantidad" fill="#10b981" radius={[ 0, 4, 4, 0 ]} maxBarSize={30} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            {/* Data Table */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm mt-8 overflow-hidden">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Reporte Consolidado por Estado</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                                        <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-300">
                                            <tr>
                                                <th className="px-4 py-3 rounded-l-lg font-semibold">Estado</th>
                                                <th className="px-4 py-3 font-semibold text-center">Planificadas</th>
                                                <th className="px-4 py-3 font-semibold text-center">Realizadas</th>
                                                <th className="px-4 py-3 font-semibold text-center">Toneladas</th>
                                                <th className="px-4 py-3 font-semibold text-center">Familias</th>
                                                <th className="px-4 py-3 font-semibold text-center">Combos</th>
                                                <th className="px-4 py-3 rounded-r-lg font-semibold text-center">% Cumplimiento</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                            {dataPorEstado.length > 0 ? (
                                                dataPorEstado.map((row) => (
                                                    <tr key={row.estado} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                        <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">{row.estado}</td>
                                                        <td className="px-4 py-3 text-center">{row.planificadas}</td>
                                                        <td className="px-4 py-3 text-center font-semibold text-blue-600 dark:text-blue-400">{row.realizadas}</td>
                                                        <td className="px-4 py-3 text-center">{row.toneladas}</td>
                                                        <td className="px-4 py-3 text-center">{row.familias.toLocaleString()}</td>
                                                        <td className="px-4 py-3 text-center">{row.combos.toLocaleString()}</td>
                                                        <td className="px-4 py-3 text-center">
                                                            <span className={`px-2 py-1 rounded-md text-xs font-bold ${row.cumplimiento > 50 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                                {row.cumplimiento}%
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                                                        No hay ferias en el rango seleccionado
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                        {dataPorEstado.length > 0 && (
                                            <tfoot className="bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-800 dark:text-white">
                                                <tr>
                                                    <td className="px-4 py-3 rounded-l-xl">TOTALES</td>
                                                    <td className="px-4 py-3 text-center">-</td>
                                                    <td className="px-4 py-3 text-center">{globalStats.realizadas}</td>
                                                    <td className="px-4 py-3 text-center">{dashboardStats.toneladas.toLocaleString('es-VE', { minimumFractionDigits: 1, maximumFractionDigits: 3 })}</td>
                                                    <td className="px-4 py-3 text-center">{dashboardStats.familias.toLocaleString('es-VE')}</td>
                                                    <td className="px-4 py-3 text-center">{dashboardStats.familias.toLocaleString('es-VE')}</td>
                                                    <td className="px-4 py-3 rounded-r-xl text-center">
                                                        {globalStats.realizadas + dashboardStats.ferias > 0
                                                            ? Math.round((globalStats.realizadas / (globalStats.realizadas + dashboardStats.ferias)) * 100)
                                                            : 0}%
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
