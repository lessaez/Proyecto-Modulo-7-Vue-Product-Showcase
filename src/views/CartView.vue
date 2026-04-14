<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'

const store = useStore()
const router = useRouter()

const carrito = computed(() => store.state.carrito)
const total = computed(() => store.getters.totalPrecio)

// acciones
const eliminar = (id) => store.commit('ELIMINAR_DEL_CARRITO', id)
const aumentar = (id) => store.commit('AUMENTAR_CANTIDAD', id)
const disminuir = (id) => store.commit('DISMINUIR_CANTIDAD', id)
const vaciar = () => store.commit('LIMPIAR_CARRITO')

const volver = () => router.back()
const irCheckout = () => router.push('/checkout')

// CLP
const formatoCLP = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor)
}
</script>

<template>
  <Header />

  <div class="carrito">
    <!-- volver -->
    <button class="volver" @click="volver">⬅ Volver</button>

    <h1>🛒 Tu Carrito</h1>

    <div v-if="carrito.length === 0" class="vacio">
      <p>Tu carrito está vacío 😢</p>
    </div>

    <div v-else>
      <!-- lista -->
      <div class="item" v-for="p in carrito" :key="p.id">
        
        <!-- imagen -->
        <img :src="p.imagen" />

        <!-- info -->
        <div class="info">
          <h3>{{ p.nombre }}</h3>

          <!-- cantidad -->
          <div class="cantidad">
            <button @click="disminuir(p.id)">➖</button>
            <span>{{ p.cantidad }}</span>
            <button @click="aumentar(p.id)">➕</button>
          </div>

          <!-- subtotal -->
          <p class="precio">
            {{ formatoCLP(p.precio * p.cantidad) }}
          </p>
        </div>

        <!-- eliminar -->
        <button class="eliminar" @click="eliminar(p.id)">❌</button>
      </div>

      <!-- total -->
      <div class="resumen">
        <h2>Total: {{ formatoCLP(total) }}</h2>

        <button class="checkout" @click="irCheckout">
          Finalizar compra 💳
        </button>

        <button class="vaciar" @click="vaciar">
          Vaciar carrito 🗑️
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carrito {
  padding: 2rem;
}

/* volver */
.volver {
  margin-bottom: 1rem;
  background: #eee;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

/* vacío */
.vacio {
  margin-top: 20px;
}

/* item */
.item {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}

/* imagen */
img {
  width: 70px;
  height: 70px;
  object-fit: contain;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 5px;
}

/* info */
.info {
  flex: 1;
}

/* cantidad */
.cantidad {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px 0;
}

.cantidad button {
  border: none;
  padding: 4px 8px;
  background: #ddd;
  border-radius: 5px;
  cursor: pointer;
}

/* precio */
.precio {
  font-weight: bold;
}

/* eliminar */
.eliminar {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

/* resumen */
.resumen {
  margin-top: 20px;
}

/* botones */
.checkout {
  margin-top: 10px;
  background: #d63384;
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
}

.vaciar {
  margin-top: 10px;
  background: black;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
}
</style>