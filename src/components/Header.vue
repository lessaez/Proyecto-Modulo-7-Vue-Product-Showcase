<script setup>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  categoriaActiva: String,
})

const emit = defineEmits(['filtrar', 'buscar'])

const store = useStore()
const router = useRouter()

// 🛒 carrito
const totalCarrito = computed(() => store.getters.totalCantidadCarrito)

// 👤 usuario
const usuario = computed(() => store.state.usuario)

// navegación
const irInicio = () => router.push('/')
const irCarrito = () => router.push('/carrito')

// filtros
const filtrar = (categoria) => {
  router.push('/')
  setTimeout(() => emit('filtrar', categoria), 100)
}

// 🔍 buscador
const buscar = (texto) => {
  emit('buscar', texto)
}

// 🔐 LOGIN MODAL
const mostrarLogin = ref(false)
const email = ref('')
const password = ref('')

const abrirLogin = () => {
  mostrarLogin.value = true
}

const cerrarLogin = () => {
  mostrarLogin.value = false
}

const login = () => {
  if (!email.value || !password.value) {
    alert('Completa los campos')
    return
  }

  store.commit('LOGIN', {
    email: email.value,
  })

  cerrarLogin()
}

const logout = () => {
  store.commit('LOGOUT')
}
</script>

<template>
  <header class="header">

    <!-- LOGO -->
    <div class="logo-container" @click="irInicio">
      <img src="/logo.png" alt="logo" />
    </div>

    <!-- BUSCADOR -->
    <input
      type="text"
      placeholder="Buscar producto..."
      class="buscador"
      @input="buscar($event.target.value)"
    />

    <!-- NAV -->
    <nav>
      <button :class="{ activo: categoriaActiva === 'todos' }" @click="filtrar('todos')">Todos</button>
      <button :class="{ activo: categoriaActiva === 'maquillaje' }" @click="filtrar('maquillaje')">Maquillaje</button>
      <button :class="{ activo: categoriaActiva === 'skincare' }" @click="filtrar('skincare')">Skincare</button>
      <button :class="{ activo: categoriaActiva === 'cabello' }" @click="filtrar('cabello')">Cabello</button>
    </nav>

    <!-- CARRITO -->
    <div class="carrito" @click="irCarrito">
      🛒
      <span v-if="totalCarrito > 0" class="badge">
        {{ totalCarrito }}
      </span>
    </div>

    <!-- USUARIO -->
    <div class="user-box">

      <!-- logueado -->
      <div v-if="usuario" class="user-info">
        <span class="avatar">👤</span>
        <span class="email">{{ usuario.email }}</span>
        <button class="logout" @click="logout">Salir</button>
      </div>

      <!-- no logueado -->
      <button v-else class="login-btn" @click="abrirLogin">
        Ingresar
      </button>

    </div>

  </header>

  <!-- 🔥 MODAL LOGIN -->
  <div v-if="mostrarLogin" class="modal-overlay" @click.self="cerrarLogin">
    <div class="modal">

      <h3>Iniciar sesión</h3>

      <input v-model="email" placeholder="Correo" />
      <input v-model="password" type="password" placeholder="Contraseña" />

      <button @click="login">Ingresar</button>

      <span class="cerrar" @click="cerrarLogin">✖</span>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(to right, #ffe4ec, #fff);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 20px;
}

/* LOGO */
.logo-container img {
  width: 80px;
}

/* BUSCADOR */
.buscador {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
}

/* NAV */
nav {
  display: flex;
  gap: 10px;
}

nav button {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
}

.activo {
  background: #d63384;
  color: white;
}

/* CARRITO */
.carrito {
  position: relative;
  font-size: 1.5rem;
}

.badge {
  position: absolute;
  top: -5px;
  right: -8px;
  background: #d63384;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
}

/* USER */
.user-info {
  display: flex;
  gap: 8px;
  background: white;
  padding: 5px 10px;
  border-radius: 10px;
}

.logout {
  background: #d63384;
  color: white;
  border: none;
  border-radius: 6px;
}

.login-btn {
  background: #d63384;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cerrar {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
</style>