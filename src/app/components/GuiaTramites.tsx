import React, { useState } from 'react';
import { Info, FileText, CreditCard, Clock, CheckCircle, Play, Users, DollarSign, Calendar, Shield, Building } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export function GuiaTramites() {
  const [activeTab, setActiveTab] = useState('certificado-no-adeudar');

  const tramites = [
    {
      id: 'certificado-no-adeudar',
      title: 'Certificado de no adeudar',
      icon: FileText,
      costo: '$6.00',
      tiempo: 'Inmediato',
      descripcion: 'Emisión de certificado de no adeudar'
    },
    {
      id: 'certificado-estar-al-dia',
      title: 'Certificado de estar al día',
      icon: Shield,
      costo: '$6.00',
      tiempo: 'Inmediato',
      descripcion: 'Emisión de certificado de estar al día'
    },
    {
      id: 'certificado-no-adeudar-predio',
      title: 'Certificado de no adeudar al predio',
      icon: Building,
      costo: '$6.00',
      tiempo: 'Inmediato',
      descripcion: 'Emisión de certificado de no adeudar al predio'
    }
  ];

  const procedimientoEnLinea = [
    'Inicie sesión con Cédula o RUC y contraseña.',
    'De clic en la opción Trámites en línea → Crear nuevo trámite.',
    'Seleccione el trámite correspondiente.',
    'Ingrese los datos del formulario y de clic en Crear.',
    'Espere la notificación del valor a cancelar por concepto del certificado. El costo de la tasa es $6.00.',
    'Cancele el valor del trámite en la opción de Deudas Pendientes, si no realiza el pago en un lapso de 24 horas se procederá archivar la solicitud.',
    'Descargue el Certificado en formato PDF desde el Portal de Servicio.'
  ];

  const procedimientoPresencial = [
    'El usuario deberá presentar su cédula de ciudadanía en las ventanillas de tesorería e indicar un correo electrónico.',
    'La recaudadora revisa en el sistema si no mantiene deudas pendientes de pago.',
    'El usuario deberá hacer el pago por la certificación correspondiente.',
    'Se hará entrega de la tasa general de trámite al usuario.'
  ];

  const formasPago = [
    'Tarjetas de Crédito del Grupo Diners Club y Pichincha',
    'Tarjetas de Débito Visa y MasterCard'
  ];

  const usosFreuentes = [
    'Trámites de Avalúos',
    'Trámites de Ordenamiento Territorial',
    'Legalización de Solares'
  ];

  const dirigidoA = [
    'Persona Jurídica – Privada',
    'Persona Jurídica, Pública',
    'Persona Natural, Ecuatoriana',
    'Persona Natural Extranjera'
  ];

  const getVideoTitle = (tabId: string) => {
    switch (tabId) {
      case 'certificado-no-adeudar':
        return '¿Cómo solicitar el Certificado de no adeudar?';
      case 'certificado-estar-al-dia':
        return '¿Cómo solicitar el Certificado de estar al día?';
      case 'certificado-no-adeudar-predio':
        return '¿Cómo solicitar el Certificado de no adeudar al predio?';
      default:
        return '¿Cómo solicitar el certificado?';
    }
  };

  const getButtonTitle = (tabId: string) => {
    switch (tabId) {
      case 'certificado-no-adeudar':
        return 'Solicitar Certificado de No Adeudar';
      case 'certificado-estar-al-dia':
        return 'Solicitar Certificado de Estar al Día';
      case 'certificado-no-adeudar-predio':
        return 'Solicitar Certificado de No Adeudar al Predio';
      default:
        return 'Solicitar Certificado';
    }
  };

  const renderCertificado = (tabId: string) => (
    <div className="space-y-8">
      {/* Video Instructivo */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Play className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-medium">{getVideoTitle(tabId)}</h3>
        </div>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <Play className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h4 className="text-lg font-medium mb-2">Video Instructivo</h4>
          <p className="text-gray-600 mb-4">
            Aprende paso a paso cómo solicitar tu certificado de manera fácil y rápida
          </p>
          <Button 
            style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
            className="inline-flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Reproducir Video
          </Button>
        </div>
      </Card>

      {/* Procedimientos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Procedimiento en línea</h3>
          </div>
          <ol className="space-y-3">
            {procedimientoEnLinea.map((paso, index) => (
              <li key={index} className="flex gap-3">
                <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{paso}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-medium">Procedimiento presencial</h3>
          </div>
          <ol className="space-y-3">
            {procedimientoPresencial.map((paso, index) => (
              <li key={index} className="flex gap-3">
                <span className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{paso}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      {/* Información Detallada */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-medium">Costo del Trámite</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 mb-2">$6.00</p>
          <p className="text-gray-600">Tasa por el servicio de certificación</p>
          
          <Separator className="my-4" />
          
          <h4 className="font-medium mb-3">Formas de Pago</h4>
          <ul className="space-y-2">
            {formasPago.map((forma, index) => (
              <li key={index} className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{forma}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-medium">Dirigido a</h3>
          </div>
          <ul className="space-y-2">
            {dirigidoA.map((tipo, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">{tipo}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-medium">Usos Frecuentes</h3>
          </div>
          <ul className="space-y-2">
            {usosFreuentes.map((uso, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">{uso}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Requisitos y Tiempo de Entrega */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-medium">Requisitos</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Realizar el pago desde el portal de servicios</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Ingresar todos los datos del formulario</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-medium">Tiempo de Entrega</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Calendar className="h-3 w-3 mr-1" />
              Inmediato
            </Badge>
            <span className="text-gray-600">en horario laboral</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            El certificado se genera automáticamente una vez completado el pago y verificados los datos.
          </p>
        </Card>
      </div>

      {/* Acción Principal */}
      <div className="text-center">
        <Button 
          size="lg"
          style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
          className="inline-flex items-center gap-2"
        >
          <FileText className="h-5 w-5" />
          {getButtonTitle(tabId)}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-600 text-white p-2 rounded">
          <Info className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Guía de Trámites</h1>
      </div>

      {/* Welcome Message */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
        <p className="text-indigo-800">
          <strong>Centro de Ayuda</strong> - Encuentra información detallada sobre todos los trámites y procedimientos municipales.
        </p>
      </div>

      {/* Trámites Disponibles */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Certificados Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tramites.map((tramite) => {
            const Icon = tramite.icon;
            return (
              <div
                key={tramite.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  activeTab === tramite.id 
                    ? 'border-indigo-300 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
                onClick={() => setActiveTab(tramite.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{tramite.title}</h3>
                    <p className="text-sm text-gray-600">{tramite.descripcion}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-green-600">
                    {tramite.costo}
                  </Badge>
                  <Badge variant="outline" className="text-blue-600">
                    {tramite.tiempo}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Contenido del Certificado Seleccionado */}
      {renderCertificado(activeTab)}
    </div>
  );
}