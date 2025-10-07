import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, MessageCircleIcon, UserIcon, LogInIcon, MenuIcon, XIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../ThemeToggle';
export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isAuthenticated,
    logout
  } = useAuth();
  const location = useLocation();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const navItems = [{
    name: 'Inicio',
    path: '/',
    icon: <HomeIcon className="w-5 h-5" />
  }, {
    name: 'Publicaciones',
    path: '/community',
    icon: <UsersIcon className="w-5 h-5" />
  }, {
    name: 'Chat',
    path: '/chat',
    icon: <MessageCircleIcon className="w-5 h-5" />
  }];
  const authItems = isAuthenticated ? [{
    name: 'Perfil',
    path: '/profile',
    icon: <UserIcon className="w-5 h-5" />
  }, {
    name: 'Cerrar Sesión',
    action: logout,
    icon: <LogInIcon className="w-5 h-5" />
  }] : [{
    name: 'Iniciar Sesión',
    path: '/login',
    icon: <LogInIcon className="w-5 h-5" />
  }];
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-primary-600 dark:text-primary-400 text-xl font-bold">
                Rescate
              </span>
              <span className="text-secondary-500 text-xl font-bold">
                Canino
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map(item => <Link key={item.name} to={item.path} className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors
                    ${isActive(item.path) ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>)}
              {authItems.map(item => item.path ? <Link key={item.name} to={item.path} className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors
                      ${isActive(item.path) ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                    {item.icon}
                    <span>{item.name}</span>
                  </Link> : <button key={item.name} onClick={item.action} className="px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    {item.icon}
                    <span>{item.name}</span>
                  </button>)}
              <ThemeToggle />
            </div>
          </div>
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none" aria-expanded="false">
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2
                  ${isActive(item.path) ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={closeMenu}>
                {item.icon}
                <span>{item.name}</span>
              </Link>)}
            {authItems.map(item => item.path ? <Link key={item.name} to={item.path} className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2
                    ${isActive(item.path) ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={closeMenu}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link> : <button key={item.name} onClick={() => {
          item.action();
          closeMenu();
        }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  {item.icon}
                  <span>{item.name}</span>
                </button>)}
          </div>
        </div>}
    </nav>;
};