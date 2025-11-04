import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  SettingsIcon,
  HeartIcon,
  LogOutIcon,
  PawPrintIcon,
  PlusCircleIcon,
} from 'lucide-react';
import { DogCard } from '../components/dogs/DogCard';
import { loginWithGoogle } from '../../../DB/fireauth';

export const Profile: React.FC = () => {
  const auth = useAuth();
  const { user, logout, publishedDogs } = auth as any;
  const favorites = (auth as any).favorites as any[] | undefined;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Si el usuario no ha iniciado sesión
  if (!user) {
    const handleLogin = async () => {
      try {
        await loginWithGoogle();
        navigate('/profile'); // Redirige aquí mismo al terminar
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Necesitas iniciar sesión para ver tu perfil
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Por favor inicia sesión para acceder a esta página.
        </p>
        <button onClick={handleLogin} className="btn btn-primary">
          Iniciar Sesión
        </button>
      </div>
    );
  }

  // Cuando el usuario sí está autenticado
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Mi Perfil
          </h1>
          
        </div>

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

              {/* Navegación lateral */}
              <nav className="mt-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    activeTab === 'profile'
                      ? 'bg-primary-50 dark:bg-primary-900 border-l-4 border-primary-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <UserIcon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">
                    Información Personal
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    activeTab === 'favorites'
                      ? 'bg-primary-50 dark:bg-primary-900 border-l-4 border-primary-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <HeartIcon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">
                    Mis Favoritos
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('myDogs')}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    activeTab === 'myDogs'
                      ? 'bg-primary-50 dark:bg-primary-900 border-l-4 border-primary-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <PawPrintIcon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">
                    Mis Publicaciones
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    activeTab === 'settings'
                      ? 'bg-primary-50 dark:bg-primary-900 border-l-4 border-primary-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <SettingsIcon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">
                    Configuración
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-6 py-3 text-left text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <LogOutIcon className="h-5 w-5 mr-3" />
                  <span className="font-medium">Cerrar Sesión</span>
                </button>
              </nav>
            </div>

            {/* Contenido de las secciones */}
            <div className="md:w-3/4 p-6">
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Información Personal
                  </h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          defaultValue={user.name}
                          className="input"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          defaultValue={user.email}
                          className="input"
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Teléfono
                        </label>
                        <input type="tel" id="phone" name="phone" className="input" />
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
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
                </div>
              )}

              {activeTab === 'favorites' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Mis Favoritos
                  </h3>
                  {Array.isArray(favorites) && favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favorites.map((dog: any) => (
                        <DogCard key={dog.id ?? Math.random()} dog={dog} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-600 dark:text-gray-400">
                      No tienes favoritos aún. Ve a la sección de Comunidad o a los perros y añade algunos.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'myDogs' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Mis Publicaciones
                    </h3>
                    <button
                      onClick={() => navigate('/publish-dog')}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <PlusCircleIcon className="h-4 w-4" />
                      Publicar un perro
                    </button>
                  </div>
                  {Array.isArray(publishedDogs) && publishedDogs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {publishedDogs.map((dog: any) => (
                        <DogCard key={dog.id ?? Math.random()} dog={dog} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-600 dark:text-gray-400">
                      Aún no has publicado perros.
                      <div className="mt-4">
                        <button onClick={() => navigate('/publish-dog')} className="btn btn-primary">
                          Publicar un perro
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
