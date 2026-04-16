<script setup>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  producto: Object,
})

const store = useStore()
const router = useRouter()

// ⭐ rating
const rating = ref(Math.floor(Math.random() * 5) + 1)

// ❤️ favorito
const esFavorito = computed(() => store.getters.esFavorito(props.producto.id))

// 🛒 animación local botón
const animando = ref(false)

// acciones
const toggleFavorito = () => {
  store.commit('TOGGLE_FAVORITO', props.producto)
}

const verProducto = () => {
  router.push(`/producto/${props.producto.id}`)
}

const agregarCarrito = () => {
  store.commit('AGREGAR_CARRITO', props.producto)
  store.commit('AGREGAR_TOAST', 'Producto agregado al carrito 💖')

  // 🔥 animación global carrito
  store.commit('ACTIVAR_ANIMACION_CARRITO')

  // ✨ animación botón
  animando.value = true
  setTimeout(() => {
    animando.value = false
  }, 300)
}

// CLP
const formatoCLP = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor)
}
</script>

<template>
  <div class="card">
    <!-- ❤️ favorito -->
    <span class="fav" @click="toggleFavorito">
      {{ esFavorito ? '❤️' : '🤍' }}
    </span>

    <!-- imagen -->
    <div class="img-container">
      <img :src="producto.imagen" alt="producto" />
    </div>

    <h3>{{ producto.nombre }}</h3>
    <h4 class="marca">{{ producto.marca }}</h4>

    <!-- ⭐ rating -->
    <div class="rating">
      <span v-for="n in 5" :key="n">
        {{ n <= rating ? '⭐' : '☆' }}
      </span>
    </div>

    <p class="precio">{{ formatoCLP(producto.precio) }}</p>

    <p class="color" v-if="producto.color && producto.color !== '—'">Color: {{ producto.color }}</p>

    <p class="desc">{{ producto.descripcion }}</p>

    <!-- botones -->
    <div class="acciones">
      <button class="btn ver" @click="verProducto">Ver</button>

      <button class="btn carrito" :class="{ animar: animando }" @click="agregarCarrito">🛒</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 12px;
  background: white;
  text-align: center;
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.fav {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.img-container {
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  border-radius: 10px;
}

.img-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.marca {
  color: #888;
  font-size: 0.9rem;
}

.rating {
  color: #ffc107;
}

.precio {
  font-weight: bold;
}

.acciones {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
}

.ver {
  background: #d63384;
  color: white;
}

.carrito {
  background: #333;
  color: white;
  transition: transform 0.2s;
}

.carrito:hover {
  transform: scale(1.1);
}

/* 🔥 animación botón */
.animar {
  animation: pop 0.3s ease;
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3) rotate(-10deg);
  }
  100% {
    transform: scale(1);
  }
}

.desc {
  font-size: 0.85rem;
  color: #666;
}
</style>
