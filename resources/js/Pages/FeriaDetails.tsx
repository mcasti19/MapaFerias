import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Layouts/Sidebar';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Clock,
    Users,
    Store,
    Package,
    TrendingUp,
    ShieldCheck,
    Truck
} from 'lucide-react';
import { useState } from 'react';

// Mocked Data for Demonstration
const MOCK_FERIA_DATA = {
    id: 1,
    nombre: 'Mega Feria Integral Sucre',
    estado: 'Miranda',
    municipio: 'Sucre',
    parroquia: 'Petare',
    direccion: 'Av. Francisco de Miranda, a la altura de la redoma, estacionamiento techado.',
    estatus: 'En Curso',
    tipo: 'Integral',
    fechaInicio: '2026-10-15',
    fechaFin: '2026-10-17',
    horario: '08:00 AM - 04:00 PM',
    familiasEstimadas: 4500,
    responsable: 'María González (Poder Popular)',
    telefono: '+58 412-555-0192',
    inventario: [
        { item: 'Carne de Res', cantidad: '2.5 Toneladas', icono: Package },
        { item: 'Pollo Beneficiado', cantidad: '3.0 Toneladas', icono: Package },
        { item: 'Víveres Secos (Clap)', cantidad: '5000 Combos', icono: Package },
        { item: 'Hortalizas Mixtas', cantidad: '1.2 Toneladas', icono: Package },
    ]
};

export default function FeriaDetails({ feriaId }: { feriaId: string }) {
    // In a real app we'd fetch data using `feriaId`. Using mock for now.
    const feria = MOCK_FERIA_DATA;

    return (
        <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden text-slate-800 dark:text-white transition-colors duration-300 font-sans">
            <Head title={`${feria.nombre} - Ferias Mercal`} />

            {/* Sidebar Injection for Main Navigation */}
            <div className="hidden md:flex">
                <Sidebar onRegisterClick={() => { }} />
            </div>

            {/* Main Content Scrollable Area */}
            <main className="flex-1 overflow-y-auto w-full relative">

                {/* Top Navigation Bar */}
                <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('ferias') as string}
                            className="p-2 rounded-full hover:bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                                Detalles de la Feria
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Visualización de métricas e información operativa</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-20">

                    {/* Hero Header Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden transition-colors duration-300 relative">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

                        <div className="p-6 sm:p-10 relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-4 flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 tracking-wide uppercase">
                                        {feria.estatus}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 tracking-wide">
                                        Feria {feria.tipo}
                                    </span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                                    {feria.nombre}
                                </h1>
                                <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
                                    <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-blue-500" />
                                    <p className="font-medium text-sm sm:text-base leading-relaxed">
                                        {feria.direccion} <br /> <span className="opacity-70 text-xs sm:text-sm">{feria.parroquia}, {feria.municipio}, Estado {feria.estado}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50 min-w-auto md:min-w-[280px] shrink-0">
                                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Métricas Rápidas</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-slate-900 dark:text-white leading-none">{feria.familiasEstimadas.toLocaleString()}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Familias a Beneficiar</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Grid Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

                        {/* Left Column: Logistics & Schedule */}
                        <div className="lg:col-span-2 space-y-6 sm:space-y-8">

                            {/* Schedule Card */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm p-6 sm:p-8 transition-colors duration-300">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                    Planificación y Horario
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                            <Calendar className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Duración</p>
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{feria.fechaInicio} al</p>
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{feria.fechaFin}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                            <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Horario Operativo</p>
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{feria.horario}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Sujeto a cambios logísticos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Inventory Estimation */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden transition-colors duration-300">
                                <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-700/60">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Truck className="w-5 h-5 text-emerald-500" />
                                        Requerimiento de Despacho Estimado
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                                        Inventario proyectado para la atención de {feria.familiasEstimadas.toLocaleString()} familias.
                                    </p>
                                </div>
                                <div className="p-0">
                                    <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                        {feria.inventario.map((item, idx) => {
                                            const Icon = item.icono;
                                            return (
                                                <li key={idx} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                            <Icon className="w-5 h-5" />
                                                        </div>
                                                        <span className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">{item.item}</span>
                                                    </div>
                                                    <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                                        {item.cantidad}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Organization & Map Mini */}
                        <div className="space-y-6 sm:space-y-8">

                            {/* Organizer Info */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm p-6 sm:p-8 transition-colors duration-300">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-indigo-500" />
                                    Organización
                                </h3>
                                <div className="space-y-5">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Responsable Principal</p>
                                        <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{feria.responsable}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Teléfono de Contacto</p>
                                        <a href={`tel:${feria.telefono}`} className="font-semibold text-blue-600 dark:text-blue-400 text-sm hover:underline">{feria.telefono}</a>
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50">
                                        <button className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                            Ver Equipo Completo
                                        </button>
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
