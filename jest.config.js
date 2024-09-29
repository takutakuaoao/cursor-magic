/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", { useESM: true }],
  },
  testPathIgnorePatterns: ["./src/__tests__/util.ts"],
};
