<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  productos: Array,
})
</script>

<template>
  <transition-group name="fade" tag="div" class="grid">
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
</style>
