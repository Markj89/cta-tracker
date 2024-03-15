import path from "path";
import {
  Configuration as WebpackConfiguration,
  HotModuleReplacementPlugin,
  DefinePlugin
} from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import Dotenv from "dotenv-webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";


interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const common: Configuration = {
  entry: "./src/index.tsx",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: process.env.NODE_ENV !== "production" ? "inline-source-map" : "source-map",
  target: "web",
  output: {
    path: path.resolve(__dirname, "public"),
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
        },
      }),
    ],
  },
  devServer: {
    compress: true,
    hot: true,
    port: process.env.UI_PORT || 8080,
    https: true,
    historyApiFallback: true,
    liveReload: true,
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
            envName: process.env.NODE_ENV === "production" ? "production" : "development",
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
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV === "production" ? "production" : "development"
      ),
    }),
    new Dotenv({
      path: path.resolve(__dirname, "./.env.local"),
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV === "production" ? "production" : "development"
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
export default common;