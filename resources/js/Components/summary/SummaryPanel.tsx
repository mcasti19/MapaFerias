import { Activity, Clock, History } from 'lucide-react';
import { useFeriasStore } from '@/store/feriasStore';
import { useShallow } from 'zustand/react/shallow';
import { getFeriaStatus } from '@/lib/feriaUtils';
import { FeriaStatus } from '@/types';

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
    const allCounts: Record<FeriaStatus, number> = { 'En Proceso': 0, 'Por Ejecutar': 0, 'Ejecutada': 0, 'No ejecutada': 0 };
    ferias.forEach((f) => { allCounts[ getFeriaStatus(f) ]++; });

    // Filtered counts
    const filteredCounts: Record<FeriaStatus, number> = { 'En Proceso': 0, 'Por Ejecutar': 0, 'Ejecutada': 0, 'No ejecutada': 0 };
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
                label="En Proceso"
                value={isFiltered ? filteredCounts[ 'En Proceso' ] : allCounts[ 'En Proceso' ]}
                icon={<Activity className="w-4 h-4 text-blue-300" />}
                color="bg-blue-900/60"
                glowColor="#3b82f6"
                pulsing
            />
            <StatCard
                label="Por Ejecutar"
                value={isFiltered ? filteredCounts[ 'Por Ejecutar' ] : allCounts[ 'Por Ejecutar' ]}
                icon={<Clock className="w-4 h-4 text-yellow-300" />}
                color="bg-yellow-900/60"
                glowColor="#ca8a04"
            />
            <StatCard
                label="Ejecutadas"
                value={isFiltered ? filteredCounts[ 'Ejecutada' ] : allCounts[ 'Ejecutada' ]}
                icon={<History className="w-4 h-4 text-green-300" />}
                color="bg-green-900/60"
                glowColor="#16a34a"
            />
            <StatCard
                label="No ejecutadas"
                value={isFiltered ? filteredCounts[ 'No ejecutada' ] : allCounts[ 'No ejecutada' ]}
                icon={<History className="w-4 h-4 text-red-300" />}
                color="bg-red-900/60"
                glowColor="#ef4444"
            />
        </div>
    );
}
