import { defineConfig } from '../lib/utils/_defineConfig';

const defaultConfig = defineConfig({
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  } as const,
  remPropList: ['fontSize', 'letterSpacing', 'lineHeight'],
  magicProps: {
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
});

export default defaultConfig;
