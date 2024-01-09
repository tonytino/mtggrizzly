# Cypress

## Getting Started

### WARNING

Due to an on-going issue with the latest versions of cypress and next.js, you will need to temporarily modify the [`tsconfig.json`] file before starting up the cypress ui.

1. Open [`tsconfig.json`]
2. Modify the value of `compilerOptions.moduleResolution` to be `node`
3. When you're done with your cypress needs, **revert** the change made in step 2

⚠️ **DO NOT COMMIT THE CHANGE TO [`TSCONFIG.JSON`]!**

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
