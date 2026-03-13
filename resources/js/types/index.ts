// Types for ferias application

export type FeriaStatus = 'En Proceso' | 'Por Ejecutar' | 'Ejecutada' | 'No ejecutada';

export type FeriaTipo = 'Proteína' | 'Víveres' | 'Hortalizas' | 'Integral';

export interface FeriaRubro {
    nombre: string;
    habilitado: boolean;
    toneladas: number;
}

export type EstadoVenezuela =
    | 'Distrito Capital'
    | 'Miranda'
    | 'Zulia'
    | 'Carabobo'
    | 'Aragua'
    | 'Anzoátegui'
    | 'Bolívar'
    | 'Lara'
    | 'Táchira'
    | 'Mérida'
    | 'Falcón'
    | 'Sucre'
    | 'Barinas'
    | 'Monagas'
    | 'Portuguesa'
    | 'Guárico'
    | 'Trujillo'
    | 'Yaracuy'
    | 'Apure'
    | 'Cojedes'
    | 'Delta Amacuro'
    | 'Nueva Esparta'
    | 'Vargas'
    | 'Amazonas';

export interface Feria {
    id_feria: string;
    estado: EstadoVenezuela | string; // Permitir string adicional por fallback
    municipio: string;
    parroquia: string;
    sector: string;
    mission_base: string;
    clap: string;
    circuit: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    full_name: string;
    cedula: string;
    phone: string;
    compliance: boolean;
    observations: string;

    // Mantenemos estos campos visuales para compatibilidad
    tipoFeria: FeriaTipo;
    fechaInicio: string; // ISO string

    // Jornada / Mes association
    mes?: string;       // e.g. 'Marzo'
    jornada?: number;   // 1-4
    anio?: number;      // e.g. 2026

    // Nuevos campos Atención Esperada y Rubros
    cantidadClap?: number;
    cantidadFamilias?: number;
    cantidadCombos?: number;
    rubros?: FeriaRubro[];
    toneladasTotales?: number;
}

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

export interface FilterState {
    estado: EstadoVenezuela | '';
    tipoFeria: FeriaTipo | '';
    estatus: FeriaStatus[];
    fechaDesde: string;
    fechaHasta: string;
    busqueda: string;
    mes: string;
    jornada: number[];
}

export interface FeriaFormData {
    nombre: string;
    estado: EstadoVenezuela;
    tipoFeria: FeriaTipo;
    lat: number;
    lng: number;
    fechaInicio: string;
}

// Laravel Breeze and Inertia specific types
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
