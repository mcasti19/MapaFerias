import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, MapPin, Save, AlertCircle } from 'lucide-react';
import { feriaSchema, FeriaSchemaType } from '@/lib/feriaSchema';
import { useFeriasStore } from '@/store/feriasStore';
import { ESTADOS_VENEZUELA, TIPOS_FERIA } from '@/types/constants';
import { Feria } from '@/types';

interface RegisterFeriaModalProps {
    onClose: () => void;
}

interface FieldProps {
    label: string;
    error?: string;
    children: React.ReactNode;
}

function FormField({ label, error, children }: FieldProps) {
    return (
        <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                {label}
            </label>
            {children}
            {error && (
                <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 text-red-500 dark:text-red-400 shrink-0" />
                    <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
                </div>
            )}
        </div>
    );
}

const inputClass =
    'w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white ' +
    'placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 ' +
    'transition-all shadow-sm dark:shadow-none';

const selectClass = inputClass + ' appearance-none cursor-pointer';

export default function RegisterFeriaModal({ onClose }: RegisterFeriaModalProps) {
    const addFeria = useFeriasStore((s) => s.addFeria);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FeriaSchemaType>({
        resolver: zodResolver(feriaSchema),
        defaultValues: {
            lat: undefined,
            lng: undefined,
        },
    });

    const onSubmit = (data: FeriaSchemaType) => {
        const newFeria: Feria = {
            id_feria: `feria-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            estado: data.estado,
            municipio: data.municipio,
            parroquia: data.parroquia,
            sector: data.sector,
            mission_base: data.mission_base || 'No Aplica',
            clap: data.clap || 'No Aplica',
            circuit: data.circuit || 'No Aplica',
            coordinates: {
                lat: data.lat,
                lng: data.lng,
            },
            full_name: data.full_name,
            cedula: data.cedula,
            phone: data.phone,
            compliance: data.compliance ?? false,
            observations: data.observations || '',
            tipoFeria: data.tipoFeria,
            fechaInicio: new Date(data.fechaInicio).toISOString(),
        };
        addFeria(newFeria);
        onClose();
    };

    return (
        <div className="fixed modern-scrollbar inset-0 z-1001 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-2xl
          w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto transform transition-all flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60 px-6 py-4 flex items-center justify-between z-10 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-500/30">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-slate-900 dark:text-white">Registrar Nueva Feria</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Complete todos los requerimientos operativos</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-6 flex-1 overflow-y-auto">

                    {/* Sección: Ubicación Geográfica */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                            1. Ubicación Geográfica
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Estado" error={errors.estado?.message}>
                                <select {...register('estado')} className={selectClass}>
                                    <option value="">Seleccionar...</option>
                                    {ESTADOS_VENEZUELA.map((e) => (
                                        <option key={e} value={e}>{e}</option>
                                    ))}
                                </select>
                            </FormField>
                            <FormField label="Municipio" error={errors.municipio?.message}>
                                <input {...register('municipio')} type="text" placeholder="Ej: Libertador" className={inputClass} />
                            </FormField>
                            <FormField label="Parroquia" error={errors.parroquia?.message}>
                                <input {...register('parroquia')} type="text" placeholder="Ej: Sucre" className={inputClass} />
                            </FormField>
                            <FormField label="Sector / Comunidad" error={errors.sector?.message}>
                                <input {...register('sector')} type="text" placeholder="Ej: Casco Histórico" className={inputClass} />
                            </FormField>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                                    Coordenadas Exactas
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <FormField label="" error={errors.lat?.message}>
                                        <input {...register('lat', { valueAsNumber: true })} type="number" step="any" placeholder="Latitud" className={inputClass} />
                                    </FormField>
                                    <FormField label="" error={errors.lng?.message}>
                                        <input {...register('lng', { valueAsNumber: true })} type="number" step="any" placeholder="Longitud" className={inputClass} />
                                    </FormField>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección: Organización Comunal */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                            2. Organización Comunal
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField label="Base de Misiones" error={errors.mission_base?.message}>
                                <input {...register('mission_base')} type="text" placeholder="Opcional" className={inputClass} />
                            </FormField>
                            <FormField label="CLAP" error={errors.clap?.message}>
                                <input {...register('clap')} type="text" placeholder="Opcional" className={inputClass} />
                            </FormField>
                            <FormField label="Circuito Comunal" error={errors.circuit?.message}>
                                <input {...register('circuit')} type="text" placeholder="Opcional" className={inputClass} />
                            </FormField>
                        </div>
                    </div>

                    {/* Sección: Responsable */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                            3. Responsable Principal
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField label="Nombre Completo" error={errors.full_name?.message}>
                                <input {...register('full_name')} type="text" placeholder="Nombre Apellido" className={inputClass} />
                            </FormField>
                            <FormField label="Cédula" error={errors.cedula?.message}>
                                <input {...register('cedula')} type="text" placeholder="V-12345678" className={inputClass} />
                            </FormField>
                            <FormField label="Teléfono" error={errors.phone?.message}>
                                <input {...register('phone')} type="text" placeholder="0412-1234567" className={inputClass} />
                            </FormField>
                        </div>
                    </div>

                    {/* Sección: Operatividad */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                            4. Detalles Operativos
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Tipo de Feria" error={errors.tipoFeria?.message}>
                                <select {...register('tipoFeria')} className={selectClass}>
                                    <option value="">Seleccionar...</option>
                                    {TIPOS_FERIA.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </FormField>
                            <FormField label="¿Se Ejecutó Exitosamente?" error={errors.compliance?.message}>
                                <select {...register('compliance', { setValueAs: (v) => v === 'true' })} className={selectClass}>
                                    <option value="false">No (Por Ejecutar / No Ejecutada)</option>
                                    <option value="true">Sí (Ejecutada)</option>
                                </select>
                            </FormField>
                            <FormField label="Fecha Inicio" error={errors.fechaInicio?.message}>
                                <input {...register('fechaInicio')} type="date" className={inputClass} />
                            </FormField>
                            <div className="md:col-span-2">
                                <FormField label="Observaciones" error={errors.observations?.message}>
                                    <textarea {...register('observations')} rows={2} placeholder="Opcional..." className={`${inputClass} resize-none`} />
                                </FormField>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="sticky bottom-0 bg-white dark:bg-slate-800 pt-4 border-t border-slate-200 dark:border-slate-700/60 mt-6 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold
                hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 item-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 dark:bg-linear-to-r dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-400 text-white transition-all shadow-md shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex"
                        >
                            <Save className="w-4 h-4" />
                            Guardar Feria
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
