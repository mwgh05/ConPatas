import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, InstagramIcon, FacebookIcon, TwitterIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // 
import { loginWithGoogle, logout } from '../../../../DB/fireauth'; // 

export const Footer: React.FC = () => {
  const { user } = useAuth(); // ✅ Obtenemos el usuario autenticado del contexto

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      console.log("Inicio de sesión exitoso desde el footer");
    } catch (error) {
      console.error("Error al iniciar sesión desde el footer:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Sesión cerrada desde el footer");
    } catch (error) {
      console.error("Error al cerrar sesión desde el footer:", error);
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner pt-10 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sección izquierda */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-primary-600 dark:text-primary-400 text-xl font-bold">Con</span>
              <span className="text-secondary-500 text-xl font-bold">Patas</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Dedicados al rescate y adopción de perros, brindándoles una
              segunda oportunidad para encontrar un hogar lleno de amor.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-secondary-500 transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary-500 transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary-500 transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Enlaces
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              
              

              {/* Solo mostrar si NO hay usuario autenticado */}
              {!user ? (
                <li>
                  <button
                    onClick={handleLogin}
                    className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Iniciar Sesión
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Contáctanos
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-500 dark:text-gray-400">
                Calle Ejemplo 123, Ciudad
              </li>
              <li className="text-gray-500 dark:text-gray-400">
                +123 456 7890
              </li>
              <li className="text-gray-500 dark:text-gray-400">
                contacto@rescatecanino.com
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
            &copy; {new Date().getFullYear()} RescateCanino. Hecho con
            <HeartIcon className="h-4 w-4 mx-1 text-red-500" />
            para los peluditos.
          </p>
        </div>
      </div>
    </footer>
  );
};
