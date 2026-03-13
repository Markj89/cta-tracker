import type { Config } from "jest";


const config: Config = {
  preset: "ts-jest",  // ✅ Ensures Jest uses ts-jest to process TypeScript
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "ts", "tsx", "jsx", "json", "node", "mjs"],
  clearMocks: true,
  collectCoverage: false,
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
    // diagnostics: { ignoreCodes: [1343] },
  },
  testMatch: [
    "<rootDir>/src/**/*.test.{js,jsx,ts,tsx}",
    "<rootDir>/src/__tests__/**/*.test.{js,jsx,ts,tsx}",
  ],
  collectCoverageFrom: [
    "<rootDir>/src/components/**/*.{ts,tsx,js,jsx}",
    "!<rootDir>/src/components/index.ts",
  ],
  testPathIgnorePatterns: ["/node_modules/"],
  coverageThreshold: {
    global: {
      branches: 80,
      statements: 80,
      functions: 80,
      lines: 80,
    },
  },
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: [
    "jest-extended/all", 
    "<rootDir>/setupTest.ts"
  ]
};

module.exports = config;
