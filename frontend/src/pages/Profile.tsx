import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, SettingsIcon, HeartIcon, LogOutIcon } from 'lucide-react';
export const Profile: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  if (!user) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Necesitas iniciar sesión para ver tu perfil
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Por favor inicia sesión o regístrate para acceder a esta página.
        </p>
        <Link to="/login" className="btn btn-primary mr-4">
          Iniciar Sesión
        </Link>
        <Link to="/register" className="btn bg-white text-gray-800 border border-gray-300 hover:bg-gray-100">
          Registrarse
        </Link>
      </div>;
  }
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Mi Perfil
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Sidebar */}
            <div className="md:w-1/4 border-r border-gray-200 dark:border-gray-700">
              <div className="p-6 text-center">
                <div className="h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900 mx-auto flex items-center justify-center">
                  <UserIcon className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
              <nav className="mt-4">
                <button onClick={() => setActiveTab('profile')} className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'profile' ? 'bg-primary-50 dark:bg-primary-900 border-l-4 border-primary-500' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                  <UserIcon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">
                    Información Personal
                  </span>
                </button>
                <button onClick={() => setActiveTab('favorites')} className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'favorites' ? 'bg-primary-50 dark:bg-primary-900 border-l-4 border-primary-500' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                  <HeartIcon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">
                    Mis Favoritos
                  </span>
                </button>
                <button onClick={() => setActiveTab('settings')} className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'settings' ? 'bg-primary-50 dark:bg-primary-900 border-l-4 border-primary-500' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                  <SettingsIcon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">
                    Configuración
                  </span>
                </button>
                <button onClick={handleLogout} className="flex items-center w-full px-6 py-3 text-left text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <LogOutIcon className="h-5 w-5 mr-3" />
                  <span className="font-medium">Cerrar Sesión</span>
                </button>
              </nav>
            </div>
            {/* Content */}
            <div className="md:w-3/4 p-6">
              {activeTab === 'profile' && <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Información Personal
                  </h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nombre
                        </label>
                        <input type="text" id="name" name="name" defaultValue={user.name} className="input" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Correo Electrónico
                        </label>
                        <input type="email" id="email" name="email" defaultValue={user.email} className="input" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Teléfono
                        </label>
                        <input type="tel" id="phone" name="phone" className="input" />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Dirección
                        </label>
                        <input type="text" id="address" name="address" className="input" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button type="button" className="btn btn-primary">
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                </div>}
              {activeTab === 'favorites' && <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Mis Favoritos
                  </h3>
                  <div className="text-center py-12">
                    <div className="h-20 w-20 mx-auto flex items-center justify-center">
                      <HeartIcon className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Aún no has agregado perros a tus favoritos.
                    </p>
                    <Link to="/" className="mt-4 inline-block btn btn-primary">
                      Explorar perros
                    </Link>
                  </div>
                </div>}
              {activeTab === 'settings' && <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Configuración
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">
                        Cambiar Contraseña
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Contraseña Actual
                          </label>
                          <input type="password" id="currentPassword" name="currentPassword" className="input" />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nueva Contraseña
                          </label>
                          <input type="password" id="newPassword" name="newPassword" className="input" />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Confirmar Nueva Contraseña
                          </label>
                          <input type="password" id="confirmPassword" name="confirmPassword" className="input" />
                        </div>
                        <div className="flex justify-end">
                          <button type="button" className="btn btn-primary">
                            Cambiar Contraseña
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">
                        Notificaciones
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">
                            Correos electrónicos
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">
                            Notificaciones de nuevos perros
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};