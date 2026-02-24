import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import { useShallow } from 'zustand/react/shallow';
import { useFeriasStore } from '@/store/feriasStore';
import { getFeriaStatus, getMarkerColor, getStatusLabel } from '@/lib/feriaUtils';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const TIPO_EMOJI: Record<string, string> = {
  'Proteína': '🥩',
  'Víveres': '🛒',
  'Hortalizas': '🥦',
  'Integral': '🌿',
};

const STATUS_BADGE_STYLES: Record<string, string> = {
  activa: 'background:#166534;color:#bbf7d0;',
  programada: 'background:#713f12;color:#fef08a;',
  historica: 'background:#1e293b;color:#94a3b8;',
};

function createIcon(color: string): L.DivIcon {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
    <defs>
      <filter id="sh-${color.replace('#', '')}">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${color}" flood-opacity="0.5"/>
      </filter>
    </defs>
    <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 26 16 26S32 26 32 16C32 7.163 24.837 0 16 0z"
      fill="${color}" filter="url(#sh-${color.replace('#', '')})"/>
    <circle cx="16" cy="16" r="7" fill="white" opacity="0.92"/>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [ 32, 42 ],
    iconAnchor: [ 16, 42 ],
    popupAnchor: [ 0, -44 ],
  });
}

export default function FeriaMarkerLayer() {
  const map = useMap();
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const ferias = useFeriasStore(useShallow((s) => s.filteredFerias()));
  const mapTheme = useFeriasStore((s) => s.mapTheme);
  const isDark = mapTheme === 'dark';

  useEffect(() => {
    // Remove existing cluster group
    if (clusterRef.current) {
      map.removeLayer(clusterRef.current);
    }

    // Create new cluster group
    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 60,
      iconCreateFunction: (c) => {
        const count = c.getChildCount();
        return L.divIcon({
          html: `<div style="
            width:40px;height:40px;border-radius:50%;
            background:rgba(22,163,74,0.75);
            border:2px solid rgba(22,163,74,0.9);
            display:flex;align-items:center;justify-content:center;
            color:white;font-weight:700;font-size:14px;
            box-shadow:0 0 12px rgba(22,163,74,0.5);
          ">${count}</div>`,
          className: '',
          iconSize: [ 40, 40 ],
          iconAnchor: [ 20, 20 ],
        });
      },
    });

    ferias.forEach((feria) => {
      const status = getFeriaStatus(feria);
      const color = getMarkerColor(status);
      const icon = createIcon(color);
      const tipoEmoji = TIPO_EMOJI[ feria.tipoFeria ] ?? '📍';
      const badgeStyle = STATUS_BADGE_STYLES[ status ];

      const formatDate = (iso: string) =>
        format(parseISO(iso), 'd MMM yyyy', { locale: es });

      const colors = {
        title: isDark ? '#f8fafc' : '#0f172a',
        text: isDark ? '#94a3b8' : '#475569',
        subtext: isDark ? '#64748b' : '#94a3b8',
        border: isDark ? '#334155' : '#e2e8f0',
        innerBg: isDark ? '#0f172a' : '#f1f5f9',
      };

      const popupHtml = `
        <div style="min-width:260px; max-width:320px; font-family:'Inter',system-ui,sans-serif;">
          <!-- Header -->
          <div style="display:flex; align-items:flex-start; gap:12px; margin-bottom:12px;">
            <div style="font-size:24px; background:${colors.innerBg}; padding:8px; border-radius:12px; border:1px solid ${colors.border}; line-height:1;">
              ${tipoEmoji}
            </div>
            <div style="padding-top:2px;">
              <h3 style="font-size:16px; font-weight:700; color:${colors.title}; margin:0; line-height:1.2;">
                ${feria.nombre}
              </h3>
              <p style="font-size:13px; color:${colors.text}; margin:4px 0 0; display:flex; align-items:center; gap:4px;">
                <span style="opacity:0.7;">📍</span> ${feria.estado}
              </p>
            </div>
          </div>

          <!-- Badges -->
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px;">
            <span style="font-size:12px; font-weight:700; padding:4px 10px; border-radius:8px; text-transform:uppercase; letter-spacing:0.02em; ${badgeStyle}">
              ${getStatusLabel(status)}
            </span>
            <span style="font-size:12px; font-weight:600; color:${colors.text}; padding:4px 10px; background:${colors.innerBg}; border-radius:8px; border:1px solid ${colors.border};">
              ${feria.tipoFeria}
            </span>
          </div>

          <!-- Info Box -->
          <div style="background:${colors.innerBg}; border-radius:12px; padding:12px; border:1px solid ${colors.border}; display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px; color:${colors.title}; font-size:13px; font-weight:500;">
              <span style="font-size:14px;">📅</span>
              <span>${formatDate(feria.fechaInicio)} — ${formatDate(feria.fechaFin)}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px; color:${colors.subtext}; font-size:12px;">
              <span style="font-size:14px;">🗺️</span>
              <span style="font-family:monospace; letter-spacing:-0.01em;">${feria.lat.toFixed(5)}, ${feria.lng.toFixed(5)}</span>
            </div>
          </div>
        </div>
      `;

      const marker = L.marker([ feria.lat, feria.lng ], { icon });
      marker.bindPopup(popupHtml, { maxWidth: 300 });
      cluster.addLayer(marker);
    });

    map.addLayer(cluster);
    clusterRef.current = cluster;

    return () => {
      if (clusterRef.current) {
        map.removeLayer(clusterRef.current);
      }
    };
  }, [ map, ferias ]);

  return null;
}
