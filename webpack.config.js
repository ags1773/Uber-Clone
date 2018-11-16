const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    proxy: {
      // '/api': 'http://localhost:8000'
      '/api': 'https://chuha.herokuapp.com/'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-module/,
        use: {
          loader: 'babel-loader',
          query: {compact: false}
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new Dotenv()
  ]
}
