const nextJest = require('next/jest');

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  /**
   * Coverage-related configs
   */
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    './*/index.ts',
    './node_modules',
    './scripts',
    './types',
    './utils',
  ],
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },

  moduleDirectories: ['node_modules', 'utils', __dirname],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jsdom',
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
