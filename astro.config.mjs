import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import favicons from 'astro-favicons';
import cloudflare from '@astrojs/cloudflare';


const env = loadEnv(import.meta.env.MODE, process.cwd(), '');
const {
    STORYBLOK_DELIVERY_API_TOKEN,
    STORYBLOK_API_BASE_URL,
    STORYBLOK_REGION,
} = env;

export default defineConfig({
    devToolbar: {
        enabled: false,
    },
    integrations: [storyblok({
        accessToken: STORYBLOK_DELIVERY_API_TOKEN,
        livePreview: true,
        apiOptions: {
            /** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
            region: STORYBLOK_REGION || 'eu',
            /** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
            endpoint: STORYBLOK_API_BASE_URL
                ? `${new URL(STORYBLOK_API_BASE_URL).origin}/v2`
                : undefined,
        },
        components: {
            page: 'storyblok/Page',
            grid: 'storyblok/Grid',
            feature: 'storyblok/Feature',
            teaser: 'storyblok/Teaser',
        },
    }),
    favicons({
        name: 'Bold Bridge',
        short_name: 'Bold Bridge',
        themes: ['#FAF7F0', '#26035D'], // [light, dark]
        background: '#FAF7F0',
        manifest: {
            start_url: '/',
            theme_color: '#26035D',
            background_color: '#FAF7F0',
          },
        icons: {
          favicons: [
            'favicon-16x16.png',
            'favicon-32x32.png',
            'favicon-48x48.png',
            'favicon.svg',
          ],
        },
      })],
    output: 'server',
    adapter: cloudflare(),
    vite: {
        plugins: [mkcert()],
    },
});