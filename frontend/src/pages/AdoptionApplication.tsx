import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dogs } from '../data/dogs';
import { ArrowLeftIcon, CheckCircleIcon, InfoIcon, HomeIcon, PawPrintIcon, HeartIcon, ClockIcon, ClipboardCheckIcon, CameraIcon } from 'lucide-react';
export const AdoptionApplication: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dog = dogs.find(dog => dog.id === id);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    idNumber: '',
    email: '',
    phone: '',
    address: '',
    province: '',
    canton: '',
    occupation: '',
    maritalStatus: '',
    householdMembers: '',
    housing: 'casa',
    isOwned: 'propia',
    landlordPermission: 'si',
    availableSpace: '',
    securityLevel: '',
    zoneType: 'urbana',
    timeAtHome: '',
    hasOtherPets: 'no',
    otherPetsDetails: '',
    previousPets: '',
    previousPetsOutcome: '',
    petKnowledge: '',
    experienceLevel: 'principiante',
    reasonForAdoption: '',
    expectationsOfPet: '',
    willingToPayExpenses: 'si',
    planForIllness: '',
    planForMoving: '',
    thoughtsOnSterilization: '',
    reactionToDamage: '',
    hoursAway: '',
    petCareWhenAway: '',
    sleepingArrangement: 'interior',
    willingToWalk: 'si',
    desiredEnergyLevel: 'medio',
    commitLifetime: false,
    commitNoAbandonment: false,
    commitSterilization: false,
    commitVeterinaryCare: false,
    commitFollowUp: false,
    photoUpload: null,
    references: '',
    additionalInfo: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 6;
  const validateCurrentSection = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (currentSection === 1) {
      // Personal Information
      if (!formData.fullName) newErrors.fullName = 'El nombre es requerido';
      if (!formData.age) newErrors.age = 'La edad es requerida';
      if (!formData.idNumber) newErrors.idNumber = 'El número de identificación es requerido';
      if (!formData.email) {
        newErrors.email = 'El correo electrónico es requerido';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Correo electrónico inválido';
      }
      if (!formData.phone) newErrors.phone = 'El teléfono es requerido';
      if (!formData.address) newErrors.address = 'La dirección es requerida';
      if (!formData.province) newErrors.province = 'La provincia es requerida';
      if (!formData.canton) newErrors.canton = 'El cantón es requerido';
    } else if (currentSection === 2) {
      // Housing Information
      if (!formData.availableSpace) newErrors.availableSpace = 'Este campo es requerido';
      if (!formData.securityLevel) newErrors.securityLevel = 'Este campo es requerido';
      if (!formData.timeAtHome) newErrors.timeAtHome = 'Este campo es requerido';
      if (formData.isOwned === 'alquilada' && formData.landlordPermission === 'no') {
        newErrors.landlordPermission = 'Se requiere permiso del propietario para tener mascotas';
      }
    } else if (currentSection === 3) {
      // Pet Experience
      if (!formData.previousPets) newErrors.previousPets = 'Este campo es requerido';
      if (!formData.previousPetsOutcome) newErrors.previousPetsOutcome = 'Este campo es requerido';
      if (!formData.petKnowledge) newErrors.petKnowledge = 'Este campo es requerido';
      if (formData.hasOtherPets === 'si' && !formData.otherPetsDetails) {
        newErrors.otherPetsDetails = 'Por favor proporciona detalles de tus otras mascotas';
      }
    } else if (currentSection === 4) {
      // Motivation
      if (!formData.reasonForAdoption) newErrors.reasonForAdoption = 'Este campo es requerido';
      if (!formData.expectationsOfPet) newErrors.expectationsOfPet = 'Este campo es requerido';
      if (!formData.planForIllness) newErrors.planForIllness = 'Este campo es requerido';
      if (!formData.planForMoving) newErrors.planForMoving = 'Este campo es requerido';
      if (!formData.thoughtsOnSterilization) newErrors.thoughtsOnSterilization = 'Este campo es requerido';
      if (!formData.reactionToDamage) newErrors.reactionToDamage = 'Este campo es requerido';
    } else if (currentSection === 5) {
      // Availability
      if (!formData.hoursAway) newErrors.hoursAway = 'Este campo es requerido';
      if (!formData.petCareWhenAway) newErrors.petCareWhenAway = 'Este campo es requerido';
    } else if (currentSection === 6) {
      // Commitments
      if (!formData.commitLifetime) newErrors.commitLifetime = 'Debes aceptar este compromiso';
      if (!formData.commitNoAbandonment) newErrors.commitNoAbandonment = 'Debes aceptar este compromiso';
      if (!formData.commitSterilization) newErrors.commitSterilization = 'Debes aceptar este compromiso';
      if (!formData.commitVeterinaryCare) newErrors.commitVeterinaryCare = 'Debes aceptar este compromiso';
      if (!formData.commitFollowUp) newErrors.commitFollowUp = 'Debes aceptar este compromiso';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Debes aceptar los términos';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateForm = () => {
    const requiredFields = ['fullName', 'age', 'idNumber', 'email', 'phone', 'address', 'province', 'canton', 'availableSpace', 'securityLevel', 'timeAtHome', 'previousPets', 'previousPetsOutcome', 'petKnowledge', 'reasonForAdoption', 'expectationsOfPet', 'planForIllness', 'planForMoving', 'thoughtsOnSterilization', 'reactionToDamage', 'hoursAway', 'petCareWhenAway'];
    const newErrors: {
      [key: string]: string;
    } = {};
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'Este campo es requerido';
      }
    });
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    if (formData.isOwned === 'alquilada' && formData.landlordPermission === 'no') {
      newErrors.landlordPermission = 'Se requiere permiso del propietario para tener mascotas';
    }
    if (formData.hasOtherPets === 'si' && !formData.otherPetsDetails) {
      newErrors.otherPetsDetails = 'Por favor proporciona detalles de tus otras mascotas';
    }
    if (!formData.commitLifetime) newErrors.commitLifetime = 'Debes aceptar este compromiso';
    if (!formData.commitNoAbandonment) newErrors.commitNoAbandonment = 'Debes aceptar este compromiso';
    if (!formData.commitSterilization) newErrors.commitSterilization = 'Debes aceptar este compromiso';
    if (!formData.commitVeterinaryCare) newErrors.commitVeterinaryCare = 'Debes aceptar este compromiso';
    if (!formData.commitFollowUp) newErrors.commitFollowUp = 'Debes aceptar este compromiso';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Debes aceptar los términos';
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
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  const handleNextSection = () => {
    if (validateCurrentSection()) {
      setCurrentSection(prev => Math.min(prev + 1, totalSections));
    }
  };
  const handlePreviousSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 1));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };
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
  if (formSubmitted) {
    return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <div className="flex justify-center mb-4">
              <CheckCircleIcon className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              ¡Solicitud enviada con éxito!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Gracias por tu interés en adoptar a {dog.name}. Hemos recibido tu
              solicitud y nos pondremos en contacto contigo pronto para
              continuar con el proceso de adopción.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Serás redirigido a la página principal en unos segundos...
            </p>
            <Link to="/" className="btn btn-primary">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>;
  }
  const progressPercentage = currentSection / totalSections * 100;
  return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to={`/dogs/${dog.id}`} className="flex items-center text-primary-600 dark:text-primary-400 mb-6 hover:underline">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>Volver al perfil de {dog.name}</span>
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <img src={dog.image} alt={dog.name} className="h-16 w-16 rounded-full object-cover mr-4" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Solicitud de adopción para {dog.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Por favor completa este formulario para iniciar el proceso de
                  adopción
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
              <div className="bg-primary-500 h-2.5 rounded-full transition-all duration-300" style={{
              width: `${progressPercentage}%`
            }}></div>
            </div>
            <div className="flex justify-between mb-6 text-sm text-gray-600 dark:text-gray-400">
              <span>
                Sección {currentSection} de {totalSections}
              </span>
              <span>{Math.round(progressPercentage)}% completado</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentSection === 1 && <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <InfoIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Información personal
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nombre completo*
                      </label>
                      <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="input" />
                      {errors.fullName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.fullName}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Edad*
                      </label>
                      <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} className="input" />
                      {errors.age && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.age}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cédula o identificación*
                      </label>
                      <input type="text" id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} className="input" />
                      {errors.idNumber && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.idNumber}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Correo electrónico*
                      </label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="input" />
                      {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.email}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Teléfono*
                      </label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="input" />
                      {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.phone}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ocupación*
                      </label>
                      <input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} className="input" />
                      {errors.occupation && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.occupation}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Estado civil*
                      </label>
                      <select id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="input">
                        <option value="">Seleccionar</option>
                        <option value="soltero/a">Soltero/a</option>
                        <option value="casado/a">Casado/a</option>
                        <option value="divorciado/a">Divorciado/a</option>
                        <option value="viudo/a">Viudo/a</option>
                        <option value="unión libre">Unión libre</option>
                      </select>
                      {errors.maritalStatus && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.maritalStatus}
                        </p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Dirección exacta*
                    </label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="input" />
                    {errors.address && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.address}
                      </p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="province" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Provincia*
                      </label>
                      <input type="text" id="province" name="province" value={formData.province} onChange={handleChange} className="input" />
                      {errors.province && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.province}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="canton" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cantón*
                      </label>
                      <input type="text" id="canton" name="canton" value={formData.canton} onChange={handleChange} className="input" />
                      {errors.canton && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.canton}
                        </p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="householdMembers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Personas con las que vive (especificar adultos, niños,
                      adultos mayores, etc.)*
                    </label>
                    <textarea id="householdMembers" name="householdMembers" rows={2} value={formData.householdMembers} onChange={handleChange} className="input" placeholder="Ej: 2 adultos, 1 niño de 5 años, 1 adulto mayor"></textarea>
                    {errors.householdMembers && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.householdMembers}
                      </p>}
                  </div>
                </div>}
              {currentSection === 2 && <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <HomeIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Información sobre el hogar
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="housing" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tipo de vivienda*
                      </label>
                      <select id="housing" name="housing" value={formData.housing} onChange={handleChange} className="input">
                        <option value="casa">Casa</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="finca">Finca</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="isOwned" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        ¿Es propia o alquilada?*
                      </label>
                      <select id="isOwned" name="isOwned" value={formData.isOwned} onChange={handleChange} className="input">
                        <option value="propia">Propia</option>
                        <option value="alquilada">Alquilada</option>
                      </select>
                    </div>
                  </div>
                  {formData.isOwned === 'alquilada' && <div>
                      <label htmlFor="landlordPermission" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        ¿El dueño permite mascotas?*
                      </label>
                      <select id="landlordPermission" name="landlordPermission" value={formData.landlordPermission} onChange={handleChange} className="input">
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                      </select>
                      {errors.landlordPermission && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.landlordPermission}
                        </p>}
                    </div>}
                  <div>
                    <label htmlFor="availableSpace" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Espacio disponible (patio, terraza, área cercada, etc.)*
                    </label>
                    <textarea id="availableSpace" name="availableSpace" rows={2} value={formData.availableSpace} onChange={handleChange} className="input" placeholder="Describe los espacios disponibles para el perro"></textarea>
                    {errors.availableSpace && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.availableSpace}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="securityLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nivel de seguridad (rejillas, cercas, portones, etc.)*
                    </label>
                    <textarea id="securityLevel" name="securityLevel" rows={2} value={formData.securityLevel} onChange={handleChange} className="input" placeholder="Describe las medidas de seguridad de tu hogar"></textarea>
                    {errors.securityLevel && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.securityLevel}
                      </p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="zoneType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Zona*
                      </label>
                      <select id="zoneType" name="zoneType" value={formData.zoneType} onChange={handleChange} className="input">
                        <option value="urbana">Urbana</option>
                        <option value="rural">Rural</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeAtHome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tiempo promedio que pasa la familia en casa*
                      </label>
                      <input type="text" id="timeAtHome" name="timeAtHome" value={formData.timeAtHome} onChange={handleChange} className="input" placeholder="Ej: 12 horas diarias" />
                      {errors.timeAtHome && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.timeAtHome}
                        </p>}
                    </div>
                  </div>
                </div>}
              {currentSection === 3 && <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <PawPrintIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Experiencia previa con animales
                    </h2>
                  </div>
                  <div>
                    <label htmlFor="previousPets" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Ha tenido mascotas antes? ¿Cuáles?*
                    </label>
                    <textarea id="previousPets" name="previousPets" rows={2} value={formData.previousPets} onChange={handleChange} className="input" placeholder="Describe tus mascotas anteriores (tipo, cantidad, tiempo que estuvieron contigo)"></textarea>
                    {errors.previousPets && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.previousPets}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="previousPetsOutcome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Qué pasó con ellas?*
                    </label>
                    <textarea id="previousPetsOutcome" name="previousPetsOutcome" rows={2} value={formData.previousPetsOutcome} onChange={handleChange} className="input" placeholder="Explica qué sucedió con tus mascotas anteriores"></textarea>
                    {errors.previousPetsOutcome && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.previousPetsOutcome}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="hasOtherPets" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Tiene actualmente otras mascotas?*
                    </label>
                    <select id="hasOtherPets" name="hasOtherPets" value={formData.hasOtherPets} onChange={handleChange} className="input">
                      <option value="no">No</option>
                      <option value="si">Sí</option>
                    </select>
                  </div>
                  {formData.hasOtherPets === 'si' && <div>
                      <label htmlFor="otherPetsDetails" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Detalles de tus otras mascotas*
                      </label>
                      <textarea id="otherPetsDetails" name="otherPetsDetails" rows={3} value={formData.otherPetsDetails} onChange={handleChange} className="input" placeholder="Especie, raza, edad, comportamiento con otros animales..."></textarea>
                      {errors.otherPetsDetails && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.otherPetsDetails}
                        </p>}
                    </div>}
                  <div>
                    <label htmlFor="petKnowledge" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Conocimientos sobre vacunación, desparasitación y
                      esterilización*
                    </label>
                    <textarea id="petKnowledge" name="petKnowledge" rows={3} value={formData.petKnowledge} onChange={handleChange} className="input" placeholder="Describe tus conocimientos sobre cuidados veterinarios básicos"></textarea>
                    {errors.petKnowledge && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.petKnowledge}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nivel de experiencia en manejo de perros*
                    </label>
                    <select id="experienceLevel" name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="input">
                      <option value="principiante">Principiante</option>
                      <option value="intermedio">Intermedio</option>
                      <option value="avanzado">Avanzado</option>
                    </select>
                  </div>
                </div>}
              {currentSection === 4 && <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <HeartIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Motivación para adoptar
                    </h2>
                  </div>
                  <div>
                    <label htmlFor="reasonForAdoption" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Por qué desea adoptar a {dog.name}?*
                    </label>
                    <textarea id="reasonForAdoption" name="reasonForAdoption" rows={3} value={formData.reasonForAdoption} onChange={handleChange} className="input" placeholder="Explica tus motivos para querer adoptar a este perro en particular..."></textarea>
                    {errors.reasonForAdoption && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.reasonForAdoption}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="expectationsOfPet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Qué espera de su futura mascota?*
                    </label>
                    <textarea id="expectationsOfPet" name="expectationsOfPet" rows={3} value={formData.expectationsOfPet} onChange={handleChange} className="input" placeholder="Describe qué tipo de relación y comportamiento esperas de tu mascota"></textarea>
                    {errors.expectationsOfPet && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.expectationsOfPet}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="willingToPayExpenses" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Está dispuesto(a) a asumir los gastos veterinarios,
                      alimentación y cuidados?*
                    </label>
                    <select id="willingToPayExpenses" name="willingToPayExpenses" value={formData.willingToPayExpenses} onChange={handleChange} className="input">
                      <option value="si">Sí</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="planForIllness" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Qué hará si su perro enferma o tiene problemas de
                      comportamiento?*
                    </label>
                    <textarea id="planForIllness" name="planForIllness" rows={3} value={formData.planForIllness} onChange={handleChange} className="input" placeholder="Explica cómo manejarías situaciones difíciles con tu mascota"></textarea>
                    {errors.planForIllness && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.planForIllness}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="planForMoving" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Qué hará si cambia de casa o trabajo?*
                    </label>
                    <textarea id="planForMoving" name="planForMoving" rows={2} value={formData.planForMoving} onChange={handleChange} className="input" placeholder="Explica cómo manejarías cambios importantes en tu vida"></textarea>
                    {errors.planForMoving && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.planForMoving}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="thoughtsOnSterilization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Qué piensa sobre la esterilización?*
                    </label>
                    <textarea id="thoughtsOnSterilization" name="thoughtsOnSterilization" rows={2} value={formData.thoughtsOnSterilization} onChange={handleChange} className="input" placeholder="Comparte tu opinión sobre la esterilización de mascotas"></textarea>
                    {errors.thoughtsOnSterilization && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.thoughtsOnSterilization}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="reactionToDamage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Qué haría si su perro muerde o destruye cosas?*
                    </label>
                    <textarea id="reactionToDamage" name="reactionToDamage" rows={2} value={formData.reactionToDamage} onChange={handleChange} className="input" placeholder="Explica cómo manejarías problemas de comportamiento"></textarea>
                    {errors.reactionToDamage && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.reactionToDamage}
                      </p>}
                  </div>
                </div>}
              {currentSection === 5 && <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <ClockIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Disponibilidad y rutina
                    </h2>
                  </div>
                  <div>
                    <label htmlFor="hoursAway" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Cuántas horas al día pasa fuera de casa?*
                    </label>
                    <input type="text" id="hoursAway" name="hoursAway" value={formData.hoursAway} onChange={handleChange} className="input" placeholder="Ej: 8 horas" />
                    {errors.hoursAway && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.hoursAway}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="petCareWhenAway" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Quién cuidará del perro cuando usted no esté?*
                    </label>
                    <textarea id="petCareWhenAway" name="petCareWhenAway" rows={2} value={formData.petCareWhenAway} onChange={handleChange} className="input" placeholder="Describe quién se encargará de la mascota en tu ausencia"></textarea>
                    {errors.petCareWhenAway && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.petCareWhenAway}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="sleepingArrangement" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Dónde dormirá el perro?*
                    </label>
                    <select id="sleepingArrangement" name="sleepingArrangement" value={formData.sleepingArrangement} onChange={handleChange} className="input">
                      <option value="interior">Interior de la casa</option>
                      <option value="exterior">Exterior de la casa</option>
                      <option value="patio">Patio</option>
                      <option value="cama propia">Cama propia</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="willingToWalk" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Está dispuesto(a) a pasearlo diariamente?*
                    </label>
                    <select id="willingToWalk" name="willingToWalk" value={formData.willingToWalk} onChange={handleChange} className="input">
                      <option value="si">Sí</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="desiredEnergyLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ¿Qué nivel de energía busca en un perro?*
                    </label>
                    <select id="desiredEnergyLevel" name="desiredEnergyLevel" value={formData.desiredEnergyLevel} onChange={handleChange} className="input">
                      <option value="bajo">Tranquilo</option>
                      <option value="medio">Activo</option>
                      <option value="alto">Muy activo</option>
                      <option value="guardian">Guardián</option>
                      <option value="jugueton">Juguetón</option>
                    </select>
                  </div>
                </div>}
              {currentSection === 6 && <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <ClipboardCheckIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Compromisos finales
                    </h2>
                  </div>
                  <div className="space-y-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="commitLifetime" name="commitLifetime" type="checkbox" checked={formData.commitLifetime} onChange={handleCheckboxChange} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="commitLifetime" className="font-medium text-gray-700 dark:text-gray-300">
                          Me comprometo a cuidar al perro toda su vida.*
                        </label>
                        {errors.commitLifetime && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.commitLifetime}
                          </p>}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="commitNoAbandonment" name="commitNoAbandonment" type="checkbox" checked={formData.commitNoAbandonment} onChange={handleCheckboxChange} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="commitNoAbandonment" className="font-medium text-gray-700 dark:text-gray-300">
                          Me comprometo a no abandonarlo ni regalarlo sin
                          consultar al refugio.*
                        </label>
                        {errors.commitNoAbandonment && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.commitNoAbandonment}
                          </p>}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="commitSterilization" name="commitSterilization" type="checkbox" checked={formData.commitSterilization} onChange={handleCheckboxChange} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="commitSterilization" className="font-medium text-gray-700 dark:text-gray-300">
                          Me comprometo a esterilizarlo (si aún no lo está).*
                        </label>
                        {errors.commitSterilization && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.commitSterilization}
                          </p>}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="commitVeterinaryCare" name="commitVeterinaryCare" type="checkbox" checked={formData.commitVeterinaryCare} onChange={handleCheckboxChange} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="commitVeterinaryCare" className="font-medium text-gray-700 dark:text-gray-300">
                          Me comprometo a brindarle atención veterinaria y
                          vacunas al día.*
                        </label>
                        {errors.commitVeterinaryCare && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.commitVeterinaryCare}
                          </p>}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="commitFollowUp" name="commitFollowUp" type="checkbox" checked={formData.commitFollowUp} onChange={handleCheckboxChange} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="commitFollowUp" className="font-medium text-gray-700 dark:text-gray-300">
                          Acepto visitas de seguimiento o contacto del refugio.*
                        </label>
                        {errors.commitFollowUp && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.commitFollowUp}
                          </p>}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-md font-medium text-gray-800 dark:text-white mb-4">
                      Información adicional (opcional)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="photoUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Subir fotos del lugar donde vivirá el perro (opcional)
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                                <span>Subir un archivo</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">o arrastra y suelta</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG, GIF hasta 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="references" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Referencias personales o del veterinario (opcional)
                        </label>
                        <textarea id="references" name="references" rows={2} value={formData.references} onChange={handleChange} className="input" placeholder="Nombre, relación y teléfono de contacto"></textarea>
                      </div>
                      <div>
                        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Información adicional (opcional)
                        </label>
                        <textarea id="additionalInfo" name="additionalInfo" rows={3} value={formData.additionalInfo} onChange={handleChange} className="input" placeholder="Cualquier otra información que consideres relevante"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center h-5">
                      <input id="agreeToTerms" name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleCheckboxChange} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeToTerms" className="font-medium text-gray-700 dark:text-gray-300">
                        Acepto los términos y condiciones*
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        Entiendo que esta es una solicitud inicial y que el
                        proceso de adopción puede incluir una entrevista, visita
                        domiciliaria y un período de prueba.
                      </p>
                      {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.agreeToTerms}
                        </p>}
                    </div>
                  </div>
                </div>}
              <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <button type="button" onClick={handlePreviousSection} className={`btn bg-gray-200 text-gray-800 hover:bg-gray-300 ${currentSection === 1 ? 'invisible' : ''}`}>
                  Anterior
                </button>
                {currentSection < totalSections ? <button type="button" onClick={handleNextSection} className="btn btn-primary">
                    Siguiente
                  </button> : <button type="submit" className="btn btn-primary">
                    Enviar solicitud
                  </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
};