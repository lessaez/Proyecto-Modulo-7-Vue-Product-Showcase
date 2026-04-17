<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const toasts = computed(() => store.state.toasts)
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