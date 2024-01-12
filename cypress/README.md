# Cypress

## Getting Started

### WARNING

Due to an on-going issue with the latest versions of [cypress](https://github.com/cypress-io/cypress/issues/27731) and [next.js](https://github.com/vercel/next.js/pull/59268), [we need to apply the following env var](https://github.com/cypress-io/cypress/issues/27731#issuecomment-1884893217) to commands involving `cypress`:

```bash
TS_NODE_COMPILER=1 npx cypress open
```

_Once this issue is resolved, we should drop this from the script commands in [`../package.json`](./../package.json#L6)._

### Opening the Cypress UI

1. Run the following command:

```bash
npm run test:cypress:ui
```

2. Select "E2E Testing"

3. Select "Chrome"

4. A Chrome window will open, presenting the Cypress UI. From here, you can run any cypress tests

<!-- REFS -->

[`tsconfig.json`]: ./../tsconfig.json#L11

## Resources

- [Cypress' best practices](https://docs.cypress.io/guides/references/best-practices)