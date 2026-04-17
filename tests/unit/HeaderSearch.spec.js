import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Header from '../../src/components/Header.vue'

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

const ElInputStub = {
  props: ['modelValue'],
  emits: ['update:modelValue', 'input', 'clear'],
  template: `
    <div class="el-input-stub">
      <input
        data-testid="search-input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value); $emit('input', $event.target.value)"
      />
      <slot name="append" />
    </div>
  `,
}

const ElButtonStub = {
  emits: ['click'],
  template: '<button v-bind="$attrs" @click="$emit(\'click\', $event)"><slot /></button>',
}

const crearStore = () =>
  createStore({
    state: {
      usuario: null,
      animarCarrito: false,
      temaOscuro: false,
    },
    getters: {
      totalCantidadCarrito: () => 0,
    },
    mutations: {
      SET_TEMA_OSCURO: jest.fn(),
      LOGIN: jest.fn(),
      LOGOUT: jest.fn(),
      AGREGAR_TOAST: jest.fn(),
    },
  })

describe('Header', () => {
  it('emite la búsqueda al hacer clic en el botón de lupa', async () => {
    const wrapper = mount(Header, {
      props: {
        categoriaActiva: 'all',
      },
      global: {
        plugins: [crearStore()],
        stubs: {
          'el-input': ElInputStub,
          'el-button': ElButtonStub,
          'el-switch': true,
          'el-dialog': { template: '<div><slot /><slot name="footer" /></div>' },
          'el-badge': { template: '<div><slot /></div>' },
        },
      },
    })

    await wrapper.get('[data-testid="search-input"]').setValue('serum')
    await wrapper.get('.search-button').trigger('click')

    const eventos = wrapper.emitted('buscar')

    expect(eventos).toBeTruthy()
    expect(eventos.at(-1)).toEqual(['serum'])
  })
})
