<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Header from '../components/Header.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const producto = computed(() =>
  store.getters['productos/productoPorId'](route.params.id)
)

const cargando = computed(() => store.state.productos.cargando)

const formatoCLP = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor)
}

const volver = () => {
  router.push('/')
}

const comprar = () => {
  if (!producto.value) return
  store.commit('AGREGAR_CARRITO', producto.value)
  store.commit('AGREGAR_TOAST', 'Producto agregado desde el detalle')
  router.push('/carrito')
}

onMounted(() => {
  if (!store.getters['productos/todosProductos'].length) {
    store.dispatch('productos/fetchProductos')
  }
})
</script>

<template>
  <div class="detail-view">
    <Header />

    <section class="detalle">
      <el-skeleton v-if="cargando && !producto" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 320px; height: 320px" />
          <div style="display: grid; gap: 14px; width: 100%">
            <el-skeleton-item variant="h1" style="width: 70%" />
            <el-skeleton-item variant="text" style="width: 40%" />
            <el-skeleton-item variant="text" style="width: 100%" />
            <el-skeleton-item variant="text" style="width: 100%" />
          </div>
        </template>
      </el-skeleton>

      <div v-else-if="producto" class="contenido">
        <button class="volver" @click="volver">← Volver</button>

        <div class="detalle-grid">
          <div class="media">
            <img :src="producto.imagen" :alt="producto.nombre" />
          </div>

          <el-card class="info" shadow="never">
            <el-tag round effect="plain">{{ producto.categoria }}</el-tag>
            <h1>{{ producto.nombre }}</h1>
            <p class="marca">{{ producto.marca }}</p>
            <el-rate :max="5" :model-value="producto.rating || 4" disabled />
            <p class="precio">{{ formatoCLP(producto.precio) }}</p>
            <p class="desc">{{ producto.descripcion }}</p>

            <div class="acciones">
              <el-button @click="volver">Seguir viendo</el-button>
              <el-button type="danger" @click="comprar">Agregar al carrito</el-button>
            </div>
          </el-card>
        </div>
      </div>

      <el-empty v-else description="No se encontró el producto solicitado." />
    </section>
  </div>
</template>

<style scoped>
.detalle {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.contenido {
  display: grid;
  gap: 18px;
}

.volver {
  width: fit-content;
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  color: var(--text-primary);
  background: var(--bg-muted);
  cursor: pointer;
}

.detalle-grid {
  display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(0, 1.2fr);
  gap: 24px;
}

.media {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--border-soft);
  background: color-mix(in srgb, var(--bg-surface) 92%, transparent);
  box-shadow: var(--shadow-soft);
}

.media img {
  max-width: 100%;
  max-height: 360px;
  object-fit: contain;
}

.info {
  border-radius: 28px;
  border: 1px solid var(--border-soft);
  background: color-mix(in srgb, var(--bg-surface) 92%, transparent);
}

.info :deep(.el-card__body) {
  display: grid;
  gap: 14px;
}

.marca,
.desc {
  color: var(--text-secondary);
}

.precio {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
}

.acciones {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

@media (max-width: 860px) {
  .detalle-grid {
    grid-template-columns: 1fr;
  }
}
</style>
