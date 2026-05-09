// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nhomnhem.github.io',

  base: '/solar-phobia-docs',

  integrations: [
    starlight({
      title: {
        en: 'Solar Phobia Docs',
        vi: 'Tài liệu Solar Phobia',
      },

      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },

        vi: {
          label: 'Tiếng Việt',
          lang: 'vi',
        },
      },

      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/NhomNhem/solar-phobia-docs',
        },
      ],

      customCss: ['./src/styles/global.css'],

      sidebar: [
        {
          label: 'Architecture',
          translations: { vi: 'Kiến trúc' },
          items: [{ autogenerate: { directory: 'architecture' } }],
        },

        {
          label: 'Engine Reference',
          translations: { vi: 'Tham chiếu Engine' },
          items: [{ autogenerate: { directory: 'engine-reference' } }],
        },

        {
          label: 'Design',
          translations: { vi: 'Thiết kế' },
          items: [{ autogenerate: { directory: 'design' } }],
        },

        {
          label: 'Production',
          translations: { vi: 'Sản xuất' },
          items: [{ autogenerate: { directory: 'production' } }],
        },

        {
          label: 'Registries',
          translations: { vi: 'Registry' },
          items: [
            { autogenerate: { directory: 'docs-registry' } },
            { autogenerate: { directory: 'design-registry' } },
          ],
        },

        {
          label: 'Guides',
          translations: { vi: 'Hướng dẫn' },
          items: [
            {
              label: 'Example Guide',
              translations: { vi: 'Hướng dẫn mẫu' },
              slug: 'guides/example',
            },
          ],
        },

        {
          label: 'Reference',
          translations: { vi: 'Tham khảo' },
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});