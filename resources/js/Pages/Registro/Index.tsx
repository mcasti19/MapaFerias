import { useState, useMemo, useEffect } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Save, AlertCircle, ArrowLeft, ChevronRight, ChevronLeft, Package, Users, Activity, CheckCircle2, Check } from 'lucide-react';
import { feriaSchema, FeriaSchemaType } from '@/lib/feriaSchema';
import { useFeriasStore } from '@/store/feriasStore';
import { ESTADOS_VENEZUELA, TIPOS_FERIA, RUBROS_MOCK } from '@/types/constants';
import { Feria, FeriaRubro } from '@/types';
import { Head, router } from '@inertiajs/react';
import Sidebar from '@/Layouts/Sidebar';
import MobileNavbar from '@/Layouts/MobileNavbar';
import Swal from 'sweetalert2';

// Import Mocks from local sources
import { MUNICIPALITIES } from '@/data/municipalityMock';
import { PARISHES } from '@/data/parishMock';

const ESTADO_ID_MAP: Record<string, string> = {
    'Distrito Capital': '1', 'Amazonas': '2', 'Anzoátegui': '3', 'Apure': '4',
    'Aragua': '5', 'Barinas': '6', 'Bolívar': '7', 'Carabobo': '8',
    'Cojedes': '9', 'Delta Amacuro': '10', 'Falcón': '11', 'Guárico': '12',
    'Lara': '13', 'Mérida': '14', 'Miranda': '15', 'Monagas': '16',
    'Nueva Esparta': '17', 'Portuguesa': '18', 'Sucre': '19', 'Táchira': '20',
    'Trujillo': '21', 'Yaracuy': '22', 'Zulia': '23', 'Vargas': '24'
};

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

const noSpinnerClass = '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

