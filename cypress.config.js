const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.github.com',
    setupNodeEvents(on, config) {
      config.env.USER_EMAIL = process.env.USER_EMAIL;
      config.env.USER_PASSWORD = process.env.USER_PASSWORD;
      return config;
    }
  }
});
