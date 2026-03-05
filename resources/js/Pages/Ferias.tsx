import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import MapView from '@/Components/map/MapView';
import Sidebar from '@/Layouts/Sidebar';
import { Menu } from 'lucide-react';
import RegisterFeriaModal from '@/Components/forms/RegisterFeriaModal';
import { useFeriasStore } from '@/store/feriasStore';
import { Feria } from '@/types';

export default function Ferias() {
    const { setMobileSidebarOpen } = useFeriasStore();
    const [ isRegisterModalOpen, setIsRegisterModalOpen ] = useState(false);

    return (
        <>
            <Head title="Mapa de Ferias" />

            {/* Main Full-Screen Layout */}
            <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
                {/* Sidebar stays on the left */}
                <Sidebar onRegisterClick={() => setIsRegisterModalOpen(true)} />

                {/* Map occupies the remaining width */}
                <div className="flex-1 relative bg-white dark:bg-slate-800 transition-colors duration-300">
                    <button
                        onClick={() => setMobileSidebarOpen(true)}
                        className="md:hidden absolute top-4 left-4 z-40 p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xl border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <MapView />
                </div>
            </div>

            {/* Modals */}
            {isRegisterModalOpen && (
                <RegisterFeriaModal onClose={() => setIsRegisterModalOpen(false)} />
            )}
        </>
    );
}
