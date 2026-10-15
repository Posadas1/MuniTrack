import React, { useState } from 'react';

interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  tiempo: string;
  leida: boolean;
  tipo: 'aprobado' | 'revision' | 'observado';
}

export default function NotificacionesDropdown() {
  const [abierto, setAbierto] = useState(false);
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: '1',
      titulo: 'Trámite Aprobado',
      mensaje: 'Tu solicitud de Solvencia Municipal (#TR-9410) ha sido aprobada con éxito.',
      tiempo: 'Hace 10 minutos',
      leida: false,
      tipo: 'aprobado'
    },
    {
      id: '2',
      titulo: 'Cambio de Estado',
      mensaje: 'Licencia de Operación Comercial (#TR-9482) pasó a estado En Revisión.',
      tiempo: 'Hace 2 horas',
      leida: false,
      tipo: 'revision'
    },
    {
      id: '3',
      titulo: 'Observación en Trámite',
      mensaje: 'Permiso de Construcción (#TR-9355) requiere adjuntar planos firmados.',
      tiempo: 'Ayer',
      leida: true,
      tipo: 'observado'
    }
  ]);

  const noLeidas = notificaciones.filter(n => !n.leida).length;

  const marcarTodasComoLeidas = () => {
    setNotificaciones(notificaciones.map(n => ({ ...n, leida: true })));
  };

  const obtenerIcono = (tipo: Notificacion['tipo']) => {
    switch (tipo) {
      case 'aprobado': return <i className="fa-solid fa-circle-check text-emerald-600 bg-emerald-50 p-2 rounded-full"></i>;
      case 'revision': return <i className="fa-solid fa-clock text-blue-600 bg-blue-50 p-2 rounded-full"></i>;
      case 'observado': return <i className="fa-solid fa-triangle-exclamation text-amber-600 bg-amber-50 p-2 rounded-full"></i>;
    }
  };

  return (
    <div className="relative">
      {/* Botón de la Campana */}
      <button 
        onClick={() => setAbierto(!abierto)}
        className="relative p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 hover:text-white transition flex items-center justify-center border border-emerald-700/50"
        title="Notificaciones"
      >
        <i className="fa-solid fa-bell text-lg"></i>
        {noLeidas > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm border-2 border-emerald-800">
            {noLeidas}
          </span>
        )}
      </button>

      {/* Menú Desplegable de Notificaciones */}
      {abierto && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 text-gray-900 animate-in fade-in slide-in-from-top-2 duration-200">
          
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h4 className="font-bold text-sm text-gray-800">Notificaciones</h4>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {noLeidas} nuevas
              </span>
            </div>
            {noLeidas > 0 && (
              <button 
                onClick={marcarTodasComoLeidas}
                className="text-xs text-emerald-700 hover:underline font-medium"
              >
                Marcar leídas
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {notificaciones.length > 0 ? (
              notificaciones.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-4 flex items-start space-x-3 transition hover:bg-gray-50 ${!notif.leida ? 'bg-emerald-50/30' : ''}`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {obtenerIcono(notif.tipo)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold text-gray-800">{notif.titulo}</p>
                      <span className="text-[10px] text-gray-400">{notif.tiempo}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{notif.mensaje}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-400 text-xs">
                No tienes notificaciones recientes.
              </div>
            )}
          </div>

          <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400">Sistema automatizado de alertas municipales[cite: 1]</span>
          </div>

        </div>
      )}
    </div>
  );
}