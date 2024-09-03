const nextSettings = {
    optimizeFonts: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.royalbabiesworld.com'
        },
        {
          protocol: 'https',
          hostname: 'www.kcnpnm.org'
        },
        ],
      },
};

module.exports = nextSettings;
