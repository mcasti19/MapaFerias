import { Activity, Clock, History } from 'lucide-react';
import { useFeriasStore } from '@/store/feriasStore';
import { useShallow } from 'zustand/react/shallow';
import { getFeriaStatus } from '@/lib/feriaUtils';

interface StatCardProps {
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    glowColor: string;
    pulsing?: boolean;
}

function StatCard({ label, value, icon, color, glowColor, pulsing }: StatCardProps) {
    return (
        <div
            className={`relative flex items-center gap-3 px-3 py-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm dark:shadow-none transition-colors duration-300`}
        >
            {/* Glow bg */}
            <div
                className="absolute inset-0 opacity-5 dark:opacity-10"
                style={{ background: `radial-gradient(ellipse at left, ${glowColor}, transparent 70%)` }}
            />
            <div
                className={`flex items-center justify-center w-9 h-9 rounded-lg ${color} flex-shrink-0`}
            >
                {pulsing ? (
                    <span className="animate-pulse-green">{icon}</span>
                ) : (
                    icon
                )}
            </div>
            <div className="relative">
                <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{label}</p>
            </div>
        </div>
    );
}

export default function SummaryPanel() {
    const ferias = useFeriasStore((s) => s.ferias);
    const filtered = useFeriasStore(useShallow((s) => s.filteredFerias()));

    // Count by status from ALL ferias (global counts)
    const allCounts = { activa: 0, programada: 0, historica: 0 };
    ferias.forEach((f) => { allCounts[ getFeriaStatus(f) ]++; });

    // Filtered counts
    const filteredCounts = { activa: 0, programada: 0, historica: 0 };
    filtered.forEach((f) => { filteredCounts[ getFeriaStatus(f) ]++; });

    const isFiltered = filtered.length !== ferias.length;

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Resumen
                </h2>
                {isFiltered && (
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">
                        Mostrando {filtered.length} de {ferias.length}
                    </span>
                )}
            </div>

            <StatCard
                label="Activas Hoy"
                value={isFiltered ? filteredCounts.activa : allCounts.activa}
                icon={<Activity className="w-4 h-4 text-green-300" />}
                color="bg-green-900/60"
                glowColor="#16a34a"
                pulsing
            />
            <StatCard
                label="Programadas"
                value={isFiltered ? filteredCounts.programada : allCounts.programada}
                icon={<Clock className="w-4 h-4 text-yellow-300" />}
                color="bg-yellow-900/60"
                glowColor="#ca8a04"
            />
            <StatCard
                label="Históricas"
                value={isFiltered ? filteredCounts.historica : allCounts.historica}
                icon={<History className="w-4 h-4 text-slate-300" />}
                color="bg-slate-700/60"
                glowColor="#6b7280"
            />
        </div>
    );
}
