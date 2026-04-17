<script setup>
import { watch } from 'vue'
import { useStore } from 'vuex'
import Footer from './components/Footer.vue'
import Toast from './components/Toast.vue'

const store = useStore()

const aplicarTema = (oscuro) => {
  document.documentElement.dataset.theme = oscuro ? 'dark' : 'light'
}

watch(
  () => store.state.temaOscuro,
  (oscuro) => aplicarTema(oscuro),
  { immediate: true }
)
</script>

<template>
  <div class="app-shell">
    <main class="app-content">
      <router-view />
    </main>

    <Footer />
    <Toast />
  </div>
</template>

<style>
:root {
  color-scheme: light;
  --bg-page: #fff8fb;
  --bg-surface: #ffffff;
  --bg-muted: #fff1f6;
  --text-primary: #2d1623;
  --text-secondary: #6c4b5d;
  --border-soft: rgba(214, 51, 132, 0.16);
  --accent: #d63384;
  --accent-strong: #b42368;
  --shadow-soft: 0 20px 45px rgba(214, 51, 132, 0.1);
}

:root[data-theme='dark'] {
  color-scheme: dark;
  --bg-page: #140b12;
  --bg-surface: #24111d;
  --bg-muted: #321827;
  --text-primary: #fff4f9;
  --text-secondary: #ddb5c8;
  --border-soft: rgba(255, 255, 255, 0.1);
  --accent: #ff6ca8;
  --accent-strong: #ff4b93;
  --shadow-soft: 0 20px 45px rgba(0, 0, 0, 0.35);
}

* {
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100%;
}

body {
  margin: 0;
  background: var(--bg-page);
  color: var(--text-primary);
  font-family: 'Segoe UI', sans-serif;
  transition: background 0.2s ease, color 0.2s ease;
}

button,
input,
select,
textarea {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
}
</style>
