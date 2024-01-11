import { LOCAL_BASE_URL } from '@/root/cypress/constants';

describe('<SetsPage />', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sets');
  });

  it('presents all supported sets', () => {
    cy.findByTestId('All Sets').within(() => {
      cy.findAllByRole('link').should('have.length', 141);
    });
  });

  it('clicking a set takes you to the respective set page', () => {
    cy.findByRole('link', { name: 'March of the Machine' }).click();

    cy.url().should('equal', `${LOCAL_BASE_URL}/sets/mom`);
  });
});
