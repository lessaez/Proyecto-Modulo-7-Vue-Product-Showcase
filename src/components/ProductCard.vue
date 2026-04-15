<script setup>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  producto: Object,
})

const store = useStore()
const router = useRouter()

const rating = ref(Math.floor(Math.random() * 5) + 1)

const esFavorito = computed(() =>
  store.getters.esFavorito(props.producto.id)
)

const toggleFavorito = () => {
  store.commit('TOGGLE_FAVORITO', props.producto)
}

const agregarCarrito = () => {
  store.commit('AGREGAR_CARRITO', props.producto)
}

const verProducto = () => {
  router.push(`/producto/${props.producto.id}`)
}

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

    <!-- info -->
    <div class="info">
      <h3>{{ producto.nombre }}</h3>
      <h4 class="marca">{{ producto.marca }}</h4>

      <!-- ⭐ rating -->
      <div class="rating">
        <span v-for="n in 5" :key="n">
          {{ n <= rating ? '⭐' : '☆' }}
        </span>
      </div>

      <p class="precio">{{ formatoCLP(producto.precio) }}</p>
    </div>

    <!-- acciones (aparecen en hover) -->
    <div class="acciones">
      <button class="btn ver" @click="verProducto">Ver</button>
      <button class="btn carrito" @click="agregarCarrito">🛒</button>
    </div>

  </div>
</template>

<style scoped>
.card {
  position: relative;
  border-radius: 16px;
  background: white;
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

/* imagen */
.img-container {
  height: 220px;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.img-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: 0.4s;
}

/* zoom imagen */
.card:hover img {
  transform: scale(1.1);
}

/* info */
.info {
  padding: 1rem;
  text-align: center;
}

.marca {
  color: #888;
  font-size: 0.85rem;
}

.rating {
  color: #ffc107;
  margin: 5px 0;
}

.precio {
  font-weight: bold;
  font-size: 1.1rem;
}

/* ❤️ favorito */
.fav {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  font-size: 1.2rem;
}

/* botones hover */
.acciones {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background: rgba(255,255,255,0.9);
  transform: translateY(100%);
  transition: 0.3s;
}

.card:hover .acciones {
  transform: translateY(0);
}

.btn {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
}

.ver {
  background: #d63384;
  color: white;
}

.carrito {
  background: #333;
  color: white;
}
</style>