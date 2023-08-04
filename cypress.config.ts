import { defineConfig } from "cypress";
import path from "path";

export default defineConfig({
  chromeWebSecurity: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser, launchOptions) => {
        launchOptions.extensions.push(path.join(__dirname, 'dist'));
        return launchOptions;
      });
    },
  },
});
