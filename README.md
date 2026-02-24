# 📍 Ferias Mercal - Sistema de Gestión y Mapa Interactivo

Una aplicación moderna y profesional para la visualización y gestión de las Ferias Mercal en todo el territorio venezolano. Este sistema permite rastrear ferias activas, programadas e históricas mediante un mapa interactivo de alta fidelidad.

---

## 🚀 Características Principales

- **🗺️ Mapa Interactivo**: Visualización geolocalizada con agrupación de marcadores (clustering) y popups detallados.
- **🌗 Selector de Temas**: Cambio dinámico entre Modo Claro (CartoDB Positron) y Modo Oscuro (CartoDB Dark Matter).
- **🔍 Filtros Avanzados**:
  - Búsqueda por nombre en tiempo real.
  - Filtrado por Estado (Venezuela).
  - Filtrado por Tipo de Feria (Integral, Proteína, Víveres, etc.).
  - Filtro por Estatus (Activa, Programada, Histórica).
  - Selector de rango de fechas con lógica de solapamiento.
- **📊 Panel de Resumen**: Estadísticas en tiempo real de las ferias visualizadas.
- **📝 Registro de Ferias**: Formulario validado con **Zod** para añadir nuevas ferias al sistema.
- **✨ UI Premium**: Diseño minimalista, animaciones fluidas y experiencia de usuario optimizada con Tailwind CSS.

---

## 🛠️ Stack Tecnológico

- **Core**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estado Global**: [Zustand](https://zustand-demo.pmnd.rs/) (con manejo de selectores optimizados)
- **Mapas**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Gestión de Formularios**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Manejo de Fechas**: [date-fns](https://date-fns.org/)

---

## 📦 Instalación y Uso

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18+)
- [pnpm](https://pnpm.io/) (recomendado) o npm

### Pasos
1. Clona el repositorio:
   ```bash
   git clone [url-del-repositorio]
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 📐 Estructura del Proyecto

```text
src/
├── components/          # Componentes reutilizables (Map, Forms, Layout, Filters)
├── data/               # Datos simulados (mocks)
├── lib/                # Utilidades, esquemas de validación y lógica de negocio
├── store/              # Estado global con Zustand
├── types/              # Definiciones de tipos TypeScript
└── assets/             # Recursos estáticos
```

---

## 🛡️ Lógica de Negocio

- **Clasificación Automática**: Las ferias se clasifican como *Activa*, *Programada* o *Histórica* basándose en la fecha actual del sistema.
- **Reactividad Optimizada**: Uso de `useShallow` en selectores para evitar re-renderizados innecesarios y bucles infinitos en el mapa.

---

## 📄 Licencia

Este proyecto está bajo la licencia [insertar tipo de licencia]. Desarrollado para MPPC Venezuela.
