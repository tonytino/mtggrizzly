import { LOCAL_BASE_URL } from '@/root/cypress/constants';

describe('<Header />', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('renders a link to take you to the home page', () => {
    cy.findByTestId('Home Page Link').click();

    cy.url().should('equal', `${LOCAL_BASE_URL}/`);
  });

  it('renders a link to take you to the sets page', () => {
    cy.findByRole('link', { name: 'Sets' }).click();

    cy.url().should('equal', `${LOCAL_BASE_URL}/sets`);
  });

  it('renders a link to take you to the about page', () => {
    cy.findByRole('link', { name: 'About' }).click();

    cy.url().should('equal', `${LOCAL_BASE_URL}/about`);
  });
});
