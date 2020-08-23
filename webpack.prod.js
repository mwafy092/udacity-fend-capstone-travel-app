const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    // mode
    mode: 'production',
    // entry point for webpack
    entry: './src/client/index.js',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                // babel loader
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                // sass loader
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW()

    ]
}