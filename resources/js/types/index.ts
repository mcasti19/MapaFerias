// Types for ferias application

export type FeriaStatus = 'activa' | 'programada' | 'historica';

export type FeriaTipo = 'Proteína' | 'Víveres' | 'Hortalizas' | 'Integral';

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
    compliance: string;
    observations: string;

    // Mantenemos estos campos visuales para compatibilidad
    tipoFeria: FeriaTipo;
    fechaInicio: string; // ISO string
    fechaFin: string;    // ISO string
}

export interface FilterState {
    estado: EstadoVenezuela | '';
    tipoFeria: FeriaTipo | '';
    estatus: FeriaStatus[];
    fechaDesde: string;
    fechaHasta: string;
    busqueda: string;
}

export interface FeriaFormData {
    nombre: string;
    estado: EstadoVenezuela;
    tipoFeria: FeriaTipo;
    lat: number;
    lng: number;
    fechaInicio: string;
    fechaFin: string;
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
