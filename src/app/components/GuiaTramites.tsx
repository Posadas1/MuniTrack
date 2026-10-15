import React, { useState } from 'react';

interface TramiteGuia {
  id: string;
  titulo: string;
  departamento: string;
  tiempoEstimado: string;
  costo: string;
  requisitos: string[];
  descripcion: string;
}

export default function GuiaTramites() {
  const [busqueda, setBusqueda] = useState('');

  const tramitesGuia: TramiteGuia[] = [
    {
      id: '1',
      titulo: 'Licencia de Operación Comercial',
      departamento: 'Administración Tributaria',
      tiempoEstimado: '3 a 5 días hábiles',
      costo: 'Variable según giro comercial',
      requisitos: [
        'Copia de identidad del propietario o representante legal',
        'RTN numérico actualizado',
        'Contrato de arrendamiento o escritura del local',
        'Inspección previa de bomberos y salubridad'
      ],
      descripcion: 'Permiso obligatorio para operar cualquier establecimiento comercial, industrial o de servicios dentro del municipio.'
    },
    {
      id: '2',
      titulo: 'Permiso de Construcción',
      departamento: 'Urbanismo',
      tiempoEstimado: '5 a 10 días hábiles',
      costo: 'Basado en el presupuesto de obra',
      requisitos: [
        'Planos arquitectónicos y estructurales firmados por ingeniero colegiado',
        'Solvencia municipal del propietario',
        'Constancia de uso de suelo',
        'Copia de escritura pública del terreno'
      ],
      descripcion: 'Autorización técnica y legal para realizar obras nuevas, ampliaciones, remodelaciones o demoliciones.'
    },
    {
      id: '3',
      titulo: 'Solvencia Municipal',
      departamento: 'Administración Tributaria',
      tiempoEstimado: 'Inmediato (En línea)',
      costo: 'L. 100.00',
      requisitos: [
        'Estar al día con el pago de tasas e impuestos municipales',
        'Número de cuenta catastral o clave de contribuyente'
      ],
      descripcion: 'Documento oficial que certifica que el ciudadano o empresa no mantiene deudas pendientes con la municipalidad.'
    },
    {
      id: '4',
      titulo: 'Reclamo por Servicios Públicos',
      departamento: 'Infraestructura',
      tiempoEstimado: '2 a 4 días hábiles',
      costo: 'Gratuito',
      requisitos: [
        'Número de recibo o contrato de servicio',
        'Evidencia fotográfica o descripción detallada de la avería'
      ],
      descripcion: 'Canal de reporte para incidencias relacionadas con alumbrado público, bacheo de calles o sistemas municipales.'
    }
  ];

  const tramitesFiltrados = tramitesGuia.filter(t => 
    t.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
    t.departamento.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      
      {/* Cabecera */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Guía de Trámites y Requisitos</h2>
          <p className="text-gray-500 text-sm">Consulta la información necesaria antes de iniciar tus solicitudes en el portal[cite: 1].</p>
        </div>
        <div className="w-full md:w-72">
          <input 
            type="text" 
            placeholder="Buscar trámite o departamento..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Lista de Trámites en Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tramitesFiltrados.map((tramite) => (
          <div key={tramite.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {tramite.departamento}
                </span>
                <span className="text-xs text-gray-400 font-medium"><i className="fa-regular fa-clock mr-1"></i> {tramite.tiempoEstimado}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{tramite.titulo}</h3>
              <p className="text-sm text-gray-600">{tramite.descripcion}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Requisitos Principales:</p>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                {tramite.requisitos.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-xs font-medium text-gray-500">Costo aproximado: <strong className="text-gray-800">{tramite.costo}</strong></span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}