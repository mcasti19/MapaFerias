import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MapView from '@/Components/map/MapView';
import Sidebar from '@/Layouts/Sidebar';
import MobileNavbar from '@/Layouts/MobileNavbar';
import RegisterFeriaModal from '@/Components/forms/RegisterFeriaModal';

export default function Ferias() {
    const [ isRegisterModalOpen, setIsRegisterModalOpen ] = useState(false);

    return (
        <>
            <Head title="Mapa de Ferias" />

            <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
                {/* Sidebar - Desktop and Mobile (Off-canvas) */}
                <Sidebar onRegisterClick={() => setIsRegisterModalOpen(true)} />

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                    {/* Mobile Navbar - Only visible on mobile */}
                    <MobileNavbar />

                    {/* Content */}
                    <div className="flex-1 relative bg-white dark:bg-slate-800 transition-colors duration-300">
                        {/* Map View */}
                        <div className="absolute inset-0 z-0">
                            <MapView />
                        </div>
                    </div>
                </main>
            </div>

            {/* Modals */}
            {isRegisterModalOpen && (
                <RegisterFeriaModal onClose={() => setIsRegisterModalOpen(false)} />
            )}
        </>
    );
}
