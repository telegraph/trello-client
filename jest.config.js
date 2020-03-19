module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!dist/*',
  ],
  coverageDirectory: 'reports/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageReporters: [
    'text',
    'lcov',
    'clover'
  ],
  roots: [
    '<rootDir>/src',
    '<rootDir>/__tests__'
  ],
  testEnvironment: 'node',
  reporters: [
    'default',
    [ 'jest-junit', {
      ancestorSeparator: ' › ',
      classNameTemplate: '{classname}',
      outputDirectory: 'reports',
      suiteNameTemplate: '{filename}',
      titleTemplate: '{title}'
    } ]
  ]
}
