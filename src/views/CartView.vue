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
const vaciar = () => store.commit('VACIAR_CARRITO')

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
    <button class="volver" @click="volver">⬅ Volver</button>

    <h1>🛒 Tu Carrito</h1>

    <div v-if="carrito.length === 0" class="vacio">
      <p>Tu carrito está vacío 😢</p>
    </div>

    <div v-else>

      <!-- 🔥 ANIMACIÓN -->
      <transition-group name="cart" tag="div">
        <div class="item" v-for="p in carrito" :key="p.id">
          
          <img :src="p.imagen" />

          <div class="info">
            <h3>{{ p.nombre }}</h3>

            <!-- cantidad -->
            <div class="cantidad">
              <button @click="disminuir(p.id)">➖</button>
              <span>{{ p.cantidad }}</span>
              <button @click="aumentar(p.id)">➕</button>
            </div>

            <p class="precio">
              {{ formatoCLP(p.precio * p.cantidad) }}
            </p>
          </div>

          <button class="eliminar" @click="eliminar(p.id)">❌</button>
        </div>
      </transition-group>

      <!-- resumen -->
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
  max-width: 900px;
  margin: auto;
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

/* item */
.item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

/* imagen */
img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  background: #f8f8f8;
  border-radius: 10px;
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
  margin: 8px 0;
}

.cantidad button {
  border: none;
  background: #eee;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.15s ease;
}

.cantidad button:active {
  transform: scale(0.8);
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
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s;
}

.eliminar:hover {
  transform: scale(1.1);
  background: #ff0000;
}

/* resumen */
.resumen {
  margin-top: 20px;
}

.checkout {
  margin-top: 10px;
  background: #d63384;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 10px;
  width: 100%;
}

.vaciar {
  margin-top: 10px;
  background: black;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  width: 100%;
}

/* 🔥 ANIMACIONES */
.cart-enter-active {
  transition: all 0.4s ease;
}

.cart-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.cart-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.cart-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.cart-move {
  transition: transform 0.3s ease;
}
</style>