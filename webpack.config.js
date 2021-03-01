const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const port = process.env.PORT || 8080;

const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function(_env, argv) {
    const isProduction = argv.mode === 'production';
    const isDevelopment = !isProduction;

    return {
        mode: isProduction ? 'production' : 'development',
        target: 'web',
        devtool: isDevelopment && 'inline-source-map',
        entry: './src/index.js',
        output: {
            filename: 'bundle.[hash].js',
            path: resolve(__dirname, 'src'),
            publicPath: '/'
        },
        resolve: {
            extensions: ['.js', 'jsx', '.css']    
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true,
                        cacheCompression: false,
                        envName: isProduction ? 'production' : 'development'
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg|webp)$/i,
                    use: [{
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "assets/img/[name].[hash:8].[ext]"
                        },
                    }, {
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
                    test: /\.(eot|gif|otf|png|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
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
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: resolve(__dirname, 'public/index.html'),
                inject: true,
                title: "CTA Tracker",
                favicon: 'public/favicon.ico',
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
            host: 'localhost',
            compress: true,
        }
    };
};