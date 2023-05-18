const withPWA = require("next-pwa");

module.exports = {
    webpack: (config, {dev, isSever}) => {
        if(!dev && !isServer) {
            config.resolve.alias = {
                ...config.resolve.alias
            }
        }

        return config;
    },
    webpack5: true,
    eslint: {
        ignoreDuringBuilds: true
    },
    node: {
        net: "empty",
        fs: "empty",
        tls: "empty"
    }
}