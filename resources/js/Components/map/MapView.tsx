import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { useThemeStore } from '@/store/themeStore';
import FeriaMarkerLayer from './FeriaMarkerLayer';
import MapLegend from './MapLegend';

// Venezuela center coordinates
const VENEZUELA_CENTER: [ number, number ] = [ 7.0, -66.5 ];
const DEFAULT_ZOOM = 6;

export default function MapView() {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    const tileUrl = isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

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
            <MapContainer
                center={VENEZUELA_CENTER}
                zoom={DEFAULT_ZOOM}
                minZoom={6}
                zoomControl={false}
                className="w-full h-full z-0"
                style={{ background: isDark ? '#0f172a' : '#f8fafc' }}
                scrollWheelZoom={true}
                dragging={true}
                touchZoom={true}
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
