import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CreditCardIcon, HeartIcon, DollarSignIcon } from 'lucide-react';
export const Donation: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const predefinedAmounts = ['10', '25', '50', '100'];
  const handleAmountClick = (value: string) => {
    setAmount(value);
    setCustomAmount('');
  };
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      setAmount(value);
    }
  };
  const validateForm = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!amount) newErrors.amount = 'Por favor selecciona o ingresa una cantidad';
    if (!name) newErrors.name = 'El nombre es requerido';
    if (!email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    if (!cardNumber) {
      newErrors.cardNumber = 'El número de tarjeta es requerido';
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }
    if (!expiryDate) {
      newErrors.expiryDate = 'La fecha de expiración es requerida';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Formato inválido (MM/YY)';
    }
    if (!cvv) {
      newErrors.cvv = 'El código de seguridad es requerido';
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = 'CVV inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Donation submitted:', {
        amount,
        name,
        email
      });
      setFormSubmitted(true);
    }
  };
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Format as MM/YY
    if (/^\d{0,2}$/.test(value)) {
      setExpiryDate(value);
    } else if (/^\d{2}$/.test(value) && expiryDate.length === 1) {
      setExpiryDate(value + '/');
    } else if (/^\d{2}\/\d{0,2}$/.test(value)) {
      setExpiryDate(value);
    }
  };
  if (formSubmitted) {
    return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <div className="flex justify-center mb-4">
              <HeartIcon className="h-16 w-16 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              ¡Gracias por tu donación!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tu aporte de ${amount} ayudará a muchos perros a encontrar un
              hogar.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Hemos enviado un recibo a tu correo electrónico.
            </p>
            <Link to="/" className="btn btn-primary">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>;
  }
  return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="flex items-center text-primary-600 dark:text-primary-400 mb-6 hover:underline">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>Volver al inicio</span>
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="text-center mb-8">
              <HeartIcon className="h-12 w-12 text-red-500 mx-auto" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">
                Haz una donación
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Tu aporte nos ayuda a rescatar y cuidar a más perros en
                situación de abandono
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selecciona una cantidad (USD)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {predefinedAmounts.map(value => <button key={value} type="button" onClick={() => handleAmountClick(value)} className={`py-3 px-4 rounded-lg border ${amount === value ? 'bg-primary-50 border-primary-500 text-primary-700 dark:bg-primary-900 dark:border-primary-500 dark:text-primary-300' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                      ${value}
                    </button>)}
                </div>
                <div className="mt-3">
                  <label htmlFor="customAmount" className="sr-only">
                    Otra cantidad
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400">
                        $
                      </span>
                    </div>
                    <input type="text" id="customAmount" value={customAmount} onChange={handleCustomAmountChange} placeholder="Otra cantidad" className="input pl-8" />
                  </div>
                </div>
                {errors.amount && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.amount}
                  </p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre completo
                  </label>
                  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="input" />
                  {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Correo electrónico
                  </label>
                  <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="input" />
                  {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                  <CreditCardIcon className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  Información de pago
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Número de tarjeta
                    </label>
                    <input type="text" id="cardNumber" value={cardNumber} onChange={handleCardNumberChange} placeholder="XXXX XXXX XXXX XXXX" maxLength={19} className="input" />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.cardNumber}
                      </p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Fecha de expiración
                      </label>
                      <input type="text" id="expiryDate" value={expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY" maxLength={5} className="input" />
                      {errors.expiryDate && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.expiryDate}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Código de seguridad (CVV)
                      </label>
                      <input type="text" id="cvv" value={cvv} onChange={e => {
                      if (/^\d*$/.test(e.target.value) && e.target.value.length <= 4) {
                        setCvv(e.target.value);
                      }
                    }} placeholder="XXX" className="input" />
                      {errors.cvv && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.cvv}
                        </p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button type="submit" className="btn btn-primary w-full flex justify-center items-center">
                  <DollarSignIcon className="h-5 w-5 mr-2" />
                  Donar ${amount || '0'}
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                  Tu información de pago está segura y encriptada
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
};