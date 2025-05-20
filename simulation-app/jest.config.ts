import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',  
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: [
    '<rootDir>/src/tests/**/*.(spec|test).+(ts|tsx)',
    '<rootDir>/src/**/*.(spec|test).+(ts|tsx)'
  ],
  transform: {
  '^.+\\.tsx?$': [
    'ts-jest',
    { useESM: true }
  ]
},
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.min.js'
  },
  transformIgnorePatterns: ['/node_modules/(?!(d3)/)'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  verbose: true
};

export default config;