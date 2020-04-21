module.exports = {
  collectCoverage: false,
  roots: [
    '<rootDir>/__integration_tests__'
  ],
  testEnvironment: 'node',
  testMatch: [
    '**/*.it.js'
  ],
  reporters: [
    'default',
    [ 'jest-junit', {
      ancestorSeparator: ' › ',
      classNameTemplate: '{classname}',
      outputDirectory: 'reports/test',
      outputName: 'junit-integration.xml',
      suiteNameTemplate: '{filename}',
      titleTemplate: '{title}'
    } ]
  ]
}
