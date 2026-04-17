<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const toasts = computed(() => {
  return Array.isArray(store.state.toasts) ? store.state.toasts : []
})
</script>

<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="toast">
        <span class="icon">🛍️</span>
        <span>{{ toast.mensaje }}</span>
        <div class="barra"></div>
      </div>
    </transition-group>
  </div>
</template>

<style>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.toast {
  position: relative;
  min-width: 240px;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-surface);
  color: var(--text-primary);
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow-soft);
}

.icon {
  font-size: 1.1rem;
}

.barra {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #f472b6, #fb7185);
  transform-origin: left center;
  animation: barra 2.5s linear forwards;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@keyframes barra {
  from {
    transform: scaleX(1);
  }

  to {
    transform: scaleX(0);
  }
}
</style>
