const webpack = require('webpack')
const path = require('path')



module.exports = {
    entry: ['./app/main.js'],
    externals: {
        jquery: 'window.$'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.vue']
    },
    target: 'web',
    module: {
        rules: [{
                test: /\.js$/,
                loaders: ["babel-loader", "eslint-loader"],
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                loader: ['vue-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        includePaths: ["node_modules"]
                    }
                }]
            }, {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader',
                    query: {
                        configFile: './.eslintrc'
                    },
                }],
            }
        ]
    }
}