<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const props = defineProps({
  producto: {
    type: Object,
    required: true,
  },
})

const store = useStore()
const router = useRouter()

const rating = computed(() => Number(props.producto.rating) || 4)
const esFavorito = computed(() =>
  store.getters['favoritos/esFavorito'](props.producto.id)
)
const animando = ref(false)

const toggleFavorito = () => {
  store.commit('favoritos/TOGGLE_FAVORITO', props.producto)
}

const verProducto = () => {
  router.push(`/producto/${props.producto.id}`)
}

const agregarCarrito = () => {
  store.commit('AGREGAR_CARRITO', props.producto)
  store.commit('AGREGAR_TOAST', 'Producto agregado al carrito')
  store.commit('ACTIVAR_ANIMACION_CARRITO')

  animando.value = true
  setTimeout(() => {
    animando.value = false
  }, 300)
}

const formatoCLP = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor)
}
</script>

<template>
  <el-card class="card" shadow="hover" data-testid="product-card">
    <button class="fav" @click.stop="toggleFavorito">
      {{ esFavorito ? '❤️' : '🤍' }}
    </button>

    <div class="img-container">
      <img :src="producto.imagen" :alt="producto.nombre" />
    </div>

    <div class="meta">
      <el-tag effect="plain" round size="small">{{ producto.categoria }}</el-tag>
      <span class="marca">{{ producto.marca || 'Beauty Shop' }}</span>
    </div>

    <h3 data-testid="product-name">{{ producto.nombre }}</h3>
    <el-rate :max="5" :model-value="rating" disabled />

    <p class="precio">{{ formatoCLP(producto.precio) }}</p>
    <p v-if="producto.color" class="color">Color: {{ producto.color }}</p>
    <p class="desc">{{ producto.descripcion }}</p>

    <div class="acciones">
      <el-button plain type="info" @click="verProducto">Ver detalle</el-button>
      <el-button
        type="danger"
        class="carrito"
        :class="{ animar: animando }"
        @click="agregarCarrito"
      >
        Agregar
      </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.card {
  position: relative;
  height: 100%;
  border: 1px solid var(--border-soft);
  border-radius: 22px;
  background: var(--bg-surface);
}

.fav {
  position: absolute;
  top: 18px;
  right: 18px;
  border: none;
  background: var(--bg-muted);
  width: 40px;
  height: 40px;
  border-radius: 999px;
  cursor: pointer;
}

.img-container {
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, var(--bg-muted), transparent);
  border-radius: 18px;
  margin-bottom: 16px;
}

.img-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
  color: var(--text-secondary);
  text-transform: capitalize;
}

h3 {
  margin: 0 0 10px;
  color: var(--text-primary);
}

.marca {
  font-size: 0.92rem;
}

.precio {
  margin: 14px 0 8px;
  font-size: 1.1rem;
  font-weight: 700;
}

.color,
.desc {
  color: var(--text-secondary);
}

.acciones {
  display: flex;
  gap: 10px;
  margin-top: 18px;
}

.carrito.animar {
  animation: pop 0.3s ease;
}

@keyframes pop {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }

  100% {
    transform: scale(1);
  }
}
</style>
