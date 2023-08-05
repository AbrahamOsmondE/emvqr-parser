module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/src/**/*.(spec|test).(js|jsx|ts|tsx)"],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
