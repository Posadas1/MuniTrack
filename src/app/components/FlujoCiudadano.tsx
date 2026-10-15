import React, { useState } from 'react';

// Tipos para los trámites
interface Tramite {
  id: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  estado: 'Pendiente' | 'En Revisión' | 'Aprobado' | 'Observado' | 'Rechazado';
  archivoNombre: string;
}

export default function FlujoCiudadano() {
  const [vistaActual, setVistaActual] = useState<'historial' | 'nueva'>('historial');
  const [tipoTramite, setTipoTramite] = useState('Licencia de Operación');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [alerta, setAlerta] = useState(false);

  // Lista simulada de expedientes con los estados exactos del documento UTH
  const [tramites, setTramites] = useState<Tramite[]>([
    {
      id: '#TR-9482',
      tipo: 'Licencia de Operación Comercial',
      descripcion: 'Solicitud de apertura para local comercial en zona céntrica.',
      fecha: '14 de Octubre, 2026',
      estado: 'En Revisión',
      archivoNombre: 'documentos_legales.pdf'
    },
    {
      id: '#TR-9410',
      tipo: 'Solvencia Municipal',
      descripcion: 'Solicitud de solvencia anual para trámites fiscales.',
      fecha: '10 de Octubre, 2026',
      estado: 'Aprobado',
      archivoNombre: 'recibo_pago.pdf'
    },
    {
      id: '#TR-9355',
      tipo: 'Permiso de Construcción',
      descripcion: 'Ampliación de estructura habitacional en planta baja.',
      fecha: '02 de Octubre, 2026',
      estado: 'Observado',
      archivoNombre: 'planos_obra.pdf'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoTramite: Tramite = {
      id: `#TR-${Math.floor(1000 + Math.random() * 9000)}`,
      tipo: tipoTramite,
      descripcion: descripcion,
      fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
      estado: 'Pendiente',
      archivoNombre: archivo ? archivo.name : 'Sin archivo adjunto'
    };

    setTramites([nuevoTramite, ...tramites]);
    setDescripcion('');
    setArchivo(null);
    setAlerta(true);
    setVistaActual('historial');
    setTimeout(() => setAlerta(false), 4000);
  };

  // Función para asignar colores institucionales según el estado del trámite
  const obtenerBadgeEstado = (estado: Tramite['estado']) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'En Revisión':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Aprobado':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Observado':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Rechazado':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      
      {/* Alerta de éxito */}
      {alerta && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl shadow-sm flex items-center justify-between">
          <span>¡Solicitud enviada con éxito! Ya puedes ver su seguimiento en tiempo real en tu historial.</span>
          <span className="font-bold text-xs uppercase tracking-wider">MuniTrack</span>
        </div>
      )}

      {/* Cabecera del Portal Ciudadano */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Carpeta Ciudadana</h2>
          <p className="text-gray-500 text-sm">Gestiona tus trámites municipales y da seguimiento en tiempo real.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setVistaActual('historial')} 
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${vistaActual === 'historial' ? 'bg-emerald-700 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Mis Trámites
          </button>
          <button 
            onClick={() => setVistaActual('nueva')} 
            className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 ${vistaActual === 'nueva' ? 'bg-emerald-700 text-white shadow' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
          >
            <i className="fa-solid fa-plus"></i> Nueva Solicitud
          </button>
        </div>
      </div>

      {/* VISTA 1: HISTORIAL Y SEGUIMIENTO EN TIEMPO REAL */}
      {vistaActual === 'historial' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Historial de Expedientes Municipales</h3>
            <span className="text-xs text-gray-400 font-medium">{tramites.length} trámites registrados</span>
          </div>
          <div className="divide-y divide-gray-100">
            {tramites.map((t) => (
              <div key={t.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50/50 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${obtenerBadgeEstado(t.estado)}`}>
                      {t.estado}
                    </span>
                    <span className="text-sm font-bold text-gray-700">{t.id}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mt-1">{t.tipo}</h4>
                  <p className="text-sm text-gray-600">{t.descripcion}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
                    <span><i className="fa-regular fa-calendar mr-1"></i> {t.fecha}</span>
                    <span><i className="fa-solid fa-paperclip mr-1"></i> {t.archivoNombre}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end md:self-center">
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                    En Proceso Departamental
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VISTA 2: FORMULARIO DINÁMICO DE NUEVA SOLICITUD */}
      {vistaActual === 'nueva' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800">Iniciar Nuevo Trámite Municipal</h3>
            <p className="text-sm text-gray-500">Complete los campos dinámicos y adjunte la evidencia documental requerida (PDF o Imagen).</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seleccione el Tipo de Solicitud</label>
              <select 
                value={tipoTramite} 
                onChange={(e) => setTipoTramite(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm bg-white"
              >
                <option value="Licencia de Operación">Licencia de Operación Comercial</option>
                <option value="Permiso de Construcción">Permiso de Construcción</option>
                <option value="Solvencia Municipal">Solvencia Municipal</option>
                <option value="Reclamo por Servicios Públicos">Reclamo por Servicios Públicos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Detallada del Trámite</label>
              <textarea 
                rows={4} 
                required
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describa el motivo de su solicitud, ubicación exacta o detalles importantes..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adjuntar Documentación de Evidencia (PDF o Imagen)[cite: 1]</label>
              <input 
                type="file" 
                accept=".pdf,image/*"
                onChange={(e) => setArchivo(e.target.files ? e.target.files[0] : null)}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer border border-gray-200 rounded-xl"
              />
              <p className="text-xs text-gray-400 mt-1">Formatos permitidos: PDF, JPG, PNG (Máx. 10MB).</p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button 
                type="button" 
                onClick={() => setVistaActual('historial')} 
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition shadow-sm"
              >
                Enviar Solicitud
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}