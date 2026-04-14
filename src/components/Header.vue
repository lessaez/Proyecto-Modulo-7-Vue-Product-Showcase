<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['filtrar'])

const store = useStore()
const router = useRouter()

const totalCarrito = computed(() => store.getters.totalCantidadCarrito)

const irInicio = () => router.push('/')
const irCarrito = () => router.push('/carrito')

// 👇 rutas filtros (solo en home)
const filtrar = (cat) => {
  router.push('/')
  setTimeout(() => emit('filtrar', cat), 100)
}
</script>

<template>
  <header class="header">

    <!-- LOGO -->
    <div class="logo-container" @click="irInicio">
      <img src="/logo.png" alt="logo" />
      <h1>BeautyShop Leslie</h1>
    </div>

    <!-- NAV -->
    <nav>
      <button @click="filtrar('todos')">Todos</button>
      <button @click="filtrar('maquillaje')">Maquillaje</button>
      <button @click="filtrar('skincare')">Skincare</button>
      <button @click="filtrar('cabello')">Cabello</button>
    </nav>

    <!-- CARRITO -->
    <div class="carrito" @click="irCarrito">
      🛒
      <span v-if="totalCarrito > 0" class="badge">
        {{ totalCarrito }}
      </span>
    </div>

  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(to right, #ffe4ec, #fff);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.logo-container img {
  width: 40px;
}

h1 {
  color: #d63384;
}

nav button {
  margin: 0 5px;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background: white;
  border-radius: 8px;
}

.carrito {
  position: relative;
  cursor: pointer;
  font-size: 1.5rem;
}

.badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: #d63384;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
}
</style>