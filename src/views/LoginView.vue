<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const login = () => {
  if (!email.value || !password.value) {
    alert('Completa los campos')
    return
  }

  store.commit('LOGIN', { email: email.value })
  router.push('/')
}
</script>

<template>
  <div class="login">
    <h2>Iniciar sesión</h2>

    <input v-model="email" placeholder="Correo" />
    <input v-model="password" type="password" placeholder="Contraseña" />

    <button @click="login">Ingresar</button>
  </div>
</template>

<style scoped>
.login {
  max-width: 300px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  background: #d63384;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
}
</style>