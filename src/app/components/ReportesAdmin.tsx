import React, { useState } from 'react';

export default function ReportesAdmin() {
  const [mensajeExport, setMensajeExport] = useState<string | null>(null);

  const exportarArchivo = (formato: 'PDF' | 'Excel') => {
    setMensajeExport(`Generando reporte institucional en formato ${formato}... Descarga exitosa.`);
    setTimeout(() => setMensajeExport(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      
      {/* Alerta de exportación */}
      {mensajeExport && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl shadow-sm flex items-center justify-between">
          <span><i className="fa-solid fa-file-arrow-down mr-2"></i> {mensajeExport}</span>
          <span className="font-bold text-xs uppercase tracking-wider">MuniTrack Analytics</span>
        </div>
      )}

      {/* Cabecera del Módulo */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Reportes y Estadísticas Avanzadas</h2>
          <p className="text-gray-500 text-sm">Tableros de indicadores de desempeño (KPIs) y métricas institucionales para la toma de decisiones[cite: 1].</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => exportarArchivo('PDF')}
            className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-semibold transition border border-rose-100 flex items-center gap-2"
          >
            <i className="fa-solid fa-file-pdf text-sm"></i> Exportar PDF
          </button>
          <button 
            onClick={() => exportarArchivo('Excel')}
            className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-semibold transition border border-emerald-100 flex items-center gap-2"
          >
            <i className="fa-solid fa-file-excel text-sm"></i> Exportar Excel
          </button>
        </div>
      </div>

      {/* Tarjetas de Resumen Estadístico */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Solicitudes (Mes)</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">1,248</h3>
          <span className="text-xs text-emerald-600 font-semibold flex items-center mt-1">
            <i className="fa-solid fa-arrow-trend-up mr-1"></i> +14.2% vs mes anterior
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Tasa de Resolución</p>
          <h3 className="text-3xl font-bold text-emerald-600 mt-2">94.5%</h3>
          <span className="text-xs text-gray-500 mt-1">Expedientes cerrados a tiempo</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Tiempo Promedio</p>
          <h3 className="text-3xl font-bold text-blue-600 mt-2">5.2 Días</h3>
          <span className="text-xs text-gray-500 mt-1">Reducción del 60% histórica</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Ahorro en Papel</p>
          <h3 className="text-3xl font-bold text-purple-600 mt-2">40%</h3>
          <span className="text-xs text-gray-500 mt-1">Optimización presupuestaria</span>
        </div>
      </div>

      {/* Sección de Gráficos Simulados por Departamentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Distribución por Departamentos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-800">Volumen de Trámites por Departamento</h3>
          <p className="text-xs text-gray-400">Distribución porcentual de la carga operativa mensual.</p>
          
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                <span>Administración Tributaria (Licencias y Solvencias)</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                <span>Urbanismo (Permisos de Construcción)</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                <span>Infraestructura (Reclamos de Servicios)</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Historial de Satisfacción Ciudadana */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-800">Índice de Satisfacción Ciudadana</h3>
          <p className="text-xs text-gray-400">Evaluación obtenida mediante encuestas digitales post-servicio.</p>

          <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">Excelente (85%)</span>
              <h4 className="text-2xl font-bold text-gray-900 mt-2">4.8 / 5.0</h4>
              <p className="text-xs text-gray-600">Basado en más de 800 valoraciones este mes.</p>
            </div>
            <div className="text-emerald-600 text-4xl font-light">
              <i className="fa-regular fa-face-smile"></i>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}