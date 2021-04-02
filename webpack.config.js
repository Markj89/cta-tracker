const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var Dotenv = require('dotenv-webpack');
var base = __dirname;
const port = process.env.PORT || 8080;

module.exports = function(_env, argv) {
    const isProduction = argv.mode === 'production';
    const isDevelopment = !isProduction;

    return {
        mode: isProduction ? 'production' : 'development',
        devtool: isDevelopment && 'source-map',
        entry: './src/index.js',
        stats: {
            colors: true
        },
        output: {
            filename: 'bundle.js',
            path: resolve(base, 'public'),
            publicPath: '/'
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.css'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        //cacheDirectory: true,
                        //cacheCompression: true,
                        envName: isProduction ? 'production' : 'development'
                    }
                },
                {
                    test: /\.(jpe?g|png|gif|svg|webp)$/i,
                    use: [{
                        loader: 'file-loader'
                    }]
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack", "svg-url-loader"]
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(eot|otf|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'assets/img/[name].[ext]',
                        },
                    }]
                }
            ]
        },
        plugins: [
            new Dotenv({
                path: resolve(base, './.env.local')
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: "body",
                filename: './index.html',
                title: "CTA Tracker",
                minify: {
                    collapseWhitespace: true
                }
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(isProduction ? "production" : "development")
            })  
        ].filter(Boolean),
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserWebpackPlugin({
                    terserOptions: {
                        compress: {
                            comparisons: false
                        },
                        mangle: {
                            safari10: true
                        },
                        output: {
                            comments: false,
                            ascii_only: true
                        },
                        warnings: false
                    }
                }),
                new OptimizeCssAssetsPlugin()
            ]
        },
        devServer: {
            historyApiFallback: true,
            port: port,
            open: true,
            writeToDisk: false,
            https: true,
            contentBase: './public',
            compress: true,
        }
    };
};