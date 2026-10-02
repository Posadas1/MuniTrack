import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginPageProps {
  onLogin: (userData: any) => void;
  onBack?: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    cedula: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simular login exitoso
      onLogin({
        email: formData.email,
        firstName: formData.firstName || 'Usuario',
        lastName: formData.lastName || 'Demo'
      });
    } else {
      // Validar que las contraseñas coincidan
      if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      // Simular registro exitoso y login automático
      onLogin({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      cedula: '',
      phone: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className="h-16 flex items-center justify-between px-4 text-white shadow-lg"
        style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
      >
        <div className="flex items-center gap-4">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          <div className="flex items-center">
            <ImageWithFallback
              src="https://www.daule.gob.ec/wp-content/uploads/2025/01/Logo.png"
              alt="Logo Municipio de Daule"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <h1 className="text-lg font-medium">Sistema de Trámites en Línea</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Accede a tu cuenta para gestionar tus trámites' 
                : 'Regístrate para acceder a los servicios municipales'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombres</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Ingresa tus nombres"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Ingresa tus apellidos"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cedula">Cédula de Identidad</Label>
                  <Input
                    id="cedula"
                    name="cedula"
                    type="text"
                    required
                    value={formData.cedula}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu cédula"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu teléfono"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu contraseña"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirma tu contraseña"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full"
              style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
            >
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Button>

            {isLogin && (
              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-blue-600 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>
            )}

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
              </p>
              <Button
                type="button"
                variant="link"
                onClick={toggleMode}
                className="text-blue-600 hover:underline"
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}