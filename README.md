# Beauty Shop

SPA de catalogo de productos construida con Vue 3 para el proyecto del modulo 7. La app cubre los puntos principales de la pauta: componentes reutilizables, consumo de API con Axios, estado global con Vuex modular, pruebas unitarias y e2e, uso de libreria UI y diseno responsive con tema claro/oscuro.

## Stack

- Vue 3 + Vite
- Vue Router
- Vuex con modulos `productos`, `filtros` y `favoritos`
- Axios para consumo de API
- Element Plus como libreria UI
- Jest + Vue Test Utils para pruebas unitarias
- Cypress para prueba end-to-end

## Decisiones tecnicas

- Se mantuvo `Vite` en lugar de migrar a `Vue CLI` porque el proyecto ya estaba creado y Vite cumple el mismo objetivo de la pauta con una base mas moderna.
- El catalogo consume datos desde `dummyjson.com` con `Axios` y, si la API falla, muestra un aviso visual y usa un catalogo local de respaldo.
- El estado quedo centralizado en Vuex y separado por responsabilidades para facilitar escalabilidad.
- Se incorporo `Element Plus` para profesionalizar inputs, botones, tarjetas, dialogo de login y feedback visual.

## Funcionalidades cubiertas del PDF

- Catalogo SPA con vista principal, detalle de producto y carrito.
- Componentes base: `App`, `Header`, `Footer`, `ProductList`, `ProductCard`.
- Uso de ciclo de vida con carga inicial de productos.
- Consumo de API con `Axios`.
- Estados de `loading`, `error` y `empty`.
- Filtro por categoria.
- Vuex modular con getters y acciones.
- Tema claro/oscuro.
- Diseno responsive.
- 2 pruebas unitarias con Jest.
- 1 prueba e2e con Cypress.

## Pruebas requeridas por la pauta

- Unitaria 1: `tests/unit/ProductCard.spec.js`
  Render correcto de `ProductCard`.
- Unitaria 2: `tests/unit/ProductListError.spec.js`
  Respuesta visual ante error de API.
- Unitaria extra: `tests/unit/HeaderSearch.spec.js`
  Boton de busqueda con lupa en el `Header`.
- E2E: `cypress/e2e/product-filter.cy.js`
  Filtrar productos y ver resultados.

## Instalacion

```sh
npm install
```

## Desarrollo

```sh
npm run dev
```

## Build

```sh
npm run build
```

## Pruebas unitarias

```sh
npm run test:unit
```

## Pruebas e2e

```sh
npm run test:e2e
```

## Pruebas de componentes con Cypress

```sh
npm run test:component
```

## Entregables sugeridos

- Repositorio con este codigo fuente.
- Evidencia de `build` y pruebas ejecutadas.
- Capturas o demo publicada del catalogo.
