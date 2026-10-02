import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Save, X, Eye, EyeOff, IdCard, UserCircle, Settings, Lock, Bell, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PerfilUsuarioProps {
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
  initialTab?: string;
}

interface DatosPersonales {
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  genero: string;
  estadoCivil: string;
}

export function PerfilUsuario({ user, initialTab = 'perfil' }: PerfilUsuarioProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [datosPersonales, setDatosPersonales] = useState<DatosPersonales>({
    nombres: user.firstName,
    apellidos: user.lastName,
    cedula: '0941460784',
    email: user.email,
    telefono: '+593 99 999 9999',
    direccion: 'Av. Principal 123, Daule, Ecuador',
    fechaNacimiento: '1990-08-15',
    genero: 'Femenino',
    estadoCivil: 'Soltero/a'
  });

  const [cambioPassword, setCambioPassword] = useState({
    passwordActual: '',
    passwordNuevo: '',
    confirmPassword: ''
  });

  const [configuraciones, setConfiguraciones] = useState({
    notificacionesEmail: true,
    notificacionesSMS: false,
    recordatoriosPago: true,
    boletinMunicipal: true,
    actualizacionesTramites: true,
    alertasVencimiento: true
  });

  // Handlers
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset data if canceling
      setDatosPersonales({
        nombres: user.firstName,
        apellidos: user.lastName,
        cedula: '0941460784',
        email: user.email,
        telefono: '+593 99 999 9999',
        direccion: 'Av. Principal 123, Daule, Ecuador',
        fechaNacimiento: '1990-08-15',
        genero: 'Femenino',
        estadoCivil: 'Soltero/a'
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simular llamada API
    setTimeout(() => {
      setIsEditing(false);
      setIsSaving(false);
      alert('Perfil actualizado correctamente');
    }, 1000);
  };

  const handleInputChange = (field: keyof DatosPersonales, value: string) => {
    setDatosPersonales(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: keyof typeof cambioPassword, value: string) => {
    setCambioPassword(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfiguracionChange = (field: keyof typeof configuraciones) => {
    setConfiguraciones(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cambioPassword.passwordActual || !cambioPassword.passwordNuevo || !cambioPassword.confirmPassword) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (cambioPassword.passwordNuevo !== cambioPassword.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (cambioPassword.passwordNuevo.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setIsSaving(true);
    // Simular llamada API
    setTimeout(() => {
      alert('Contraseña cambiada exitosamente');
      setCambioPassword({
        passwordActual: '',
        passwordNuevo: '',
        confirmPassword: ''
      });
      setIsSaving(false);
    }, 1000);
  };

  const handleSaveConfiguracion = async () => {
    setIsSaving(true);
    // Simular llamada API
    setTimeout(() => {
      setIsSaving(false);
      alert('Configuración guardada exitosamente');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-600 text-white p-2 rounded">
          <UserCircle className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Mi Perfil</h1>
      </div>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl">
            {datosPersonales.nombres.charAt(0)}{datosPersonales.apellidos.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl">{datosPersonales.nombres} {datosPersonales.apellidos}</h2>
            <p className="text-gray-600">{datosPersonales.email}</p>
            <div className="flex items-center gap-3 mt-3">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                Cuenta Verificada
              </Badge>
              <Badge variant="outline">Ciudadano</Badge>
              <Badge variant="outline">C.I: {datosPersonales.cedula}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            {activeTab === 'perfil' && (
              <>
                {!isEditing ? (
                  <Button onClick={handleEditToggle} variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handleSave}
                      disabled={isSaving}
                      style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Guardar
                        </>
                      )}
                    </Button>
                    <Button onClick={handleEditToggle} variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="perfil" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Información Personal
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="configuracion" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <IdCard className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg">Datos Personales</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres</Label>
                <Input
                  id="nombres"
                  value={datosPersonales.nombres}
                  onChange={(e) => handleInputChange('nombres', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300 focus:border-blue-500' : 'bg-gray-50'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  value={datosPersonales.apellidos}
                  onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300 focus:border-blue-500' : 'bg-gray-50'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cedula">Cédula de Identidad</Label>
                <Input
                  id="cedula"
                  value={datosPersonales.cedula}
                  onChange={(e) => handleInputChange('cedula', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300 focus:border-blue-500' : 'bg-gray-50'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={datosPersonales.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300 focus:border-blue-500' : 'bg-gray-50'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={datosPersonales.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300 focus:border-blue-500' : 'bg-gray-50'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={datosPersonales.fechaNacimiento}
                  onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300 focus:border-blue-500' : 'bg-gray-50'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genero">Género</Label>
                <Select 
                  value={datosPersonales.genero} 
                  onValueChange={(value) => handleInputChange('genero', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className={isEditing ? 'border-blue-300 focus:border-blue-500' : 'bg-gray-50'}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Femenino">Femenino</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                    <SelectItem value="Prefiero no decir">Prefiero no decir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estadoCivil">Estado Civil</Label>
                <Select 
                  value={datosPersonales.estadoCivil} 
                  onValueChange={(value) => handleInputChange('estadoCivil', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className={isEditing ? 'border-blue-300 focus:border-blue-500' : 'bg-gray-50'}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Soltero/a">Soltero/a</SelectItem>
                    <SelectItem value="Casado/a">Casado/a</SelectItem>
                    <SelectItem value="Divorciado/a">Divorciado/a</SelectItem>
                    <SelectItem value="Viudo/a">Viudo/a</SelectItem>
                    <SelectItem value="Unión libre">Unión libre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={datosPersonales.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  disabled={!isEditing}
                  className={isEditing ? 'border-blue-300 focus:border-blue-500' : 'bg-gray-50'}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg">Cambiar Contraseña</h3>
            </div>
            
            <Alert className="mb-6">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Para tu seguridad, tu contraseña debe tener al menos 8 caracteres e incluir letras y números.
              </AlertDescription>
            </Alert>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="passwordActual">Contraseña Actual</Label>
                <div className="relative">
                  <Input
                    id="passwordActual"
                    type={showCurrentPassword ? "text" : "password"}
                    value={cambioPassword.passwordActual}
                    onChange={(e) => handlePasswordChange('passwordActual', e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordNuevo">Nueva Contraseña</Label>
                <div className="relative">
                  <Input
                    id="passwordNuevo"
                    type={showNewPassword ? "text" : "password"}
                    value={cambioPassword.passwordNuevo}
                    onChange={(e) => handlePasswordChange('passwordNuevo', e.target.value)}
                    required
                    minLength={8}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={cambioPassword.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    required
                    minLength={8}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSaving}
                style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Cambiando...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Cambiar Contraseña
                  </>
                )}
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg">Información de Seguridad</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <p className="font-medium">Último Acceso</p>
                  <p className="text-sm text-gray-600">22/01/2025 15:22:29</p>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">Activo</Badge>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <p className="font-medium">Verificación de Email</p>
                  <p className="text-sm text-gray-600">{datosPersonales.email}</p>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Check className="h-3 w-3 mr-1" />
                  Verificado
                </Badge>
              </div>

              <div className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium">Dispositivo</p>
                  <p className="text-sm text-gray-600">Navegador Web - Chrome</p>
                </div>
                <Badge variant="outline">Actual</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="configuracion" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg">Preferencias de Notificaciones</h3>
              </div>
              <Button 
                onClick={handleSaveConfiguracion}
                disabled={isSaving}
                style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b">
                <div className="space-y-1">
                  <p className="font-medium">Notificaciones por Email</p>
                  <p className="text-sm text-gray-600">Recibir notificaciones importantes por correo electrónico</p>
                </div>
                <Switch
                  checked={configuraciones.notificacionesEmail}
                  onCheckedChange={() => handleConfiguracionChange('notificacionesEmail')}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b">
                <div className="space-y-1">
                  <p className="font-medium">Notificaciones por SMS</p>
                  <p className="text-sm text-gray-600">Recibir mensajes de texto para notificaciones urgentes</p>
                </div>
                <Switch
                  checked={configuraciones.notificacionesSMS}
                  onCheckedChange={() => handleConfiguracionChange('notificacionesSMS')}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b">
                <div className="space-y-1">
                  <p className="font-medium">Recordatorios de Pago</p>
                  <p className="text-sm text-gray-600">Recibir recordatorios antes del vencimiento de pagos</p>
                </div>
                <Switch
                  checked={configuraciones.recordatoriosPago}
                  onCheckedChange={() => handleConfiguracionChange('recordatoriosPago')}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b">
                <div className="space-y-1">
                  <p className="font-medium">Boletín Municipal</p>
                  <p className="text-sm text-gray-600">Recibir noticias y actualizaciones del municipio</p>
                </div>
                <Switch
                  checked={configuraciones.boletinMunicipal}
                  onCheckedChange={() => handleConfiguracionChange('boletinMunicipal')}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b">
                <div className="space-y-1">
                  <p className="font-medium">Actualizaciones de Trámites</p>
                  <p className="text-sm text-gray-600">Notificaciones sobre el estado de sus trámites</p>
                </div>
                <Switch
                  checked={configuraciones.actualizacionesTramites}
                  onCheckedChange={() => handleConfiguracionChange('actualizacionesTramites')}
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="space-y-1">
                  <p className="font-medium">Alertas de Vencimiento</p>
                  <p className="text-sm text-gray-600">Recordatorios sobre fechas importantes y vencimientos</p>
                </div>
                <Switch
                  checked={configuraciones.alertasVencimiento}
                  onCheckedChange={() => handleConfiguracionChange('alertasVencimiento')}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}