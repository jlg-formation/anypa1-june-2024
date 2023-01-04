describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
  });

  it('Add an article and remove it', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('Voir le stock').click();
    cy.contains('Liste des articles');
    cy.get('nav').get(`[aria-label="Ajouter"]`).click();
    cy.contains('Ajouter un article');

    const uuid = () => Cypress._.random(0, 1e6).toFixed(0).padStart(6, '0');
    const name = `Outil ${uuid()}`;
    console.log('name: ', name);
    cy.log(name);
    cy.get('input[formcontrolname="name"]').clear().type(name);
    cy.get('input[formcontrolname="price"]').clear().type('12.34xxx');
    cy.get('input[formcontrolname="qty"]').clear().type('23.45xxx');
    cy.get('button').contains('Ajouter').click();
    cy.contains('Liste des articles');
    cy.contains(name).click();
    cy.get(`[aria-label="Supprimer"]`).click();
  });
});
