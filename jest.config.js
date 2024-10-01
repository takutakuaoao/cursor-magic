/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", { useESM: true }],
  },
  testPathIgnorePatterns: ["demo/"],
};
