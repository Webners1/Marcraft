// next.config.js
import path from 'path';

const nextConfig = {
  images: {
    // Configure external domains for next/image optimization
    domains: ['t4.ftcdn.net', 'i.ibb.co','t3.ftcdn.net'], // These are the external domains allowed for image loading
  },
  reactStrictMode: false,  // Keep React strict mode disabled
  webpack: (config, { isServer }) => {
    // Webpack alias to map 'images/' to 'public/images/'
    config.resolve.alias['images'] = path.join(process.cwd(), 'public/images');

    // Add SVGR loader for importing SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
