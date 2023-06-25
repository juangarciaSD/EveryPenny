module.exports = {
    env: {
        FIREBASE_API_KEY: "AIzaSyBrzdctQkwHScmTXCuVtyTqm6mekhX-8HI",
        FIREBASE_AUTH_DOMAIN: "easypenny-e9b25.firebaseapp.com",
        FIREBASE_PROJECT_ID: "easypenny-e9b25",
        FIREBASE_STORAGE_BUCKET: "easypenny-e9b25.appspot.com",
        FIREBASE_MESSAGING_ID: "605499234472",
        FIREBASE_APP_ID: "1:605499234472:web:c81766cb55c24bf9e68a9d",
        FIREBASE_MEASUREMENT_ID: "G-SBXZVSHJD7",
        API_DOMAIN: "http://localhost:4000"
    },
    webpack5: true,
    webpack: (config, {dev, isServer}) => {
        if(!dev && !isServer) {
            config.resolve.fallback = {
                fs: false
            },
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