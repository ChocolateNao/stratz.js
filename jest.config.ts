import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  testTimeout: 10000,
  coverageReporters: ['text'],
  bail: 1,
  forceExit: true,
};

export default config;
