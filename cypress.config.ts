import { defineConfig } from "cypress";

export default defineConfig({
  nodeVersion: "system",
  includeShadowDom: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost",
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    experimentalRunAllSpecs: true
  },
});
