import type {Config} from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  verbose: true,
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
    "\\.css$": "<rootDir>/cssTransform.ts",
  }
};

export default config;