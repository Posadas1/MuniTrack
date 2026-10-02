import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Trash2, CreditCard, RefreshCw, MapPin, Eye, CheckCircle, User, Mail, Phone, Download, AlertCircle, ArrowLeft, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';

interface Predio {
  id: number;
  codigoCorto: string;
  codigoMiduvi: string;
  ciudadela: string;
  direccion: string;
  propietario: string;
  cedula: string;
  valorCertificado: number;
}

interface Usuario {
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  direccion: string;
  telefono: string;
}

type EstadoProceso = 'seleccion' | 'pago' | 'completado';

export function CertificadoIPRUS() {
  const [predios] = useState<Predio[]>([
    {
      id: 1,
      codigoCorto: "94009",
      codigoMiduvi: "0906024106002",
      ciudadela: "CONDENCIA",
      direccion: "Mz. 15 Solar 8",
      propietario: "MARIANA JOSELIN WELTRON ROLDAN",
      cedula: "0941460784",
      valorCertificado: 20
    },
    {
      id: 2,
      codigoCorto: "94010",
      codigoMiduvi: "0906024106003",
      ciudadela: "CONDENCIA",
      direccion: "Mz. 16 Solar 5", 
      propietario: "MARIANA JOSELIN WELTRON ROLDAN",
      cedula: "0941460784",
      valorCertificado: 20
    },
    {
      id: 3,
      codigoCorto: "94011",
      codigoMiduvi: "0906024106004",
      ciudadela: "LOS ALMENDROS",
      direccion: "Mz. 5 Solar 12",
      propietario: "MARIANA JOSELIN WELTRON ROLDAN", 
      cedula: "0941460784",
      valorCertificado: 20
    },
    {
      id: 4,
      codigoCorto: "94012",
      codigoMiduvi: "0906024106005",
      ciudadela: "VILLA ESPERANZA",
      direccion: "Mz. 8 Solar 3",
      propietario: "MARIANA JOSELIN WELTRON ROLDAN",
      cedula: "0941460784", 
      valorCertificado: 20
    }
  ]);

  const [predioSeleccionado, setPredioSeleccionado] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [estadoProceso, setEstadoProceso] = useState<EstadoProceso>('seleccion');
  const [showModal, setShowModal] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [numeroSolicitud, setNumeroSolicitud] = useState('');
  const [fechaProceso, setFechaProceso] = useState('');

  // Mock usuario data
  const usuario: Usuario = {
    nombres: "MARIANA JOSELIN",
    apellidos: "WELTRON ROLDAN",
    cedula: "0941460784",
    email: "mariana.weltron@email.com",
    direccion: "Av. Principal 123, Daule, Ecuador",
    telefono: "+593 99 999 9999"
  };

  const handleSeleccionPredio = (predioId: number) => {
    // Solo permitir una selección a la vez
    setPredioSeleccionado(predioSeleccionado === predioId ? null : predioId);
  };

  const limpiarSeleccion = () => {
    setPredioSeleccionado(null);
  };

  const getPredioSeleccionado = () => {
    return predios.find(p => p.id === predioSeleccionado);
  };

  const handleConfirmacion = () => {
    if (!predioSeleccionado) {
      alert('Debe seleccionar un predio');
      return;
    }
    setShowModal(true);
  };

  const handleContinuar = () => {
    setShowModal(false);
    // Ir directamente al proceso de pago
    setEstadoProceso('pago');
  };

  const handleCancelar = () => {
    setShowModal(false);
    setEstadoProceso('seleccion');
    setPredioSeleccionado(null);
  };

  const procesarPago = () => {
    setIsProcessing(true);
    
    // Simular proceso de pago
    setTimeout(() => {
      const numeroSol = `20250722152040IPRUS`;
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
      setIsProcessing(false);
    }, 2000);
  };

  const verPDF = () => {
    setShowPDFViewer(true);
  };

  const nuevaSolicitud = () => {
    setEstadoProceso('seleccion');
    setPredioSeleccionado(null);
    setNumeroSolicitud('');
    setFechaProceso('');
    setShowPDFViewer(false);
  };

  const volverAlInicio = () => {
    window.location.reload();
  };

  const formatearMoneda = (valor: number) => {
    return `$${valor.toFixed(2)}`;
  };

  const renderSeleccionPredios = () => (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-orange-600 text-white p-2 rounded">
          <MapPin className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Certificado IPRUS - Listado de Predios</h1>
      </div>

      {/* Info Banner */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-orange-600" />
          <p className="text-orange-800">
            <strong>Listado de predios registrados a su nombre.</strong> Seleccione un predio para generar su certificado IPRUS.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabla de Predios */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Predios Registrados</h2>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                {predios.length} predios encontrados
              </Badge>
            </div>



            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Seleccionar</TableHead>
                    <TableHead>Código Corto</TableHead>
                    <TableHead>Código Miduvi</TableHead>
                    <TableHead>Ciudadela</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {predios.map((predio) => (
                    <TableRow key={predio.id} className={predioSeleccionado === predio.id ? 'bg-orange-50' : ''}>
                      <TableCell>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="predio"
                            value={predio.id}
                            checked={predioSeleccionado === predio.id}
                            onChange={() => handleSeleccionPredio(predio.id)}
                            className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm font-medium text-blue-600">
                        {predio.codigoCorto}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-blue-600">
                        {predio.codigoMiduvi}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-blue-700">
                          {predio.ciudadela}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={predio.direccion}>
                          {predio.direccion}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-green-600">
                        {formatearMoneda(predio.valorCertificado)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {predios.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No se encontraron predios registrados</p>
              </div>
            )}
          </Card>
        </div>

        {/* Panel de Certificado */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <h2 className="text-lg font-medium">Certificado IPRUS</h2>
              </div>
              <Badge variant="secondary" className={predioSeleccionado ? "bg-orange-100 text-orange-700" : ""}>
                {predioSeleccionado ? "1" : "0"} seleccionado
              </Badge>
            </div>

            {predioSeleccionado ? (
              <>
                <div className="space-y-3 mb-4">
                  {(() => {
                    const predio = getPredioSeleccionado();
                    return predio && (
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <Label className="text-xs text-gray-600">Código Corto:</Label>
                            <span className="font-mono text-sm font-medium text-blue-600">
                              {predio.codigoCorto}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-start">
                            <Label className="text-xs text-gray-600">Código Miduvi:</Label>
                            <span className="font-mono text-xs text-blue-600">
                              {predio.codigoMiduvi}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-start">
                            <Label className="text-xs text-gray-600">Ciudadela:</Label>
                            <span className="text-sm font-medium text-blue-700">
                              {predio.ciudadela}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-start">
                            <Label className="text-xs text-gray-600">Dirección:</Label>
                            <span className="text-sm text-right">
                              {predio.direccion}
                            </span>
                          </div>
                          
                          <Separator className="my-2" />
                          
                          <div className="flex justify-between items-center">
                            <Label className="text-sm font-medium">Valor:</Label>
                            <span className="text-lg font-bold text-green-600">
                              {formatearMoneda(predio.valorCertificado)}
                            </span>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={limpiarSeleccion}
                          className="w-full mt-3 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Limpiar Selección
                        </Button>
                      </div>
                    );
                  })()}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <Label className="text-sm font-medium text-blue-800">
                        Información del Certificado
                      </Label>
                    </div>
                    <div className="text-xs text-blue-700 space-y-1">
                      <p>• Certificado válido por 90 días</p>
                      <p>• Enviado al correo electrónico</p>
                      <p>• Verificable en línea</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Total a Pagar:</span>
                    <span className="text-lg font-bold text-green-600">
                      {formatearMoneda(getPredioSeleccionado()?.valorCertificado || 0)}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    onClick={handleConfirmacion}
                    className="w-full"
                    style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceder al Pago
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium mb-1">Selecciona un predio</p>
                <p className="text-sm">Elige el predio para el cual deseas generar el certificado IPRUS</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );

  const renderPago = () => (
    <Card className="p-6">
      <h2 className="text-lg font-medium mb-4">Proceso de Pago</h2>
      
      <div className="text-center py-8">
        <CreditCard className="h-16 w-16 mx-auto mb-4 text-blue-600" />
        <h3 className="text-lg font-medium mb-2">Procesando Pago</h3>
        <p className="text-gray-600 mb-6">
          Se está procesando su solicitud de certificado IPRUS
        </p>
        
        <Button
          onClick={procesarPago}
          disabled={isProcessing}
          size="lg"
          style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              Procesando Pago...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5 mr-2" />
              Pagar ${getPredioSeleccionado()?.valorCertificado}.00
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
              <p className="font-medium">$ {getPredioSeleccionado()?.valorCertificado}.00</p>
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
          <DialogTitle>Certificado IPRUS Generado</DialogTitle>
          <DialogDescription>
            Certificado IPRUS - {numeroSolicitud}
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
                CERTIFICADO IPRUS
              </h2>
              
              <p className="text-justify mb-6">
                El suscrito, Director de Rentas del Municipio de Daule, certifica que según los registros 
                que reposan en esta dependencia, el predio con código <strong>{getPredioSeleccionado()?.codigoCorto}</strong> 
                y código MIDUVI <strong>{getPredioSeleccionado()?.codigoMiduvi}</strong>, ubicado en 
                <strong> {getPredioSeleccionado()?.ciudadela}</strong>, dirección <strong>{getPredioSeleccionado()?.direccion}</strong>, 
                a nombre de <strong>{usuario?.nombres} {usuario?.apellidos}</strong>, 
                portador/a de la cédula de ciudadanía <strong>{usuario?.cedula}</strong>, 
                se encuentra debidamente registrado en el Sistema IPRUS (Inventario de Predios Rurales, 
                Urbanos y Servicios) del municipio.
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
                  <p><strong>Código Predio:</strong> {getPredioSeleccionado()?.codigoCorto}</p>
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
      {/* Renderizar contenido según el estado */}
      {estadoProceso === 'seleccion' && renderSeleccionPredios()}
      
      {estadoProceso === 'pago' && (
        <div>
          {/* Page Title */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-600 text-white p-2 rounded">
              <MapPin className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Certificado IPRUS - Pago</h1>
          </div>
          {renderPago()}
        </div>
      )}

      {estadoProceso === 'completado' && (
        <div>
          {/* Page Title */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-green-600 text-white p-2 rounded">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Certificado IPRUS - Completado</h1>
          </div>
          {renderCompletado()}
        </div>
      )}

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
                  <strong>IMPORTANTE:</strong> ¿Está seguro de solicitar el Certificado IPRUS para el predio seleccionado?
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800">
                    Este tiene un costo de <strong>${getPredioSeleccionado()?.valorCertificado}.00</strong> y será enviado 
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