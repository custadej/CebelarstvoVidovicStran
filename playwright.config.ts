import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results",
  use: { baseURL: "http://localhost:3210", locale: "sl-SI" },
  webServer: {
    command: "npx --yes serve out -l 3210",
    url: "http://localhost:3210",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
