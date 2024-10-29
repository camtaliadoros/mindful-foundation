import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
      },
      colors: {
        'mf-chalk': '#F8F6F3',
        'mf-light-grey': '#F4F4F4',
        'mf-ash': '#192B32',
        'mf-red': '#dd083a',
        'mf-indigo': '#4C3C68',
        'mf-yellow': '#FFC844',
        'mf-grey': '#D1D1D1',
        'mf-blue': '#507D9B',
      },
    },
  },
  plugins: [],
};
export default config;
