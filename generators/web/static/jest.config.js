const path = require('path')

module.exports = {
  transform: {
    '^.+\\.(jsx?|tsx?)$': 'babel-jest'
  },
  testRegex: '(/__tests__/.*(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
  ],
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/lib/'
  ],
  testURL: 'http://localhost',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  collectCoverageFrom: ['**/**/*.{ts,tsx.js,jsx,mjs}'],
  setupFilesAfterEnv: ["<rootDir>/src/utils/TestSetup.ts"]
}
