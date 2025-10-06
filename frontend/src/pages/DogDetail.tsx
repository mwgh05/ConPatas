import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dogs } from '../data/dogs';
import { HeartIcon, CalendarIcon, RulerIcon, TagIcon, ArrowLeftIcon } from 'lucide-react';
export const DogDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [activeImage, setActiveImage] = useState(0);
  const dog = dogs.find(dog => dog.id === id);
  if (!dog) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Perro no encontrado
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Lo sentimos, no pudimos encontrar el perro que estás buscando.
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>;
  }
  return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="flex items-center text-primary-600 dark:text-primary-400 mb-6 hover:underline">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>Volver a todos los perros</span>
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-96 w-full">
                <img src={dog.images?.[activeImage] || dog.image} alt={dog.name} className="w-full h-full object-cover" />
              </div>
              {dog.images && dog.images.length > 1 && <div className="p-4 flex space-x-2 overflow-x-auto">
                  {dog.images.map((img, idx) => <button key={idx} onClick={() => setActiveImage(idx)} className={`h-16 w-16 rounded-md overflow-hidden flex-shrink-0 border-2 ${activeImage === idx ? 'border-primary-500' : 'border-transparent'}`}>
                      <img src={img} alt={`${dog.name} ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>)}
                </div>}
            </div>
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {dog.name}
                </h1>
                <button className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300">
                  <HeartIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {dog.age}
                  </span>
                </div>
                <div className="flex items-center">
                  <RulerIcon className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {dog.size === 'pequeño' ? 'Pequeño' : dog.size === 'mediano' ? 'Mediano' : 'Grande'}
                  </span>
                </div>
                <div className="flex items-center">
                  <TagIcon className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {dog.breed}
                  </span>
                </div>
              </div>
              {dog.personality && <div className="mt-4 flex flex-wrap gap-2">
                  {dog.personality.map((trait, idx) => <span key={idx} className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded-full">
                      {trait}
                    </span>)}
                </div>}
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Sobre {dog.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {dog.description}
                </p>
              </div>
              <div className="mt-8">
                <Link to={`/adopt/${dog.id}`} className="btn btn-primary w-full flex justify-center items-center">
                  Aplicar para adoptar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};