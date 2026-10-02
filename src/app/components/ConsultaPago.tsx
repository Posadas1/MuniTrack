import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Trash2, CreditCard, RefreshCw, Eye, Plus, Minus, CheckCircle, Download, ArrowLeft, AlertCircle, Receipt } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

interface Obligacion {
  id: number;
  modulo: string;
  idPropietarioEmision: number;
  nombre: string;
  apellido: string;
  cedula: string;
  nroFactura: string | null;
  totalTarifa: number;
  valorTotalNeto: number;
  fechaCreacion: string;
  usuarioCreacion: string;
  concepto: string;
  idModulo: number;
  referencia: string;
  direccion: string;
  interes: number;
  descuentoRecargo: number;
  isCoactiva: boolean;
  transaction_id: string | null;
  authorized_code: string | null;
  facturaDetalles: Array<{
    id: number;
    rubroDescripcion: string;
    cantidad: number;
    valorUnitario: number;
    estado: number;
  }>;
}

type EstadoProceso = 'consulta' | 'pago' | 'completado';

export function ConsultaPago() {
  const [metodoConsulta, setMetodoConsulta] = useState<'cedula' | 'catastral'>('cedula');
  const [consulta, setConsulta] = useState({
    documento: '',
    claveCatastral: '',
    captcha: '',
    captchaRespuesta: ''
  });
  const [captchaOperacion, setCaptchaOperacion] = useState({ num1: 0, num2: 0, resultado: 0 });
  const [obligaciones, setObligaciones] = useState<Obligacion[]>([]);
  const [filtroModulo, setFiltroModulo] = useState('todos');
  const [carrito, setCarrito] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [estadoProceso, setEstadoProceso] = useState<EstadoProceso>('consulta');
  const [showModal, setShowModal] = useState(false);
  const [numeroSolicitud, setNumeroSolicitud] = useState('');
  const [fechaProceso, setFechaProceso] = useState('');

  // Generar captcha numérico
  const generarCaptcha = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const resultado = num1 + num2;
    setCaptchaOperacion({ num1, num2, resultado });
    setConsulta(prev => ({ ...prev, captcha: '', captchaRespuesta: '' }));
  };

  useEffect(() => {
    generarCaptcha();
  }, []);

  // Datos mock basados en el JSON proporcionado
  const mockObligaciones: Obligacion[] = [
    {
      id: 19456905,
      modulo: "Formularios",
      idPropietarioEmision: 167749,
      nombre: "MARIANA JOSELIN",
      apellido: "WELTRON ROLDAN",
      cedula: "0941460784",
      nroFactura: null,
      totalTarifa: 20,
      valorTotalNeto: 20,
      fechaCreacion: "2025-07-11",
      usuarioCreacion: "290",
      concepto: "Certificado en Linea -Reporte Pugs Nro: 44-44 Asunto: Solicitud de certificado IPRUS",
      idModulo: 21,
      referencia: "19456905",
      direccion: "DIRECCION",
      interes: 0,
      descuentoRecargo: 0,
      isCoactiva: false,
      transaction_id: null,
      authorized_code: null,
      facturaDetalles: [
        {
          id: 11906892,
          rubroDescripcion: " TASA CERTIFICADOS OTROS",
          cantidad: 1,
          valorUnitario: 20,
          estado: 1
        }
      ]
    },
    {
      id: 19456874,
      modulo: "Predial",
      idPropietarioEmision: 167749,
      nombre: "MARIANA JOSELIN",
      apellido: "WELTRON ROLDAN",
      cedula: "0941460784",
      nroFactura: null,
      totalTarifa: 150,
      valorTotalNeto: 150,
      fechaCreacion: "2025-07-09",
      usuarioCreacion: "290",
      concepto: "Impuesto Predial Año 2024",
      idModulo: 22,
      referencia: "19456874",
      direccion: "DIRECCION",
      interes: 5,
      descuentoRecargo: 0,
      isCoactiva: false,
      transaction_id: null,
      authorized_code: null,
      facturaDetalles: [
        {
          id: 11906845,
          rubroDescripcion: "IMPUESTO PREDIAL",
          cantidad: 1,
          valorUnitario: 150,
          estado: 1
        }
      ]
    },
    {
      id: 19456878,
      modulo: "Patente",
      idPropietarioEmision: 167749,
      nombre: "MARIANA JOSELIN",
      apellido: "WELTRON ROLDAN",
      cedula: "0941460784",
      nroFactura: null,
      totalTarifa: 75,
      valorTotalNeto: 75,
      fechaCreacion: "2025-07-09",
      usuarioCreacion: "290",
      concepto: "Patente Municipal Año 2024",
      idModulo: 23,
      referencia: "19456878",
      direccion: "DIRECCION",
      interes: 2,
      descuentoRecargo: 0,
      isCoactiva: false,
      transaction_id: null,
      authorized_code: null,
      facturaDetalles: [
        {
          id: 11906849,
          rubroDescripcion: "PATENTE MUNICIPAL",
          cantidad: 1,
          valorUnitario: 75,
          estado: 1
        }
      ]
    },
    {
      id: 19456879,
      modulo: "Formularios",
      idPropietarioEmision: 167749,
      nombre: "MARIANA JOSELIN",
      apellido: "WELTRON ROLDAN",
      cedula: "0941460784",
      nroFactura: null,
      totalTarifa: 25,
      valorTotalNeto: 25,
      fechaCreacion: "2025-07-09",
      usuarioCreacion: "290",
      concepto: "Certificado de No Adeudar al Municipio",
      idModulo: 21,
      referencia: "19456879",
      direccion: "DIRECCION",
      interes: 0,
      descuentoRecargo: 0,
      isCoactiva: false,
      transaction_id: null,
      authorized_code: null,
      facturaDetalles: [
        {
          id: 11906850,
          rubroDescripcion: "CERTIFICADO NO ADEUDAR",
          cantidad: 1,
          valorUnitario: 25,
          estado: 1
        }
      ]
    }
  ];

  const handleConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar captcha
    if (parseInt(consulta.captcha) !== captchaOperacion.resultado) {
      alert('El captcha es incorrecto');
      generarCaptcha();
      return;
    }

    setIsLoading(true);
    
    // Simular llamada API
    setTimeout(() => {
      setObligaciones(mockObligaciones);
      setMostrarResultados(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsulta({
      ...consulta,
      [e.target.name]: e.target.value
    });
  };

  const toggleCarrito = (obligacionId: number) => {
    setCarrito(prev => 
      prev.includes(obligacionId) 
        ? prev.filter(id => id !== obligacionId)
        : [...prev, obligacionId]
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const getObligacionesFiltradas = () => {
    if (filtroModulo === 'todos') {
      return obligaciones;
    }
    return obligaciones.filter(ob => ob.modulo.toLowerCase() === filtroModulo.toLowerCase());
  };

  const getObligacionesCarrito = () => {
    return obligaciones.filter(ob => carrito.includes(ob.id));
  };

  const calcularTotalCarrito = () => {
    return getObligacionesCarrito().reduce((total, ob) => total + ob.valorTotalNeto + ob.interes, 0);
  };

  const getModulosUnicos = () => {
    const modulos = [...new Set(obligaciones.map(ob => ob.modulo))];
    return modulos;
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatearMoneda = (valor: number) => {
    return `$${valor.toFixed(2)}`;
  };

  const handleConfirmarPago = () => {
    if (carrito.length === 0) {
      alert('Debe seleccionar al menos una obligación para pagar');
      return;
    }
    setShowModal(true);
  };

  const handleContinuar = () => {
    setShowModal(false);
    setEstadoProceso('pago');
  };

  const handleCancelar = () => {
    setShowModal(false);
  };

  const procesarPago = () => {
    setIsLoading(true);
    
    // Simular proceso de pago
    setTimeout(() => {
      const numeroSol = `20250722152040PAG`;
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

  const volverAlInicio = () => {
    setEstadoProceso('consulta');
    setMostrarResultados(false);
    setCarrito([]);
    setObligaciones([]);
    setConsulta({ documento: '', claveCatastral: '', captcha: '', captchaRespuesta: '' });
    setNumeroSolicitud('');
    setFechaProceso('');
    generarCaptcha();
  };

  const renderConsulta = () => (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg shadow-lg">
          <CreditCard className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Consulta y Pago de Obligaciones</h1>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <CreditCard className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-blue-800">
            <strong>Consulta y pago en línea</strong> - Revise sus obligaciones municipales y realice pagos de forma segura.
          </p>
        </div>
      </div>

      {/* Formulario de Consulta */}
      <Card className="p-6 border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1 bg-blue-100 rounded">
            <Search className="h-4 w-4 text-blue-600" />
          </div>
          <h2 className="text-lg font-medium text-blue-900">Consultar Obligaciones</h2>
        </div>
        <form onSubmit={handleConsulta} className="space-y-4">
          <Tabs defaultValue={metodoConsulta} onValueChange={setMetodoConsulta}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cedula">Cédula / RUC</TabsTrigger>
              <TabsTrigger value="catastral">Clave Catastral</TabsTrigger>
            </TabsList>
            <TabsContent value="cedula">
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
            </TabsContent>
            <TabsContent value="catastral">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="claveCatastral">Clave Catastral</Label>
                  <Input
                    id="claveCatastral"
                    name="claveCatastral"
                    type="text"
                    required
                    value={consulta.claveCatastral}
                    onChange={handleInputChange}
                    placeholder="Ingrese su clave catastral"
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
            </TabsContent>
          </Tabs>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full md:w-auto shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundImage: 'linear-gradient(135deg, #1a69af, #1f447b, #2563eb)' }}
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

      {/* Resultados */}
      {mostrarResultados && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tabla de Obligaciones */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-100 rounded">
                    <Receipt className="h-4 w-4 text-green-600" />
                  </div>
                  <h2 className="text-lg font-medium text-green-900">Obligaciones Encontradas</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-blue-600" />
                  <Select value={filtroModulo} onValueChange={setFiltroModulo}>
                    <SelectTrigger className="w-48 border-blue-200 focus:border-blue-400">
                      <SelectValue placeholder="Filtrar por módulo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los módulos</SelectItem>
                      {getModulosUnicos().map(modulo => (
                        <SelectItem key={modulo} value={modulo.toLowerCase()}>
                          {modulo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={carrito.length > 0 && carrito.length === getObligacionesFiltradas().length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setCarrito(getObligacionesFiltradas().map(ob => ob.id));
                            } else {
                              setCarrito([]);
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Referencia</TableHead>
                      <TableHead>Módulo</TableHead>
                      <TableHead>Concepto</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Interés</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getObligacionesFiltradas().map((obligacion) => (
                      <TableRow key={obligacion.id}>
                        <TableCell>
                          <Checkbox
                            checked={carrito.includes(obligacion.id)}
                            onCheckedChange={() => toggleCarrito(obligacion.id)}
                          />
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {obligacion.referencia}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{obligacion.modulo}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={obligacion.concepto}>
                            {obligacion.concepto}
                          </div>
                        </TableCell>
                        <TableCell>{formatearFecha(obligacion.fechaCreacion)}</TableCell>
                        <TableCell className="font-medium">
                          {formatearMoneda(obligacion.valorTotalNeto)}
                        </TableCell>
                        <TableCell className="text-red-600">
                          {formatearMoneda(obligacion.interes)}
                        </TableCell>
                        <TableCell className="font-bold">
                          {formatearMoneda(obligacion.valorTotalNeto + obligacion.interes)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {getObligacionesFiltradas().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No se encontraron obligaciones para el filtro seleccionado
                </div>
              )}
            </Card>
          </div>

          {/* Carrito de Compras */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6 border-l-4 border-l-purple-500 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-purple-100 rounded">
                    <ShoppingCart className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-lg font-medium text-purple-900">Carrito de Pago</h2>
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">{carrito.length}</Badge>
              </div>

              {carrito.length > 0 ? (
                <>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {getObligacionesCarrito().map((obligacion) => (
                      <div key={obligacion.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-purple-900">
                            {obligacion.referencia}
                          </p>
                          <p className="text-xs text-purple-600 truncate">
                            {obligacion.modulo}
                          </p>
                          <p className="text-sm font-bold text-green-600">
                            {formatearMoneda(obligacion.valorTotalNeto + obligacion.interes)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCarrito(obligacion.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                    <div className="flex justify-between text-sm text-blue-700">
                      <span>Subtotal:</span>
                      <span className="font-medium">{formatearMoneda(getObligacionesCarrito().reduce((total, ob) => total + ob.valorTotalNeto, 0))}</span>
                    </div>
                    <div className="flex justify-between text-sm text-red-600">
                      <span>Intereses:</span>
                      <span className="font-medium">{formatearMoneda(getObligacionesCarrito().reduce((total, ob) => total + ob.interes, 0))}</span>
                    </div>
                    <Separator className="bg-purple-200" />
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-purple-900">Total:</span>
                      <span className="text-green-600">{formatearMoneda(calcularTotalCarrito())}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button
                      variant="outline"
                      onClick={limpiarCarrito}
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Limpiar
                    </Button>
                    <Button
                      onClick={handleConfirmarPago}
                      className="flex-1 shadow-lg hover:shadow-xl transition-all"
                      style={{ backgroundImage: 'linear-gradient(135deg, #1a69af, #1f447b, #8b5cf6)' }}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pagar
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="p-4 bg-purple-50 rounded-full w-fit mx-auto mb-4">
                    <ShoppingCart className="h-12 w-12 text-purple-300" />
                  </div>
                  <p className="text-purple-600 font-medium mb-1">No hay elementos seleccionados</p>
                  <p className="text-sm text-purple-500">Selecciona las obligaciones que deseas pagar</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );

  const renderPago = () => (
    <div>
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-600 text-white p-2 rounded">
          <CreditCard className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Consulta y Pago de Obligaciones - Pago</h1>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Proceso de Pago</h2>
        
        <div className="text-center py-8">
          <CreditCard className="h-16 w-16 mx-auto mb-4 text-blue-600" />
          <h3 className="text-lg font-medium mb-2">Procesando Pago</h3>
          <p className="text-gray-600 mb-6">
            Se está procesando el pago de {carrito.length} obligación(es) seleccionada(s)
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
                Pagar {formatearMoneda(calcularTotalCarrito())}
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderCompletado = () => (
    <div>
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-green-600 text-white p-2 rounded">
          <CheckCircle className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Consulta y Pago de Obligaciones - Completado</h1>
      </div>

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
                <p className="font-medium">{formatearMoneda(calcularTotalCarrito())}</p>
              </div>
            </div>

            <div>
              <Label className="text-gray-600 block mb-2">Obligaciones Pagadas:</Label>
              <ul className="space-y-1">
                {getObligacionesCarrito().map((obligacion) => (
                  <li key={obligacion.id} className="text-blue-600 hover:underline cursor-pointer">
                    {obligacion.referencia} - {obligacion.modulo}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 justify-center pt-6">
              <Button
                onClick={volverAlInicio}
                style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Nueva Consulta
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Renderizar contenido según el estado */}
      {estadoProceso === 'consulta' && renderConsulta()}
      {estadoProceso === 'pago' && renderPago()}
      {estadoProceso === 'completado' && renderCompletado()}

      {/* Modal de confirmación */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Confirmación de Pago
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4">
                <p>
                  <strong>IMPORTANTE:</strong> ¿Está seguro de procesar el pago de las obligaciones seleccionadas?
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 mb-2">
                    <strong>Resumen del pago:</strong>
                  </p>
                  <ul className="text-amber-700 space-y-1">
                    <li>• Obligaciones: {carrito.length}</li>
                    <li>• Subtotal: {formatearMoneda(getObligacionesCarrito().reduce((total, ob) => total + ob.valorTotalNeto, 0))}</li>
                    <li>• Intereses: {formatearMoneda(getObligacionesCarrito().reduce((total, ob) => total + ob.interes, 0))}</li>
                    <li>• <strong>Total: {formatearMoneda(calcularTotalCarrito())}</strong></li>
                  </ul>
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
    </div>
  );
}