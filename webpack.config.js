const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/',
                            publicPath: 'assets/images/'
                        }
                    }
                ]
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.mjs']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            {from: 'src/scss/general/fonts/', to: 'fonts'},
            {from: 'node_modules/materialize-css/dist/fonts', to: 'fonts'}
        ]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
};