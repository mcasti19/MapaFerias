import React from 'react';
import { Menu } from 'lucide-react';
import { useFeriasStore } from '@/store/feriasStore';
import ThemeToggle from '@/Components/ui/ThemeToggle';

export default function MobileNavbar() {
    const { setMobileSidebarOpen } = useFeriasStore();

    return (
        <nav className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setMobileSidebarOpen(true)}
                    className="p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Open Menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <img src="/MercalMarker.png" alt="Logo" className="w-7 h-7 object-contain" />
                    <span className="font-bold text-slate-800 dark:text-white tracking-tight">Mercal</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                {/* Space for future notifications or profile icon if needed */}
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-700">
                    ADM
                </div>
            </div>
        </nav>
    );
}
