import path from 'path';
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
