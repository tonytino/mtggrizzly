// https://docs.cypress.io/guides/references/configuration
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',

    // Presents the option to run all cypress specs at once
    experimentalRunAllSpecs: true,

    // Write specs by interacting with the browser!
    // https://docs.cypress.io/guides/references/cypress-studio
    // experimentalStudio: true,
  },
});
