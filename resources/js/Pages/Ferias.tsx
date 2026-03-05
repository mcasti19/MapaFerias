import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import MapView from '@/Components/map/MapView';
import Sidebar from '@/Layouts/Sidebar';
import RegisterFeriaModal from '@/Components/forms/RegisterFeriaModal';
import { useFeriasStore } from '@/store/feriasStore';
import { Feria } from '@/types';

export default function Ferias() {
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
