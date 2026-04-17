import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import ProductCard from '../../src/components/ProductCard.vue'

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

const producto = {
  id: 'local-1',
  nombre: 'Labial',
  marca: 'Beauty Shop',
  precio: 4990,
  categoria: 'maquillaje',
  imagen: '/productos/labial.png',
  descripcion: 'Color intenso y acabado suave.',
  color: 'Rojo',
  rating: 4,
}

const crearStore = () =>
  createStore({
    state: {
      carrito: [],
      usuario: null,
      animarCarrito: false,
      toasts: [],
      temaOscuro: false,
    },
    mutations: {
      AGREGAR_CARRITO: jest.fn(),
      AGREGAR_TOAST: jest.fn(),
      ACTIVAR_ANIMACION_CARRITO: jest.fn(),
    },
    getters: {
      totalCantidadCarrito: () => 0,
    },
    modules: {
      favoritos: {
        namespaced: true,
        getters: {
          esFavorito: () => () => false,
        },
        mutations: {
          TOGGLE_FAVORITO: jest.fn(),
        },
      },
    },
  })

describe('ProductCard', () => {
  it('renderiza correctamente la información principal del producto', () => {
    const wrapper = mount(ProductCard, {
      props: { producto },
      global: {
        plugins: [crearStore()],
        stubs: {
          'el-card': { template: '<div><slot /></div>' },
          'el-tag': { template: '<span><slot /></span>' },
          'el-rate': true,
          'el-button': { template: '<button><slot /></button>' },
        },
      },
    })

    expect(wrapper.text()).toContain('Labial')
    expect(wrapper.text()).toContain('Beauty Shop')
    expect(wrapper.text()).toContain('$4.990')
    expect(wrapper.find('[data-testid="product-name"]').text()).toBe('Labial')
  })
})
