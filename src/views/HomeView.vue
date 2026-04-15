<script setup>
import Header from '../components/Header.vue'
import ProductList from '../components/ProductList.vue'
import { ref, computed } from 'vue'
import { productos as dataProductos } from '../data/productos'

// contador
const totalProductos = computed(() => productosFiltrados.value.length)

// 📦 productos
const productos = ref(dataProductos)

// 🎯 estados
const categoriaSeleccionada = ref('todos')
const textoBusqueda = ref('')
const tipoOrden = ref('')

// 📡 filtro categoría
const filtrar = (categoria) => {
  categoriaSeleccionada.value = categoria
}

// 🔍 búsqueda
const buscar = (texto) => {
  textoBusqueda.value = texto.toLowerCase()
}

// 💰 ordenar
const ordenar = (tipo) => {
  tipoOrden.value = tipo
}

// 🔥 filtro
const productosFiltrados = computed(() => {
  let resultado = productos.value.filter((p) => {
    const coincideCategoria =
      categoriaSeleccionada.value === 'todos' || p.categoria === categoriaSeleccionada.value

    const coincideBusqueda = p.nombre.toLowerCase().includes(textoBusqueda.value)

    return coincideCategoria && coincideBusqueda
  })

  // 💰 aplicar orden
  if (tipoOrden.value === 'asc') {
    resultado.sort((a, b) => a.precio - b.precio)
  }

  if (tipoOrden.value === 'desc') {
    resultado.sort((a, b) => b.precio - a.precio)
  }

  return resultado
})

// 🔄 reset
const selectOrden = ref(null)

const resetear = () => {
  categoriaSeleccionada.value = 'todos'
  textoBusqueda.value = ''
  tipoOrden.value = ''

  if (selectOrden.value) {
    selectOrden.value.value = ''
  }
}
</script>

<template>
  <Header @filtrar="filtrar" @buscar="buscar" :categoriaActiva="categoriaSeleccionada" />

  <section style="padding: 2rem">
    <div class="top-bar">
      <h2>Productos 💖</h2>
      <p class="contador">
        Mostrando {{ totalProductos }} producto<span v-if="totalProductos !== 1">s</span>
      </p>

      <div class="acciones-top">
        <select ref="selectOrden" class="ordenar" @change="ordenar($event.target.value)">
          <option value="">Ordenar</option>
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>

        <button class="reset" @click="resetear">Reset</button>
      </div>
    </div>

    <ProductList :productos="productosFiltrados" />
  </section>
</template>

<style>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.ordenar {
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.acciones-top {
  display: flex;
  gap: 10px;
}

.reset {
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: none;
  background: #999;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.reset:hover {
  background: #666;
}

.contador {
  font-size: 0.9rem;
  color: #777;
  margin-top: 4px;
}
</style>
