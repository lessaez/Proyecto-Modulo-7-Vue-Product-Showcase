describe('Filtro de productos', () => {
  it('permite filtrar por categoría y ver resultados', () => {
    cy.visit('/')

    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0)
    cy.get('[data-testid="filter-skincare"]').click()

    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0)
    cy.contains('[data-testid="product-card"]', 'Crema hidratante').should('exist')
    cy.contains('[data-testid="product-card"]', 'Labial').should('not.exist')
  })
})
