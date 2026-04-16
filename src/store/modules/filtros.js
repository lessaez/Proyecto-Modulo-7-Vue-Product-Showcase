export default {
  namespaced: true,

  state: {
    categoria: 'all',
  },

  mutations: {
    SET_CATEGORIA(state, categoria) {
      state.categoria = categoria
    },
  },

  getters: {
    categoriaActual: (state) => state.categoria,
  },
}
