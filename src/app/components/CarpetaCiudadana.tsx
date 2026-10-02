import React, { useState } from 'react';
import { FileText, Receipt, AlertTriangle, Zap, MapPin, Download, Eye, Calendar, CreditCard, CheckCircle, Clock, X, Folder } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Separator } from './ui/separator';
import { Label } from './ui/label';

interface Transaccion {
  id: string;
  fecha: string;
  tipo: string;
  descripcion: string;
  monto: number;
  estado: 'completado' | 'pendiente' | 'cancelado';
  referencia: string;
}

interface Certificado {
  id: string;
  tipo: string;
  fechaSolicitud: string;
  estado: 'generado' | 'procesando' | 'pagado';
  monto: number;
  numeroSolicitud: string;
  archivos: {
    comprobante: string;
    factura: string;
    certificado: string;
  };
}

interface Deuda {
  id: string;
  modulo: string;
  descripcion: string;
  fechaVencimiento: string;
  montoOriginal: number;
  montoActual: number;
  diasVencido: number;
  estado: 'vencida' | 'por_vencer' | 'pagada';
}

interface Predio {
  id: string;
  codigoCatastral: string;
  direccion: string;
  tipoPredio: string;
  area: number;
  valorCatastral: number;
  ultimoPago: string;
  estado: 'al_dia' | 'con_deuda';
}

