<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // 1. Buscamos al usuario por su email
        $user = User::where('email', $request->email)->first();

        if ($user) {
            // 2. Buscamos si existe una sesión activa para este user_id
            $sesionActiva = DB::table('sessions')
                ->where('user_id', $user->id)
                ->first();

            if ($sesionActiva) {
                // 3. Calculamos inactividad
                $haceCuanto = time() - $sesionActiva->last_activity;

                // Si es menor a 5 minutos (300 segundos), bloqueamos
                if ($haceCuanto < 300) {
                    throw \Illuminate\Validation\ValidationException::withMessages([
                        'email' => 'Ya tienes una sesión activa en otro navegador. Debes esperar 5 minutos para volver a entrar.',
                    ]);
                } else {
                    // Si ya pasó el tiempo, eliminamos la sesión antigua para permitir el nuevo login
                    DB::table('sessions')->where('user_id', $user->id)->delete();
                }
            }
        }

        // El login de Laravel en dado caso quitar todo lo que esta arriba
        $request->authenticate();
        $request->session()->regenerate();
        return redirect()->intended(route('ferias', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
