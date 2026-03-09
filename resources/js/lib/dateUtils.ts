/**
 * Utility helpers for Mes / Jornada calculation.
 *
 * Jornada is determined by the day of the month:
 *   Days  1-7  → Jornada 1
 *   Days  8-14 → Jornada 2
 *   Days 15-21 → Jornada 3
 *   Days 22+   → Jornada 4
 */

export const MESES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
] as const;

export type MesNombre = typeof MESES[ number ];

export function getJornadaFromDay(day: number): number {
    if (day <= 7) return 1;
    if (day <= 14) return 2;
    if (day <= 21) return 3;
    return 4;
}

export function getCurrentMes(): MesNombre {
    return MESES[ new Date().getMonth() ];
}

export function getCurrentJornada(): number {
    return getJornadaFromDay(new Date().getDate());
}

export function getMesFromDate(date: Date | string): MesNombre {
    const d = typeof date === 'string' ? new Date(date) : date;
    return MESES[ d.getMonth() ];
}

export function getJornadaFromDate(date: Date | string): number {
    const d = typeof date === 'string' ? new Date(date) : date;
    return getJornadaFromDay(d.getDate());
}

export function getAnioFromDate(date: Date | string): number {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.getFullYear();
}

/** Returns the year for the current date */
export function getCurrentAnio(): number {
    return new Date().getFullYear();
}

/**
 * Checks if a selected Mes/Jornada/Anio combo is allowed to be saved.
 * Only the CURRENT jornada and the IMMEDIATE PREVIOUS jornada are allowed.
 */
export function isAllowedToSave(mes: string, jornada: number, anio: number): boolean {
    const currentMes = getCurrentMes();
    const currentJornada = getCurrentJornada();
    const currentAnio = getCurrentAnio();

    // Map month string to 0 index based on MESES array
    const targetMesIndex = MESES.indexOf(mes as any);
    const currentMesIndex = MESES.indexOf(currentMes as any);

    if (targetMesIndex === -1 || currentMesIndex === -1) return false;

    // Calculate an absolute index for simple arithmetic (4 jornadas per month)
    const targetAbs = anio * 48 + targetMesIndex * 4 + (jornada - 1);
    const currentAbs = currentAnio * 48 + currentMesIndex * 4 + (currentJornada - 1);

    // Can only save if target is exactly the current jornada or exactly the previous one.
    return targetAbs === currentAbs || targetAbs === currentAbs - 1;
}
