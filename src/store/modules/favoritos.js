const leerFavoritos = () => {
  try {
    return JSON.parse(localStorage.getItem('favoritos')) || []
  } catch {
    return []
  }
}

const persistirFavoritos = (items) => {
  localStorage.setItem('favoritos', JSON.stringify(items))
}

export default {
  namespaced: true,

  state: () => ({
    items: leerFavoritos(),
  }),

  mutations: {
    TOGGLE_FAVORITO(state, producto) {
      const existe = state.items.find((item) => String(item.id) === String(producto.id))

      if (existe) {
        state.items = state.items.filter((item) => String(item.id) !== String(producto.id))
      } else {
        state.items.push(producto)
      }

      persistirFavoritos(state.items)
    },
  },

  getters: {
    favoritos: (state) => state.items,
    esFavorito: (state) => (id) => state.items.some((item) => String(item.id) === String(id)),
  },
}
