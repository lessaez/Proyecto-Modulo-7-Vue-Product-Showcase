<script setup>
import { computed, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const props = defineProps({
  categoriaActiva: {
    type: String,
    default: 'all',
  },
})

const emit = defineEmits(['filtrar', 'buscar'])

const store = useStore()
const router = useRouter()

const totalCarrito = computed(() => store.getters.totalCantidadCarrito)
const animarCarrito = computed(() => store.state.animarCarrito)
const usuario = computed(() => store.state.usuario)
const temaOscuro = computed({
  get: () => store.state.temaOscuro,
  set: (valor) => store.commit('SET_TEMA_OSCURO', valor),
})

const mostrarLogin = ref(false)
const email = ref('')
const password = ref('')
const error = ref('')
const textoBusqueda = ref('')

const irInicio = () => router.push('/')
const irCarrito = () => router.push('/carrito')

const filtrar = (categoria) => {
  router.push('/')
  emit('filtrar', categoria)
}

const buscar = (texto) => {
  emit('buscar', texto || '')
}

const abrirLogin = () => {
  mostrarLogin.value = true
}

const cerrarLogin = () => {
  mostrarLogin.value = false
  error.value = ''
}

const login = () => {
  if (!email.value || !password.value) {
    error.value = 'Completa todos los campos.'
    return
  }

  store.commit('LOGIN', { email: email.value })
  cerrarLogin()
  email.value = ''
  password.value = ''
  store.commit('AGREGAR_TOAST', 'Sesión iniciada correctamente')
}

const logout = () => {
  store.commit('LOGOUT')
  store.commit('AGREGAR_TOAST', 'Sesión cerrada')
}
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <button class="logo" @click="irInicio">
        <img src="/logo.png" alt="Beauty Shop" />
        <div class="logo-copy">
          <span class="eyebrow">Vue Product Showcase</span>
        </div>
      </button>

      <div class="search">
        <el-input
          v-model="textoBusqueda"
          clearable
          placeholder="Buscar maquillaje, skincare o cabello"
          size="large"
          @input="buscar"
          @clear="buscar('')"
          @keyup.enter="buscar(textoBusqueda)"
        >
          <template #append>
            <el-button
              class="search-button"
              :icon="Search"
              aria-label="Buscar"
              @click="buscar(textoBusqueda)"
            />
          </template>
        </el-input>
      </div>

      <nav class="nav">
        <el-button
          data-testid="filter-all"
          round
          :type="categoriaActiva === 'all' ? 'danger' : 'default'"
          @click="filtrar('all')"
        >
          Todos
        </el-button>
        <el-button
          data-testid="filter-maquillaje"
          round
          :type="categoriaActiva === 'maquillaje' ? 'danger' : 'default'"
          @click="filtrar('maquillaje')"
        >
          Maquillaje
        </el-button>
        <el-button
          data-testid="filter-skincare"
          round
          :type="categoriaActiva === 'skincare' ? 'danger' : 'default'"
          @click="filtrar('skincare')"
        >
          Skincare
        </el-button>
        <el-button
          data-testid="filter-cabello"
          round
          :type="categoriaActiva === 'cabello' ? 'danger' : 'default'"
          @click="filtrar('cabello')"
        >
          Cabello
        </el-button>
      </nav>

      <div class="actions">
        <div class="theme-switch">
          <span>{{ temaOscuro ? 'Modo oscuro' : 'Modo claro' }}</span>
          <el-switch
            v-model="temaOscuro"
            inline-prompt
            active-text="🌙"
            inactive-text="☀"
          />
        </div>

        <div v-if="usuario" class="user-pill">
          <span>{{ usuario.email }}</span>
          <el-button text type="danger" @click="logout">Salir</el-button>
        </div>

        <el-button v-else round type="danger" plain @click="abrirLogin">
          Ingresar
        </el-button>

        <div class="cart-wrapper" :class="{ bounce: animarCarrito }">
          <el-badge :hidden="!totalCarrito" :value="totalCarrito">
            <el-button circle data-testid="cart-button" @click="irCarrito">🛒</el-button>
          </el-badge>
        </div>
      </div>
    </div>
  </header>

  <el-dialog v-model="mostrarLogin" title="Iniciar sesión" width="380px" append-to-body>
    <div class="login-form">
      <el-input v-model="email" placeholder="Correo" size="large" />
      <el-input v-model="password" placeholder="Contraseña" show-password size="large" />
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <template #footer>
      <el-button @click="cerrarLogin">Cancelar</el-button>
      <el-button type="danger" @click="login">Ingresar</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  padding: 16px 20px 0;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 18px;
  display: grid;
  grid-template-columns: auto minmax(240px, 1fr);
  gap: 16px;
  align-items: center;
  border: 1px solid var(--border-soft);
  border-radius: 24px;
  background: color-mix(in srgb, var(--bg-surface) 88%, transparent);
  backdrop-filter: blur(14px);
  box-shadow: var(--shadow-soft);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.logo img {
  width: 72px;
  height: 72px;
  object-fit: contain;
}

.logo-copy {
  display: grid;
  text-align: left;
}

.eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.search {
  min-width: 0;
}

.search :deep(.el-input-group__append) {
  padding: 0;
  overflow: hidden;
}

.search-button {
  height: 100%;
  border: none;
  border-radius: 0;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;
}

.theme-switch {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--border-soft);
  border-radius: 999px;
  background: var(--bg-muted);
}

.cart-wrapper {
  transition: transform 0.2s ease;
}

.bounce {
  animation: bounce 0.35s ease;
}

.login-form {
  display: grid;
  gap: 12px;
}

.error {
  margin: 0;
  color: #ef4444;
  font-size: 0.9rem;
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }

  40% {
    transform: scale(1.18);
  }

  100% {
    transform: scale(1);
  }
}

@media (max-width: 980px) {
  .header-inner {
    grid-template-columns: 1fr;
  }

  .actions {
    justify-content: flex-start;
  }
}
</style>
