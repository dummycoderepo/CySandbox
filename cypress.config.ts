import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    blockHosts: [
      'www.googletagmanager.com',
      'sb.scorecardresearch.com',
      'dd.nytimes.com',
      'a.nytimes.com',
      'c.amazon-adsystem.com',
      'rumcdn.geoedge.be',
      'securepubads.g.doubleclick.net',
    ],
    defaultCommandTimeout: 10000,
    testIsolation: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'results',
      overwrite: false,
      html: false,
      json: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
