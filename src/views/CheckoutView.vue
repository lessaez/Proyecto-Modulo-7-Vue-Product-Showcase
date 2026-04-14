<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const carrito = computed(() => store.state.carrito)

const total = computed(() =>
  carrito.value.reduce((acc, item) => {
    const precio = Number(item.precio) || 0
    const cantidad = Number(item.cantidad) || 1
    return acc + precio * cantidad
  }, 0)
)

const formatoCLP = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor)
}

const finalizarCompra = () => {
  alert('🎉 Compra realizada con éxito')
  store.commit('VACIAR_CARRITO')
  router.push('/')
}
</script>

<template>
  <div class="checkout">
    <h1>💳 Checkout</h1>

    <div v-if="carrito.length === 0">
      <p>Tu carrito está vacío 😢</p>
      <button @click="router.push('/')">Volver</button>
    </div>

    <div v-else>
      <div v-for="item in carrito" :key="item.id">
        <p>{{ item.nombre }} x{{ item.cantidad }}</p>
        <p>{{ formatoCLP(item.precio * item.cantidad) }}</p>
      </div>

      <h2>Total: {{ formatoCLP(total) }}</h2>

      <button @click="finalizarCompra">Finalizar compra</button>
    </div>
  </div>
</template>

<style scoped>
.checkout {
  padding: 2rem;
}

.checkout-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.resumen {
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 10px;
}

.item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.btn-finalizar {
  margin-top: 10px;
  background: #d63384;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 8px;
  cursor: pointer;
}
</style>