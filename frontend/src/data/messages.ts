export interface Message {
  id: string;
  sender: 'user' | 'shelter';
  text: string;
  timestamp: string;
  read: boolean;
}
export interface Conversation {
  id: string;
  shelterName: string;
  shelterAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}
export const conversations: Conversation[] = [{
  id: '1',
  shelterName: 'Refugio Patitas Felices',
  shelterAvatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  lastMessage: '¡Hola! Gracias por tu interés en Luna...',
  lastMessageTime: '10:30',
  unreadCount: 2,
  messages: [{
    id: '1',
    sender: 'user',
    text: 'Hola, estoy interesado en adoptar a Luna. ¿Podría obtener más información?',
    timestamp: '10:15',
    read: true
  }, {
    id: '2',
    sender: 'shelter',
    text: '¡Hola! Gracias por tu interés en Luna. Es una perrita muy dulce y juguetona. ¿Tienes alguna pregunta específica?',
    timestamp: '10:20',
    read: true
  }, {
    id: '3',
    sender: 'user',
    text: 'Sí, me gustaría saber si es buena con niños y si necesita algún cuidado especial.',
    timestamp: '10:25',
    read: true
  }, {
    id: '4',
    sender: 'shelter',
    text: 'Luna es excelente con niños, muy paciente y cariñosa. No necesita cuidados especiales, solo sus vacunas regulares y mucho amor. ¿Te gustaría venir a conocerla?',
    timestamp: '10:30',
    read: false
  }]
}, {
  id: '2',
  shelterName: 'Refugio Huellas de Esperanza',
  shelterAvatar: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  lastMessage: 'Nos encantaría que vinieras a conocer...',
  lastMessageTime: 'Ayer',
  unreadCount: 0,
  messages: [{
    id: '1',
    sender: 'user',
    text: 'Buenos días, vi a Max en su página y me interesaría conocerlo.',
    timestamp: 'Ayer, 15:45',
    read: true
  }, {
    id: '2',
    sender: 'shelter',
    text: 'Hola, gracias por contactarnos. Max es un perro muy especial, lleva con nosotros 6 meses y está esperando un hogar amoroso.',
    timestamp: 'Ayer, 16:00',
    read: true
  }, {
    id: '3',
    sender: 'user',
    text: '¿Cuál es el proceso para poder adoptarlo?',
    timestamp: 'Ayer, 16:15',
    read: true
  }, {
    id: '4',
    sender: 'shelter',
    text: 'Nos encantaría que vinieras a conocerlo primero. Después hay un formulario de adopción y hacemos una pequeña entrevista. ¿Te parece bien?',
    timestamp: 'Ayer, 16:30',
    read: true
  }]
}];