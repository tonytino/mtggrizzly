import { LOCAL_BASE_URL } from '@/root/cypress/constants';

describe('<Footer />', () => {
  beforeEach(() => {
    cy.visit(LOCAL_BASE_URL);
  });

  it('renders a link to take you to the home page', () => {
    cy.findByTestId('Footer').within(() => {
      cy.findByRole('link', { name: 'MTG Grizzly' }).click();
    });

    cy.url().should('equal', `${LOCAL_BASE_URL}/`);
  });

  it('renders a link to take you to the GitHub repo page', () => {
    cy.findByTestId('Footer').within(() => {
      cy.findByRole('link', { name: 'Proudly open-source' }).should('exist');
    });
  });

  it('renders a link to take you to brbcoding.com', () => {
    cy.findByTestId('Footer').within(() => {
      cy.findByRole('link', { name: 'Developed by brbcoding.com' }).should(
        'exist'
      );
    });
  });

  it('renders a button to scroll to you to the top of the page', () => {
    cy.findByTestId('Footer').within(() => {
      cy.findByTestId('Scroll to top').click();
    });

    cy.findByTestId('Home Page Link').should('be.visible');
  });
});
