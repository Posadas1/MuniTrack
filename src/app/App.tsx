import React, { useState } from 'react';
import FlujoCiudadano from './components/FlujoCiudadano';
import PanelAdministrativo from './components/PanelAdministrativo';
import GuiaTramites from './components/GuiaTramites';
import ReportesAdmin from './components/ReportesAdmin';
import NotificacionesDropdown from './components/NotificacionesDropdown';
import LoginPage from './components/LoginPage';

export default function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [vistaActual, setVistaActual] = useState<'ciudadano' | 'admin' | 'guia' | 'reportes'>('ciudadano');

  // Si no ha iniciado sesión, mostrar la pantalla de Login / Registro
  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans antialiased">
        <header className="bg-emerald-800 text-white shadow-md py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center space-x-3">
            <div className="bg-emerald-700 p-2 rounded-xl border border-emerald-600">
              <i className="fa-solid fa-landmark text-xl"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Portal de Solicitudes Municipales</h1>
              <p className="text-xs text-emerald-200">Universidad Tecnológica de Honduras (UTH)</p>
            </div>
          </div>
        </header>

        <main className="flex-1 py-6">
          <LoginPage onLoginSuccess={() => setAutenticado(true)} />
        </main>

        <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200">
          Ingeniería de Software I • Proyecto MuniTrack
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-900">
      
      {/* Barra de Navegación Institucional */}
      <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-700 p-2 rounded-xl border border-emerald-600">
              <i className="fa-solid fa-landmark text-xl"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Portal de Solicitudes Municipales</h1>
              <p className="text-xs text-emerald-200">MuniTrack - Sesión Activa</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <nav className="flex items-center space-x-1.5 bg-emerald-900/50 p-1 rounded-xl border border-emerald-700/50">
              <button 
                onClick={() => setVistaActual('ciudadano')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${vistaActual === 'ciudadano' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}
              >
                <i className="fa-solid fa-user mr-1"></i> Ciudadano
              </button>
              <button 
                onClick={() => setVistaActual('guia')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${vistaActual === 'guia' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}
              >
                <i className="fa-solid fa-book mr-1"></i> Guía
              </button>
              <button 
                onClick={() => setVistaActual('admin')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${vistaActual === 'admin' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}
              >
                <i className="fa-solid fa-shield-halved mr-1"></i> Admin
              </button>
              <button 
                onClick={() => setVistaActual('reportes')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${vistaActual === 'reportes' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}
              >
                <i className="fa-solid fa-chart-pie mr-1"></i> Reportes
              </button>
            </nav>

            {/* Sistema de Notificaciones */}
            <NotificacionesDropdown />

            {/* Botón de Cerrar Sesión */}
            <button 
              onClick={() => setAutenticado(false)}
              className="p-2 rounded-xl bg-rose-900/50 hover:bg-rose-900 text-rose-100 hover:text-white transition border border-rose-700/50 text-xs font-semibold"
              title="Cerrar Sesión"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Dinámico */}
      <main className="py-8">
        {vistaActual === 'ciudadano' && <FlujoCiudadano />}
        {vistaActual === 'guia' && <GuiaTramites />}
        {vistaActual === 'admin' && <PanelAdministrativo />}
        {vistaActual === 'reportes' && <ReportesAdmin />}
      </main>

      {/* Pie de página institucional */}
      <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-xs text-gray-400 border-t border-gray-200 mt-12">
        Universidad Tecnológica de Honduras (UTH) • Proyecto de Ingeniería de Software I
      </footer>

    </div>
  );
}