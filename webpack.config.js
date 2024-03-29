const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { mainModule } = require("process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { Hash } = require("crypto");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const config = {};
// https://webpack.js.org/configuration/mode/
// https://webpack.js.org/guides/environment-variables/

// module.exports = {
module.exports = (env) => {
  const devMode = env.mode === "development";
  config.mode = devMode ? "development" : "production";
  config.devtool = devMode ? "source-map" : false;
  // entry: './src/pages/homepage/index.js',
  config.performance = {
    hints: devMode ? "warning" : false,
  };
  config.entry = {
    index: {
      import: path.resolve(__dirname, "src", "pages", "homepage"),
      dependOn: "shared",
    },
    impressum: {
      import: path.resolve(__dirname, "src", "pages", "impressum"),
      dependOn: "shared",
    },
    // shared: ["jquery", "react"],
    shared: path.resolve(__dirname, "src", "base", "js", "main.js"),
  };
  config.module = {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components)/,
        // use: ["style-loader", "css-loader", "postcss-loader"],
        // use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { sourceMap: devMode ? true : false } }],
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/i,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components)/,
        // use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        // use: [ MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", { loader: "sass-loader", options: { sourceMap: devMode ? true : false } }, ],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        type: "asset/resource",
        // type: "asset/inline",
        generator: {
          //   publicPath: './fonts/',
          filename: devMode ? "fonts/[ext][query]" : "fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "javascript/auto",
        // use: ['url-loader?limit=100000'],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  };
  config.resolve = {
    alias: {
      BaseCss: path.resolve(__dirname, "src", "base", "css"),
    },
  };
  config.optimization = {
    // runtimeChunk: 'single', // for multiple entry points
    splitChunks: {
      chunks: "all",
    },
    minimize: devMode ? false : true,
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
            preamble: devMode ? "" : "/* minified */",
          },
        },
      }),
    ],
  };
  config.plugins = [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: "[id].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "src",
        "base",
        "template",
        "index.html"
      ),
      hash: devMode ? false : true,
      inject: "body",
      chunks: ["index", "shared"],
      filename: "index.html",
      // favicon: '',
      minify: devMode
        ? {}
        : {
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: true,
            // removeRedundantAttributes: true,
            // removeScriptTypeAttributes: true,
            // removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "src",
        "base",
        "template",
        "index.html"
      ),
      hash: devMode ? false : true,
      inject: "body",
      chunks: ["impressum", "shared"],
      filename: "impressum.html",
      // favicon: '',
      minify: devMode
        ? {}
        : {
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: true,
            // removeRedundantAttributes: true,
            // removeScriptTypeAttributes: true,
            // removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          },
    }),
  ];
  config.output = {
    path: path.join(__dirname, "dist"),
    filename: devMode ? "[name].bundle.js" : "[name].[hash].bundle.js",
    //filename: "[name].[contenthash].bundle.js",
    //publicPath: "dist/js/",
    clean: true,
  };
  config.devServer = {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
  };
  return config;
};
