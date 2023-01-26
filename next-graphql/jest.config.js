const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: '.',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/pages$': '<rootDir>/src/pages',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)

// next-graphql\src\components
// D:\ReactStart\react-grapgQl-next\next-graphql\src\components