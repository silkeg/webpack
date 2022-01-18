const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/pages/homepage/index.js',
    module:{
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
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
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.scss$/i,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                type: 'asset/resource',
                generator: {
                  //publicPath: '../fonts/',
                  filename: 'compiled/fonts/[hash][ext][query]'
                }
             },
        ]
    },
    resolve: {
        // extention: ['.js', 'scss', 'css'],
        alias:{
            BaseCss: path.resolve(__dirname, 'src', 'base', 'css' )
        }
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
    },
}