// @ts-check
import { defineConfig } from 'astro/config';
import { SITE } from './src/config/site.mjs';

// Static output: every route is rendered to indexable HTML at build time.
export default defineConfig({
  site: SITE.origin,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  image: {
    // Local images only; no remote image hosts are allowed.
    remotePatterns: [],
  },
  devToolbar: { enabled: false },
});
