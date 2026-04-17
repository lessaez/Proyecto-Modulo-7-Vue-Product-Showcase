import axios from 'axios'
import { productos } from '../../data/productos' // 👈 IMPORTANTE

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

      try {
        const res = await axios.get('https://fakestoreapi.com/products')

        // 🔥 si API responde bien
        if (res.data && res.data.length > 0) {
          commit('SET_PRODUCTOS', res.data)
        } else {
          commit('SET_PRODUCTOS', productos)
        }
      } catch (error) {
        console.error(error)

        // 🔥 fallback local (CLAVE)
        commit('SET_PRODUCTOS', productos)
        commit('SET_ERROR', 'Usando productos locales')
      } finally {
        commit('SET_CARGANDO', false)
      }
    },
  },

  getters: {
    todosProductos: (state) => state.productos,

    productosFiltrados: (state, getters, rootState) => {
      const categoria = rootState.filtros?.categoria || 'all'

      if (categoria === 'all') {
        return state.productos
      }

      return state.productos.filter((p) => p.category === categoria || p.categoria === categoria)
    },
  },
}
