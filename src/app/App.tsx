import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, User, FileText, Building, Construction, Store, Calendar, BookOpen, FileSearch, HelpCircle, Home, CreditCard, Menu, X, LogOut, Layout, PanelLeftClose, PanelLeftOpen, Award, CheckCircle, Shield, FileCheck, MapPin, Folder, Receipt, Settings, Info } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card } from './components/ui/card';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { LoginPage } from './components/LoginPage';
import { ConsultaPago } from './components/ConsultaPago';
import { SolicitudCertificado } from './components/SolicitudCertificado';
import { CertificadoIPRUS } from './components/CertificadoIPRUS';
import { CarpetaCiudadana } from './components/CarpetaCiudadana';
import { PerfilUsuario } from './components/PerfilUsuario';
import { GuiaTramites } from './components/GuiaTramites';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

// Componente Layout que envuelve todas las páginas autenticadas
function DashboardLayout({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMenu = (menuId: string) => {
    setExpandedMenu(expandedMenu === menuId ? '' : menuId);
  };

  const handleMenuClick = (path: string, menuId?: string) => {
    setSearchTerm('');
    
    if (menuId && menuItems.find(item => item.id === menuId)?.submenu) {
      setExpandedMenu(expandedMenu === menuId ? '' : menuId);
    }
    
    navigate(path);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home, path: '/carpeta-ciudadana' },
    { id: 'guia-tramites', label: 'Guía de Trámites', icon: Info, path: '/guia-tramites' },
    { id: 'consulta', label: 'Consulta y pago de obligaciones', icon: CreditCard, path: '/consulta-pago' },
    { 
      id: 'tramites', 
      label: 'Trámites', 
      icon: FileText,
      path: '/tramites',
      submenu: [
        'Permiso de Obra Menor',
        'Permiso Uso de Suelo',
        'Permiso Línea de Fábrica',
        'Permiso Normas de Edificación',
        'Permiso Renovación de Permiso de Construcción',
        'Permiso Cambio de Responsable Técnico',
        'Permiso de no Afectación',
        'Permiso de Construcción Inmediato',
        'Permiso de Aprobación de Planes',
        'Permiso Inspección Final'
      ]
    },
    { 
      id: 'certificaciones', 
      label: 'Certificaciones', 
      icon: Award,
      path: '/certificaciones',
      submenu: [
        { label: 'Certificado de No adeudar', path: '/solicitud-certificado' },
        { label: 'Certificado de estar al dia', path: '/solicitud-certificado' },
        { label: 'Certificado IPRUS', path: '/certificado-iprus' },
        { label: 'Certificado de permiso de construcción', path: '/solicitud-certificado' }
      ]
    },
    { 
      id: 'carpeta-ciudadana', 
      label: 'Carpeta Ciudadana', 
      icon: Folder,
      path: '/carpeta-ciudadana',
      submenu: [
        'Transacciones',
        'Certificados',
        'Deudas Pendientes',
        'Facturación Electrónica',
        'Predios'
      ]
    },
    { 
      id: 'perfil', 
      label: 'Mi Perfil', 
      icon: Settings,
      path: '/perfil-usuario',
      submenu: [
        { label: 'Perfil', path: '/perfil-usuario' },
        { label: 'Configuración', path: '/perfil-usuario?tab=configuracion' },
        { label: 'Cambiar Contraseña', path: '/perfil-usuario?tab=seguridad' }
      ]
    }
  ];

  const getBreadcrumb = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'Login';
      case '/consulta-pago':
        return 'Consulta y pago de obligaciones';
      case '/solicitud-certificado':
        return 'Solicitud de Certificado';
      case '/certificado-iprus':
        return 'Certificado IPRUS';
      case '/certificaciones':
        return 'Certificaciones';
      case '/carpeta-ciudadana':
        return 'Carpeta Ciudadana';
      case '/perfil-usuario':
        return 'Mi Perfil';
      case '/guia-tramites':
        return 'Guía de Trámites';
      case '/tramites':
        return 'Trámites';
      default:
        return 'Inicio';
    }
  };

  const isActive = (itemPath: string, itemId: string) => {
    if (itemPath === location.pathname) return true;
    if (itemId === 'certificaciones' && (location.pathname === '/solicitud-certificado' || location.pathname === '/certificado-iprus')) return true;
    if (itemId === 'perfil' && location.pathname.startsWith('/perfil-usuario')) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header 
        className="h-16 flex items-center justify-between px-4 text-white shadow-lg"
        style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="text-white hover:bg-white/20 md:hidden"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <ImageWithFallback
              src="https://www.daule.gob.ec/wp-content/uploads/2025/01/Logo.png"
              alt="Logo Municipio de Daule"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="¿Qué trámite en línea buscas?"
              className="pl-10 bg-white/90 border-none text-gray-700 placeholder:text-gray-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span>{user.firstName} {user.lastName}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
                onClick={onLogout}
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
              onClick={() => navigate('/')}
              title="Iniciar sesión"
            >
              <User className="h-4 w-4 mr-2" />
              Iniciar sesión
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={`${isSidebarOpen ? (isSidebarCollapsed ? 'w-16' : 'w-64') : 'w-0'} md:${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 overflow-hidden flex flex-col`}
          style={{ backgroundImage: 'linear-gradient(180deg, #1a69af, #1f447b)' }}
        >
          <div className="text-white flex-1 flex flex-col">
            <nav className="p-4 flex-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isExpanded = expandedMenu === item.id;
                const active = isActive(item.path, item.id);
                
                return (
                  <div key={item.id} className="mb-2">
                    <button
                      onClick={() => handleMenuClick(item.path, item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors ${
                        active ? 'bg-white/20' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        {!isSidebarCollapsed && <span className="text-sm text-left">{item.label}</span>}
                      </div>
                      {item.submenu && !isSidebarCollapsed && (
                        isExpanded ? <ChevronDown className="h-4 w-4 flex-shrink-0" /> : <ChevronRight className="h-4 w-4 flex-shrink-0" />
                      )}
                    </button>
                    
                    {item.submenu && isExpanded && !isSidebarCollapsed && (
                      <div className="ml-8 mt-2">
                        {item.submenu.map((subItem: any, index: number) => {
                          const subPath = typeof subItem === 'object' ? subItem.path : item.path;
                          const subLabel = typeof subItem === 'object' ? subItem.label : subItem;
                          
                          return (
                            <button
                              key={index}
                              onClick={() => handleMenuClick(subPath)}
                              className="w-full text-left p-2 rounded text-sm hover:bg-white/10 transition-colors"
                            >
                              {subLabel}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Collapse Toggle Button */}
            <div className="p-4 border-t border-white/10">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebarCollapse}
                className="text-white hover:bg-white/10 w-full justify-center"
              >
                {isSidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Home className="h-4 w-4" />
              <span>/</span>
              <span>{getBreadcrumb()}</span>
            </div>

            <Routes>
              <Route path="/" element={<LoginPage onLogin={(userData) => navigate('/carpeta-ciudadana')} />} />
              <Route path="/consulta-pago" element={<ConsultaPago />} />
              <Route path="/carpeta-ciudadana" element={<CarpetaCiudadana />} />
              <Route path="/certificado-iprus" element={<CertificadoIPRUS />} />
              <Route path="/guia-tramites" element={<GuiaTramites />} />
              <Route path="/perfil-usuario" element={<PerfilUsuario user={user || { email: 'invitado@daule.gob.ec', firstName: 'Usuario', lastName: 'Invitado' }} />} />
              <Route path="/solicitud-certificado" element={<SolicitudCertificado />} />
              <Route path="/tramites" element={<TramitesPage user={user || { email: 'invitado@daule.gob.ec', firstName: 'Usuario', lastName: 'Invitado' }} searchTerm={searchTerm} />} />
              <Route path="/certificaciones" element={<CertificacionesPage searchTerm={searchTerm} />} />
            </Routes>
          </div>

          {/* Footer */}
          <footer className="bg-gray-100 border-t border-gray-200 py-4 px-6 mt-auto">
            <div className="text-center text-sm text-gray-600">
              Copyright 2023© GAD Municipal de Daule | Todos los Derechos Reservados.
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

// Página de Trámites
function TramitesPage({ user, searchTerm }: { user: User | null; searchTerm: string }) {
  const tramiteCards = [
    { title: 'Permiso de Obra Menor', icon: Construction, description: 'Solicita permisos para obras menores' },
    { title: 'Permiso Uso de Suelo', icon: Building, description: 'Permisos para uso específico de suelo' },
    { title: 'Permiso Línea de Fábrica', icon: FileText, description: 'Definición de límites de construcción' },
    { title: 'Permiso Normas de Edificación', icon: BookOpen, description: 'Cumplimiento de normas constructivas' },
    { title: 'Permiso Renovación', icon: FileSearch, description: 'Renovación de permisos existentes' },
    { title: 'Cambio de Responsable Técnico', icon: User, description: 'Cambio de responsabilidad técnica' },
    { title: 'Permiso de no Afectación', icon: HelpCircle, description: 'Certificación de no afectación' },
    { title: 'Construcción Inmediato', icon: Calendar, description: 'Permisos de construcción inmediata' }
  ];

  const filteredTramiteCards = tramiteCards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Welcome Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800">
          <strong>Bienvenido/a {user?.firstName}!</strong> Aquí puedes gestionar todos tus trámites municipales.
        </p>
      </div>

      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-red-600 text-white p-2 rounded">
          <FileText className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Trámites de Construcción</h1>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredTramiteCards.length > 0 
              ? `Se encontraron ${filteredTramiteCards.length} trámite(s) para "${searchTerm}"`
              : `No se encontraron trámites para "${searchTerm}"`
            }
          </p>
        </div>
      )}

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTramiteCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-gray-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                  <Icon className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {card.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* No results message */}
      {searchTerm && filteredTramiteCards.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 mb-2">No se encontraron trámites</p>
          <p className="text-sm text-gray-400">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </>
  );
}

// Página de Certificaciones
function CertificacionesPage({ searchTerm }: { searchTerm: string }) {
  const navigate = useNavigate();
  
  const certificadoCards = [
    { 
      title: 'Certificado de No Adeudar', 
      icon: CheckCircle, 
      description: 'Certifica que no mantiene deudas pendientes',
      costo: '$3.00',
      onClick: () => navigate('/solicitud-certificado')
    },
    { 
      title: 'Certificado de Estar al Día', 
      icon: Shield, 
      description: 'Certifica que sus obligaciones están al día',
      costo: '$3.00',
      onClick: () => navigate('/solicitud-certificado')
    },
    { 
      title: 'Certificado IPRUS', 
      icon: MapPin, 
      description: 'Certificado de predios registrados',
      costo: '$5.00',
      onClick: () => navigate('/certificado-iprus')
    },
    { 
      title: 'Certificado Permiso de Construcción', 
      icon: FileCheck, 
      description: 'Certificado de permisos de construcción',
      costo: '$4.00',
      onClick: () => navigate('/solicitud-certificado')
    }
  ];

  const filteredCertificadoCards = certificadoCards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Welcome Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-green-800">
          <strong>Certificaciones Municipales</strong> - Solicita y descarga tus certificados oficiales.
        </p>
      </div>

      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-green-600 text-white p-2 rounded">
          <Award className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Certificaciones Disponibles</h1>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredCertificadoCards.length > 0 
              ? `Se encontraron ${filteredCertificadoCards.length} certificado(s) para "${searchTerm}"`
              : `No se encontraron certificados para "${searchTerm}"`
            }
          </p>
        </div>
      )}

      {/* Certificado Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCertificadoCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-gray-200 hover:border-green-300"
              onClick={card.onClick}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-green-100 rounded-lg">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  {card.description}
                </p>
                <div className="mt-auto">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {card.costo}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* No results message */}
      {searchTerm && filteredCertificadoCards.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 mb-2">No se encontraron certificados</p>
          <p className="text-sm text-gray-400">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <DashboardLayout user={user} onLogout={handleLogout} />
    </Router>
  );
}