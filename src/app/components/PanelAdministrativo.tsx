import React, { useState } from 'react';

interface SolicitudFlujo {
  id: string;
  tipo: string;
  ciudadano: string;
  fecha: string;
  estado: 'Pendiente Validación' | 'Asignado' | 'En Revisión' | 'Observado' | 'Aprobado' | 'Rechazado';
  departamento: string;
}

export default function PanelAdministrativo() {
  const [filtroDepto, setFiltroDepto] = useState('Todos');
  const [alerta, setAlerta] = useState<string | null>(null);

  // Expedientes sincronizados con las etapas del diagrama de flujo municipal
  const [solicitudes, setSolicitudes] = useState<SolicitudFlujo[]>([
    {
      id: '#TR-9482',
      tipo: 'Permiso de Construcción',
      ciudadano: 'Carlos Mendoza',
      fecha: '15/10/2026',
      estado: 'Pendiente Validación',
      departamento: 'Urbanismo'
    },
    {
      id: '#TR-9480',
      tipo: 'Licencia de Operación',
      ciudadano: 'María Fernández',
      fecha: '14/10/2026',
      estado: 'Asignado',
      departamento: 'Administración Tributaria'
    },
    {
      id: '#TR-9475',
      tipo: 'Solvencia Municipal',
      ciudadano: 'Marco Posadas',
      fecha: '12/10/2026',
      estado: 'Aprobado',
      departamento: 'Administración Tributaria'
    },
    {
      id: '#TR-9460',
      tipo: 'Reclamo por Servicios Públicos',
      ciudadano: 'Ana Gómez',
      fecha: '10/10/2026',
      estado: 'Observado',
      departamento: 'Infraestructura'
    }
  ]);

  const avanzarFlujo = (id: string, nuevoEstado: SolicitudFlujo['estado']) => {
    setSolicitudes(solicitudes.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s));
    setAlerta(`Expediente ${id} actualizado en el flujo a: ${nuevoEstado}`);
    setTimeout(() => setAlerta(null), 4000);
  };

  const solicitudesFiltradas = filtroDepto === 'Todos' 
    ? solicitudes 
    : solicitudes.filter(s => s.departamento === filtroDepto);

  const obtenerBadgeEstado = (estado: SolicitudFlujo['estado']) => {
    switch (estado) {
      case 'Pendiente Validación': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Asignado': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'En Revisión': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Observado': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Aprobado': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Rechazado': return 'bg-rose-100 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      
      {/* Alerta de acción en el flujo */}
      {alerta && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl shadow-sm flex items-center justify-between">
          <span><i className="fa-solid fa-code-branch mr-2"></i> {alerta}</span>
          <span className="font-bold text-xs uppercase tracking-wider">Flujo UTH / MuniTrack</span>
        </div>
      )}

      {/* Tarjetas de Métricas operativas del proceso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Pendientes de Validación</p>
          <h3 className="text-3xl font-bold text-amber-600 mt-2">
            {solicitudes.filter(s => s.estado === 'Pendiente Validación').length}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Fase inicial de recepción</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">En Proceso Operativo</p>
          <h3 className="text-3xl font-bold text-blue-600 mt-2">
            {solicitudes.filter(s => s.estado === 'Asignado' || s.estado === 'En Revisión').length}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Asignados a áreas técnicas</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Resueltos y Notificados</p>
          <h3 className="text-3xl font-bold text-emerald-600 mt-2">
            {solicitudes.filter(s => s.estado === 'Aprobado' || s.estado === 'Rechazado').length}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Cierre del flujo ciudadano</p>
        </div>
      </div>

      {/* Bandeja de control del flujo administrativo */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Bandeja de Control - Flujo de Trámites</h3>
            <p className="text-xs text-gray-500">Gestión por carriles administrativos y áreas operativas</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Filtrar Área:</span>
            <select 
              value={filtroDepto} 
              onChange={(e) => setFiltroDepto(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Todos">Todas las Áreas</option>
              <option value="Urbanismo">Urbanismo</option>
              <option value="Administración Tributaria">Administración Tributaria</option>
              <option value="Infraestructura">Infraestructura</option>
            </select>
          </div>
        </div>

        {/* Tabla interactiva basada en el diagrama */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase text-gray-400 font-semibold tracking-wider">
                <th className="px-6 py-3">ID / Trámite</th>
                <th className="px-6 py-3">Ciudadano</th>
                <th className="px-6 py-3">Área Operativa</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Estado del Flujo</th>
                <th className="px-6 py-3 text-right">Acciones del Proceso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {solicitudesFiltradas.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-800">{s.id}</span>
                    <p className="text-xs text-gray-500">{s.tipo}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{s.ciudadano}</td>
                  <td className="px-6 py-4 text-xs">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium">
                      {s.departamento}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{s.fecha}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${obtenerBadgeEstado(s.estado)}`}>
                      {s.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-1.5">
                    <button 
                      onClick={() => avanzarFlujo(s.id, 'Asignado')}
                      className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-purple-100 transition"
                      title="Asignar a área operativa"
                    >
                      Asignar
                    </button>
                    <button 
                      onClick={() => avanzarFlujo(s.id, 'En Revisión')}
                      className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-blue-100 transition"
                      title="Revisar requisitos"
                    >
                      Revisar
                    </button>
                    <button 
                      onClick={() => avanzarFlujo(s.id, 'Observado')}
                      className="bg-amber-500 text-white px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-amber-600 transition"
                      title="Marcar con observaciones"
                    >
                      Observar
                    </button>
                    <button 
                      onClick={() => avanzarFlujo(s.id, 'Aprobado')}
                      className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-emerald-700 transition"
                      title="Aprobar y notificar resolución"
                    >
                      Aprobar
                    </button>
                    <button 
                      onClick={() => avanzarFlujo(s.id, 'Rechazado')}
                      className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-rose-100 transition"
                      title="Rechazar trámite"
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}