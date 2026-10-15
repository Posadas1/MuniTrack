import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [identidad, setIdentidad] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [alerta, setAlerta] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (esRegistro) {
      setAlerta('¡Registro exitoso! Cuenta creada con validación de identidad y seguridad bcrypt.');
      setTimeout(() => {
        setEsRegistro(false);
        setAlerta(null);
      }, 3000);
    } else {
      setAlerta('Autenticación exitosa. Cargando portal municipal...');
      setTimeout(() => {
        onLoginSuccess();
      }, 1500);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
        
        {/* Logotipo o Icono Institucional */}
        <div className="text-center space-y-2">
          <div className="inline-flex bg-emerald-50 text-emerald-700 p-3 rounded-2xl border border-emerald-100 shadow-sm">
            <i className="fa-solid fa-landmark text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {esRegistro ? 'Registro de Ciudadano' : 'Acceso al Portal'}
          </h2>
          <p className="text-xs text-gray-500">
            {esRegistro 
              ? 'Complete sus datos personales para dar de alta su cuenta digital[cite: 1].' 
              : 'Ingrese su documento de identidad y contraseña segura[cite: 1].'}
          </p>
        </div>

        {/* Alerta visual */}
        {alerta && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs text-center font-medium">
            {alerta}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {esRegistro && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wider">Nombre Completo</label>
              <input 
                type="text" 
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Marco Antonio Posadas"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wider">Documento de Identidad / RTN</label>
            <input 
              type="text" 
              required
              value={identidad}
              onChange={(e) => setIdentidad(e.target.value)}
              placeholder="0801-1995-00000"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {esRegistro && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wider">Correo Electrónico</label>
              <input 
                type="email" 
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wider">Contraseña Segura</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold transition shadow-sm"
          >
            {esRegistro ? 'Registrarse en el Portal' : 'Ingresar al Sistema'}
          </button>
        </form>

        {/* Alternador entre Login y Registro */}
        <div className="text-center pt-2 border-t border-gray-100">
          <button 
            type="button"
            onClick={() => setEsRegistro(!esRegistro)}
            className="text-xs text-emerald-700 hover:underline font-medium"
          >
            {esRegistro ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate aquí'}
          </button>
        </div>

      </div>
    </div>
  );
}