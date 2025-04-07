import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'develop' || process.env.mode === 'develop' 
  ? '.env.develop'
  : '.env.local';

dotenv.config({ path: envFile });

const protocol = process.env.VITE_HTTPS === 'true' ? 'https' : 'http';
const host = process.env.VITE_HOST;
const port = process.env.VITE_PORT;

export default defineConfig({
  screenshotOnRunFailure: false,
  fixturesFolder: false,
  numTestsKeptInMemory: 10,
  video: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  requestTimeout: 4000,
  defaultCommandTimeout: 4000,
  chromeWebSecurity: false,
  e2e: {
    testIsolation: false,
    setupNodeEvents(on, config) {},
    specPattern: [
      'test/health/specs/**/*.health-spec.ts',
      'test/module/specs/**/*.module-spec.ts',
      'test/smoke/specs/**/*.smoke-spec.ts',
    ],
    baseUrl: `${protocol}://${host}:${port}`,
    supportFile: false,
  },
});
