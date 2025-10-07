import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, InstagramIcon, FacebookIcon, TwitterIcon } from 'lucide-react';
export const Footer: React.FC = () => {
  return <footer className="bg-white dark:bg-gray-900 shadow-inner pt-10 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-primary-600 dark:text-primary-400 text-xl font-bold">
                Con
              </span>
              <span className="text-secondary-500 text-xl font-bold">
                Patas
              </span>
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
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Enlaces
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Publicaciones
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Chat
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
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
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
            &copy; {new Date().getFullYear()} RescateCanino. Hecho con
            <HeartIcon className="h-4 w-4 mx-1 text-red-500" />
            para los peluditos.
          </p>
        </div>
      </div>
    </footer>;
};