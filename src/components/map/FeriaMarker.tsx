import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { MapPin, Calendar, Tag, Hash } from 'lucide-react'; // Iconos modernos
import { Feria } from '@/types';
import { getFeriaStatus, getMarkerColor, getStatusLabel } from '@/lib/feriaUtils';

interface FeriaMarkerProps {
  feria: Feria;
}

// Mantenemos la creación del icono ya que Leaflet requiere una instancia de L.DivIcon
function createIcon(color: string): L.DivIcon {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${color}" flood-opacity="0.5"/>
      </filter>
      <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 26 16 26S32 26 32 16C32 7.163 24.837 0 16 0z"
        fill="${color}" filter="url(#shadow)"/>
      <circle cx="16" cy="16" r="7" fill="white" opacity="0.92"/>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [ 32, 42 ],
    iconAnchor: [ 16, 42 ],
    popupAnchor: [ 0, -44 ],
  });
}

const TIPO_EMOJI: Record<string, string> = {
  'Proteína': '🥩',
  'Víveres': '🛒',
  'Hortalizas': '🥦',
  'Integral': '🌿',
};

/**
 * Componente Visual del Contenido del Popup
 */
const FeriaPopupContent = ({ feria }: { feria: Feria }) => {
  const status = getFeriaStatus(feria);
  const tipoEmoji = TIPO_EMOJI[ feria.tipoFeria ] ?? '📍';

  const formatDate = (iso: string) =>
    format(parseISO(iso), 'd MMM yyyy', { locale: es });

  // Mapeo de estilos de Tailwind para los badges según status
  const statusStyles = {
    activa: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border-green-200 dark:border-green-800',
    programada: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
    historica: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };

  const currentStatusStyle = statusStyles[ status as keyof typeof statusStyles ] || statusStyles.historica;

  return (
    <div className="min-width-[260px] max-w-[320px] p-1 antialiased text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="text-2xl bg-slate-100 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 flex-shrink-0">
          {tipoEmoji}
        </div>
        <div>
          <h3 className="text-base font-bold leading-tight m-0 text-slate-900 dark:text-white">
            {feria.nombre}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
            <MapPin size={14} className="opacity-70" /> {feria.estado}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border ${currentStatusStyle}`}>
          {getStatusLabel(status)}
        </span>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
          <Tag size={12} /> {feria.tipoFeria}
        </span>
      </div>

      {/* Info Box */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 text-xs font-medium">
          <Calendar size={14} className="text-blue-500" />
          <span>{formatDate(feria.fechaInicio)} — {formatDate(feria.fechaFin)}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px]">
          <Hash size={14} className="opacity-50" />
          <span className="font-mono">{feria.lat.toFixed(5)}, {feria.lng.toFixed(5)}</span>
        </div>
      </div>
    </div>
  );
};

export default function FeriaMarker({ feria }: FeriaMarkerProps) {
  const status = getFeriaStatus(feria);
  const color = getMarkerColor(status);
  const icon = createIcon(color);

  return (
    <Marker position={[ feria.lat, feria.lng ]} icon={icon}>
      <Popup className="custom-feria-popup">
        <FeriaPopupContent feria={feria} />
      </Popup>
    </Marker>
  );
}



// import L from 'leaflet';
// import { Marker, Popup } from 'react-leaflet';
// import { format, parseISO } from 'date-fns';
// import { es } from 'date-fns/locale';
// import { Feria } from '@/types';
// import { getFeriaStatus, getMarkerColor, getStatusLabel } from '@/lib/feriaUtils';

// interface FeriaMarkerProps {
//   feria: Feria;
// }

// function createIcon(color: string): L.DivIcon {
//   const svg = `
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
//       <defs>
//         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
//           <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${color}" flood-opacity="0.5"/>
//         </filter>
//       </defs>
//       <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 26 16 26S32 26 32 16C32 7.163 24.837 0 16 0z"
//         fill="${color}" filter="url(#shadow)"/>
//       <circle cx="16" cy="16" r="7" fill="white" opacity="0.92"/>
//     </svg>
//   `;

//   return L.divIcon({
//     html: svg,
//     className: '',
//     iconSize: [ 32, 42 ],
//     iconAnchor: [ 16, 42 ],
//     popupAnchor: [ 0, -44 ],
//   });
// }

// const STATUS_BADGE_STYLES: Record<string, string> = {
//   activa: 'background:#166534;color:#bbf7d0;',
//   programada: 'background:#713f12;color:#fef08a;',
//   historica: 'background:#1e293b;color:#94a3b8;',
// };

// const TIPO_EMOJI: Record<string, string> = {
//   'Proteína': '🥩',
//   'Víveres': '🛒',
//   'Hortalizas': '🥦',
//   'Integral': '🌿',
// };

// export default function FeriaMarker({ feria }: FeriaMarkerProps) {
//   const status = getFeriaStatus(feria);
//   const color = getMarkerColor(status);
//   const icon = createIcon(color);

//   const formatDate = (iso: string) =>
//     format(parseISO(iso), 'd MMM yyyy', { locale: es });

//   const badgeStyle = STATUS_BADGE_STYLES[ status ] ?? STATUS_BADGE_STYLES.historica;
//   const tipoEmoji = TIPO_EMOJI[ feria.tipoFeria ] ?? '📍';

//   const colors = {
//     title: '#f8fafc', // Default to dark theme as base
//     text: '#94a3b8',
//     subtext: '#64748b',
//     border: '#334155',
//     innerBg: '#0f172a',
//   };

//   const popupHtml = `
//     <div style="min-width:260px; max-width:320px; font-family:'Inter',system-ui,sans-serif;">
//       <!-- Header -->
//       <div style="display:flex; align-items:flex-start; gap:12px; margin-bottom:12px;">
//         <div style="font-size:24px; background:${colors.innerBg}; padding:8px; border-radius:12px; border:1px solid ${colors.border}; line-height:1;">
//           ${tipoEmoji}
//         </div>
//         <div style="padding-top:2px;">
//           <h3 style="font-size:16px; font-weight:700; color:${colors.title}; margin:0; line-height:1.2;">
//             ${feria.nombre}
//           </h3>
//           <p style="font-size:13px; color:${colors.text}; margin:4px 0 0; display:flex; align-items:center; gap:4px;">
//             <span style="opacity:0.7;">📍</span> ${feria.estado}
//           </p>
//         </div>
//       </div>

//       <!-- Badges -->
//       <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px;">
//         <span style="font-size:12px; font-weight:700; padding:4px 10px; border-radius:8px; text-transform:uppercase; letter-spacing:0.02em; ${badgeStyle}">
//           ${getStatusLabel(status)}
//         </span>
//         <span style="font-size:12px; font-weight:600; color:${colors.text}; padding:4px 10px; background:${colors.innerBg}; border-radius:8px; border:1px solid ${colors.border};">
//           ${feria.tipoFeria}
//         </span>
//       </div>

//       <!-- Info Box -->
//       <div style="background:${colors.innerBg}; border-radius:12px; padding:12px; border:1px solid ${colors.border}; display:flex; flex-direction:column; gap:8px;">
//         <div style="display:flex; align-items:center; gap:8px; color:${colors.title}; font-size:13px; font-weight:500;">
//           <span style="font-size:14px;">📅</span>
//           <span>${formatDate(feria.fechaInicio)} — ${formatDate(feria.fechaFin)}</span>
//         </div>
//         <div style="display:flex; align-items:center; gap:8px; color:${colors.subtext}; font-size:12px;">
//           <span style="font-size:14px;">�️</span>
//           <span style="font-family:monospace; letter-spacing:-0.01em;">${feria.lat.toFixed(5)}, ${feria.lng.toFixed(5)}</span>
//         </div>
//       </div>
//     </div>
//   `;

//   return (
//     <Marker position={[ feria.lat, feria.lng ]} icon={icon}>
//       <Popup>
//         <div dangerouslySetInnerHTML={{ __html: popupHtml }} />
//       </Popup>
//     </Marker>
//   );
// }
