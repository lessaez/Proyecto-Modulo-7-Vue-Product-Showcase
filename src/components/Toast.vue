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
  <transition name="toast">
    <div v-if="mensaje" class="toast">
      <span class="icon">🛒</span>
      <span>{{ mensaje }}</span>

      <!-- barra progreso -->
      <div class="barra"></div>
    </div>
  </transition>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #d63384;
  color: white;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  z-index: 999;
}

.icon {
  font-size: 1.2rem;
}

/* 🎬 animaciones */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* ⏳ barra de tiempo */
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
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
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