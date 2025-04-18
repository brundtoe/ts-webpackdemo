import { defineConfig } from "cypress";

export default defineConfig({
  includeShadowDom: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8080",
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    experimentalRunAllSpecs: true,
    viewportHeight: 600,
    viewportWidth: 800,
  },
});
