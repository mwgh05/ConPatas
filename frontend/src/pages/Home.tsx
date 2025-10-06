import React from 'react';
import { DogCard } from '../components/dogs/DogCard';
import { dogs } from '../data/dogs';
import { SearchIcon } from 'lucide-react';
export const Home: React.FC = () => {
  return <div className="w-full bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-primary-500 dark:bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Encuentra a tu mejor amigo
            </h1>
            <p className="text-lg md:text-xl mb-6 text-primary-100">
              Adopta un perro y cambia dos vidas: la suya y la tuya. Tenemos
              muchos perros esperando un hogar lleno de amor.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="btn bg-white text-primary-600 hover:bg-gray-100">
                Adoptar
              </button>
              <button className="btn bg-secondary-500 text-white hover:bg-secondary-600">
                Donar
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Dog hero" className="rounded-lg shadow-xl max-w-full h-auto" />
          </div>
        </div>
      </section>
      {/* Search and Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 -mt-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow relative">
              <input type="text" placeholder="Buscar por nombre, raza..." className="input pl-10" />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <select className="input md:w-1/5">
              <option value="">Tamaño</option>
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Grande</option>
            </select>
            <select className="input md:w-1/5">
              <option value="">Edad</option>
              <option value="puppy">Cachorro</option>
              <option value="adult">Adulto</option>
              <option value="senior">Senior</option>
            </select>
          </div>
        </div>
      </section>
      {/* Dogs List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Perros disponibles para adopción
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogs.map(dog => <DogCard key={dog.id} dog={dog} />)}
        </div>
      </section>
      {/* Call to Action */}
      <section className="bg-secondary-100 dark:bg-gray-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 dark:text-secondary-400 mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-6 max-w-2xl mx-auto">
            Regístrate para recibir notificaciones cuando lleguen nuevos perros
            que coincidan con tus preferencias.
          </p>
          <button className="btn btn-secondary">Registrarme ahora</button>
        </div>
      </section>
    </div>;
};