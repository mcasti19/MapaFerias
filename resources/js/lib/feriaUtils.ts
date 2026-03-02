import { isAfter, isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Feria, FeriaStatus } from '@/types';

/**
 * Determines the status of a feria based on current date.
 *
 * Logic order:
 *  1. If start is in the future → 'programada'
 *  2. If end is in the past     → 'historica'
 *  3. Otherwise (today falls within the range, or starts/ends today) → 'activa'
 */
export function getFeriaStatus(feria: Feria): FeriaStatus {
    const now = new Date();
    const start = startOfDay(parseISO(feria.fechaInicio));
    const end = endOfDay(parseISO(feria.fechaFin));

    if (isAfter(start, endOfDay(now))) return 'programada';
    if (isBefore(end, startOfDay(now))) return 'historica';
    return 'activa';
}

/**
 * Returns the marker color hex for a given status.
 */
export function getMarkerColor(status: FeriaStatus): string {
    switch (status) {
        case 'activa':
            return '#16a34a'; // green-600
        case 'programada':
            return '#ca8a04'; // yellow-600
        case 'historica':
            return '#6b7280'; // gray-500
    }
}

/**
 * Returns the tailwind text-color class for a given status.
 */
export function getStatusLabel(status: FeriaStatus): string {
    switch (status) {
        case 'activa':
            return 'Activa';
        case 'programada':
            return 'Programada';
        case 'historica':
            return 'Histórica';
    }
}
