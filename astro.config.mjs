// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import siteConfigJson from './src/config/site.json' with { type: 'json' };

// Production domain comes from src/config/site.json (`baseUrl`).
// While it is empty (demo mode), the localhost origin is used so the
// sitemap can still be generated and verified — never a fabricated
// production domain. Set `baseUrl` before a client production deploy.
const site = siteConfigJson.baseUrl || 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
