/**
 * Data types and mock data for the Cumplimiento module.
 *
 * The columns match the shared image:
 * Estados | FERIAS (Planificadas, Emblemáticas, Punto de Distribución, Total)
 * | Toneladas Despachadas | COMUNIDAD/CLAP/INSTITUCIÓN (Planificados, Atendidos, Sin Atender)
 * | BENEFICIARIOS (Familias, Personas, Combos) | No Realizados | % de Cumplimiento | Observaciones
 */

export interface CumplimientoEstado {
    id: string;
    estado_id: string;
    nombre_estado: string;

    // FERIAS
    ferias_planificadas: number;
    ferias_emblematicas: number;
    ferias_punto_distribucion: number;
    ferias_realizadas_total: number; // Computed or manual

    // TONELADAS
    toneladas_despachadas: number;

    // COMUNIDAD/CLAP/INSTITUCIÓN
    comunidad_planificados: number;
    comunidad_atendidos: number;
    comunidad_sin_atender: number; // Computed: planificados - atendidos

    // BENEFICIARIOS
    beneficiarios_familias: number;
    beneficiarios_personas: number;
    beneficiarios_combos: number;

    // Extra
    no_realizados: number;
    porcentaje_cumplimiento: number; // Percentage 0-100
    observaciones: string;
}

export interface CumplimientoGuardado {
    id: string;
    mes: string;
    jornada: number;
    anio: number;
    estados: CumplimientoEstado[];
    createdAt: string;
    updatedAt: string;
}

/** All 25 states template for blank cumplimiento */
export const CUMPLIMIENTO_ESTADOS_TEMPLATE: CumplimientoEstado[] = [
    { id: 'amazonas', estado_id: 'AMZ', nombre_estado: 'AMAZONAS', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'anzoategui', estado_id: 'ANZ', nombre_estado: 'ANZOATEGUI', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'apure', estado_id: 'APU', nombre_estado: 'APURE', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'aragua', estado_id: 'ARA', nombre_estado: 'ARAGUA', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'barinas', estado_id: 'BAR', nombre_estado: 'BARINAS', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'bolivar', estado_id: 'BOL', nombre_estado: 'BOLIVAR', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'carabobo', estado_id: 'CAR', nombre_estado: 'CARABOBO', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'cojedes', estado_id: 'COJ', nombre_estado: 'COJEDES', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'delta-amacuro', estado_id: 'DEL', nombre_estado: 'DELTA AMACURO', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'distrito-capital', estado_id: 'DIS', nombre_estado: 'DISTRITO CAPITAL', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'falcon', estado_id: 'FAL', nombre_estado: 'FALCON', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'guarico', estado_id: 'GUA', nombre_estado: 'GUARICO', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'la-guaira', estado_id: 'LAG', nombre_estado: 'LA GUAIRA', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'lara', estado_id: 'LAR', nombre_estado: 'LARA', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'merida', estado_id: 'MER', nombre_estado: 'MERIDA', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'miranda', estado_id: 'MIR', nombre_estado: 'MIRANDA', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'monagas', estado_id: 'MON', nombre_estado: 'MONAGAS', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'nueva-esparta', estado_id: 'NUE', nombre_estado: 'NUEVA ESPARTA', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'portuguesa', estado_id: 'POR', nombre_estado: 'PORTUGUESA', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'sucre', estado_id: 'SUC', nombre_estado: 'SUCRE', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'tachira', estado_id: 'TAC', nombre_estado: 'TACHIRA', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'trujillo', estado_id: 'TRU', nombre_estado: 'TRUJILLO', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'yaracuy', estado_id: 'YAR', nombre_estado: 'YARACUY', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'zulia', estado_id: 'ZUL', nombre_estado: 'ZULIA', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
    { id: 'esequibo', estado_id: 'ESE', nombre_estado: 'ESEQUIBO', ferias_planificadas: 0, ferias_emblematicas: 0, ferias_punto_distribucion: 0, ferias_realizadas_total: 0, toneladas_despachadas: 0, comunidad_planificados: 0, comunidad_atendidos: 0, comunidad_sin_atender: 0, beneficiarios_familias: 0, beneficiarios_personas: 0, beneficiarios_combos: 0, no_realizados: 0, porcentaje_cumplimiento: 0, observaciones: '' },
];
