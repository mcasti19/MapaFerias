import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import ThemeToggle from '@/Components/ui/ThemeToggle';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post((route as any)('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden font-sans transition-colors duration-300">
            <Head title="Iniciar Sesión - Ferias Mercal" />

            {/* Left Section - Hero/Branding */}
            <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300 border-r border-slate-200 dark:border-slate-800">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-10 z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-white dark:from-blue-900/40 dark:via-slate-900 dark:to-slate-900 z-0 transition-colors duration-300"></div>

                {/* Decorative Elements */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply opacity-20 dark:opacity-20 filter blur-3xl animate-blob"></div>
                <div className="absolute top-40 -right-20 w-72 h-72 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply opacity-20 dark:opacity-20 filter blur-3xl animate-blob animation-delay-2000"></div>

                {/* Content */}
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm shrink-0">
                            <img src="/MercalMarker.png" alt="Mercal Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
                        </div>
                        <span className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Mercal</span>
                    </div>
                    <ThemeToggle />
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-semibold mb-6 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Plataforma Oficial
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
                        Sistema Inteligente de<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
                            Ferias del Campo Soberano
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
                        Monitorea, administra y geolocaliza todas las ferias activas y planificadas en el territorio nacional con eficiencia y precisión.
                    </p>
                </div>

                <div className="relative z-10">
                    <p className="text-sm text-slate-500 font-medium">
                        &copy; {new Date().getFullYear()} Ministerio del Poder Popular para la Alimentación
                    </p>
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 relative">
                {/* Mobile Background and elements */}
                <div className="absolute inset-0 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 lg:hidden z-0 transition-colors duration-300"></div>
                <div className="absolute top-6 right-6 lg:hidden z-20">
                    <ThemeToggle />
                </div>

                <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                    <div className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-8 sm:p-10 rounded-3xl shadow-xl dark:shadow-2xl transition-colors duration-300">

                        <div className="text-center mb-10">
                            {/* Mobile Logo */}
                            <div className="lg:hidden flex justify-center mb-6">
                                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-md">
                                    <img src="/MercalMarker.png" alt="Mercal Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Bienvenido de nuevo</h2>
                            <p className="text-slate-600 dark:text-slate-400 font-medium">Ingresa tus credenciales para acceder al sistema</p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-sm font-medium text-blue-700 dark:text-blue-400 flex items-center justify-center">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Correo Electrónico</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm dark:shadow-none"
                                        placeholder="admin@mercal.gob.ve"
                                        autoComplete="username"
                                        autoFocus
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                {errors.email && <p className="text-sm text-red-500 dark:text-red-400 ml-1 mt-1">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contraseña</label>
                                    {canResetPassword && (
                                        <Link
                                            href={(route as any)('password.request')}
                                            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm dark:shadow-none"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                {errors.password && <p className="text-sm text-red-500 dark:text-red-400 ml-1 mt-1">{errors.password}</p>}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center ml-1">
                                <label className="flex items-center cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900/50 checked:bg-blue-600 checked:border-blue-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer shadow-sm dark:shadow-none"
                                        />
                                        <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="ms-3 text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                                        Mantener sesión iniciada
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-400 shadow-lg shadow-blue-600/30 dark:shadow-blue-900/30 hover:shadow-blue-600/40 dark:hover:shadow-blue-900/50 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-4"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Ingresando...
                                    </>
                                ) : (
                                    <>
                                        Ingresar al Sistema
                                        <LogIn className="w-5 h-5 ml-1" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Custom Animations required for this page */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}} />
        </div>
    );
}
