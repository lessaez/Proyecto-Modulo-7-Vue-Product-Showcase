<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  productos: {
    type: Array,
    default: null,
  },
  mostrarFiltro: {
    type: Boolean,
    default: true,
  },
})

const store = useStore()

const listaProductos = computed(() =>
  Array.isArray(props.productos) ? props.productos : store.getters['productos/productosFiltrados']
)

const categorias = computed(() => {
  const productos = store.getters['productos/todosProductos']
  const unicas = new Set(productos.map((producto) => producto.categoria).filter(Boolean))
  return ['all', ...unicas]
})

const categoriaSeleccionada = computed({
  get: () => store.state.filtros.categoria,
  set: (valor) => store.commit('filtros/SET_CATEGORIA', valor),
})

const cargando = computed(() => store.state.productos.cargando)
const error = computed(() => store.state.productos.error)
</script>

<template>
  <div class="product-list">
    <div v-if="mostrarFiltro" class="toolbar">
      <el-select v-model="categoriaSeleccionada" class="filtro" placeholder="Filtrar por categoría">
        <el-option v-for="cat in categorias" :key="cat" :label="cat" :value="cat" />
      </el-select>
    </div>

    <el-alert v-if="error" :closable="false" show-icon type="warning" :title="error" />

    <div v-if="cargando" class="skeleton-grid">
      <el-skeleton v-for="n in 6" :key="n" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 100%; height: 220px" />
          <div style="padding: 14px 0">
            <el-skeleton-item variant="h3" style="width: 70%" />
            <el-skeleton-item variant="text" style="width: 50%; margin-top: 12px" />
            <el-skeleton-item variant="text" style="width: 90%; margin-top: 12px" />
          </div>
        </template>
      </el-skeleton>
    </div>

    <el-empty
      v-else-if="listaProductos.length === 0"
      description="No hay productos para mostrar con esos filtros."
    />

    <transition-group v-else name="fade" tag="div" class="grid">
      <ProductCard v-for="producto in listaProductos" :key="producto.id" :producto="producto" />
    </transition-group>
  </div>
</template>

<style scoped>
.product-list {
  display: grid;
  gap: 20px;
}

.toolbar {
  display: flex;
  justify-content: flex-end;
}

.filtro {
  width: min(100%, 260px);
}

.grid,
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.fade-enter-active {
  transition: all 0.35s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
