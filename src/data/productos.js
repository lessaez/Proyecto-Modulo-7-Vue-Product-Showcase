import labial from '../assets/productos/labial.png'
import base from '../assets/productos/base.png'
import mascara from '../assets/productos/mascara.png'
import paleta from '../assets/productos/paleta-de-colores.png'
import rubor from '../assets/productos/rubor-compacto.png'

import crema from '../assets/productos/crema-hidratante.png'
import serum from '../assets/productos/serum-vitamina-c.png'
import agua from '../assets/productos/agua-miscelar.png'
import protector from '../assets/productos/protector-solar.png'
import contorno from '../assets/productos/contorno-ojos.png'
import gel from '../assets/productos/gel-limpiador-facial.png'
import tonico from '../assets/productos/tonico-facial.png'

import shampoo from '../assets/productos/shampoo-reparador.png'
import acondicionador from '../assets/productos/acondicionador-suave.png'
import mascarilla from '../assets/productos/mascarilla-capilar.png'
import aceite from '../assets/productos/aceite-capilar.png'
import spray from '../assets/productos/spray-protector-termico.png'
import cepillo from '../assets/productos/cepillo-alisador.png'
import plancha from '../assets/productos/plancha-pelo.png'

import setMaquillaje from '../assets/productos/set-maquillaje-completo.png'

export const productos = [
  {
    id: 1,
    nombre: 'Labial Cremoso Mate',
    marca: 'Vogue',
    precio: 5990,
    categoria: 'maquillaje',
    color: 'Rosado',
    descripcion: 'Labial de larga duración.',
    imagen: labial,
  },
  {
    id: 2,
    nombre: 'Base Líquida',
    marca: 'L.A Girl',
    precio: 10990,
    categoria: 'maquillaje',
    color: 'Beige',
    descripcion: 'Alta cobertura.',
    imagen: base,
  },
  {
    id: 3,
    nombre: 'Máscara Waterproof',
    marca: 'Maybelline',
    precio: 7990,
    categoria: 'maquillaje',
    color: 'Negro',
    descripcion: 'Resistente al agua.',
    imagen: mascara,
  },
  {
    id: 4,
    nombre: 'Paleta Sombras',
    marca: 'Essence',
    precio: 12990,
    categoria: 'maquillaje',
    color: 'Multicolor',
    descripcion: 'Tonos variados.',
    imagen: paleta,
  },
  {
    id: 5,
    nombre: 'Rubor Compacto',
    marca: 'Essence',
    precio: 6990,
    categoria: 'maquillaje',
    color: 'Durazno',
    descripcion: 'Acabado natural.',
    imagen: rubor,
  },

  {
    id: 6,
    nombre: 'Crema Hidratante',
    marca: 'Nivea',
    precio: 8990,
    categoria: 'skincare',
    descripcion: 'Hidratación profunda.',
    imagen: crema,
  },
  {
    id: 7,
    nombre: 'Serum Vitamina C',
    marca: 'Garnier',
    precio: 12990,
    categoria: 'skincare',
    descripcion: 'Ilumina la piel.',
    imagen: serum,
  },
  {
    id: 8,
    nombre: 'Agua Micelar',
    marca: 'Garnier',
    precio: 5990,
    categoria: 'skincare',
    descripcion: 'Limpieza facial.',
    imagen: agua,
  },
  {
    id: 9,
    nombre: 'Protector Solar',
    marca: 'Eucerin',
    precio: 9990,
    categoria: 'skincare',
    descripcion: 'FPS 50.',
    imagen: protector,
  },
  {
    id: 10,
    nombre: 'Contorno Ojos',
    marca: 'Garnier',
    precio: 11990,
    categoria: 'skincare',
    descripcion: 'Reduce ojeras.',
    imagen: contorno,
  },

  {
    id: 11,
    nombre: 'Shampoo',
    marca: 'Pantene',
    precio: 6990,
    categoria: 'cabello',
    descripcion: 'Reparación capilar.',
    imagen: shampoo,
  },
  {
    id: 12,
    nombre: 'Acondicionador',
    marca: 'Pantene',
    precio: 6490,
    categoria: 'cabello',
    descripcion: 'Suaviza cabello.',
    imagen: acondicionador,
  },
  {
    id: 13,
    nombre: 'Mascarilla',
    marca: 'Pantene',
    precio: 8990,
    categoria: 'cabello',
    descripcion: 'Tratamiento intensivo.',
    imagen: mascarilla,
  },
  {
    id: 14,
    nombre: 'Aceite Capilar',
    marca: 'Pantene',
    precio: 10990,
    categoria: 'cabello',
    descripcion: 'Nutrición.',
    imagen: aceite,
  },
  {
    id: 15,
    nombre: 'Spray Térmico',
    marca: 'Pantene',
    precio: 7990,
    categoria: 'cabello',
    descripcion: 'Protección calor.',
    imagen: spray,
  },

  {
    id: 16,
    nombre: 'Gel Limpiador',
    marca: "L'Oréal",
    precio: 7490,
    categoria: 'skincare',
    descripcion: 'Limpieza profunda.',
    imagen: gel,
  },
  {
    id: 17,
    nombre: 'Tónico Facial',
    marca: 'Garnier',
    precio: 6990,
    categoria: 'skincare',
    descripcion: 'Equilibra piel.',
    imagen: tonico,
  },
  {
    id: 18,
    nombre: 'Cepillo Alisador',
    marca: 'Genérico',
    precio: 15990,
    categoria: 'cabello',
    descripcion: 'Alisa cabello.',
    imagen: cepillo,
  },
  {
    id: 19,
    nombre: 'Plancha Pelo',
    marca: 'GA.MA',
    precio: 24990,
    categoria: 'cabello',
    descripcion: 'Alisado pro.',
    imagen: plancha,
  },
  {
    id: 20,
    nombre: 'Set Maquillaje',
    marca: 'Genérico',
    precio: 19990,
    categoria: 'maquillaje',
    descripcion: 'Kit completo.',
    imagen: setMaquillaje,
  },
]
