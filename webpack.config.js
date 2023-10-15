/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const isDevelopment = process.env.REACT_APP_NODE_ENV == 'development';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    main: './src/index.tsx',
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  devServer: {
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv({
      path: isDevelopment ? '.env.development' : '.env.production',
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_NODE_ENV': JSON.stringify(
        process.env.REACT_APP_NODE_ENV,
      ),
      'process.env.REACT_APP_FRONT_URL': JSON.stringify(
        process.env.REACT_APP_FRONT_URL,
      ),
      'process.env.REACT_APP_BACK_URL': JSON.stringify(
        process.env.REACT_APP_BACK_URL,
      ),
      'process.env.REACT_APP_IMG_URL': JSON.stringify(
        process.env.REACT_APP_IMG_URL,
      ),
    }),
  ],
};
