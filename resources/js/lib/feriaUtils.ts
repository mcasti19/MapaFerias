import { isAfter, isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Feria, FeriaStatus } from '@/types';

/**
 * Determines the status of a feria based on current date.
 *
 * Logic order:
 *  1. If start is in the future → 'Por Ejecutar'
 *  2. If end is in the past → check compliance. If true → 'Ejecutada', else 'No ejecutada'
 *  3. Otherwise (today falls within the range) → 'En Proceso'
 */
export function getFeriaStatus(feria: Feria): FeriaStatus {
    const now = new Date();
    const start = startOfDay(parseISO(feria.fechaInicio));
    const end = endOfDay(parseISO(feria.fechaFin));

    if (isAfter(start, endOfDay(now))) return 'Por Ejecutar';
    if (isBefore(end, startOfDay(now))) {
        return feria.compliance ? 'Ejecutada' : 'No ejecutada';
    }
    return 'En Proceso';
}

/**
 * Returns the marker color hex for a given status.
 */
export function getMarkerColor(status: FeriaStatus): string {
    switch (status) {
        case 'En Proceso':
            return '#3b82f6'; // blue-500
        case 'Por Ejecutar':
            return '#ca8a04'; // yellow-600
        case 'Ejecutada':
            return '#16a34a'; // green-600
        case 'No ejecutada':
            return '#ef4444'; // red-500
    }
}

/**
 * Returns the tailwind text-color class for a given status.
 */
export function getStatusLabel(status: FeriaStatus): string {
    return status;
}

// Factor constants moved from planificacion.ts
export const TONELADAS_FACTOR = 0.002185;
export const PERSONAS_FACTOR = 4;

