<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  productos: Array,
})
</script>

<template>
  <div class="grid">
    <ProductCard v-for="producto in productos" :key="producto.id" :producto="producto" />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
