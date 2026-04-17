import axios from 'axios'
import { productos as productosLocales } from '../../data/productos'

const categoriasApiPermitidas = new Set(['beauty', 'fragrances', 'skin-care'])

const mapearCategoriaApi = (categoria) => {
  if (categoria === 'skin-care') {
    return 'skincare'
  }

  return 'maquillaje'
}

const normalizarLocal = (producto) => ({
  ...producto,
  id: `local-${producto.id}`,
  precio: Number(producto.precio) || 0,
  marca: producto.marca || 'Beauty Shop',
  descripcion:
    producto.descripcion || 'Producto seleccionado para complementar tu rutina diaria.',
  color: producto.color || '',
  categoria: producto.categoria || 'maquillaje',
  rating: producto.rating || 4,
})

const normalizarApi = (producto) => ({
  id: `api-${producto.id}`,
  nombre: producto.title,
  imagen: producto.thumbnail || producto.images?.[0] || '/logo.png',
  precio: Math.round((Number(producto.price) || 0) * 950),
  categoria: mapearCategoriaApi(producto.category),
  marca: producto.brand || 'API Beauty',
  descripcion:
    producto.description || 'Producto obtenido desde la API para el catálogo.',
  color: '',
  rating: Math.round(Number(producto.rating) || 4),
})

export default {
  namespaced: true,

  state: {
    productos: [],
    cargando: false,
    error: null,
  },

  mutations: {
    SET_PRODUCTOS(state, productos) {
      state.productos = productos
    },
    SET_CARGANDO(state, valor) {
      state.cargando = valor
    },
    SET_ERROR(state, error) {
      state.error = error
    },
  },

  actions: {
    async fetchProductos({ commit }) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', null)

      const catalogoLocal = productosLocales.map(normalizarLocal)

      try {
        const { data } = await axios.get('https://dummyjson.com/products?limit=100', {
          timeout: 5000,
        })

        const productosApi = (data.products || [])
          .filter((producto) => categoriasApiPermitidas.has(producto.category))
          .map(normalizarApi)

        commit('SET_PRODUCTOS', [...catalogoLocal, ...productosApi])

        if (!productosApi.length) {
          commit('SET_ERROR', 'La API no devolvió productos; se mostró el catálogo local.')
        }
      } catch (error) {
        console.error(error)
        commit('SET_PRODUCTOS', catalogoLocal)
        commit('SET_ERROR', 'No se pudo conectar con la API. Se mostró el catálogo local.')
      } finally {
        commit('SET_CARGANDO', false)
      }
    },
  },

  getters: {
    todosProductos: (state) => state.productos,

    productoPorId: (state) => (id) => {
      return state.productos.find((producto) => String(producto.id) === String(id)) || null
    },

    productosFiltrados: (state, getters, rootState) => {
      const categoria = rootState.filtros?.categoria || 'all'

      if (categoria === 'all') {
        return state.productos
      }

      return state.productos.filter((producto) => producto.categoria === categoria)
    },
  },
}
