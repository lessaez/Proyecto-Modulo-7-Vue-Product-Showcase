<script setup>
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  categoriaActiva: String,
})

const emit = defineEmits(['filtrar', 'buscar'])

const store = useStore()
const router = useRouter()

// 🛒 carrito
const totalCarrito = computed(() => store.getters.totalCantidadCarrito)
const animarCarrito = computed(() => store.state.animarCarrito)

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
const error = ref('')

// 🔥 REF DEL CARRITO (CLAVE)
const carritoRef = ref(null)

onMounted(() => {
  window.carritoElemento = carritoRef.value
})

const abrirLogin = () => {
  mostrarLogin.value = true
}

const cerrarLogin = () => {
  mostrarLogin.value = false
  error.value = ''
}

// login
const login = () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Completa todos los campos'
    return
  }

  if (!email.value.includes('@')) {
    error.value = 'Correo inválido'
    return
  }

  store.commit('LOGIN', {
    email: email.value,
  })

  cerrarLogin()

  email.value = ''
  password.value = ''
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

    <!-- 🛒 CARRITO CON REF + ANIMACIÓN -->
    <div 
      class="carrito"
      ref="carritoRef"
      :class="{ bounce: animarCarrito }"
      @click="irCarrito"
    >
      🛒
      <span v-if="totalCarrito > 0" class="badge">
        {{ totalCarrito }}
      </span>
    </div>

    <!-- USUARIO -->
    <div class="user-box">

      <div v-if="usuario" class="user-info">
        <span class="avatar">👤</span>
        <span class="email">{{ usuario.email }}</span>
        <button class="logout" @click="logout">Salir</button>
      </div>

      <button v-else class="login-btn" @click="abrirLogin">
        Ingresar
      </button>

    </div>

  </header>

  <!-- 🔐 MODAL -->
  <div v-if="mostrarLogin" class="modal-overlay" @click.self="cerrarLogin">
    <div class="modal">

      <h3>Iniciar sesión</h3>

      <input v-model="email" placeholder="Correo" />
      <input v-model="password" type="password" placeholder="Contraseña" />

      <p v-if="error" class="error">{{ error }}</p>

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

.logo-container img {
  width: 80px;
}

.buscador {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
}

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

/* 🛒 */
.carrito {
  position: relative;
  font-size: 1.5rem;
  cursor: pointer;
}

/* 🔥 ANIMACIÓN REBOTE */
.bounce {
  animation: bounce 0.4s ease;
}

@keyframes bounce {
  0% { transform: scale(1); }
  30% { transform: scale(1.3); }
  50% { transform: scale(0.9); }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* badge */
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

/* modal */
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
  z-index: 9999;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}

.error {
  color: red;
  font-size: 0.8rem;
  text-align: center;
}

.cerrar {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
</style>