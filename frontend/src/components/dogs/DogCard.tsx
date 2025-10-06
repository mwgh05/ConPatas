import React from 'react';
import { Link } from 'react-router-dom';
import { Dog } from '../../data/dogs';
import { PawPrintIcon } from 'lucide-react';
interface DogCardProps {
  dog: Dog;
}
export const DogCard: React.FC<DogCardProps> = ({
  dog
}) => {
  return <div className="card hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-xl h-64">
        <img src={dog.image} alt={dog.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        <div className="absolute top-0 right-0 bg-white dark:bg-gray-800 px-3 py-1 m-2 rounded-full text-xs font-medium text-primary-600 dark:text-primary-400 flex items-center shadow-sm">
          <PawPrintIcon className="h-3 w-3 mr-1" />
          {dog.size === 'pequeño' ? 'Pequeño' : dog.size === 'mediano' ? 'Mediano' : 'Grande'}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {dog.name}
        </h3>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2">
          <span>{dog.age}</span>
          <span className="mx-2">•</span>
          <span>{dog.breed}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
          {dog.description}
        </p>
        <Link to={`/dogs/${dog.id}`} className="btn btn-primary text-center">
          Ver más
        </Link>
      </div>
    </div>;
};