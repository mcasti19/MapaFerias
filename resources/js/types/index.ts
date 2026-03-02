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
    id: string;
    nombre: string;
    lat: number;
    lng: number;
    estado: EstadoVenezuela;
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
