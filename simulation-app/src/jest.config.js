// simulation-app/jest.config.js
module.exports = {
  preset: 'ts-jest',                           // Use ts-jest to compile TypeScript
  testEnvironment: 'jsdom',                    // Simulate a browser environment
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'  // Add custom matchers (e.g. .toBeInTheDocument())
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],  
  testMatch: [
    '<rootDir>/src/tests/**/*.(spec|test).+(ts|tsx)',  // Look for .test.tsx/.spec.tsx under src/tests
    '<rootDir>/src/**/*.(spec|test).+(ts|tsx)'         // Also allow co-located tests
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'                    // Compile TS files via ts-jest
  },
  moduleNameMapper: {
    // If you use CSS or image imports, mock them:
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js'
  },
  collectCoverage: true,                         // (optional) enable coverage reporting
  coverageDirectory: '<rootDir>/coverage',      // (optional) output folder
  verbose: true
};
