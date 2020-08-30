//const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

const webpackConfig = {
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: 'eval-cheap-module-source-map',
  entry: {
    index: path.resolve(__dirname,'./src/page-index/main.ts'),
  },
  output: {
    hashDigestLength: 8,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash].js'
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
      {
        test: [/\.css$|.scss$/],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:8].[ext]',
              outputPath: path.resolve(__dirname,'./dist/assets/images')
            }
          }
        ]
      }
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
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: path.resolve(__dirname,'./src/assets/images'),
            to: path.resolve(__dirname,'./dist/assets/images')
          },
          {
            from: path.resolve(__dirname,'./src/assets/data'),
            to: path.resolve(__dirname,'./dist/assets/data')
          }
        ]
      }),
  ]
}

module.exports = webpackConfig;
