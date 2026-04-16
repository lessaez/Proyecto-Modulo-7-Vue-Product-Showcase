<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const toasts = computed(() => store.state.toasts)
const cantidad = ref(1)

const aumentarCantidad = () => {
  cantidad.value++
}

const disminuirCantidad = () => {
  if (cantidad.value > 1) {
    cantidad.value--
  }
}

const agregarCarrito = () => {
  store.commit('AGREGAR_CARRITO', {
    ...props.producto,
    cantidad: cantidad.value, // 🔥 clave
  })

  store.commit('ACTIVAR_ANIMACION_CARRITO')
  store.commit('AGREGAR_TOAST', `Agregaste ${cantidad.value} producto(s) 💖`)

  animando.value = true
  setTimeout(() => (animando.value = false), 300)

  cantidad.value = 1 // reset
}
</script>

<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div 
        v-for="t in toasts" 
        :key="t.id" 
        class="toast"
      >
        <span class="icon">🛒</span>
        <span>{{ t.mensaje }}</span>

        <div class="barra"></div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}

.toast {
  background: #d63384;
  color: white;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  min-width: 220px;
}

.icon {
  font-size: 1.2rem;
}

/* animaciones */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.toast-move {
  transition: transform 0.3s ease;
}

/* barra */
.barra {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: rgba(255,255,255,0.7);
  width: 100%;
  animation: progreso 2.5s linear;
}

@keyframes progreso {
  from { width: 100%; }
  to { width: 0%; }
}
</style>