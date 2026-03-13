import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Layouts/Sidebar';
import MobileNavbar from '@/Layouts/MobileNavbar';
import { Search, Filter, Calendar, MapPin, Tag, Inbox, Truck } from 'lucide-react';
import { format, isAfter, isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { useFeriasStore } from '@/store/feriasStore';

export default function ListarFerias() {
  const { ferias, setMobileSidebarOpen } = useFeriasStore();
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ estadoFilter, setEstadoFilter ] = useState('Todos');

  const getStatusInfo = (inicio: string) => {
    const hoy = new Date();
    const start = parseISO(inicio);

    if (isBefore(hoy, startOfDay(start))) {
      return { label: 'Programada', styles: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' };
    } else if (isAfter(hoy, endOfDay(start))) {
      return { label: 'Finalizada', styles: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' };
    } else {
      return { label: 'En curso', styles: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' };
    }
  };

  // Filtros combinados
  const feriasFiltradas = useMemo(() => {
    return ferias.filter(feria => {
      const matchSector = feria.sector.toLowerCase().includes(searchTerm.toLowerCase());
      const matchParroquia = feria.parroquia.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSearch = matchSector || matchParroquia;
      const matchesEstado = estadoFilter === 'Todos' || feria.estado === estadoFilter;
      return matchesSearch && matchesEstado;
    });
  }, [ searchTerm, estadoFilter, ferias ]);

  // Extraer estados únicos para el select
  const estadosUnicos = useMemo(() =>
    [ 'Todos', ...new Set(ferias.map(f => f.estado)) ],
    [ ferias ]);

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden text-slate-800 dark:text-white transition-colors duration-300">
      <Head title="Historial de Ferias" />

      <Sidebar onRegisterClick={() => { }} />

      {/* Main Content Scrollable Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <MobileNavbar />

        <div className="flex-1 overflow-y-auto w-full no-scrollbar bg-slate-100 dark:bg-slate-800 p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
            {/* Breadcrumbs / Header Desktop */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href={route('ferias') as string}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Truck className="w-4 h-4" />
                  <span>Ferias</span>
                </Link>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Historial</span>
              </div>
              <div className="flex md:hidden flex-col">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Historial</h1>
                <p className="text-slate-500 text-xs">Consulta registros anteriores.</p>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 md:px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm self-start md:self-auto">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-xs md:text-sm font-semibold whitespace-nowrap">{feriasFiltradas.length} Encontradas</span>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar por nombre de feria..."
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm dark:shadow-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <select
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer shadow-sm dark:shadow-none text-sm text-slate-900 dark:text-white"
                  value={estadoFilter}
                  onChange={(e) => setEstadoFilter(e.target.value)}
                >
                  {estadosUnicos.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden shadow-sm dark:shadow-xl transition-all duration-300">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Feria / ID</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Cronograma</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">Estatus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    {feriasFiltradas.length > 0 ? (
                      feriasFiltradas.map((feria) => {
                        const status = getStatusInfo(feria.fechaInicio);
                        return (
                          <tr key={feria.id_feria} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{feria.sector} - {feria.parroquia}</div>
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">{feria.id_feria}</div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span className="text-slate-600 dark:text-slate-300 font-medium">{feria.estado}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold">
                                <Tag className="w-3 h-3" />
                                {feria.tipoFeria}
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span>{format(parseISO(feria.fechaInicio), "d 'de' MMM", { locale: es })}</span>
                                </div>
                                <div className="w-24 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${status.label === 'En curso' ? 'bg-green-500' : status.label === 'Programada' ? 'bg-orange-400' : 'bg-slate-400'}`}
                                    style={{ width: status.label === 'Finalizada' ? '100%' : '40%' }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-center whitespace-nowrap">
                              <span className={`inline-block px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide w-28 uppercase ${status.styles}`}>
                                {status.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-20 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                            <Inbox className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-lg font-medium">No hay ferias que coincidan</p>
                            <p className="text-sm font-normal">Intenta cambiar los términos de búsqueda</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}