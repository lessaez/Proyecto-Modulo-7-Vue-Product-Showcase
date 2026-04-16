import axios from 'axios'

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
        commit('SET_PRODUCTOS', res.data)
      } catch (error) {
        commit('SET_ERROR', 'Error al cargar productos')
      } finally {
        commit('SET_CARGANDO', false)
      }
    },
  },

  getters: {
    todosProductos: (state) => state.productos,
  },
}
