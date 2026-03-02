import { Head } from '@inertiajs/react';
import Sidebar from '@/Layouts/Sidebar';
import { Activity, MapPin, Target, Users } from 'lucide-react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard - Ferias Mercal" />

            {/* Main Full-Screen Layout */}
            <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden text-slate-800 dark:text-white transition-colors duration-300">
                {/* Sidebar stays on the left */}
                <Sidebar onRegisterClick={() => { }} />

                {/* Dashboard content */}
                <div className="flex-1 overflow-y-auto bg-slate-100 dark:bg-slate-800 p-8 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Resumen General</h1>
                            <p className="text-slate-600 dark:text-slate-400 font-medium">Estadísticas consolidadas de las Ferias del Campo Soberano.</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Card 1 */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-sm dark:shadow-xl flex flex-col transition-colors duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 px-2 py-1 rounded-full">+12% este mes</span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">1,245</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total de Ferias</p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-sm dark:shadow-xl flex flex-col transition-colors duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">892</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Ferias Activas (Hoy)</p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-sm dark:shadow-xl flex flex-col transition-colors duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                                        <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Próximos 7 días</span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">353</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Ferias Planificadas</p>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-sm dark:shadow-xl flex flex-col transition-colors duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 px-2 py-1 rounded-full">+5.2% vs ayer</span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">45.2K</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Familias Beneficiadas</p>
                            </div>
                        </div>

                        {/* Recent Activity Mock Table Placeholder */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-3xl p-6 shadow-sm dark:shadow-xl mt-8 transition-colors duration-300">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Actividad Reciente</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                                    <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-300">
                                        <tr>
                                            <th className="px-5 py-4 rounded-l-xl font-semibold">Estado</th>
                                            <th className="px-5 py-4 font-semibold">Tipo de Feria</th>
                                            <th className="px-5 py-4 font-semibold">Fecha</th>
                                            <th className="px-5 py-4 rounded-r-xl font-semibold">Estatus</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-5 py-4 font-medium text-slate-800 dark:text-white">Distrito Capital</td>
                                            <td className="px-5 py-4">Feria Integral</td>
                                            <td className="px-5 py-4">Hoy, 08:30 AM</td>
                                            <td className="px-5 py-4"><span className="px-2.5 py-1 text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 rounded-lg">En curso</span></td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-5 py-4 font-medium text-slate-800 dark:text-white">Miranda</td>
                                            <td className="px-5 py-4">Arepera Móvil</td>
                                            <td className="px-5 py-4">Hoy, 09:15 AM</td>
                                            <td className="px-5 py-4"><span className="px-2.5 py-1 text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 rounded-lg">En curso</span></td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-5 py-4 font-medium text-slate-800 dark:text-white">Carabobo</td>
                                            <td className="px-5 py-4">Bodega Móvil</td>
                                            <td className="px-5 py-4">Mañana, 07:00 AM</td>
                                            <td className="px-5 py-4"><span className="px-2.5 py-1 text-xs font-bold bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 rounded-lg">Planificado</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
