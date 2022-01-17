# webpack Documentation

##Projektordner anlegen 
→ npm init

→ npm install --save-dev webpack
→ npm install --save-dev webpack-cli

###packet.jason:
„scripts“: {
„build“: „webpack“
}

##webpack.config.js anlegen:
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


##Loaders
https://webpack.js.org/loaders/#awesome	


###babel:
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

###eslint
https://webpack.js.org/plugins/eslint-webpack-plugin/


###devserver
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

	
###CSS
https://webpack.js.org/loaders/css-loader/

npm install css-loader style-loader --save-dev 

webpack.config.js:
rules: [
    {
        test: /\.css$/i,
        exclude: /(node_modules|bower_components)/,
        use: ["style-loader", "css-loader", "sass-loader"],
    }
]
js file:
import "./style.css";


###Für fonts und img Loader

npm install url-loader file-loader --save-dev

https://stackoverflow.com/questions/45489897/load-fonts-with-webpack-and-font-face

rules: [
    { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        use: ['url-loader?limit=100000'],
    }
]


###sass
npm install sass-loader sass webpack --save-dev 
rules: [
    {
        test: /\.scss$/i,
        exclude: /(node_modules|bower_components)/,
        use: ["style-loader", "css-loader", "sass-loader, „sass-loader"],
    }
]

js file:
import "./style.scss";


###postCss
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


###tailwind
https://levelup.gitconnected.com/setup-tailwind-css-with-webpack-3458be3eb547

npm install --save-dev tailwindcss



