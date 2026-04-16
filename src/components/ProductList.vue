<script setup>
import ProductCard from './ProductCard.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

const store = useStore()

// 🔥 PRODUCTOS FILTRADOS DESDE VUEX
const productos = computed(() =>
  store.getters['productos/productosFiltrados']
)

// 🧠 CATEGORÍAS DINÁMICAS DESDE LOS PRODUCTOS
const categorias = computed(() => {
  const productos = store.getters['productos/todosProductos']

  const unicas = new Set(productos.map(p => p.category))
  return ['all', ...unicas]
})

// 🎛️ CAMBIAR CATEGORÍA
const cambiarCategoria = (e) => {
  store.commit('filtros/SET_CATEGORIA', e.target.value)
}

const cargando = computed(() =>
  store.state.productos.cargando
)

const error = computed(() =>
  store.state.productos.error
)
// 🚀 CARGAR PRODUCTOS
onMounted(() => {
  store.dispatch('productos/fetchProductos')
})
</script>

<template>
  <!-- 🎛️ FILTRO -->
  <select @change="cambiarCategoria" class="filtro">
    <option v-for="cat in categorias" :key="cat" :value="cat">
      {{ cat }}
    </option>
  </select>

  <!-- ⏳ LOADING -->
  <p v-if="cargando" class="mensaje">Cargando productos...</p>

  <!-- ❌ ERROR -->
  <p v-else-if="error" class="error">{{ error }}</p>

  <!-- 📭 SIN PRODUCTOS -->
  <p v-else-if="productos.length === 0" class="mensaje">
    No hay productos en esta categoría
  </p>

  <!-- 🛍️ PRODUCTOS -->
  <transition-group
    v-else
    name="fade"
    tag="div"
    class="grid"
  >
    <ProductCard 
      v-for="producto in productos" 
      :key="producto.id" 
      :producto="producto" 
    />
  </transition-group>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* filtro */
.filtro {
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 8px;
}

/* entrada */
.fade-enter-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* salida */
.fade-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* movimiento */
.fade-move {
  transition: transform 0.1s ease;
}

.mensaje {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

.error {
  text-align: center;
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>