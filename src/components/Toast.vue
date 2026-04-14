<script setup>
import { useStore } from 'vuex'
import { computed, watch } from 'vue'

const store = useStore()

const mensaje = computed(() => store.state.notificacion)

watch(mensaje, (nuevo) => {
  if (nuevo) {
    setTimeout(() => {
      store.commit('OCULTAR_NOTIFICACION')
    }, 2500)
  }
})
</script>

<template>
  <div v-if="mensaje" class="toast">
    {{ mensaje }}
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #d63384;
  color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  animation: aparecer 0.3s ease;
  z-index: 999;
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>