const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = {
  mode: 'production',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: 'eval-cheap-module-source-map',
  entry: {
    index: path.resolve(__dirname, './src/page-index/index.ts'),
    bookstore: path.resolve(__dirname,'./src/page-bookstore/main.ts' ),
    geoloc: path.resolve(__dirname,'./src/page-geoloc/main.ts' )
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
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')()]
            }
          },
          'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:8].[ext]',
              outputPath: path.resolve(__dirname, './dist/assets/images')
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
    new webpack.ProvidePlugin(
      {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }
    ),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: path.resolve(__dirname, './src/assets/images'),
            to: path.resolve(__dirname, './dist/assets/images')
          },
          {
            from: path.resolve(__dirname, './src/assets/data'),
            to: path.resolve(__dirname, './dist/assets/data')
          }
        ]
      }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

const files = ['index', 'bookstore', 'geoloc']

files.forEach((file) => {
  webpackConfig.plugins.push(
    new HtmlWebPackPlugin({
      filename: `${file}.html`,
      template: path.resolve(__dirname, `./src/page-${file}/tmpl.html`),
      chunks: [file.replace(/-(\w)/g, (match, c) => c.toLowerCase())]
    })
  )
})

module.exports = webpackConfig
