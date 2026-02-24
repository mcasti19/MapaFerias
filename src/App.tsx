import { useState } from 'react';
import MapView from '@/components/map/MapView';
import Sidebar from '@/components/layout/Sidebar';
import RegisterFeriaModal from '@/components/forms/RegisterFeriaModal';

export default function App() {
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-slate-950">
            {/* Sidebar */}
            <Sidebar onRegisterClick={() => setIsModalOpen(true)} />

            {/* Map Zone */}
            <main className="flex-1 relative overflow-hidden">
                <MapView />
            </main>

            {/* Register Modal */}
            {isModalOpen && (
                <RegisterFeriaModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}
