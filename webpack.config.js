const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    // entry: './src/pages/homepage/index.js',
    entry: {
        // homepage: path.resolve(__dirname, 'src', 'base'),
        homepage: path.resolve(__dirname, 'src', 'pages', 'homepage'),
        impressum: path.resolve(__dirname, 'src', 'pages', 'impressum'),
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
                //include: path.resolve(__dirname, 'src', 'main', 'styles', 'css'),
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                // use: ["style-loader", "css-loader", "postcss-loader"],
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.scss$/i,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                // use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
                use: [ MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader", ],
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                type: 'asset/resource',
                generator: {
                  //publicPath: '../fonts/',
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
        // extention: ['.js', 'scss', 'css'],
        alias:{
            BaseCss: path.resolve(__dirname, 'src', 'base', 'css' )
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false, // Enable to remove warnings about conflicting order
          })
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
    },
}