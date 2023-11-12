///** @type {import('next').NextConfig} */
//const nextConfig = {
//    async redirects() {
//      return [
//        {
//          source: '/sign-in',
//          destination: '/api/auth/login',
//          permanent: true,
//        },
//        {
//          source: '/sign-up',
//          destination: '/api/auth/register',
//          permanent: true,
//        },
//      ]
//    },

//    webpack: (
//      config,
//      { buildId, dev, isServer, defaultLoaders, webpack }
//    ) => {
//      config.resolve.alias.canvas = false
//      config.resolve.alias.encoding = false
//      return config
//    },


//  }

//  module.exports = nextConfig

////  module.exports = {
////    experimental: {
////        modern: true,
////        dynamicImports: true,
////        css: true
////    }
////}


/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/sign-in',
        destination: '/api/auth/login',
        permanent: true,
      },
      {
        source: '/sign-up',
        destination: '/api/auth/register',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
    ],
  },

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, webpack }
  ) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

module.exports = nextConfig;
