const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { mainModule } = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Hash } = require('crypto');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const devMode = process.env.WEBPACK_MODE === "production";

module.exports = {
    mode: 'none',
    // mode: devMode,
    devtool: devMode ? "source-map" : false,
    // entry: './src/pages/homepage/index.js',
    entry: {
        index: {
            import: path.resolve(__dirname, 'src', 'pages', 'homepage'),
            dependOn: 'shared',
        },
        impressum: {
            import: path.resolve(__dirname, 'src', 'pages', 'homepage'),
            dependOn: 'shared',
        },
        // shared: ["jquery", "react"],
        shared: path.resolve(__dirname, 'src', 'base', 'js', 'main.js'),
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                // use: ["style-loader", "css-loader", "postcss-loader"],
                // use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { sourceMap: devMode ? true : false } }],
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
            {
                test: /\.scss$/i,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                // use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
                // use: [ MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", { loader: "sass-loader", options: { sourceMap: devMode ? true : false } }, ],
                use: [ MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader", ],
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                type: 'asset/resource',
                generator: {
                //   publicPath: './fonts/',
                  filename: 'compiled/fonts/[hash][ext][query]'
                },
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'javascript/auto',
                // use: ['url-loader?limit=100000'],
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                    }
                  },
                ]
            },
        ]
    },
    resolve: {
        alias:{
            BaseCss: path.resolve(__dirname, 'src', 'base', 'css' )
        }
    },
    optimization: {
        // runtimeChunk: 'single', // for multiple entry points
        splitChunks: {
            chunks: 'all',
        },
        minimize: devMode ? true : false,
        minimizer: [
            new CssMinimizerPlugin({
                test: /\.css$/i,
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
            new TerserPlugin({
                test: /\.js$/i,
                // bringt nix
                terserOptions: {
                    // mangle: false, // = default, damit keine Variablen umbenannt werden beim minify
                    format: {
                        comments: false,
                        preamble: devMode ? "/* minified */" : "",
                    },
                },
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].[hash].css" : "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'base', 'template', 'index.html'),
            hash: true,
            inject: 'body',
            chunks: ['index', 'shared'],
            filename: 'index.html',
            // favicon: '',
            minify:  devMode ? {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                // removeRedundantAttributes: true,
                // removeScriptTypeAttributes: true,
                // removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            } : { }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'base', 'template', 'index.html'),
            hash: true,
            inject: 'body',
            chunks: ['impressum', 'shared'],
            filename: 'impressum.html',
            // favicon: '',
            minify: devMode ? {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                // removeRedundantAttributes: true,
                // removeScriptTypeAttributes: true,
                // removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            } : { }
        }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: devMode ? '[name].[hash].bundle.js' : '[name].bundle.js',
        clean: true,
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
    },
}