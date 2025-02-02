export default {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: "test/.*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};
