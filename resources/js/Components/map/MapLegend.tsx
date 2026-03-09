import { Activity, Clock, History } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';

export default function MapLegend() {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <div
            className={`absolute bottom-8 right-4 z-[400] border transition-all duration-300
                rounded-lg px-4 py-3 backdrop-blur-sm shadow-2xl
                ${isDark
                    ? 'bg-slate-900/90 border-slate-700/60'
                    : 'bg-white/90 border-slate-200'
                }`}
        >
            <p className={`text-xs font-semibold uppercase tracking-widest mb-2.5
                ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            >
                Leyenda
            </p>
            <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-900/40" />
                    <div className="flex items-center gap-1.5">
                        <Activity className="w-3 h-3 text-green-500" />
                        <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            Activa
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-yellow-500 shadow-lg shadow-yellow-900/40" />
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-yellow-600" />
                        <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            Programada
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-slate-500" />
                    <div className="flex items-center gap-1.5">
                        <History className="w-3 h-3 text-slate-500" />
                        <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            Histórica
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
