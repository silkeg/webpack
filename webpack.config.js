const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module:{
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            }
        ]
    },
    // plugins: [new ESLintPlugin(options)],
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
    },
}