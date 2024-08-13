const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            config.optimization.minimize = true;
        }

        config.experiments = { 
            asyncWebAssembly: true,
            layers: true, // Enable layers experiment
        };

        config.module.rules.push({
            test: /\.wasm$/,
            type: "webassembly/async",
        });

        return config;
    },
    experimental: {
        esmExternals: 'loose',
    },
    images: {
        domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
    },
};

export default nextConfig;