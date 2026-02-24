import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Sun, Moon } from 'lucide-react';
import { useFeriasStore } from '@/store/feriasStore';
import FeriaMarkerLayer from './FeriaMarkerLayer';
import MapLegend from './MapLegend';

// Venezuela center coordinates
const VENEZUELA_CENTER: [ number, number ] = [ 7.0, -66.5 ];
const DEFAULT_ZOOM = 6;

export default function MapView() {
    const { mapTheme, toggleMapTheme } = useFeriasStore();

    const tileUrl = mapTheme === 'dark'
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    const isDark = mapTheme === 'dark';

    const themeStyles = {
        '--pop-bg': isDark ? '#1e293b' : '#ffffff',
        '--pop-text': isDark ? '#f1f5f9' : '#1e293b',
        '--pop-border': isDark ? '#334155' : '#e2e8f0',
        '--pop-subtext': isDark ? '#94a3b8' : '#64748b',
        '--pop-shadow': isDark
            ? '0 10px 25px rgba(0,0,0,0.5)'
            : '0 10px 25px rgba(0,0,0,0.1)',
        '--map-bg': isDark ? '#0f172a' : '#f8fafc',
    } as React.CSSProperties;

    return (
        <div className="relative w-full h-full" style={themeStyles}>
            {/* Theme Toggle Button */}
            <button
                onClick={toggleMapTheme}
                className={`absolute top-4 right-14 z-[1000] p-2.5 rounded-full shadow-lg transition-all duration-300
                    ${mapTheme === 'dark'
                        ? 'bg-slate-800 text-yellow-400 border border-slate-700 hover:bg-slate-700'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                title={`Cambiar a modo ${mapTheme === 'dark' ? 'claro' : 'oscuro'}`}
            >
                {mapTheme === 'dark' ? (
                    <Sun className="w-5 h-5 animate-fade-in" />
                ) : (
                    <Moon className="w-5 h-5 animate-fade-in" />
                )}
            </button>

            <MapContainer
                center={VENEZUELA_CENTER}
                zoom={DEFAULT_ZOOM}
                minZoom={6.5}
                zoomControl={false}
                className="w-full h-full"
                style={{ background: mapTheme === 'dark' ? '#0f172a' : '#f8fafc' }}
            >
                <TileLayer
                    url={tileUrl}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    subdomains="abcd"
                    maxZoom={20}
                />

                <ZoomControl position="topright" />
                <FeriaMarkerLayer />
            </MapContainer>

            <MapLegend />
        </div>
    );
}
