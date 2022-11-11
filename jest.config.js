/** @type {import('ts-jest').JestConfigWithTsJest} */

// Sync object
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
