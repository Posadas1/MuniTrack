import React, { useState, useEffect } from 'react';
import { Search, CreditCard, RefreshCw, User, MapPin, Mail, Phone, Download, CheckCircle, X, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface Usuario {
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  direccion: string;
  telefono: string;
}

type TipoCertificado = 'no-adeudar' | 'estar-al-dia' | 'no-adeudar-predio';

type EstadoProceso = 'consulta' | 'confirmacion' | 'pago' | 'completado';

export function SolicitudCertificado() {
  const [consulta, setConsulta] = useState({
    documento: '',
    captcha: '',
    tipoCertificado: '' as TipoCertificado | ''
  });
  const [captchaOperacion, setCaptchaOperacion] = useState({ num1: 0, num2: 0, resultado: 0 });
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [estadoProceso, setEstadoProceso] = useState<EstadoProceso>('consulta');
  const [showModal, setShowModal] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [numeroSolicitud, setNumeroSolicitud] = useState('');
  const [fechaProceso, setFechaProceso] = useState('');

  // Generar captcha numérico
  const generarCaptcha = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const resultado = num1 + num2;
    setCaptchaOperacion({ num1, num2, resultado });
    setConsulta(prev => ({ ...prev, captcha: '' }));
  };

  useEffect(() => {
    generarCaptcha();
  }, []);

  // Mock usuario data
  const mockUsuario: Usuario = {
    nombres: "MARIANA JOSELIN",
    apellidos: "WELTRON ROLDAN",
    cedula: "0941460784",
    email: "mariana.weltron@email.com",
    direccion: "Av. Principal 123, Daule, Ecuador",
    telefono: "+593 99 999 9999"
  };

  const tiposCertificado = {
    'no-adeudar': {
      nombre: 'Certificado de No Adeudar',
      descripcion: 'Certifica que no mantiene deudas pendientes con el municipio',
      costo: 3
    },
    'estar-al-dia': {
      nombre: 'Certificado de Estar al Día',
      descripcion: 'Certifica que sus obligaciones están al día',
      costo: 3
    },
    'no-adeudar-predio': {
      nombre: 'Certificado de No Adeudar al Predio',
      descripción: 'Certifica que el predio no mantiene deudas municipales',
      costo: 3
    }
  };

  const handleConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar captcha
    if (parseInt(consulta.captcha) !== captchaOperacion.resultado) {
      alert('El captcha es incorrecto');
      generarCaptcha();
      return;
    }

    if (!consulta.tipoCertificado) {
      alert('Seleccione el tipo de certificado');
      return;
    }

    setIsLoading(true);
    
    // Simular llamada API
    setTimeout(() => {
      setUsuario(mockUsuario);
      setEstadoProceso('confirmacion');
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsulta({
      ...consulta,
      [e.target.name]: e.target.value
    });
  };

  const handleTipoCertificadoChange = (value: string) => {
    setConsulta({
      ...consulta,
      tipoCertificado: value as TipoCertificado
    });
  };

  const handleConfirmacion = () => {
    setShowModal(true);
  };

  const handleContinuar = () => {
    setShowModal(false);
    setEstadoProceso('pago');
  };

  const handleCancelar = () => {
    setShowModal(false);
    setEstadoProceso('consulta');
    setUsuario(null);
    setConsulta({ documento: '', captcha: '', tipoCertificado: '' });
    generarCaptcha();
  };

  const procesarPago = () => {
    setIsLoading(true);
    
    // Simular proceso de pago
    setTimeout(() => {
      const numeroSol = `20250722152040PMZ`;
      const fecha = new Date().toLocaleDateString('es-EC', { 
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric'
      }) + ', ' + new Date().toLocaleTimeString('es-EC', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      setNumeroSolicitud(numeroSol);
      setFechaProceso(fecha);
      setEstadoProceso('completado');
      setIsLoading(false);
    }, 2000);
  };

  const verPDF = () => {
    setShowPDFViewer(true);
  };

  const nuevaSolicitud = () => {
    setEstadoProceso('consulta');
    setUsuario(null);
    setConsulta({ documento: '', captcha: '', tipoCertificado: '' });
    setNumeroSolicitud('');
    setFechaProceso('');
    setShowPDFViewer(false);
    generarCaptcha();
  };

  const volverAlInicio = () => {
    window.location.reload();
  };

  const renderFormularioConsulta = () => (
    <Card className="p-6">
      <h2 className="text-lg font-medium mb-4">Solicitar Certificado</h2>
      <form onSubmit={handleConsulta} className="space-y-4">
        <div>
          <Label htmlFor="tipoCertificado">Tipo de Certificado</Label>
          <Select value={consulta.tipoCertificado} onValueChange={handleTipoCertificadoChange}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione el tipo de certificado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-adeudar">Certificado de No Adeudar ($3.00)</SelectItem>
              <SelectItem value="estar-al-dia">Certificado de Estar al Día ($3.00)</SelectItem>
              <SelectItem value="no-adeudar-predio">Certificado de No Adeudar al Predio ($3.00)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="documento">Cédula / RUC</Label>
            <Input
              id="documento"
              name="documento"
              type="text"
              required
              value={consulta.documento}
              onChange={handleInputChange}
              placeholder="Ingrese su cédula o RUC"
              maxLength={13}
            />
          </div>
          
          <div>
            <Label htmlFor="captcha">
              Captcha: ¿Cuánto es {captchaOperacion.num1} + {captchaOperacion.num2}?
            </Label>
            <div className="flex gap-2">
              <Input
                id="captcha"
                name="captcha"
                type="number"
                required
                value={consulta.captcha}
                onChange={handleInputChange}
                placeholder="Respuesta"
              />
              <Button
                type="button"
                variant="outline"
                onClick={generarCaptcha}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full md:w-auto"
          style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Consultando...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Consultar
            </>
          )}
        </Button>
      </form>
    </Card>
  );

  const renderDatosUsuario = () => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Información del Solicitante</h2>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Usuario Verificado
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <Label>Nombres y Apellidos</Label>
              <p className="font-medium">{usuario?.nombres} {usuario?.apellidos}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <Label>Cédula</Label>
              <p className="font-medium">{usuario?.cedula}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <div>
              <Label>Teléfono</Label>
              <p className="font-medium">{usuario?.telefono}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <div>
              <Label>Correo Electrónico</Label>
              <p className="font-medium">{usuario?.email}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-500 mt-1" />
            <div>
              <Label>Dirección</Label>
              <p className="font-medium">{usuario?.direccion}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderResumenSolicitud = () => {
    const certificado = tiposCertificado[consulta.tipoCertificado as TipoCertificado];
    
    return (
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Resumen de Solicitud</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <Label>Certificado Solicitado</Label>
              <p className="font-medium">{certificado?.nombre}</p>
              <p className="text-sm text-gray-500">{certificado?.descripcion}</p>
            </div>
            <Badge variant="secondary" className="ml-4">
              ${certificado?.costo}.00
            </Badge>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Total a Pagar:</span>
            <span className="text-lg font-bold text-green-600">
              ${certificado?.costo}.00
            </span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={handleCancelar}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmacion}
            className="flex-1"
            style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
          >
            Continuar
          </Button>
        </div>
      </Card>
    );
  };

  const renderPago = () => (
    <Card className="p-6">
      <h2 className="text-lg font-medium mb-4">Proceso de Pago</h2>
      
      <div className="text-center py-8">
        <CreditCard className="h-16 w-16 mx-auto mb-4 text-blue-600" />
        <h3 className="text-lg font-medium mb-2">Procesando Pago</h3>
        <p className="text-gray-600 mb-6">
          Se está procesando su solicitud de certificado
        </p>
        
        <Button
          onClick={procesarPago}
          disabled={isLoading}
          size="lg"
          style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              Procesando Pago...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5 mr-2" />
              Pagar ${tiposCertificado[consulta.tipoCertificado as TipoCertificado]?.costo}.00
            </>
          )}
        </Button>
      </div>
    </Card>
  );

  const renderCompletado = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-medium mb-4">¡Pago Exitoso!</h2>
          <p className="text-gray-600 mb-6">
            El pago se ha procesado correctamente, por favor revise su correo electrónico para obtener los comprobantes de pago
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-600">Fecha</Label>
              <p className="font-medium">{fechaProceso}</p>
            </div>
            <div>
              <Label className="text-gray-600">Referencia</Label>
              <p className="font-medium">{numeroSolicitud}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-600">Estado</Label>
              <p className="font-medium text-green-600">APROBADO</p>
            </div>
            <div>
              <Label className="text-gray-600">Monto</Label>
              <p className="font-medium">$ {tiposCertificado[consulta.tipoCertificado as TipoCertificado]?.costo}.00</p>
            </div>
          </div>

          <div>
            <Label className="text-gray-600 block mb-2">Facturas Pagadas:</Label>
            <ul className="list-disc list-inside">
              <li className="text-blue-600 hover:underline cursor-pointer">
                001-025-000024751
              </li>
            </ul>
          </div>

          <div className="flex gap-3 justify-center pt-6">
            <Button
              onClick={verPDF}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Ver Certificado PDF
            </Button>
            <Button
              onClick={volverAlInicio}
              style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Inicio
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPDFViewer = () => (
    <Dialog open={showPDFViewer} onOpenChange={setShowPDFViewer}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Certificado Generado</DialogTitle>
          <DialogDescription>
            {tiposCertificado[consulta.tipoCertificado as TipoCertificado]?.nombre} - {numeroSolicitud}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 bg-white border rounded-lg p-8 overflow-y-auto">
          {/* Simulación de PDF */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold">
                MD
              </div>
              <h1 className="text-xl font-bold text-gray-800">MUNICIPIO DE DAULE</h1>
              <p className="text-gray-600">República del Ecuador</p>
            </div>
            
            <div className="border-t-2 border-blue-600 pt-6 mb-6">
              <h2 className="text-center text-lg font-bold mb-6">
                {tiposCertificado[consulta.tipoCertificado as TipoCertificado]?.nombre.toUpperCase()}
              </h2>
              
              <p className="text-justify mb-6">
                El suscrito, Director de Rentas del Municipio de Daule, certifica que según los registros 
                que reposan en esta dependencia, el/la ciudadano/a <strong>{usuario?.nombres} {usuario?.apellidos}</strong>, 
                portador/a de la cédula de ciudadanía <strong>{usuario?.cedula}</strong>, 
                {consulta.tipoCertificado === 'no-adeudar' && ' NO REGISTRA DEUDAS PENDIENTES '}
                {consulta.tipoCertificado === 'estar-al-dia' && ' SE ENCUENTRA AL DÍA '}
                {consulta.tipoCertificado === 'no-adeudar-predio' && ' NO REGISTRA DEUDAS DE PREDIO '}
                con este Municipio hasta la fecha de expedición del presente certificado.
              </p>
              
              <p className="mb-6">
                El presente certificado se expide a solicitud del interesado para los fines legales 
                que estime convenientes.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <p><strong>Número de Solicitud:</strong> {numeroSolicitud}</p>
                  <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-EC', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p><strong>Hora:</strong> {new Date().toLocaleTimeString('es-EC')}</p>
                </div>
                
                <div className="text-center">
                  <div className="border-t border-gray-400 mt-16 pt-2">
                    <p className="font-bold">Director de Rentas</p>
                    <p>Municipio de Daule</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-xs text-gray-500 mt-8">
              <p>Este documento es válido únicamente con la firma y sello correspondiente</p>
              <p>Verificable en: www.daule.gob.ec - Código de verificación: {numeroSolicitud}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            onClick={() => setShowPDFViewer(false)}
            variant="outline"
          >
            Cerrar
          </Button>
          <Button
            style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
          >
            <Download className="h-4 w-4 mr-2" />
            Descargar PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-green-600 text-white p-2 rounded">
          <CheckCircle className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Solicitud de Certificados</h1>
      </div>

      {/* Renderizar contenido según el estado */}
      {estadoProceso === 'consulta' && renderFormularioConsulta()}
      
      {estadoProceso === 'confirmacion' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {renderDatosUsuario()}
          </div>
          <div>
            {renderResumenSolicitud()}
          </div>
        </div>
      )}
      
      {estadoProceso === 'pago' && renderPago()}
      {estadoProceso === 'completado' && renderCompletado()}

      {/* Modal de confirmación */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Confirmación de Solicitud
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4">
                <p>
                  <strong>IMPORTANTE:</strong> ¿Está seguro de solicitar el {tiposCertificado[consulta.tipoCertificado as TipoCertificado]?.nombre.toLowerCase()}?
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800">
                    Este tiene un costo de <strong>${tiposCertificado[consulta.tipoCertificado as TipoCertificado]?.costo}.00</strong> y será enviado 
                    a su correo electrónico una vez se complete la solicitud.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleCancelar}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleContinuar}
              style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
            >
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PDF Viewer */}
      {renderPDFViewer()}
    </div>
  );
}