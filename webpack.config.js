//const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

const webpackConfig = {
  mode: 'production',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    index: path.resolve(__dirname,'./src/page-index/main.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      /**
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
       */
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
      '.jsx'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: 'TS Webpack',
      filename: 'index.html',
      template: path.resolve(__dirname,'./src/page-index/tmpl.html')
    })
  ]
}

module.exports = webpackConfig;
