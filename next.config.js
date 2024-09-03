const nextSettings = {
    optimizeFonts: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.royalbabiesworld.com',
        },
        ],
      },
};

module.exports = nextSettings;
