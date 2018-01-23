const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


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
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.jsx']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new UglifyJSPlugin()
    ]
};