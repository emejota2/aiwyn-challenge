const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qabilling1.aiwyn-dev.app",
    pageLoadTimeout:30000,
    defaultCommandTimeout:30000,
    viewportHeight:1500,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
