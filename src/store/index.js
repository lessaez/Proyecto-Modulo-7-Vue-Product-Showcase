import { createStore } from 'vuex'

export default createStore({
  state: {
    carrito: JSON.parse(localStorage.getItem('carrito')) || [],
    favoritos: [],
  },

  mutations: {
    AGREGAR_CARRITO(state, producto) {
      const existe = state.carrito.find((p) => p.id === producto.id)

      if (existe) {
        existe.cantidad++
      } else {
        state.carrito.push({
          ...producto,
          precio: Number(producto.precio) || 0,
          cantidad: 1,
        })
      }

      localStorage.setItem('carrito', JSON.stringify(state.carrito))
    },

    ELIMINAR_DEL_CARRITO(state, id) {
      state.carrito = state.carrito.filter((p) => p.id !== id)
      localStorage.setItem('carrito', JSON.stringify(state.carrito))
    },

    AUMENTAR_CANTIDAD(state, id) {
      const producto = state.carrito.find((p) => p.id === id)
      if (producto) producto.cantidad++
      localStorage.setItem('carrito', JSON.stringify(state.carrito))
    },

    DISMINUIR_CANTIDAD(state, id) {
      const producto = state.carrito.find((p) => p.id === id)
      if (producto && producto.cantidad > 1) producto.cantidad--
      localStorage.setItem('carrito', JSON.stringify(state.carrito))
    },

    VACIAR_CARRITO(state) {
      state.carrito = []
      localStorage.removeItem('carrito')
    },

    TOGGLE_FAVORITO(state, producto) {
      const existe = state.favoritos.find((p) => p.id === producto.id)

      if (existe) {
        state.favoritos = state.favoritos.filter((p) => p.id !== producto.id)
      } else {
        state.favoritos.push(producto)
      }
    },
  },

  // 🔥 SOLO ESTE GETTER
  getters: {
    esFavorito: (state) => (id) => {
      return state.favoritos.some((p) => p.id === id)
    },

    totalPrecio: (state) => {
      return state.carrito.reduce((acc, item) => {
        const precio = Number(item.precio) || 0
        const cantidad = Number(item.cantidad) || 1
        return acc + precio * cantidad
      }, 0)
    },

    totalCantidadCarrito: (state) => {
      return state.carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0)
    },
  },
})