export default function RegistroFeria() {
    const addFeria = useFeriasStore((s) => s.addFeria);
    const [currentStep, setCurrentStep] = useState(1);

    const defaultRubros: FeriaRubro[] = RUBROS_MOCK.map((rubro) => ({
        nombre: rubro,
        habilitado: false,
        toneladas: 0,
    }));

    const {
        register,
        handleSubmit,
        control,
        trigger,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FeriaSchemaType>({
        resolver: zodResolver(feriaSchema),
        defaultValues: {
            lat: undefined,
            lng: undefined,
            rubros: defaultRubros,
            cantidadClap: 0,
            cantidadFamilias: 0,
            cantidadCombos: 0,
            compliance: false,
        },
    });

    const { fields: rubrosFields } = useFieldArray({
        control,
        name: 'rubros',
    });

    const watchedRubros = useWatch({
        control,
        name: 'rubros',
        defaultValue: defaultRubros,
    });

    const watchedEstado = useWatch({ control, name: 'estado' });
    const watchedMunicipio = useWatch({ control, name: 'municipio' });

    // Dynamic Cascade Listeners
    const availableMunicipalities = useMemo(() => {
        if (!watchedEstado || !ESTADO_ID_MAP[watchedEstado]) return [];
        const stateId = ESTADO_ID_MAP[watchedEstado];
        return MUNICIPALITIES.filter(m => m.id_states === stateId);
    }, [watchedEstado]);

    const availableParishes = useMemo(() => {
        if (!watchedMunicipio || availableMunicipalities.length === 0) return [];
        const mun = availableMunicipalities.find(m => m.municipalities === watchedMunicipio);
        if (!mun) return [];
        return PARISHES.filter(p => p.id_municipalities === mun.id_municipalities);
    }, [watchedMunicipio, availableMunicipalities]);

    // Cleanup selections when parent changes
    useEffect(() => {
        setValue('municipio', '');
        setValue('parroquia', '');
    }, [watchedEstado, setValue]);

    useEffect(() => {
        setValue('parroquia', '');
    }, [watchedMunicipio, setValue]);

    const calculateTotalToneladas = useMemo(() => {
        return watchedRubros?.reduce((acc, current) => {
            if (current.habilitado) {
                return acc + (Number(current.toneladas) || 0);
            }
            return acc;
        }, 0) || 0;
    }, [watchedRubros]);

    const handleNextStep = async (fieldsToValidate: (keyof FeriaSchemaType)[]) => {
        const isStepValid = await trigger(fieldsToValidate);
        if (isStepValid) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const onSubmit = (data: FeriaSchemaType) => {
        const id = `feria-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const newFeria: Feria = {
            id_feria: id,
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
            // Novedades
            cantidadClap: data.cantidadClap,
            cantidadFamilias: data.cantidadFamilias,
            cantidadCombos: data.cantidadCombos,
            rubros: data.rubros,
            toneladasTotales: calculateTotalToneladas,
        };
        addFeria(newFeria);
        
        Swal.fire({
            title: '¡Feria Registrada!',
            text: 'La nueva feria ha sido cargada exitosamente.',
            icon: 'success',
            confirmButtonColor: '#3b82f6',
            confirmButtonText: 'Cargar Otra Feria',
            background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
        }).then(() => {
            reset();
            setCurrentStep(1);
        });
    };

    const steps = [
        { title: 'Ubicación y Fechas', icon: MapPin },
        { title: 'Organización Comunitaria', icon: Users },
        { title: 'Detalles y Rubros', icon: Activity }
    ];

    return (
        <>
            <Head title="Registro de Feria" />
            <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
                <Sidebar />

                <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden modern-scrollbar bg-slate-50 dark:bg-slate-900">
                    <MobileNavbar />

                    <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
                        <div className="max-w-4xl mx-auto">
                            {/* External Header */}
                            <div className="mb-8 p-6 bg-linear-to-r from-blue-700 to-indigo-800 rounded-2xl shadow-xl text-white relative overflow-hidden">
                                {/* Decorative circles */}
                                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-white opacity-10 blur-2xl"></div>
                                <div className="absolute bottom-0 right-32 -mb-8 w-24 h-24 rounded-full bg-indigo-400 opacity-20 blur-xl"></div>
                                
                                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Módulo de Registro Operativo</h1>
                                        <p className="text-blue-100/80 mt-1 font-medium text-sm sm:text-base">Sistema de Carga de Ferias del Campo Soberano</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => router.visit(route('lista-ferias'))}
                                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-semibold backdrop-blur-md"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Ir al Historial
                                    </button>
                                </div>
                            </div>
                            
                            {/* Visual Progress Stepper */}
                            <div className="w-full mb-8 relative">
                                <div className="flex items-center justify-between mx-auto px-4 max-w-2xl relative">
                                    {/* Progress Line */}
                                    <div className="absolute top-5 left-[15%] right-[15%] h-1 bg-slate-200 dark:bg-slate-700 -z-0 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
                                    </div>

                                    {steps.map((step, index) => {
                                        const isActive = currentStep === index + 1;
                                        const isCompleted = currentStep > index + 1;
                                        const Icon = step.icon;
                                        
                                        return (
                                            <div key={index} className="flex flex-col items-center relative z-10 w-1/3">
                                                <div 
                                                    className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                                                        isActive ? 'bg-blue-600 text-white ring-4 ring-blue-500/30 scale-110' 
                                                        : isCompleted ? 'bg-emerald-500 text-white' 
                                                        : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400'
                                                    }`}
                                                >
                                                    {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-5 h-5" />}
                                                </div>
                                                <span 
                                                    className={`text-xs mt-3 font-bold uppercase tracking-wider text-center transition-colors ${
                                                        isActive ? 'text-blue-700 dark:text-blue-400' 
                                                        : isCompleted ? 'text-emerald-700 dark:text-emerald-500' 
                                                        : 'text-slate-400 dark:text-slate-500'
                                                    }`}
                                                >
                                                    {step.title}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-xl mb-6 overflow-hidden">
                                {/* Form Layout */}
                                <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 sm:px-8 sm:py-8 space-y-8">
                                    {/* ETAPA 1 */}
                                    {currentStep === 1 && (
                                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                                                <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg"><MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" /></div>
                                                Ubicación de la Feria y Fechas
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField label="Estado" error={errors.estado?.message}>
                                                    <select {...register('estado')} className={selectClass}>
                                                        <option value="">Seleccionar...</option>
                                                        {ESTADOS_VENEZUELA.map((e) => (
                                                            <option key={e} value={e}>{e}</option>
                                                        ))}
                                                    </select>
                                                </FormField>
                                                <FormField label="Municipio" error={errors.municipio?.message}>
                                                    <select 
                                                        {...register('municipio')} 
                                                        className={selectClass} 
                                                        disabled={!watchedEstado || availableMunicipalities.length === 0}
                                                    >
                                                        <option value="">Seleccionar Municipio...</option>
                                                        {availableMunicipalities.map((m) => (
                                                            <option key={m.id_municipalities} value={m.municipalities}>{m.municipalities}</option>
                                                        ))}
                                                    </select>
                                                </FormField>
                                                <FormField label="Parroquia" error={errors.parroquia?.message}>
                                                    <select 
                                                        {...register('parroquia')} 
                                                        className={selectClass} 
                                                        disabled={!watchedMunicipio || availableParishes.length === 0}
                                                    >
                                                        <option value="">Seleccionar Parroquia...</option>
                                                        {availableParishes.map((p, idx) => (
                                                            <option key={`${p.id_municipalities}-${idx}`} value={p.parishes}>{p.parishes}</option>
                                                        ))}
                                                    </select>
                                                </FormField>
                                                <FormField label="Sector / Comunidad" error={errors.sector?.message}>
                                                    <input {...register('sector')} type="text" placeholder="Ej: Casco Principal 23 de Enero" className={inputClass} />
                                                </FormField>
                                                <FormField label="Fecha de la Feria" error={errors.fechaInicio?.message}>
                                                    <input {...register('fechaInicio')} type="date" className={inputClass} />
                                                </FormField>
                                                
                                                <div className="md:col-span-2 mt-2">
                                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 uppercase tracking-wide">
                                                        Coordenadas Exactas (Georreferenciación)
                                                    </label>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                                        <FormField label="Latitud" error={errors.lat?.message}>
                                                            <div className="relative">
                                                                <input {...register('lat', { valueAsNumber: true })} type="number" step="any" placeholder="Ej: 10.4806" className={`${inputClass} pl-4 ${noSpinnerClass}`} />
                                                                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">N</span>
                                                            </div>
                                                        </FormField>
                                                        <FormField label="Longitud" error={errors.lng?.message}>
                                                            <div className="relative">
                                                                <input {...register('lng', { valueAsNumber: true })} type="number" step="any" placeholder="Ej: -66.9036" className={`${inputClass} pl-4 ${noSpinnerClass}`} />
                                                                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">W</span>
                                                            </div>
                                                        </FormField>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-6 mt-8 flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => handleNextStep(['estado', 'municipio', 'parroquia', 'sector', 'lat', 'lng', 'fechaInicio'])}
                                                    className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20 active:scale-95"
                                                >
                                                    Siguiente Etapa
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* ETAPA 2 */}
                                    {currentStep === 2 && (
                                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                                                <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-lg"><Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                                                Organización Comunal y Responsable
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                <FormField label="Nombre Completo Responsable" error={errors.full_name?.message}>
                                                    <input {...register('full_name')} type="text" placeholder="Nombre Apellido" className={inputClass} />
                                                </FormField>
                                                <FormField label="Cédula" error={errors.cedula?.message}>
                                                    <input {...register('cedula')} type="text" inputMode="numeric" pattern="[0-9]*" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} placeholder="12345678" className={inputClass} />
                                                </FormField>
                                                <FormField label="Teléfono" error={errors.phone?.message}>
                                                    <input {...register('phone')} type="text" inputMode="numeric" pattern="[0-9]*" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} placeholder="04121234567" className={inputClass} />
                                                </FormField>
                                                <FormField label="Circuito Comunal" error={errors.circuit?.message}>
                                                    <input {...register('circuit')} type="text" placeholder="Nombre del Circuito" className={inputClass} />
                                                </FormField>
                                                <FormField label="CLAP" error={errors.clap?.message}>
                                                    <input {...register('clap')} type="text" placeholder="Nombre del CLAP" className={inputClass} />
                                                </FormField>
                                                <FormField label="Base de Misiones" error={errors.mission_base?.message}>
                                                    <input {...register('mission_base')} type="text" placeholder="Base Misiones" className={inputClass} />
                                                </FormField>
                                            </div>
                                            <div className="pt-6 mt-8 flex justify-between items-center">
                                                <button
                                                    type="button"
                                                    onClick={handlePrevStep}
                                                    className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors active:scale-95"
                                                >
                                                    <ChevronLeft className="w-5 h-5" />
                                                    Atrás
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleNextStep(['full_name', 'cedula', 'phone', 'circuit', 'clap', 'mission_base'])}
                                                    className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20 active:scale-95"
                                                >
                                                    Siguiente Etapa
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* ETAPA 3 */}
                                    {currentStep === 3 && (
                                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
                                            {/* Atención Esperada */}
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                                                    <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-lg"><Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /></div>
                                                    Detalle de Operaciones y Atención
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                    <FormField label="Tipo de Feria" error={errors.tipoFeria?.message}>
                                                        <select {...register('tipoFeria')} className={selectClass}>
                                                            <option value="">Seleccionar...</option>
                                                            {TIPOS_FERIA.map((t) => (
                                                                <option key={t} value={t}>{t}</option>
                                                            ))}
                                                        </select>
                                                    </FormField>
                                                    <FormField label="Cant. de CLAP" error={errors.cantidadClap?.message}>
                                                        <input {...register('cantidadClap', { valueAsNumber: true })} type="number" min={0} className={`${inputClass} ${noSpinnerClass}`} />
                                                    </FormField>
                                                    <FormField label="Cant. de Familias" error={errors.cantidadFamilias?.message}>
                                                        <input {...register('cantidadFamilias', { valueAsNumber: true })} type="number" min={0} className={`${inputClass} ${noSpinnerClass}`} />
                                                    </FormField>
                                                    <FormField label="Cant. de Combos" error={errors.cantidadCombos?.message}>
                                                        <input {...register('cantidadCombos', { valueAsNumber: true })} type="number" min={0} className={`${inputClass} ${noSpinnerClass}`} />
                                                    </FormField>
                                                </div>
                                            </div>

                                            {/* Rubros a Comercializar */}
                                            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-inner">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                        <Package className="w-5 h-5 text-amber-500" />
                                                        Rubros a Comercializar
                                                    </h3>
                                                    <div className="px-5 py-2.5 bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 font-extrabold rounded-xl text-base border border-blue-200 dark:border-blue-800/80 shadow-sm flex items-center gap-2">
                                                        <span>Resumen:</span>
                                                        <span className="text-2xl ml-1">{calculateTotalToneladas.toFixed(2)}</span>
                                                        <span className="text-xs uppercase font-semibold text-slate-500 mt-1">Ton</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                                    {rubrosFields.map((field, index) => {
                                                        const isHabilitado = watchedRubros?.[index]?.habilitado;
                                                        
                                                        return (
                                                            <div key={field.id} className={`flex items-center gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border transition-all duration-300 ${isHabilitado ? 'border-blue-400 dark:border-blue-500 shadow-md ring-1 ring-blue-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}>
                                                                <input type="hidden" {...register(`rubros.${index}.nombre` as const)} />
                                                                <label className="flex items-center gap-3 cursor-pointer flex-1">
                                                                    <div className="relative flex items-center justify-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            {...register(`rubros.${index}.habilitado` as const)}
                                                                            className="w-5 h-5 cursor-pointer appearance-none rounded border border-slate-300 dark:border-slate-600 checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors"
                                                                        />
                                                                        {isHabilitado && <CheckCircle2 className="w-4 h-4 absolute text-white pointer-events-none" />}
                                                                    </div>
                                                                    <span className={`text-[13px] font-bold uppercase tracking-wider transition-colors ${isHabilitado ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                                                        {field.nombre}
                                                                    </span>
                                                                </label>
                                                                
                                                                {isHabilitado && (
                                                                    <div className="w-24 shrink-0 animate-in zoom-in-95 duration-200 block">
                                                                        <div className="relative">
                                                                            <input
                                                                                type="number"
                                                                                step="any"
                                                                                min="0"
                                                                                placeholder="0.00"
                                                                                {...register(`rubros.${index}.toneladas` as const, { valueAsNumber: true })}
                                                                                className={`w-full pl-3 pr-8 py-2 text-sm font-bold rounded-lg bg-slate-50 dark:bg-slate-800 border-2 border-blue-200 dark:border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900 dark:text-white ${noSpinnerClass}`}
                                                                            />
                                                                            <span className="absolute right-2 top-2 text-[10px] font-bold text-slate-400 uppercase">T</span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                                <FormField label="¿Se Ejecutó Exitosamente?" error={errors.compliance?.message}>
                                                    <select {...register('compliance', { setValueAs: (v) => v === 'true' })} className={selectClass}>
                                                        <option value="false">No (Por Ejecutar / No Ejecutada)</option>
                                                        <option value="true">Sí (Ejecutada)</option>
                                                    </select>
                                                </FormField>
                                                <FormField label="Observaciones Finales (Opcional)" error={errors.observations?.message}>
                                                    <textarea {...register('observations')} rows={2} placeholder="Escriba aquí condiciones relevantes..." className={`${inputClass} resize-none`} />
                                                </FormField>
                                            </div>

                                            <div className="pt-8 mt-4 flex justify-between items-center">
                                                <button
                                                    type="button"
                                                    onClick={handlePrevStep}
                                                    className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors active:scale-95"
                                                >
                                                    <ChevronLeft className="w-5 h-5" />
                                                    Atrás
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="flex items-center gap-2 px-8 py-3 rounded-xl text-base font-extrabold bg-blue-600 hover:bg-blue-700 dark:bg-linear-to-r dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-400 text-white transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Save className="w-5 h-5 mb-0.5" />
                                                    Completar Registro
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
