const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

var base = __dirname;
const port = process.env.PORT || 8080;

module.exports = (_env, argv) => {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  return {
    entry: "./src/index.tsx",
    mode: isProduction ? "production" : "development",
    devtool: isDevelopment ? "inline-source-map" : "source-map",
    target: "web",
    output: {
      path: path.resolve(base, "public"),
      filename: "bundle.js",
    },
    watchOptions: {
      ignored: "/node_modules/",
    },
    stats: {
      colors: true,
    },
    resolve: {
      extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              ascii_only: true,
            },
            warnings: false,
          },
        }),
      ],
    },
    devServer: {
      compress: true,
      hot: true,
      port: 8080,
      https: true,
      historyApiFallback: true,
      liveReload: true,
      historyApiFallback: {
        disableDotRule: true,
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              envName: isProduction ? "production" : "development",
            },
          },
        },
        {
          test: /\.(jp(e*)g|png|gif|svg|webp)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                limit: 10000,
                name: "assets/img/[hash]-[name].[ext]",
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: ["babel-loader", "@svgr/webpack", "url-loader"],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: ["svg-url-loader", "url-loader", "file-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader",
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        ),
      }),
      new Dotenv({
        path: path.resolve(base, "./.env.local"),
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        ),
      }),
      /*new ForkTsCheckerWebpackPlugin({
        async: false,
      }),*/
      new HtmlWebpackPlugin({
        title: "CTA Tracker",
        template: "./src/index.html",
        filename: "./index.html",
        inject: "body",
        hash: true, // Cache busting
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
      }),
    ],
  };
};
