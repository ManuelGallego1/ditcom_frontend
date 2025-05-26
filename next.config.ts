import type { Configuration } from 'webpack';
const path = require('path');

const nextConfig = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  webpack(config: Configuration) {
    config.resolve = config.resolve || {};
    config.resolve.alias = (config.resolve.alias || {}) as Record<string, string | false | string[]>;
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
