import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';

export default function ThemeToggle({ className = '' }: { className?: string }) {
    const { theme, toggleTheme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${isDark ? 'bg-slate-800 text-blue-400 hover:bg-slate-700' : 'bg-white text-yellow-500 hover:bg-slate-100 shadow-sm'} ${className}`}
            aria-label="Toggle Dark Mode"
            title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        >
            <div className={`absolute transition-all duration-500 ${isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                <Sun className="w-5 h-5" />
            </div>

            <div className={`transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
                <Moon className="w-5 h-5" />
            </div>
        </button>
    );
}
