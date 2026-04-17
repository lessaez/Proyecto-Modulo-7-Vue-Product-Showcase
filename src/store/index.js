import { createStore } from 'vuex'
import filtros from './modules/filtros'
import favoritos from './modules/favoritos'
import productos from './modules/productos'

const leerJSON = (key, fallback) => {
  try {
    const valor = localStorage.getItem(key)
    return valor ? JSON.parse(valor) : fallback
  } catch {
    return fallback
  }
}

export default createStore({
  modules: {
    productos,
    filtros,
    favoritos,
  },

  state: {
    carrito: leerJSON('carrito', []),
    usuario: leerJSON('usuario', null),
    animarCarrito: false,
    toasts: [],
    temaOscuro: leerJSON('temaOscuro', false),
  },

  mutations: {
    SET_TEMA_OSCURO(state, valor) {
      state.temaOscuro = Boolean(valor)
      localStorage.setItem('temaOscuro', JSON.stringify(state.temaOscuro))
    },

    LOGIN(state, usuario) {
      state.usuario = usuario
      localStorage.setItem('usuario', JSON.stringify(usuario))
    },

    LOGOUT(state) {
      state.usuario = null
      localStorage.removeItem('usuario')
    },

    AGREGAR_CARRITO(state, producto) {
      const existe = state.carrito.find((item) => String(item.id) === String(producto.id))

      if (existe) {
        existe.cantidad += 1
      } else {
        state.carrito.push({
          ...producto,
          precio: Number(producto.precio) || 0,
          cantidad: 1,
        })
      }

      localStorage.setItem('carrito', JSON.stringify(state.carrito))
    },

    ACTIVAR_ANIMACION_CARRITO(state) {
      state.animarCarrito = true

      setTimeout(() => {
        state.animarCarrito = false
      }, 300)
    },

    ELIMINAR_DEL_CARRITO(state, id) {
      state.carrito = state.carrito.filter((item) => String(item.id) !== String(id))
      localStorage.setItem('carrito', JSON.stringify(state.carrito))
    },

    AUMENTAR_CANTIDAD(state, id) {
      const producto = state.carrito.find((item) => String(item.id) === String(id))

      if (producto) {
        producto.cantidad += 1
        localStorage.setItem('carrito', JSON.stringify(state.carrito))
      }
    },

    DISMINUIR_CANTIDAD(state, id) {
      const producto = state.carrito.find((item) => String(item.id) === String(id))

      if (producto && producto.cantidad > 1) {
        producto.cantidad -= 1
        localStorage.setItem('carrito', JSON.stringify(state.carrito))
      }
    },

    VACIAR_CARRITO(state) {
      state.carrito = []
      localStorage.removeItem('carrito')
    },

    AGREGAR_TOAST(state, mensaje) {
      const id = Date.now()

      state.toasts.push({ id, mensaje })

      setTimeout(() => {
        state.toasts = state.toasts.filter((toast) => toast.id !== id)
      }, 2500)
    },
  },

  getters: {
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
