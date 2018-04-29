const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'electron-renderer',
  entry: './src/renderer/index.jsx',
  output: {
    filename: 'renderer/index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src/renderer'), 'node_modules']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' },
      { from: 'src/main', to: 'main', ignore: ['.*.js'] },
      { from: 'src/index.html' }
    ])
  ]
};
