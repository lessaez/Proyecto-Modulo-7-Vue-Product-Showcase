<script setup>
import { useRoute, useRouter } from 'vue-router'
import { productos } from '../data/productos'

// router
const route = useRoute()
const router = useRouter()

// buscar producto
const producto = productos.find(
  (p) => p.id == route.params.id
)

// volver
const volver = () => {
  router.push('/')
}

// acción comprar
const comprar = () => {
  alert(`🛒 Compraste ${producto.nombre}`)
}

// formato CLP
const formatoCLP = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor)
}
</script>

<template>
  <div v-if="producto" class="detalle">

    <button class="volver" @click="volver">⬅ Volver</button>

    <div class="contenido">
      <img :src="producto.imagen" />

      <div class="info">
        <h1>{{ producto.nombre }}</h1>
        <h3>{{ producto.marca }}</h3>

        <p class="precio">{{ formatoCLP(producto.precio) }}</p>

        <p v-if="producto.color">
          Color: {{ producto.color }}
        </p>

        <p class="desc">{{ producto.descripcion }}</p>

        <button class="btn" @click="comprar">🛒 Comprar</button>
      </div>
    </div>

  </div>

  <p v-else>No encontrado 😢</p>
</template>

<style scoped>
.detalle {
  padding: 2rem;
}

.contenido {
  display: flex;
  gap: 2rem;
}

img {
  width: 300px;
  object-fit: contain;
  background: #f8f8f8;
  border-radius: 10px;
}

.info {
  max-width: 400px;
}

.precio {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
}

.desc {
  color: #666;
}

.btn {
  background: #d63384;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
}

.volver {
  margin-bottom: 1rem;
  cursor: pointer;
}
</style>