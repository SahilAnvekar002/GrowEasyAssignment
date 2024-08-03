import { join } from 'path';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {
      config : join(__dirname, 'tailwind.config.ts')
    },
    autoprefixer : {}
  },
};

export default config;
