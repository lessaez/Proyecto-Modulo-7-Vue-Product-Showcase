import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import ProductList from '../../src/components/ProductList.vue'

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

const producto = {
  id: 'local-6',
  nombre: 'Crema hidratante',
  marca: 'Beauty Shop',
  precio: 10990,
  categoria: 'skincare',
  imagen: '/productos/crema-hidratante.png',
  descripcion: 'Hidratación diaria.',
  color: '',
  rating: 4,
}

const crearStore = () =>
  createStore({
    modules: {
      filtros: {
        namespaced: true,
        state: () => ({ categoria: 'all' }),
        mutations: {
          SET_CATEGORIA(state, categoria) {
            state.categoria = categoria
          },
        },
      },
      productos: {
        namespaced: true,
        state: () => ({
          productos: [producto],
          cargando: false,
          error: 'No se pudo conectar con la API. Se mostró el catálogo local.',
        }),
        getters: {
          todosProductos: () => [producto],
          productosFiltrados: () => [producto],
        },
      },
    },
  })

describe('ProductList', () => {
  it('muestra una respuesta visual cuando existe error de API', () => {
    const wrapper = mount(ProductList, {
      global: {
        plugins: [crearStore()],
        stubs: {
          'el-select': { template: '<div><slot /></div>' },
          'el-option': true,
          'el-skeleton': { template: '<div><slot name="template" /></div>' },
          'el-skeleton-item': true,
          'el-alert': { props: ['title'], template: '<div class="alert">{{ title }}</div>' },
          'el-empty': { props: ['description'], template: '<div>{{ description }}</div>' },
          ProductCard: { template: '<article class="product-card-stub">Producto</article>' },
        },
      },
    })

    expect(wrapper.text()).toContain('No se pudo conectar con la API')
    expect(wrapper.find('.product-card-stub').exists()).toBe(true)
  })
})
