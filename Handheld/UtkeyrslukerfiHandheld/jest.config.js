const esModules = ['@agm', 'ngx-bootstrap', '@react-native', 'react-native'].join('|');

module.exports = {
    preset: 'react-native',
    setupFiles: [
      "./jestSetup.js"
    ],
    testEnvironment: 'node',
    verbose: true,
    moduleDirectories: ['node_modules', 'src'],
    modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
    moduleFileExtensions: ['js', 'ts', 'json', 'node'],
    transformIgnorePatterns: [`/node_modules/(?!${esModules}|)`],
    testPathIgnorePatterns: [
      '/build/',
      '/config/',
      '/data/',
      '/dist/',
      '/node_modules/',
      '/test/',
      '/vendor/'
    ],
    globals: {
      NODE_ENV: 'test'
    }
  }