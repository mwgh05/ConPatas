import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

type AppRecord = {
  id?: string;
  dogId?: string;
  dogName?: string;
  ownerEmail?: string;
  applicantEmail?: string;
  status?: string;
  createdAt?: any;
  form?: {
    fullName?: string;
    email?: string;
    phone?: string;
    [k: string]: any;
  };
};

// (date intentionally not shown in UI)

export const Solicitudes: React.FC = () => {
  const { user } = useAuth() as any;
  const [activeTab, setActiveTab] = useState<'recibidas' | 'enviadas'>('recibidas');
  const [loadingReceived, setLoadingReceived] = useState(false);
  const [loadingSent, setLoadingSent] = useState(false);
  const [received, setReceived] = useState<AppRecord[]>([]);
  const [sent, setSent] = useState<AppRecord[]>([]);

  const apiBase = useMemo(() => (import.meta as any).env?.VITE_API_URL ?? '', []);

  async function fetchWithAuth(path: string) {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const idToken = currentUser ? await currentUser.getIdToken() : null;
    const resp = await fetch(apiBase + path, {
      headers: {
        'Content-Type': 'application/json',
        ...(idToken ? { Authorization: `Bearer ${idToken}` } : {})
      }
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(text || `Request failed: ${resp.status}`);
    }
    return resp.json();
  }

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!user) return;
      try {
        setLoadingReceived(true);
        const r = await fetchWithAuth('/api/applications/received');
        if (mounted) setReceived(r.items || []);
      } catch (err) {
        console.error('Error loading received applications', err);
        if (mounted) setReceived([]);
      } finally {
        if (mounted) setLoadingReceived(false);
      }

      try {
        setLoadingSent(true);
        const s = await fetchWithAuth('/api/applications/sent');
        if (mounted) setSent(s.items || []);
      } catch (err) {
        console.error('Error loading sent applications', err);
        if (mounted) setSent([]);
      } finally {
        if (mounted) setLoadingSent(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [user, apiBase]);

  // Mapeo de etiquetas legibles para los campos del formulario
  const formLabels: Record<string, string> = {
    fullName: 'Nombre completo',
    age: 'Edad',
    idNumber: 'Identificación',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    address: 'Dirección',
    province: 'Provincia',
    canton: 'Cantón',
    occupation: 'Ocupación',
    maritalStatus: 'Estado civil',
    householdMembers: 'Personas en el hogar',
    housing: 'Tipo de vivienda',
    isOwned: 'Propiedad',
    landlordPermission: 'Permiso del arrendador',
    availableSpace: 'Espacio disponible',
    securityLevel: 'Seguridad del hogar',
    zoneType: 'Zona',
    timeAtHome: 'Tiempo en casa',
    hasOtherPets: '¿Tiene otras mascotas?',
    otherPetsDetails: 'Detalles de otras mascotas',
    previousPets: 'Mascotas anteriores',
    previousPetsOutcome: '¿Qué pasó con ellas?',
    petKnowledge: 'Conocimientos veterinarios',
    experienceLevel: 'Experiencia con perros',
    reasonForAdoption: 'Motivo para adoptar',
    expectationsOfPet: 'Expectativas de la mascota',
    willingToPayExpenses: '¿Asumirá gastos?',
    planForIllness: 'Plan ante enfermedad/comportamiento',
    planForMoving: 'Plan si se muda',
    thoughtsOnSterilization: 'Opinión sobre esterilización',
    reactionToDamage: 'Reacción ante daños',
    hoursAway: 'Horas fuera de casa',
    petCareWhenAway: 'Cuidado cuando no está',
    sleepingArrangement: 'Dónde dormirá',
    willingToWalk: '¿Paseos diarios?',
    desiredEnergyLevel: 'Nivel de energía deseado',
    commitLifetime: 'Compromiso de por vida',
    commitNoAbandonment: 'Compromiso de no abandono',
    commitSterilization: 'Compromiso de esterilización',
    commitVeterinaryCare: 'Compromiso de cuidados veterinarios',
    commitFollowUp: 'Acepta seguimiento',
    references: 'Referencias',
    additionalInfo: 'Información adicional',
    agreeToTerms: 'Acepta términos'
  };

  const orderedKeys = [
    'fullName','age','idNumber','email','phone','address','province','canton','occupation','maritalStatus','householdMembers',
    'housing','isOwned','landlordPermission','availableSpace','securityLevel','zoneType','timeAtHome',
    'hasOtherPets','otherPetsDetails','previousPets','previousPetsOutcome','petKnowledge','experienceLevel',
    'reasonForAdoption','expectationsOfPet','willingToPayExpenses','planForIllness','planForMoving','thoughtsOnSterilization','reactionToDamage',
    'hoursAway','petCareWhenAway','sleepingArrangement','willingToWalk','desiredEnergyLevel',
    'commitLifetime','commitNoAbandonment','commitSterilization','commitVeterinaryCare','commitFollowUp',
    'references','additionalInfo','agreeToTerms'
  ];

  const formatValue = (key: string, val: any): string => {
    if (val === undefined || val === null) return '—';
    if (typeof val === 'boolean') return val ? 'Sí' : 'No';
    if (typeof val !== 'string') return String(val);
    const v = val.trim();
    if (v === '') return '—';
    const siNo = ['si','sí','no'];
    if (siNo.includes(v.toLowerCase())) return v.charAt(0).toUpperCase() + v.slice(1);
    const properCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    switch (key) {
      case 'isOwned':
        return v.toLowerCase() === 'propia' ? 'Propia' : v.toLowerCase() === 'alquilada' ? 'Alquilada' : properCase(v);
      case 'zoneType':
        return v.toLowerCase() === 'urbana' ? 'Urbana' : v.toLowerCase() === 'rural' ? 'Rural' : properCase(v);
      case 'sleepingArrangement':
        return ({
          interior: 'Interior de la casa',
          exterior: 'Exterior de la casa',
          patio: 'Patio',
          'cama propia': 'Cama propia',
          otro: 'Otro'
        } as Record<string,string>)[v.toLowerCase()] || properCase(v);
      case 'desiredEnergyLevel':
        return ({
          bajo: 'Tranquilo',
          medio: 'Activo',
          alto: 'Muy activo',
          guardian: 'Guardián',
          jugueton: 'Juguetón'
        } as Record<string,string>)[v.toLowerCase()] || properCase(v);
      default:
        return v;
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Necesitas iniciar sesión</h2>
        <p className="text-gray-600 dark:text-gray-400">Inicia sesión para ver tus solicitudes recibidas y enviadas.</p>
      </div>
    );
  }

  const TabButton: React.FC<{ id: 'recibidas' | 'enviadas'; label: string }> = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={
        `px-4 py-2 rounded-md text-sm font-medium transition-colors ` +
        (activeTab === id
          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800')
      }
    >
      {label}
    </button>
  );

  const List: React.FC<{ items: AppRecord[]; emptyMsg: string; showApplicant: boolean }> = ({ items, emptyMsg, showApplicant }) => {
    if (!items.length) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-gray-600 dark:text-gray-400">
          {emptyMsg}
          {showApplicant ? (
            <div className="mt-4">
              <Link to="/" className="btn btn-primary">Explorar perros</Link>
            </div>
          ) : (
            <div className="mt-4">
              <Link to="/publish-dog" className="btn btn-primary">Publicar un perro</Link>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {items.map((app) => (
          <div key={app.id || Math.random()} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                {app.dogName || 'Publicación'}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{showApplicant ? 'Dueño' : 'Solicitante'}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {showApplicant ? (app.ownerEmail || '—') : (app.form?.fullName || app.applicantEmail || '—')}
                </p>
                {!showApplicant && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">{app.form?.email || app.applicantEmail || '—'}</p>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Contacto</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Tel: {app.form?.phone || '—'}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Email: {app.form?.email || app.applicantEmail || '—'}</p>
              </div>
              <div className="flex items-center gap-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Estado</h4>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                  {app.status || 'pendiente'}
                </span>
              </div>
            </div>
            {/* Resumen del formulario */}
            {app.form && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-300">Ver respuestas del formulario</summary>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {orderedKeys.map((k) => {
                    const value = (app.form as any)[k];
                    if (value === undefined || value === null || value === '') return null;
                    return (
                      <div key={k} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400">{formLabels[k] || k}</div>
                        <div className="text-sm text-gray-700 dark:text-gray-200 mt-0.5">{formatValue(k, value)}</div>
                      </div>
                    );
                  })}
                </div>
              </details>
            )}
            {/* La acción "Marcar como adoptado" se movió al Perfil */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Solicitudes</h1>
          <div className="flex gap-2">
            <TabButton id="recibidas" label={`Recibidas${loadingReceived ? '…' : ''}`} />
            <TabButton id="enviadas" label={`Enviadas${loadingSent ? '…' : ''}`} />
          </div>
        </div>

        {activeTab === 'recibidas' ? (
          loadingReceived ? (
            <div className="text-center">Cargando solicitudes recibidas…</div>
          ) : (
            <List items={received} emptyMsg="No has recibido solicitudes aún." showApplicant={false} />
          )
        ) : (
          loadingSent ? (
            <div className="text-center">Cargando solicitudes enviadas…</div>
          ) : (
            <List items={sent} emptyMsg="Aún no has enviado solicitudes." showApplicant={true} />
          )
        )}
      </div>
    </div>
  );
};

export default Solicitudes;
