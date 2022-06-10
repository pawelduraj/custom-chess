const {defineConfig} = require('cypress');

module.exports = defineConfig({
    baseUrl: 'http://localhost:8080/',
    supportFile: 'tests/e2e/support/index.js',
    specPattern: 'tests/e2e/specs/*.js',
    videosFolder: 'tests/e2e/cypress/videos',
    screenshotsFolder: 'tests/e2e/cypress/screenshots',
    integrationFolder: 'tests/e2e/specs',
    fixturesFolder: 'tests/e2e/cypress/fixtures',
    downloadsFolder: 'tests/e2e/cypress/downloads',
    viewportWidth: 1366,
    viewportHeight: 960
});
