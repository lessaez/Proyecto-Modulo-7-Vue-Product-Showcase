<template>
  <footer class="footer">
    <div class="footer-inner">
      <div>
        <p class="brand">Beauty Shop</p>
        <p class="copy">
          Todos los derechos reservados  | 2026
        </p>
      </div>

      <div class="meta">
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border-soft);
  background: color-mix(in srgb, var(--bg-surface) 88%, transparent);
  backdrop-filter: blur(12px);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 24px 26px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--text-secondary);
}

.brand {
  margin: 0 0 6px;
  font-weight: 700;
  color: var(--text-primary);
}

.copy {
  margin: 0;
  max-width: 58ch;
}

.meta {
  display: grid;
  gap: 6px;
  text-align: right;
}

@media (max-width: 720px) {
  .footer-inner {
    flex-direction: column;
  }

  .meta {
    text-align: left;
  }
}
</style>
