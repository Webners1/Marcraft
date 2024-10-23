import path from 'path';

const nextConfig = {
  images: {
    domains: ['t4.ftcdn.net', 't3.ftcdn.net'], // Add the domain of your external image
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  reactStrictMode: false,  // keep React strict mode disabled
  webpack: (config) => {
    // Add a Webpack alias to map 'images/' to 'public/images/'
    config.resolve.alias['images'] = path.join(process.cwd(), 'public/images');
    return config;
  },
};

export default nextConfig;
