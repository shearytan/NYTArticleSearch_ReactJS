const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'public'),
  JS: path.resolve(__dirname, 'src/js'),
};

module.exports = {
  entry: path.join(paths.JS, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js'
  },
  devServer: {
      contentBase: paths.SRC,
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: path.join(paths.SRC, 'index.html'),
      }),
      new ExtractTextPlugin('style.bundle.css'),
  ],
  module: {
      rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                'babel-loader',
            ],
        },
        {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                'file-loader',
            ],
        },
      ],
  },
  resolve: {
      extensions: ['.js', '.jsx'],
  },
};
