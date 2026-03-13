import { z } from 'zod';
import { ESTADOS_VENEZUELA, TIPOS_FERIA } from '@/types/constants';

export const feriaSchema = z
    .object({
        estado: z.enum(ESTADOS_VENEZUELA, {
            errorMap: () => ({ message: 'Seleccione un estado válido' }),
        }).or(z.string().min(1, 'El estado es requerido')),
        municipio: z.string().min(2, 'Especifique el municipio'),
        parroquia: z.string().min(2, 'Especifique la parroquia'),
        sector: z.string().min(2, 'El sector es requerido').max(150, 'Máximo 150 caracteres'),
        mission_base: z.string().optional(),
        clap: z.string().optional(),
        circuit: z.string().optional(),

        lat: z
            .number({ invalid_type_error: 'Ingrese una latitud válida' })
            .min(-90, 'Latitud mínima: -90')
            .max(90, 'Latitud máxima: 90'),
        lng: z
            .number({ invalid_type_error: 'Ingrese una longitud válida' })
            .min(-180, 'Longitud mínima: -180')
            .max(180, 'Longitud máxima: 180'),

        full_name: z.string().min(3, 'El nombre responsable es requerido').max(100),
        cedula: z.string().min(5, 'Cédula inválida'),
        phone: z.string().min(10, 'Teléfono inválido'),
        compliance: z.boolean().optional().default(false),
        observations: z.string().optional(),

        tipoFeria: z.enum(TIPOS_FERIA, {
            errorMap: () => ({ message: 'Seleccione un tipo de feria válido' }),
        }),
        fechaInicio: z.string().min(1, 'La fecha de inicio es requerida'),

        // Nuevos campos
        cantidadClap: z.number().min(0).optional(),
        cantidadFamilias: z.number().min(0).optional(),
        cantidadCombos: z.number().min(0).optional(),
        rubros: z.array(z.object({
            nombre: z.string(),
            habilitado: z.boolean(),
            toneladas: z.number().min(0)
        })).optional(),
        toneladasTotales: z.number().min(0).optional(),
    });

export type FeriaSchemaType = z.infer<typeof feriaSchema>;
