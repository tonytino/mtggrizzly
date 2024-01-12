describe('<SetPage />', () => {
  beforeEach(() => {
    cy.visit('/sets/mom');
  });

  it('renders', () => {
    cy.findByText('March of the Machine').should('exist');
  });

  it('presents the cards from the set', () => {
    cy.findAllByTestId('Card').should('have.length', 281);
  });

  it('presents an option for filtering the cards', () => {
    cy.findByRole('button', { name: 'Open the query options' }).should('exist');
  });

  it('has options to filter the cards', () => {
    cy.findByRole('button', { name: 'Open the query options' }).click();

    cy.findByText('Search').should('exist');
    cy.findByText('Card Types').should('exist');
    cy.findByText('Colors').should('exist');
  });

  it('successfully filters cards based on search text', () => {
    cy.findByRole('button', { name: 'Open the query options' }).click();

    cy.findByText('Search').type('Island');
    cy.findByRole('button', { name: 'Close' }).click();

    cy.findAllByTestId('Card').should('have.length', 2);
  });

  it('successfully filters cards based on card types', () => {
    cy.findByRole('button', { name: 'Open the query options' }).click();

    cy.findByText('Battle').click();
    cy.findByRole('button', { name: 'Close' }).click();

    cy.findAllByTestId('Card').should('have.length', 36);
  });

  it('successfully filters cards based on color', () => {
    cy.findByRole('button', { name: 'Open the query options' }).click();

    cy.findByText('Colorless').click();
    cy.findByRole('button', { name: 'Close' }).click();

    cy.findAllByTestId('Card').should('have.length', 24);
  });

  it('successfully filters cards based on multiple parameters', () => {
    cy.findByRole('button', { name: 'Open the query options' }).click();

    cy.findByText('Search').type('target');

    cy.findByText('Artifact').click();
    cy.findByText('Battle').click();

    cy.findByText('Colorless').click();
    cy.findByRole('button', { name: 'Close' }).click();

    cy.findAllByTestId('Card').should('have.length', 5);
  });
});
