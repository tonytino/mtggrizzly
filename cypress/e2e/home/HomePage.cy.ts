import { LOCAL_BASE_URL } from '@/root/cypress/constants';

describe('<HomePage />', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('renders', () => {
    cy.findByText('Welcome to MTG Grizzly').should('exist');
  });

  it('presents nine preview sets', () => {
    cy.findByTestId('Most Recent Sets').within(() => {
      cy.findAllByRole('link').should('have.length', 9);
    });
  });

  it('presents a large CTA that takes you to the /sets page', () => {
    cy.findByRole('link', { name: 'All Sets' }).click();

    cy.url().should('equal', `${LOCAL_BASE_URL}/sets`);
  });
});
