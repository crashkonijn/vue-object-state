import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testEnvironment: "node",
  // testRegex: ".+\\.test\\.ts$",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).ts"],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/test/",
    "/build/"
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  collectCoverageFrom: [
    "src/lib/*.{js,ts}"
  ],
  "coverageReporters": ["json", "html", "lcov"]
};

export default config;
