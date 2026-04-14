<script setup>
import Header from '../components/Header.vue'
import ProductList from '../components/ProductList.vue'
import { ref, computed } from 'vue'
import { productos } from '../data/productos'

// estado
const categoriaSeleccionada = ref('todos')

// filtro desde header
const filtrar = (categoria) => {
  categoriaSeleccionada.value = categoria
}

// computed
const productosFiltrados = computed(() => {
  if (categoriaSeleccionada.value === 'todos') {
    return productos
  }
  return productos.filter(
    (p) => p.categoria === categoriaSeleccionada.value
  )
})
</script>

<template>
  <Header @filtrar="filtrar" />

  <section style="padding: 1rem">
    <h2>Productos 💖</h2>

    <ProductList :productos="productosFiltrados" />
  </section>
</template>