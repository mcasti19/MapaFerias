export interface PlanificacionEstado {
    id: string; // usually state name in lowercase without spaces or accents
    estado_id: string; // identifier
    nombre_estado: string; // Exact Display Name
    emblematicas: number;
    puntos_distribucion: number;
    clap: number;
    familias: number;
    observaciones: string;
}

// Factor constants
export const TONELADAS_FACTOR = 0.002185; // Using a custom factor based on mock data images or adjusting to reach ~184,850 tones for 67,780 families = ~2.7 kg per family on average. Wait, in Image: Amazonas: 3836 familias, 8.383 toneladas. 8.383 / 3836 = 0.002185 tons/family.
export const PERSONAS_FACTOR = 4; // 1 familia = 4 personas

export const PLANIFICACION_MOCK: PlanificacionEstado[] = [
    {
        id: 'amazonas',
        estado_id: 'AMZ',
        nombre_estado: 'AMAZONAS',
        emblematicas: 2,
        puntos_distribucion: 0,
        clap: 5,
        familias: 3836,
        observaciones: ''
    },
    {
        id: 'anzoategui',
        estado_id: 'ANZ',
        nombre_estado: 'ANZOATEGUI',
        emblematicas: 5,
        puntos_distribucion: 0,
        clap: 67,
        familias: 18489,
        observaciones: ''
    },
    {
        id: 'apure',
        estado_id: 'APU',
        nombre_estado: 'APURE',
        emblematicas: 0,
        puntos_distribucion: 0,
        clap: 0,
        familias: 0,
        observaciones: 'SIN INVENTARIOS'
    },
    {
        id: 'aragua',
        estado_id: 'ARA',
        nombre_estado: 'ARAGUA',
        emblematicas: 1,
        puntos_distribucion: 0,
        clap: 1,
        familias: 738,
        observaciones: ''
    },
    {
        id: 'barinas',
        estado_id: 'BAR',
        nombre_estado: 'BARINAS',
        emblematicas: 2,
        puntos_distribucion: 0,
        clap: 10,
        familias: 1997,
        observaciones: ''
    },
    {
        id: 'bolivar',
        estado_id: 'BOL',
        nombre_estado: 'BOLIVAR',
        emblematicas: 0,
        puntos_distribucion: 0,
        clap: 0,
        familias: 0,
        observaciones: 'SIN INVENTARIOS'
    },
    {
        id: 'carabobo',
        estado_id: 'CAR',
        nombre_estado: 'CARABOBO',
        emblematicas: 2,
        puntos_distribucion: 0,
        clap: 7,
        familias: 2111,
        observaciones: ''
    },
    {
        id: 'cojedes',
        estado_id: 'COJ',
        nombre_estado: 'COJEDES',
        emblematicas: 5,
        puntos_distribucion: 0,
        clap: 5,
        familias: 662,
        observaciones: ''
    },
    {
        id: 'delta-amacuro',
        estado_id: 'DEL',
        nombre_estado: 'DELTA AMACURO',
        emblematicas: 0,
        puntos_distribucion: 0,
        clap: 0,
        familias: 0,
        observaciones: 'SIN ASIGNACION PARA ESTA SEMANA'
    },
    {
        id: 'distrito-capital',
        estado_id: 'DIS',
        nombre_estado: 'DISTRITO CAPITAL',
        emblematicas: 8,
        puntos_distribucion: 0,
        clap: 20,
        familias: 8349,
        observaciones: ''
    },
    {
        id: 'falcon',
        estado_id: 'FAL',
        nombre_estado: 'FALCON',
        emblematicas: 0,
        puntos_distribucion: 0,
        clap: 0,
        familias: 0,
        observaciones: 'ESPERANDO INSTRUCCIONES DEL TERRITORIAL'
    },
    {
        id: 'guarico',
        estado_id: 'GUA',
        nombre_estado: 'GUARICO',
        emblematicas: 10,
        puntos_distribucion: 0,
        clap: 10,
        familias: 2304,
        observaciones: ''
    },
    {
        id: 'la-guaira',
        estado_id: 'LAG',
        nombre_estado: 'LA GUAIRA',
        emblematicas: 5,
        puntos_distribucion: 0,
        clap: 11,
        familias: 837,
        observaciones: ''
    },
    {
        id: 'lara',
        estado_id: 'LAR',
        nombre_estado: 'LARA',
        emblematicas: 7,
        puntos_distribucion: 0,
        clap: 7,
        familias: 5630,
        observaciones: ''
    },
    {
        id: 'merida',
        estado_id: 'MER',
        nombre_estado: 'MERIDA',
        emblematicas: 5,
        puntos_distribucion: 0,
        clap: 5,
        familias: 2096,
        observaciones: ''
    },
    {
        id: 'miranda',
        estado_id: 'MIR',
        nombre_estado: 'MIRANDA',
        emblematicas: 3,
        puntos_distribucion: 0,
        clap: 3,
        familias: 2651,
        observaciones: ''
    },
    {
        id: 'monagas',
        estado_id: 'MON',
        nombre_estado: 'MONAGAS',
        emblematicas: 0,
        puntos_distribucion: 0,
        clap: 0,
        familias: 0,
        observaciones: 'SIN INVENTARIOS'
    },
    {
        id: 'nueva-esparta',
        estado_id: 'NUE',
        nombre_estado: 'NUEVA ESPARTA',
        emblematicas: 5,
        puntos_distribucion: 0,
        clap: 5,
        familias: 1549,
        observaciones: ''
    },
    {
        id: 'portuguesa',
        estado_id: 'POR',
        nombre_estado: 'PORTUGUESA',
        emblematicas: 4,
        puntos_distribucion: 0,
        clap: 17,
        familias: 4326,
        observaciones: ''
    },
    {
        id: 'sucre',
        estado_id: 'SUC',
        nombre_estado: 'SUCRE',
        emblematicas: 0,
        puntos_distribucion: 0,
        clap: 0,
        familias: 0,
        observaciones: 'SIN INVENTARIOS'
    },
    {
        id: 'tachira',
        estado_id: 'TAC',
        nombre_estado: 'TACHIRA',
        emblematicas: 4,
        puntos_distribucion: 0,
        clap: 10,
        familias: 2630,
        observaciones: ''
    },
    {
        id: 'trujillo',
        estado_id: 'TRU',
        nombre_estado: 'TRUJILLO',
        emblematicas: 11,
        puntos_distribucion: 0,
        clap: 31,
        familias: 5400,
        observaciones: ''
    },
    {
        id: 'yaracuy',
        estado_id: 'YAR',
        nombre_estado: 'YARACUY',
        emblematicas: 2,
        puntos_distribucion: 0,
        clap: 2,
        familias: 1074,
        observaciones: ''
    },
    {
        id: 'zulia',
        estado_id: 'ZUL',
        nombre_estado: 'ZULIA',
        emblematicas: 2,
        puntos_distribucion: 0,
        clap: 14,
        familias: 3101,
        observaciones: ''
    },
    {
        id: 'esequibo',
        estado_id: 'ESE',
        nombre_estado: 'ESEQUIBO',
        emblematicas: 0,
        puntos_distribucion: 0,
        clap: 0,
        familias: 0,
        observaciones: ''
    }
];
