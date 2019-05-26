const path = require('path');
const webpack = require('webpack');

module.exports = function (env, argv) {

    // default to the server configuration
    const base = {
        entry: './server/index.js',
        target: 'node',
        output: {
            filename: 'server.js',
            // path needs to be an ABSOLUTE file path
            path: path.resolve(process.cwd(), 'build'),
            publicPath: '/',
        },
        // Enable sourcemaps for debugging webpack's output.
        devtool: 'cheap-module-eval-source-map',
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
        plugins: [
            new webpack.ProvidePlugin({
                "React": "react",
            }),
        ],
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                {
                    test: /\.tsx?$/,
                    use: [{
                        loader: 'ts-loader',
                    }]
                },
            ]
        },
    }

    // server-specific configuration
    if (env.platform === 'server') {
        base.target = 'node';
    }

    return base;
}