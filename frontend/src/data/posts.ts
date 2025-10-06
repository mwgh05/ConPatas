export interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  likes: number;
  comments: number;
}
export const posts: Post[] = [{
  id: '1',
  title: '¡Luna encontró su hogar para siempre!',
  content: 'Después de 3 meses en el refugio, Luna finalmente encontró una familia amorosa que la adoptó. Ahora vive feliz en una casa con jardín donde puede correr y jugar todo el día. ¡Gracias a todos los que compartieron su historia!',
  image: 'https://images.unsplash.com/photo-1601758174039-617983b8cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  author: {
    name: 'María González',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  date: '15 de junio, 2023',
  likes: 124,
  comments: 18
}, {
  id: '2',
  title: 'Rescate de emergencia: 5 cachorros abandonados',
  content: 'Ayer recibimos una llamada de emergencia sobre 5 cachorros abandonados en una caja al lado de la carretera. Gracias a nuestros voluntarios, pudimos rescatarlos a tiempo. Están recibiendo atención médica y pronto estarán disponibles para adopción.',
  image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  author: {
    name: 'Carlos Ramírez',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  date: '2 de julio, 2023',
  likes: 89,
  comments: 32
}, {
  id: '3',
  title: 'La transformación de Rocky: de calle a hogar',
  content: 'Cuando encontramos a Rocky, estaba desnutrido y con muchos problemas de salud. Después de meses de cuidados y amor, ¡miren su transformación! Ahora está sano y feliz en su nuevo hogar. Nunca pierdan la esperanza.',
  image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  author: {
    name: 'Ana Martínez',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  date: '20 de julio, 2023',
  likes: 215,
  comments: 45
}, {
  id: '4',
  title: 'Jornada de adopción: ¡15 perros encontraron familia!',
  content: 'Nuestra última jornada de adopción fue un éxito total. 15 de nuestros rescatados encontraron familias amorosas. Gracias a todos los que asistieron y a los voluntarios que hicieron posible este evento. ¡Seguimos trabajando por los que aún esperan!',
  image: 'https://images.unsplash.com/photo-1536809188428-e8ecf663d0be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  author: {
    name: 'Roberto Sánchez',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  date: '5 de agosto, 2023',
  likes: 167,
  comments: 23
}];