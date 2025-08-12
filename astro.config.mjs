// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
    output:'server',
    integrations:[react()],
      vite:{
        define:{
            'ssr':{
                noExternal: ['@react-email/components', 'react-email','lucide-react']
            },
        },
        plugins:[
            tailwindcss(),
        ],
    },
    adapter: vercel({
        webAnalytics: {
        enabled: true,
        },
    }),
});
