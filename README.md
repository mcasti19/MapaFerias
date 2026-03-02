<div align="center">
    <img src="public/MercalMarker.png" alt="Mercal Logo" width="120"/>
    <h1>📍 Mapa interactivo de Ferias Mercal</h1>
    <p><strong>Plataforma integral para la monitorización, logística y gestión visual de las Ferias del Campo Soberano a nivel Nacional.</strong></p>
</div>

---

## 🚀 Descripción del Proyecto

**Mapa de Ferias Mercal** es una una moderna *Single Page Application (SPA)* construida sobre una arquitectura robusta orientada al rendimiento y la experiencia de usuario. Permite al poder popular y a los entes gubernamentales visualizar en tiempo real la distribución geográfica de los operativos de alimentación, acceder a métricas detalladas de inventario, y gestionar la planificación logística de cada feria.

Cuenta con una **Interfaz de Usuario (UI) premium**, impulsada por un diseño *Glassmorphic*, animaciones fluidas, paleta corporativa Institucional (Azul), y un soporte nativo e inmersivo para modos **Claro y Oscuro**.

## 🛠️ Stack Tecnológico

Este sistema fue desarrollado utilizando los estándares más modernos de la industria para el año 2026:

### Backend & API
*   **[Laravel 12.x](https://laravel.com/)**: Framework PHP elegante, seguro y rápido como motor principal.
*   **[Inertia.js v2](https://inertiajs.com/)**: Enrutamiento monolítico sin fricción. Permite construir SPAs en React sin necesidad de escribir APIs complejas tradicionales.
*   **[SQLite / MySQL]**: Base de datos gestionada mediante el ORM Eloquent.

### Frontend
*   **[React 18.x](https://react.dev/)**: Librería principal para la construcción de interfaces dinámicas y modulares.
*   **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework de utilidades atómicas. Todo el sistema gráfico (Modo Light/Dark, colores y layouts responsivos) depende de sus nuevas directivas.
*   **[Zustand v5](https://zustand-demo.pmnd.rs/)**: Manejador global de estados inmutables liviano y persistente (Utilizado para almacenar los datos del mapa y las configuraciones de Tema visual).
*   **[React Leaflet v4](https://react-leaflet.js.org/)**: Mapas interactivos, capas, agrupamiento de pines (Marker Clustering) y geolocalización.

### Herramientas Modernas Adicionales
*   **Vite 7**: Empaquetador extremadamente veloz (bundler) con Hot Module Replacement (HMR).
*   **Lucide React**: Set de iconografía consistente y escalable.
*   **React Hook Form + Zod**: Validación de formularios robusta en el cliente.
*   **TypeScript**: Tipado súper estricto garantizando la calidad del software.

---

## 🌟 Características Principales

- 🗺️ **Mapeo Nacional Dinámico**: Mapa completamente interactivo impulsado por Leaflet. Soporta renderizado de Alto Rendimiento uniendo mapas de calor e íconos personalizados (`Marker Clustering`).
- 🎨 **Soporte Tema Claro/Oscuro Cuidado al Detalle**: Cambia fluidamente la interfaz completa (incluyendo los azulejos del mapa y las paletas condicionales de Tailwind v4) respetando las preferencias guardadas del usuario.
- 📱 **Diseño Movil Primero (Responsivo)**: Todas las vistas (Login, Dashboard, Detalles de Feria, y Formularios de Modal), están diseñadas usando *Flexbox* y CSS *Grids* para funcionar excelentemente en teléfonos inteligentes y estaciones de trabajo.
- 📊 **Panel de Control (Dashboard)**: Métricas rápidas y tarjetas analíticas sumando los recursos, beneficiarios e inventarios proyectados.
- 🔒 **Módulo de Autenticación Premium**: Un proceso de inicio de sesión reimaginado utilizando componentes acrílicos e identidad de la corporación.

---

## ⚙️ Instalación y Configuración para Desarrollo

Sugerimos utilizar un entorno **Linux (Ubuntu) a través de WSL2** en Windows para un despliegue y desarrollo sin interrupciones.

### 1. Requisitos Previos
*   PHP ^8.2
*   Composer v2
*   Node.js ^22 (vía NVM sugerido)
*   PNPM (Recomendado para manejar dependencias frontend)

### 2. Clonar y Configurar

1. Clona el repositorio e ingresa al directorio del proyecto:
   ```bash
   git clone <repo-url> mercal_mapa_ferias
   cd mercal_mapa_ferias
   ```

2. Instala las dependencias del ecosistema de Laravel (PHP):
   ```bash
   composer install
   ```

3. Instala las dependencias del ecosistema de React (Node):
   ```bash
   pnpm install
   ```

4. Prepara los entornos de configuración variables:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. Genera la base de datos (SQLite es el por defecto para pruebas):
   ```bash
   touch database/database.sqlite
   php artisan migrate --seed
   ```

### 3. Levantar Entorno Local de Desarrollo

Laravel + React con Vite requiere levantar **ambos ecosistemas simultáneamente**.
Para ello, puedes ejecutar sus comandos estándar y de construcción rápida:

En una terminal (Abre el backend PHP):
```bash
php artisan serve
```

En otra terminal (Abre el constructor rápido VITE con Tailwind):
```bash
npm run dev
# o usando pnpm
pnpm run dev
```

El proyecto estará disponible desde `http://localhost:8000`

---

## 🏗️ Arquitectura de Archivos Importantes

*   `routes/web.php` - Definición de rutas y cruces a las vistas de React usando *Inertia*.
*   `resources/js/Pages` - Contiene las **Vistas principales** inyectadas en la SPA (Ej: `Login.tsx`, `Dashboard.tsx`, `FeriaDetails.tsx`).
*   `resources/js/Components` - Componentes atómicos re-usables. (Ej: Formularios Zod, Botón `ThemeToggle`, y el `MapView` principal).
*   `resources/js/store` - Definición de bases de datos front-end en *Zustand*, como almacenar el modo de colores (`themeStore.ts`).
*   `resources/css/app.css` - Inyecciones principales de **Tailwind CSS v4** y la variable `:root` requerida por *Leaflet*.

---

## 🛡️ Seguridad y Buenas Prácticas

1.  **Formularios Seguro**: Todos los formularios están controlados e hidratados desde `React-Hook-Form` apoyados con Schemas predictivos de `Zod`, y los cruces CSRF siempre cubiertos por *InertiaJS*.
2.  **No usar Node-Linkers Nativos**: Por motivos del WSL2 bajo entornos de montaje virtual de Windows, las rutas UNC pueden ser restrictivas; por lo que el uso activo local en consola Linux es vital.
3.  **Persistencia Segura**: El ThemeStore y el FeriasStore guardan datos inofensivos de sesión visual en el `LocalStorage` del navegador sin riesgo cross-site.

***
> **Mercal, C.A.** | Gobierno Bolivariano de Venezuela. Todos los Derechos Reservados © 2026.
