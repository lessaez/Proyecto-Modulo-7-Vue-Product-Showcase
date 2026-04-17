<script setup>
import Header from '../components/Header.vue'
import ProductList from '../components/ProductList.vue'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// 📦 productos desde Vuex
const productos = computed(() => store.getters['productos/productosFiltrados'])

// contador
const totalProductos = computed(() => productos.value?.length || 0)

// 🎯 filtros
const categoriaSeleccionada = ref('all')
const textoBusqueda = ref('')
const tipoOrden = ref('')

// acciones
const filtrar = (categoria) => {
  categoriaSeleccionada.value = categoria
  store.commit('filtros/SET_CATEGORIA', categoria)
}

const buscar = (texto) => {
  textoBusqueda.value = texto.toLowerCase()
}

const ordenar = (tipo) => {
  tipoOrden.value = tipo
}

// cargar productos
onMounted(() => {
  store.dispatch('productos/fetchProductos')
})

// reset
const selectOrden = ref(null)

const resetear = () => {
  categoriaSeleccionada.value = 'all'
  textoBusqueda.value = ''
  tipoOrden.value = ''

  store.commit('filtros/SET_CATEGORIA', 'all')

  if (selectOrden.value) {
    selectOrden.value.value = ''
  }
}
</script>
