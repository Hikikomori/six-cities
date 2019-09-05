const path = require(`path`);
const webpack = require(`webpack`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    publicPath: `http://localhost:8080/`,
    watchContentBase: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': `react`,
      'ReactDOM': `react-dom`,
      'PropTypes': `prop-types`
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: `ts-loader`
      }
    ],
  },
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `.jsx`, `json`]
  },
  devtool: `source-map`
};
