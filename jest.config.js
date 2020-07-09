module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "html"],
  testPathIgnorePatterns: ["/node_modules/", "dist", "dist-cjs"]
};
