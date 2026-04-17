# Beauty Shop

SPA de catálogo de productos construida con Vue 3 para el proyecto del módulo 7. La app cubre los puntos principales del PDF: componentes reutilizables, consumo de API con Axios, estado global con Vuex modular, pruebas unitarias y e2e, uso de librería UI y diseño responsive con tema claro/oscuro.

## Stack

- Vue 3 + Vite
- Vue Router
- Vuex con módulos `productos`, `filtros` y `favoritos`
- Axios para consumo de API
- Element Plus como librería UI
- Jest + Vue Test Utils para pruebas unitarias
- Cypress para prueba end-to-end

## Decisiones técnicas

- Se mantuvo `Vite` en lugar de migrar a `Vue CLI` porque el proyecto ya estaba creado y Vite cumple el mismo objetivo del enunciado con una base más moderna.
- El catálogo consume datos desde `dummyjson.com` con `Axios` y, si la API falla, muestra un aviso visual y usa un catálogo local de respaldo.
- El estado quedó centralizado en Vuex y separado por responsabilidades para facilitar escalabilidad.
- Se incorporó `Element Plus` para profesionalizar inputs, botones, tarjetas, diálogo de login y feedback visual.

## Funcionalidades cubiertas del PDF

- Catálogo SPA con vista principal, detalle de producto y carrito.
- Componentes base: `App`, `Header`, `Footer`, `ProductList`, `ProductCard`.
- Uso de ciclo de vida con carga inicial de productos.
- Consumo de API con `Axios`.
- Estados de `loading`, `error` y `empty`.
- Filtro por categoría.
- Vuex modular con getters y acciones.
- Tema claro/oscuro.
- Diseño responsive.
- 2 pruebas unitarias con Jest.
- 1 prueba e2e con Cypress.

## Instalación

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

- Repositorio con este código fuente.
- Evidencia de `build` y pruebas ejecutadas.
- Capturas o demo publicada del catálogo.
