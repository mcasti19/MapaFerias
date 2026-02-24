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
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                {label}
            </label>
            {children}
            {error && (
                <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                    <p className="text-xs text-red-400">{error}</p>
                </div>
            )}
        </div>
    );
}

const inputClass =
    'w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-sm text-white ' +
    'placeholder:text-slate-600 focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/30 ' +
    'transition-all';

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
            id: `feria-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            nombre: data.nombre,
            lat: data.lat,
            lng: data.lng,
            estado: data.estado,
            tipoFeria: data.tipoFeria,
            fechaInicio: new Date(data.fechaInicio).toISOString(),
            fechaFin: new Date(data.fechaFin).toISOString(),
        };
        addFeria(newFeria);
        onClose();
    };

    return (
        <div className="modal-backdrop animate-fade-in" onClick={onClose}>
            <div
                className="relative bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl
          w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto animate-slide-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-slate-900 border-b border-slate-700/60 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 shadow-lg shadow-green-900/40">
                            <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-white">Registrar Nueva Feria</h2>
                            <p className="text-xs text-slate-500">Complete todos los campos requeridos</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-white
              hover:bg-slate-800 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4">
                    {/* Nombre */}
                    <FormField label="Nombre de la Feria" error={errors.nombre?.message}>
                        <input
                            {...register('nombre')}
                            type="text"
                            placeholder="Ej: Feria Integral Catia"
                            className={inputClass}
                        />
                    </FormField>

                    {/* Estado + Tipo */}
                    <div className="grid grid-cols-2 gap-3">
                        <FormField label="Estado" error={errors.estado?.message}>
                            <select {...register('estado')} className={selectClass}>
                                <option value="">Seleccionar...</option>
                                {ESTADOS_VENEZUELA.map((e) => (
                                    <option key={e} value={e}>{e}</option>
                                ))}
                            </select>
                        </FormField>

                        <FormField label="Tipo de Feria" error={errors.tipoFeria?.message}>
                            <select {...register('tipoFeria')} className={selectClass}>
                                <option value="">Seleccionar...</option>
                                {TIPOS_FERIA.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </FormField>
                    </div>

                    {/* Coordinates */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                            Coordenadas
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <FormField label="" error={errors.lat?.message}>
                                <input
                                    {...register('lat', { valueAsNumber: true })}
                                    type="number"
                                    step="any"
                                    placeholder="Latitud (ej: 10.48)"
                                    className={inputClass}
                                />
                            </FormField>
                            <FormField label="" error={errors.lng?.message}>
                                <input
                                    {...register('lng', { valueAsNumber: true })}
                                    type="number"
                                    step="any"
                                    placeholder="Longitud (ej: -66.90)"
                                    className={inputClass}
                                />
                            </FormField>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                            Venezuela: Lat 0.6–12.2 · Lng −73.4 a −59.8
                        </p>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3">
                        <FormField label="Fecha Inicio" error={errors.fechaInicio?.message}>
                            <input
                                {...register('fechaInicio')}
                                type="date"
                                className={inputClass + ' [color-scheme:dark]'}
                            />
                        </FormField>
                        <FormField label="Fecha Fin" error={errors.fechaFin?.message}>
                            <input
                                {...register('fechaFin')}
                                type="date"
                                className={inputClass + ' [color-scheme:dark]'}
                            />
                        </FormField>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-700/60" />

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-medium
                hover:bg-slate-800 hover:text-white transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500
                text-white transition-all shadow-lg shadow-green-900/40 hover:shadow-green-900/60
                hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
