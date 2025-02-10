import { defineConfig } from 'cypress';

export default defineConfig({
  screenshotOnRunFailure: false,
  fixturesFolder: false,
  numTestsKeptInMemory: 10,
  video: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  requestTimeout: 4000,
  defaultCommandTimeout: 4000,
  e2e: {
    testIsolation: false,
    setupNodeEvents(on, config) {},
    specPattern: [
      'test/health/specs/**/*.health-spec.ts',
      'test/module/specs/**/*.module-spec.ts',
      'test/smoke/specs/**/*.smoke-spec.ts',
    ],
    baseUrl: 'http://localhost:5173',
    supportFile: false
  },
});
