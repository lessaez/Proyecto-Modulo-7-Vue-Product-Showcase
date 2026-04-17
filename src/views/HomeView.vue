<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Header from '../components/Header.vue'
import ProductList from '../components/ProductList.vue'

const store = useStore()

const categoriaSeleccionada = ref(store.state.filtros?.categoria || 'all')
const textoBusqueda = ref('')
const tipoOrden = ref('')

const opcionesOrden = [
  { label: 'Destacados', value: '' },
  { label: 'Precio: menor a mayor', value: 'precio-asc' },
  { label: 'Precio: mayor a menor', value: 'precio-desc' },
  { label: 'Nombre A-Z', value: 'nombre-asc' },
]

const productos = computed(() => store.getters['productos/productosFiltrados'])

const productosVisibles = computed(() => {
  let lista = [...productos.value]

  if (textoBusqueda.value) {
    const termino = textoBusqueda.value.toLowerCase()
    lista = lista.filter((producto) => {
      const campos = [
        producto.nombre,
        producto.marca,
        producto.descripcion,
        producto.categoria,
      ]

      return campos.some((campo) => String(campo || '').toLowerCase().includes(termino))
    })
  }

  if (tipoOrden.value === 'precio-asc') {
    lista.sort((a, b) => (Number(a.precio) || 0) - (Number(b.precio) || 0))
  }

  if (tipoOrden.value === 'precio-desc') {
    lista.sort((a, b) => (Number(b.precio) || 0) - (Number(a.precio) || 0))
  }

  if (tipoOrden.value === 'nombre-asc') {
    lista.sort((a, b) => String(a.nombre || '').localeCompare(String(b.nombre || '')))
  }

  return lista
})

const totalProductos = computed(() => productosVisibles.value.length)

const filtrar = (categoria) => {
  categoriaSeleccionada.value = categoria
  store.commit('filtros/SET_CATEGORIA', categoria)
}

const buscar = (texto) => {
  textoBusqueda.value = texto
}

const resetear = () => {
  categoriaSeleccionada.value = 'all'
  textoBusqueda.value = ''
  tipoOrden.value = ''
  store.commit('filtros/SET_CATEGORIA', 'all')
}

onMounted(() => {
  if (!store.getters['productos/todosProductos'].length) {
    store.dispatch('productos/fetchProductos')
  }
})
</script>

<template>
  <div class="home-view">
    <Header
      :categoria-activa="categoriaSeleccionada"
      @filtrar="filtrar"
      @buscar="buscar"
    />

    <main class="home">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Catálogo</p>
          <h1>Productos exclusivos</h1>
          <p class="descripcion">
            Pensados para cuidar, transformar y resaltar tu belleza todos los días.
          </p>
        </div>

        <el-card class="panel" shadow="never">
          <div class="panel-head">
            <span class="panel-label">Vista actual</span>
            <strong>{{ totalProductos }} productos visibles</strong>
          </div>

          <el-select v-model="tipoOrden" placeholder="Ordenar catálogo">
            <el-option
              v-for="opcion in opcionesOrden"
              :key="opcion.value"
              :label="opcion.label"
              :value="opcion.value"
            />
          </el-select>

          <el-button type="danger" plain @click="resetear">Limpiar filtros</el-button>
        </el-card>
      </section>

      <ProductList :productos="productosVisibles" :mostrar-filtro="false" />
    </main>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 16%, transparent), transparent 35%),
    linear-gradient(180deg, var(--bg-page) 0%, color-mix(in srgb, var(--bg-muted) 50%, transparent) 100%);
}

.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: 24px;
  align-items: stretch;
  margin: 24px 0;
}

.hero-copy {
  padding: 30px;
  border-radius: 28px;
  border: 1px solid var(--border-soft);
  background: color-mix(in srgb, var(--bg-surface) 92%, transparent);
  box-shadow: var(--shadow-soft);
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.05;
}

.descripcion {
  max-width: 58ch;
  margin: 16px 0 0;
  font-size: 1.05rem;
  color: var(--text-secondary);
}

.panel {
  border-radius: 28px;
  border: 1px solid var(--border-soft);
  background: color-mix(in srgb, var(--bg-surface) 92%, transparent);
}

.panel :deep(.el-card__body) {
  display: grid;
  gap: 16px;
}

.panel-head {
  display: grid;
  gap: 6px;
}

.panel-label {
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .home {
    padding: 16px;
  }
}
</style>
