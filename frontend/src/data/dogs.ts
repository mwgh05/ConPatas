export interface Dog {
  id: string;
  name: string;
  age: string;
  breed: string;
  size: 'pequeño' | 'mediano' | 'grande';
  description: string;
  image: string;
  images?: string[];
  personality?: string[];
}
export const dogs: Dog[] = [{
  id: '1',
  name: 'Luna',
  age: '2 años',
  breed: 'Labrador Retriever',
  size: 'mediano',
  description: 'Luna es una perra juguetona y cariñosa. Le encanta correr en el parque y jugar con otros perros. Es muy buena con niños y siempre está lista para una aventura.',
  image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1594922009922-d1665a492ab7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  personality: ['Juguetona', 'Cariñosa', 'Activa']
}, {
  id: '2',
  name: 'Max',
  age: '4 años',
  breed: 'Pastor Alemán',
  size: 'grande',
  description: 'Max es un perro muy inteligente y protector. Ha sido entrenado básicamente y aprende rápido. Es leal y se lleva bien con adultos, pero necesita tiempo para adaptarse a los niños pequeños.',
  image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  images: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1589839278271-b46b7ff8c818?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  personality: ['Inteligente', 'Protector', 'Leal']
}, {
  id: '3',
  name: 'Bella',
  age: '1 año',
  breed: 'Beagle',
  size: 'pequeño',
  description: 'Bella es una cachorrita enérgica y curiosa. Le encanta explorar y olfatear todo. Es muy sociable y se lleva bien con otros animales. Necesita un hogar con espacio para jugar.',
  image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1544087723-47a1d6e26722?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  personality: ['Curiosa', 'Enérgica', 'Sociable']
}, {
  id: '4',
  name: 'Rocky',
  age: '3 años',
  breed: 'Bulldog',
  size: 'mediano',
  description: 'Rocky es un perro tranquilo y amigable. Le gusta pasar tiempo en casa y recibir cariños. Es perfecto para apartamentos y familias tranquilas. No requiere mucho ejercicio.',
  image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  personality: ['Tranquilo', 'Amigable', 'Perezoso']
}, {
  id: '5',
  name: 'Coco',
  age: '6 meses',
  breed: 'Poodle',
  size: 'pequeño',
  description: 'Coco es una cachorra muy inteligente y juguetona. No pierde pelo, lo que la hace ideal para personas alérgicas. Es muy cariñosa y se adapta bien a cualquier hogar.',
  image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  images: ['https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  personality: ['Inteligente', 'Juguetona', 'Cariñosa']
}, {
  id: '6',
  name: 'Toby',
  age: '5 años',
  breed: 'Golden Retriever',
  size: 'grande',
  description: 'Toby es un perro muy dulce y paciente. Ha vivido con familias con niños y es excelente con ellos. Es obediente y está bien entrenado. Busca un hogar donde reciba mucho amor.',
  image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  images: ['https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  personality: ['Dulce', 'Paciente', 'Obediente']
}];