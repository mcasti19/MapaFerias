import { Feria } from '@/types';
import { format, subDays, addDays, addMonths } from 'date-fns';

const today = new Date();
const todayStr = (d: Date) => format(d, 'yyyy-MM-dd');

// Helper to build ISO date strings
const iso = (d: Date) => d.toISOString();

// --- 5 FERIAS ACTIVAS (today falls within range) ---
const FERIAS_ACTIVAS: Feria[] = [
    {
        id: 'f001-activa-dc',
        nombre: 'Feria Mercal Parroquia Catedral',
        lat: 10.4806,
        lng: -66.9036,
        estado: 'Distrito Capital',
        tipoFeria: 'Integral',
        fechaInicio: iso(subDays(today, 2)),
        fechaFin: iso(addDays(today, 3)),
    },
    {
        id: 'f002-activa-dc',
        nombre: 'Feria de Víveres El Silencio',
        lat: 10.4884,
        lng: -66.9144,
        estado: 'Distrito Capital',
        tipoFeria: 'Víveres',
        fechaInicio: iso(subDays(today, 1)),
        fechaFin: iso(addDays(today, 4)),
    },
    {
        id: 'f003-activa-miranda',
        nombre: 'Feria Proteínica Los Teques',
        lat: 10.3450,
        lng: -67.0394,
        estado: 'Miranda',
        tipoFeria: 'Proteína',
        fechaInicio: iso(subDays(today, 3)),
        fechaFin: iso(addDays(today, 2)),
    },
    {
        id: 'f004-activa-carabobo',
        nombre: 'Feria Hortalizas Valencia Centro',
        lat: 10.1620,
        lng: -67.9940,
        estado: 'Carabobo',
        tipoFeria: 'Hortalizas',
        fechaInicio: iso(subDays(today, 1)),
        fechaFin: iso(addDays(today, 5)),
    },
    {
        id: 'f005-activa-zulia',
        nombre: 'Gran Feria Integral Maracaibo Sur',
        lat: 10.6344,
        lng: -71.6266,
        estado: 'Zulia',
        tipoFeria: 'Integral',
        fechaInicio: iso(subDays(today, 4)),
        fechaFin: iso(addDays(today, 1)),
    },
];

// --- 5 FERIAS HISTÓRICAS (already finished) ---
const FERIAS_HISTORICAS: Feria[] = [
    {
        id: 'f006-hist-aragua',
        nombre: 'Feria Víveres Maracay Histórico',
        lat: 10.2469,
        lng: -67.5957,
        estado: 'Aragua',
        tipoFeria: 'Víveres',
        fechaInicio: iso(subDays(today, 30)),
        fechaFin: iso(subDays(today, 25)),
    },
    {
        id: 'f007-hist-dc',
        nombre: 'Feria Proteína La Pastora',
        lat: 10.5072,
        lng: -66.8990,
        estado: 'Distrito Capital',
        tipoFeria: 'Proteína',
        fechaInicio: iso(subDays(today, 20)),
        fechaFin: iso(subDays(today, 16)),
    },
    {
        id: 'f008-hist-miranda',
        nombre: 'Feria Hortalizas Guarenas',
        lat: 10.4779,
        lng: -66.5451,
        estado: 'Miranda',
        tipoFeria: 'Hortalizas',
        fechaInicio: iso(subDays(today, 45)),
        fechaFin: iso(subDays(today, 40)),
    },
    {
        id: 'f009-hist-zulia',
        nombre: 'Feria Integral Cabimas',
        lat: 10.3936,
        lng: -71.4530,
        estado: 'Zulia',
        tipoFeria: 'Integral',
        fechaInicio: iso(subDays(today, 60)),
        fechaFin: iso(subDays(today, 55)),
    },
    {
        id: 'f010-hist-carabobo',
        nombre: 'Feria Víveres Naguanagua',
        lat: 10.2292,
        lng: -68.0005,
        estado: 'Carabobo',
        tipoFeria: 'Víveres',
        fechaInicio: iso(subDays(today, 15)),
        fechaFin: iso(subDays(today, 10)),
    },
];

// --- 5 FERIAS FUTURAS / PROGRAMADAS (next month) ---
const FERIAS_FUTURAS: Feria[] = [
    {
        id: 'f011-fut-aragua',
        nombre: 'Gran Feria Proteínica Aragua',
        lat: 10.2800,
        lng: -67.5700,
        estado: 'Aragua',
        tipoFeria: 'Proteína',
        fechaInicio: iso(addMonths(today, 1)),
        fechaFin: iso(addDays(addMonths(today, 1), 5)),
    },
    {
        id: 'f012-fut-miranda',
        nombre: 'Feria Integral Petare Norte',
        lat: 10.4900,
        lng: -66.8043,
        estado: 'Miranda',
        tipoFeria: 'Integral',
        fechaInicio: iso(addDays(addMonths(today, 1), 3)),
        fechaFin: iso(addDays(addMonths(today, 1), 8)),
    },
    {
        id: 'f013-fut-dc',
        nombre: 'Feria Hortalizas Coche',
        lat: 10.4600,
        lng: -66.9200,
        estado: 'Distrito Capital',
        tipoFeria: 'Hortalizas',
        fechaInicio: iso(addDays(addMonths(today, 1), 7)),
        fechaFin: iso(addDays(addMonths(today, 1), 12)),
    },
    {
        id: 'f014-fut-zulia',
        nombre: 'Feria Víveres San Francisco',
        lat: 10.5938,
        lng: -71.6500,
        estado: 'Zulia',
        tipoFeria: 'Víveres',
        fechaInicio: iso(addDays(addMonths(today, 1), 2)),
        fechaFin: iso(addDays(addMonths(today, 1), 7)),
    },
    {
        id: 'f015-fut-carabobo',
        nombre: 'Feria Integral Puerto Cabello',
        lat: 10.4724,
        lng: -68.0120,
        estado: 'Carabobo',
        tipoFeria: 'Integral',
        fechaInicio: iso(addDays(addMonths(today, 1), 10)),
        fechaFin: iso(addDays(addMonths(today, 1), 15)),
    },
];

// Today display for debugging
export const _todayDisplay = todayStr(today);

export const FERIAS_MOCK: Feria[] = [
    ...FERIAS_ACTIVAS,
    ...FERIAS_HISTORICAS,
    ...FERIAS_FUTURAS,
];
