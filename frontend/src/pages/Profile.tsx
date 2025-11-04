import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PawPrintIcon, PlusCircleIcon } from 'lucide-react';
import { DogCard } from '../components/dogs/DogCard';
import { loginWithGoogle } from '../../../DB/fireauth';

export const Profile: React.FC = () => {
  const auth = useAuth();
  const { user, publishedDogs } = auth as any;
  const navigate = useNavigate();

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

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <PawPrintIcon className="h-5 w-5" /> Mis Publicaciones
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
        </div>
      </div>
    </div>
  );
};
