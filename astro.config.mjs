// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerMetaHighlight
} from '@shikijs/transformers'

import icon from 'astro-icon';

import expressiveCode from 'astro-expressive-code';
import ecConfig from './ecconfig.mjs';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  vite: { plugins: [tailwindcss()] },
  integrations: [icon(), expressiveCode(ecConfig)],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "laserwave",
        light: "github-light",
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationFocus(),
        transformerMetaHighlight(),
      ],
    },

  },
});