export function CarpetaCiudadana() {
  const [activeTab, setActiveTab] = useState('transacciones');
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [selectedPDFType, setSelectedPDFType] = useState<'comprobante' | 'factura' | 'certificado'>('comprobante');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock data
  const transacciones: Transaccion[] = [
    {
      id: '1',
      fecha: '22/07/2025',
      tipo: 'Certificado',
      descripcion: 'Certificado de No Adeudar',
      monto: 3.00,
      estado: 'completado',
      referencia: '20250722152040PMZ'
    },
    {
      id: '2',
      fecha: '20/07/2025',
      tipo: 'Impuesto Predial',
      descripcion: 'Pago Impuesto Predial 2025',
      monto: 125.76,
      estado: 'completado',
      referencia: '20250720143020PMZ'
    },
    {
      id: '3',
      fecha: '18/07/2025',
      tipo: 'Permiso',
      descripcion: 'Permiso de Construcción',
      monto: 85.50,
      estado: 'pendiente',
      referencia: '20250718091030PMZ'
    }
  ];

  const certificados: Certificado[] = [
    {
      id: '1',
      tipo: 'Certificado de No Adeudar',
      fechaSolicitud: '22/07/2025',
      estado: 'generado',
      monto: 3.00,
      numeroSolicitud: '20250722152040PMZ',
      archivos: {
        comprobante: 'comprobante_001.pdf',
        factura: 'factura_001.pdf',
        certificado: 'certificado_001.pdf'
      }
    },
    {
      id: '2',
      tipo: 'Certificado IPRUS',
      fechaSolicitud: '15/07/2025',
      estado: 'generado',
      monto: 5.00,
      numeroSolicitud: '20250715142030PMZ',
      archivos: {
        comprobante: 'comprobante_002.pdf',
        factura: 'factura_002.pdf',
        certificado: 'certificado_002.pdf'
      }
    }
  ];

  const deudas: Deuda[] = [
    {
      id: '1',
      modulo: 'Impuesto Predial',
      descripcion: 'Impuesto Predial - Predio 94009',
      fechaVencimiento: '31/12/2025',
      montoOriginal: 120.00,
      montoActual: 125.76,
      diasVencido: 0,
      estado: 'por_vencer'
    },
    {
      id: '2',
      modulo: 'Patente Municipal',
      descripcion: 'Patente Comercial 2024',
      fechaVencimiento: '31/03/2024',
      montoOriginal: 85.00,
      montoActual: 95.50,
      diasVencido: 115,
      estado: 'vencida'
    }
  ];

  const predios: Predio[] = [
    {
      id: '1',
      codigoCatastral: '0906024106002',
      direccion: 'Mz. 15 Solar 8, Condencia',
      tipoPredio: 'Residencial',
      area: 200.00,
      valorCatastral: 15000.00,
      ultimoPago: '15/01/2025',
      estado: 'al_dia'
    },
    {
      id: '2',
      codigoCatastral: '0906024106003',
      direccion: 'Mz. 16 Solar 5, Condencia',
      tipoPredio: 'Residencial',
      area: 180.00,
      valorCatastral: 13500.00,
      ultimoPago: '10/01/2025',
      estado: 'con_deuda'
    }
  ];

  // Mock data para facturación
  const facturas = [
    { id: '1', numero: '001-025-000024751', fecha: '22/07/2025', concepto: 'Certificado de No Adeudar', monto: 3.00 },
    { id: '2', numero: '001-025-000024752', fecha: '15/07/2025', concepto: 'Certificado IPRUS', monto: 5.00 }
  ];

  // Calcular números para los tabs
  const numeroTransacciones = transacciones.length;
  const numeroCertificados = certificados.length;
  const numeroDeudas = deudas.filter(d => d.estado !== 'pagada').length;
  const numeroFacturas = facturas.length;
  const numeroPredios = predios.length;

  const formatearMoneda = (valor: number) => {
    return `$${valor.toFixed(2)}`;
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'completado':
      case 'generado':
      case 'pagada':
      case 'al_dia':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completado</Badge>;
      case 'pendiente':
      case 'procesando':
      case 'por_vencer':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente</Badge>;
      case 'cancelado':
      case 'vencida':
      case 'con_deuda':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Vencida</Badge>;
      default:
        return <Badge variant="secondary">{estado}</Badge>;
    }
  };

  const verPDF = (tipo: 'comprobante' | 'factura' | 'certificado', item: any) => {
    setSelectedPDFType(tipo);
    setSelectedItem(item);
    setShowPDFViewer(true);
  };

  const renderPDFViewer = () => (
    <Dialog open={showPDFViewer} onOpenChange={setShowPDFViewer}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {selectedPDFType === 'comprobante' && 'Comprobante de Pago'}
            {selectedPDFType === 'factura' && 'Factura'}
            {selectedPDFType === 'certificado' && 'Certificado'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 bg-white border rounded-lg p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold">
                MD
              </div>
              <h1 className="text-xl font-bold text-gray-800">MUNICIPIO DE DAULE</h1>
              <p className="text-gray-600">República del Ecuador</p>
            </div>
            
            {selectedPDFType === 'comprobante' && (
              <div className="space-y-4">
                <h2 className="text-center text-lg font-bold">COMPROBANTE DE PAGO</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Número de Transacción:</Label>
                    <p className="font-medium">{selectedItem?.referencia || selectedItem?.numeroSolicitud}</p>
                  </div>
                  <div>
                    <Label>Fecha de Pago:</Label>
                    <p className="font-medium">{selectedItem?.fecha || selectedItem?.fechaSolicitud}</p>
                  </div>
                  <div>
                    <Label>Concepto:</Label>
                    <p className="font-medium">{selectedItem?.descripcion || selectedItem?.tipo}</p>
                  </div>
                  <div>
                    <Label>Monto Pagado:</Label>
                    <p className="font-medium">{formatearMoneda(selectedItem?.monto || 0)}</p>
                  </div>
                </div>
              </div>
            )}

            {selectedPDFType === 'factura' && (
              <div className="space-y-4">
                <h2 className="text-center text-lg font-bold">FACTURA</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Número de Factura:</Label>
                    <p className="font-medium">001-025-000024751</p>
                  </div>
                  <div>
                    <Label>Fecha de Emisión:</Label>
                    <p className="font-medium">{selectedItem?.fecha || selectedItem?.fechaSolicitud}</p>
                  </div>
                  <div>
                    <Label>Concepto:</Label>
                    <p className="font-medium">{selectedItem?.descripcion || selectedItem?.tipo}</p>
                  </div>
                  <div>
                    <Label>Subtotal:</Label>
                    <p className="font-medium">{formatearMoneda((selectedItem?.monto || 0) * 0.88)}</p>
                  </div>
                  <div>
                    <Label>IVA (12%):</Label>
                    <p className="font-medium">{formatearMoneda((selectedItem?.monto || 0) * 0.12)}</p>
                  </div>
                  <div>
                    <Label>Total:</Label>
                    <p className="font-medium">{formatearMoneda(selectedItem?.monto || 0)}</p>
                  </div>
                </div>
              </div>
            )}

            {selectedPDFType === 'certificado' && selectedItem?.tipo && (
              <div className="space-y-4">
                <h2 className="text-center text-lg font-bold">{selectedItem.tipo.toUpperCase()}</h2>
                <p className="text-justify">
                  El suscrito, Director de Rentas del Municipio de Daule, certifica que según los registros 
                  que reposan en esta dependencia, el/la ciudadano/a <strong>MARIANA JOSELIN WELTRON ROLDAN</strong>, 
                  portador/a de la cédula de ciudadanía <strong>0941460784</strong>, cumple con los requisitos 
                  establecidos para la expedición del presente certificado.
                </p>
                <div className="mt-8">
                  <p><strong>Número de Certificado:</strong> {selectedItem.numeroSolicitud}</p>
                  <p><strong>Fecha de Expedición:</strong> {selectedItem.fechaSolicitud}</p>
                  <p><strong>Validez:</strong> 90 días a partir de la fecha de expedición</p>
                </div>
              </div>
            )}
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
        <div className="bg-purple-600 text-white p-2 rounded">
          <Folder className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Carpeta Ciudadana</h1>
      </div>

      {/* Tabs con iconos y números */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="transacciones" className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-green-600" />
            <span className="hidden sm:inline">Transacciones</span>
            <Badge className="ml-1 h-5 min-w-[20px] text-xs bg-green-100 text-green-700 border-green-200">
              {numeroTransacciones}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="certificados" className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="hidden sm:inline">Certificados</span>
            <Badge className="ml-1 h-5 min-w-[20px] text-xs bg-blue-100 text-blue-700 border-blue-200">
              {numeroCertificados}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="deudas" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="hidden sm:inline">Deudas</span>
            <Badge className="ml-1 h-5 min-w-[20px] text-xs bg-red-100 text-red-700 border-red-200">
              {numeroDeudas}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="facturacion" className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-orange-600" />
            <span className="hidden sm:inline">Facturación</span>
            <Badge className="ml-1 h-5 min-w-[20px] text-xs bg-orange-100 text-orange-700 border-orange-200">
              {numeroFacturas}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="predios" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-purple-600" />
            <span className="hidden sm:inline">Predios</span>
            <Badge className="ml-1 h-5 min-w-[20px] text-xs bg-purple-100 text-purple-700 border-purple-200">
              {numeroPredios}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transacciones" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Historial de Transacciones</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Referencia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transacciones.map((transaccion) => (
                  <TableRow key={transaccion.id}>
                    <TableCell>{transaccion.fecha}</TableCell>
                    <TableCell>{transaccion.tipo}</TableCell>
                    <TableCell>{transaccion.descripcion}</TableCell>
                    <TableCell className="font-medium">{formatearMoneda(transaccion.monto)}</TableCell>
                    <TableCell>{getEstadoBadge(transaccion.estado)}</TableCell>
                    <TableCell className="font-mono text-sm">{transaccion.referencia}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="certificados" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Certificados Generados</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Fecha Solicitud</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Número Solicitud</TableHead>
                  <TableHead>Archivos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificados.map((certificado) => (
                  <TableRow key={certificado.id}>
                    <TableCell>{certificado.tipo}</TableCell>
                    <TableCell>{certificado.fechaSolicitud}</TableCell>
                    <TableCell>{getEstadoBadge(certificado.estado)}</TableCell>
                    <TableCell className="font-medium">{formatearMoneda(certificado.monto)}</TableCell>
                    <TableCell className="font-mono text-sm">{certificado.numeroSolicitud}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => verPDF('comprobante', certificado)}
                        >
                          <Receipt className="h-3 w-3 mr-1" />
                          Comprobante
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => verPDF('factura', certificado)}
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Factura
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => verPDF('certificado', certificado)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Certificado
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="deudas" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Deudas Pendientes</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Módulo</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Fecha Vencimiento</TableHead>
                  <TableHead>Monto Original</TableHead>
                  <TableHead>Monto Actual</TableHead>
                  <TableHead>Días Vencido</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deudas.map((deuda) => (
                  <TableRow key={deuda.id}>
                    <TableCell>{deuda.modulo}</TableCell>
                    <TableCell>{deuda.descripcion}</TableCell>
                    <TableCell>{deuda.fechaVencimiento}</TableCell>
                    <TableCell>{formatearMoneda(deuda.montoOriginal)}</TableCell>
                    <TableCell className="font-medium">{formatearMoneda(deuda.montoActual)}</TableCell>
                    <TableCell>{deuda.diasVencido} días</TableCell>
                    <TableCell>{getEstadoBadge(deuda.estado)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="facturacion" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Facturación Electrónica</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número de Factura</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facturas.map((factura) => (
                  <TableRow key={factura.id}>
                    <TableCell className="font-mono text-sm">{factura.numero}</TableCell>
                    <TableCell>{factura.fecha}</TableCell>
                    <TableCell>{factura.concepto}</TableCell>
                    <TableCell className="font-medium">{formatearMoneda(factura.monto)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => verPDF('factura', factura)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Descargar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="predios" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Mis Predios</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código Catastral</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Área (m²)</TableHead>
                  <TableHead>Valor Catastral</TableHead>
                  <TableHead>Último Pago</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {predios.map((predio) => (
                  <TableRow key={predio.id}>
                    <TableCell className="font-mono text-sm">{predio.codigoCatastral}</TableCell>
                    <TableCell>{predio.direccion}</TableCell>
                    <TableCell>{predio.tipoPredio}</TableCell>
                    <TableCell>{predio.area.toFixed(2)}</TableCell>
                    <TableCell>{formatearMoneda(predio.valorCatastral)}</TableCell>
                    <TableCell>{predio.ultimoPago}</TableCell>
                    <TableCell>{getEstadoBadge(predio.estado)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* PDF Viewer */}
      {renderPDFViewer()}
    </div>
  );
}