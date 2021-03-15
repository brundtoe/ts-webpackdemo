const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = {
  mode: 'development',
  watchOptions: {
    ignored: ['node_modules/**']
  },
  devtool: 'eval-cheap-module-source-map',
  entry: {
    index: path.resolve(__dirname, './src/page-index/index.ts'),
    bookstore: path.resolve(__dirname,'./src/page-bookstore/main.ts' ),
    geoloc: path.resolve(__dirname,'./src/page-geoloc/main.ts' ),
    promise: path.resolve(__dirname,'./src/page-promise/main.ts' ),
    xmldemo: path.resolve(__dirname,'./src/page-xmldemo/main.ts' ),
    xmlhttp: path.resolve(__dirname,'./src/page-xmlhttp/main.ts' ),
    authors: path.resolve(__dirname,'./src/page-authors/main.ts')
  },
  output: {
    hashDigestLength: 8,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][fullhash].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          esModule: false,
        },
      },
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
              postcssOptions: {
                plugins:
                  ['postcss-preset-env']
              }
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
              name: '[name].[fullhash:8].[ext]',
              outputPath: path.resolve(__dirname, './dist/assets/images')
            }
          }
        ],
        type: 'javascript/auto'
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

const files = ['index', 'bookstore', 'geoloc', 'promise', 'xmldemo', 'xmlhttp', 'authors']

files.forEach((file) => {
  webpackConfig.plugins.push(
    new HtmlWebPackPlugin({
      filename: `${file}.html`,
      template: path.resolve(__dirname, `./src/page-${file}/tmpl.ejs`),
      chunks: [file.replace(/-(\w)/g, (match, c) => c.toLowerCase())]
    })
  )
})

module.exports = webpackConfig
