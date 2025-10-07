import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeftIcon, UploadIcon } from 'lucide-react';
export const PublishDog: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    publishDog
  } = useAuth();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: '',
    size: 'mediano' as 'pequeño' | 'mediano' | 'grande',
    description: '',
    image: '',
    personality: [''] as string[]
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  if (!user) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Necesitas iniciar sesión para publicar
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Por favor inicia sesión o regístrate para publicar un perro en
          adopción.
        </p>
        <Link to="/login" className="btn btn-primary mr-4">
          Iniciar Sesión
        </Link>
        <Link to="/register" className="btn bg-white text-gray-800 border border-gray-300 hover:bg-gray-100">
          Registrarse
        </Link>
      </div>;
  }
  const validateForm = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!formData.name) newErrors.name = 'El nombre es requerido';
    if (!formData.age) newErrors.age = 'La edad es requerida';
    if (!formData.breed) newErrors.breed = 'La raza es requerida';
    if (!formData.description) newErrors.description = 'La descripción es requerida';
    if (!formData.image) newErrors.image = 'La imagen es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handlePersonalityChange = (index: number, value: string) => {
    const newPersonality = [...formData.personality];
    newPersonality[index] = value;
    setFormData(prev => ({
      ...prev,
      personality: newPersonality
    }));
  };
  const addPersonalityTrait = () => {
    setFormData(prev => ({
      ...prev,
      personality: [...prev.personality, '']
    }));
  };
  const removePersonalityTrait = (index: number) => {
    const newPersonality = [...formData.personality];
    newPersonality.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      personality: newPersonality
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Filter out empty personality traits
      const filteredPersonality = formData.personality.filter(trait => trait.trim() !== '');
      // Create unique ID
      const newDog = {
        ...formData,
        id: Date.now().toString(),
        personality: filteredPersonality,
        images: [formData.image]
      };
      publishDog(newDog);
      setFormSubmitted(true);
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }
  };
  if (formSubmitted) {
    return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <div className="flex justify-center mb-4">
              <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              ¡Perro publicado con éxito!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tu publicación de {formData.name} ha sido creada. Ahora estará
              disponible para posibles adoptantes.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Serás redirigido a tu perfil en unos segundos...
            </p>
            <Link to="/profile" className="btn btn-primary">
              Ir a mi perfil
            </Link>
          </div>
        </div>
      </div>;
  }
  return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/profile" className="flex items-center text-primary-600 dark:text-primary-400 mb-6 hover:underline">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>Volver a mi perfil</span>
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Publicar un perro en adopción
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre*
                  </label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input" />
                  {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>}
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Edad*
                  </label>
                  <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} placeholder="Ej: 2 años, 6 meses" className="input" />
                  {errors.age && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.age}
                    </p>}
                </div>
                <div>
                  <label htmlFor="breed" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Raza*
                  </label>
                  <input type="text" id="breed" name="breed" value={formData.breed} onChange={handleChange} className="input" />
                  {errors.breed && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.breed}
                    </p>}
                </div>
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tamaño*
                  </label>
                  <select id="size" name="size" value={formData.size} onChange={handleChange} className="input">
                    <option value="pequeño">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descripción*
                </label>
                <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Describe la personalidad, historia y características del perro" className="input"></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.description}
                  </p>}
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  URL de la imagen*
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" className="input" />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Ingresa la URL de una imagen del perro (Unsplash, Pexels,
                  etc.)
                </p>
                {errors.image && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.image}
                  </p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Personalidad (opcional)
                </label>
                {formData.personality.map((trait, index) => <div key={index} className="flex mb-2">
                    <input type="text" value={trait} onChange={e => handlePersonalityChange(index, e.target.value)} placeholder="Ej: Juguetón, Cariñoso, Tranquilo" className="input mr-2" />
                    <button type="button" onClick={() => removePersonalityTrait(index)} className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200">
                      ×
                    </button>
                  </div>)}
                <button type="button" onClick={addPersonalityTrait} className="mt-2 text-sm text-primary-600 hover:text-primary-500 flex items-center">
                  + Agregar rasgo de personalidad
                </button>
              </div>
              <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-end">
                  <Link to="/profile" className="btn bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 mr-3">
                    Cancelar
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Publicar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
};