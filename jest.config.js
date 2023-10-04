/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
