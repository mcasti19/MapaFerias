import { z } from 'zod';
import { ESTADOS_VENEZUELA, TIPOS_FERIA } from '@/types/constants';

export const feriaSchema = z
    .object({
        nombre: z
            .string()
            .min(3, 'El nombre debe tener al menos 3 caracteres')
            .max(100, 'El nombre no puede superar 100 caracteres'),
        estado: z.enum(ESTADOS_VENEZUELA, {
            errorMap: () => ({ message: 'Seleccione un estado válido' }),
        }),
        tipoFeria: z.enum(TIPOS_FERIA, {
            errorMap: () => ({ message: 'Seleccione un tipo de feria válido' }),
        }),
        lat: z
            .number({ invalid_type_error: 'Ingrese una latitud válida' })
            .min(-90, 'Latitud mínima: -90')
            .max(90, 'Latitud máxima: 90'),
        lng: z
            .number({ invalid_type_error: 'Ingrese una longitud válida' })
            .min(-180, 'Longitud mínima: -180')
            .max(180, 'Longitud máxima: 180'),
        fechaInicio: z.string().min(1, 'La fecha de inicio es requerida'),
        fechaFin: z.string().min(1, 'La fecha de fin es requerida'),
    })
    .refine((data) => data.fechaFin >= data.fechaInicio, {
        message: 'La fecha de fin debe ser igual o posterior a la de inicio',
        path: [ 'fechaFin' ],
    });

export type FeriaSchemaType = z.infer<typeof feriaSchema>;
