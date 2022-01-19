# webpack Documentation

## Projektordner anlegen 
-> npm init

-> npm install --save-dev webpack  
-> npm install --save-dev webpack-cli  

### packet.jason:
„scripts“: {  
    „build“: „webpack“  
}  

## webpack.config.js anlegen:
https://webpack.js.org/guides/development/  

var path = require('path');  
module.exports = {  
    entry: './app.js',  
    output: {  
        path: path.join(__dirname, 'dist'),  
        filename: 'bundle.js'  
    }  
}  

npm run oder npm run build  


## Loaders
https://webpack.js.org/loaders/  


### babel
https://webpack.js.org/loaders/babel-loader/  

npm install -D babel-loader @babel/core @babel/preset-env webpack  

webpack.config.js:  
module: {  
  rules: [  
    {  
      test: /\.m?js$/,    
      exclude: /(node_modules|bower_components)/,  
      use: {  
        loader: 'babel-loader',  
        options: {  
          presets: ['@babel/preset-env']  
        }  
      }  
    }  
  ]  
}  


### devserver
https://webpack.js.org/configuration/dev-server/  

npm install webpack-dev-server –save-dev  

package.json:  
"scripts": {  
    "build": "webpack",  
    "server": "webpack-dev-server"  
}

webpack.config.js:  
devServer: {  
    static: {  
        directory: path.join(__dirname, 'dist'),  
    },  
    compress: true,  
    port: 3000,  
},  

	
### CSS
https://webpack.js.org/loaders/css-loader/  

npm install css-loader style-loader --save-dev   

webpack.config.js:  
rules: [  
    {  
        test: /\.css$/i,   
        include: path.resolve(__dirname, 'src'), 
        exclude: /(node_modules|bower_components)/,  
        use: ["style-loader", "css-loader", "sass-loader"],  
    }
]  
js file:  
import "./style.css";  


### sass  
npm install sass-loader sass webpack --save-dev   
rules: [  
    {  
        test: /\.scss$/i,  
        include: path.resolve(__dirname, 'src'),  
        exclude: /(node_modules|bower_components)/,  
        use: ["style-loader", "css-loader", "sass-loader, „sass-loader"],  
    }  
]  

js file:  
import "./style.scss";  


### postCss
https://webpack.js.org/loaders/postcss-loader/  

npm install postcss postcss-loader postcss-preset-env --save-dev  
rules: [  
    {  
        test: /\.css$/i,  
        include: path.resolve(__dirname, 'src'),  
        exclude: /(node_modules|bower_components)/,  
        use: ["style-loader", "css-loader", 'postcss-loader'],  
    }  
]  


### font awesome
https://bytepursuits.com/using-webpack-5-with-font-awesome-5  

npm install --save @fortawesome/fontawesome-free  

{  
    test: /\.(svg|eot|woff|woff2|ttf)$/,  
    type: 'asset/resource',  
    generator: {  
        //publicPath: '../fonts/',  
        filename: 'compiled/fonts/[hash][ext][query]'  
    }  
}  
  
css:  
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";  
@import "~@fortawesome/fontawesome-free/scss/fontawesome.scss";  
@import "~@fortawesome/fontawesome-free/scss/solid.scss";  



### Für fonts und img Loader:   
https://webpack.js.org/guides/asset-modules/  
https://stackoverflow.com/questions/45489897/load-fonts-with-webpack-and-font-face   
mit der Konfiguration wandelt der URL Loader Fils kleiner denn 100kb in base64 um,
ist größer dann wird der File vom Server geladen  
 

npm install url-loader file-loader --save-dev  
  
rules: [  
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
    } 
]  


### Alias für Dateipfade
webpack.config.js:  
resolve: {  
    // extention: ['.js', 'scss', 'css'],  
    alias:{  
        BaseCss: path.resolve(__dirname, 'src', 'base', 'css' )  
    }  
},


### multible entry points = chunks
https://webpack.js.org/configuration/entry-context/#dependencies
https://webpack.js.org/guides/code-splitting/

entry: {  
    homepage: path.resolve(__dirname, 'src', 'pages', 'homepage'),  
    impressum: path.resolve(__dirname, 'src', 'pages', 'impressum'),  
},  
-> name einfügen  
 output: {  
    path: path.join(__dirname, 'dist'),  
    filename: '[name].bundle.js'  
},  



### css multible files
https://webpack.js.org/plugins/mini-css-extract-plugin/

npm install --save-dev mini-css-extract-plugin

! Do not use together style-loader and mini-css-extract-plugin.

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [ MiniCssExtractPlugin.loader , "css-loader", "postcss-loader", "sass-loader", ],
      },
    ],
  },
};

### -> split Js (L48)
https://webpack.js.org/plugins/commons-chunk-plugin/

plugins: [
    new webpack.optimize.CommonsChunkPlugin(options);
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery:  'jquery'
    })
],

### Caching

überall bei den files [chunkhash] einfürgen
new MiniCssExtractPlugin({
    filename: "[name].[chunkhash].css",
    chunkFilename: "[id].css",
    ignoreOrder: false, // Enable to remove warnings about conflicting order
}),
output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].bundle.js'
},

-> erzeugt die HTML Seiten
https://webpack.js.org/plugins/html-webpack-plugin/

npm install --save-dev html-webpack-plugin

const HtmlWebpackPlugin = require('html-webpack-plugin');
für jede Seite anlegen:  
plugins: [  
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'base', 'template', 'index.html'),
            hash: true,
            inject: 'body',
            chunks: ['homepage'],
            filename: 'index.html',
        }), 
],  


### clear dist Ordner
https://webpack.js.org/guides/output-management/

https://github.com/jantimon/html-webpack-plugin#minification

clean: true ergänzen
output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
    clean: true,
},


### minify
HTML:
with html-webpack-plugin
new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'base', 'template', 'index.html'),
            hash: true,
            inject: 'body',
            chunks: ['impressum'],
            filename: 'impressum.html',
            // favicon: '',
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                // removeRedundantAttributes: true,
                // removeScriptTypeAttributes: true,
                // removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),


CSS und sourcmap:
https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
npm install css-minimizer-webpack-plugin --save-dev


Uglify Javascript:
https://webpack.js.org/plugins/terser-webpack-plugin/

npm install terser-webpack-plugin --save-dev

https://stackoverflow.com/questions/58000019/using-terser-webpack-plugin-how-to-avoid-building-with-comments

sourcmap:
https://webpack.js.org/configuration/devtool/

(
https://github.com/terser/terser#minify-options
https://webpack.js.org/plugins/source-map-dev-tool-plugin/
https://webpack.js.org/plugins/eval-source-map-dev-tool-plugin/
)




### development and production Enviroment
https://webpack.js.org/guides/environment-variables/
-> geht noch nicht "npm run build-prod"

### http server
https://www.npmjs.com/package/http-server

### static site generator
https://surge.sh/

### eslint
https://webpack.js.org/plugins/eslint-webpack-plugin/  

### Prettier

### tailwind
https://levelup.gitconnected.com/setup-tailwind-css-with-webpack-3458be3eb547  

npm install --save-dev tailwindcss  

### Lazy Loading
https://webpack.js.org/guides/lazy-loading/
