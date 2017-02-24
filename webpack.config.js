const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';
const devSvrPort = process.env.DEV_SVR_PORT || 9999;

const commonPlugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module =>
      module.context && module.context.indexOf('node_modules') !== -1,
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
      GITHUB_REPO_OWNER: JSON.stringify(process.env.GITHUB_REPO_OWNER),
      GITHUB_REPO_NAME: JSON.stringify(process.env.GITHUB_REPO_NAME),
    },
  }),
  new webpack.NamedModulesPlugin(),
];

const prodPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.optimize.UglifyJsPlugin({
    output: { comments: false },
    sourceMap: true,
  }),
  new HtmlWebPackPlugin({
    inject: false,
    filename: '../../server/index.prod.ejs',
    initialState: '<%= initialState %>',
    filesPrefix: '<%= filesPrefix %>',
    template: './src/index.ejs',
  }),
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];

module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.join(__dirname, './public'),
    publicPath: '/assets',
    host: '0.0.0.0',
    port: devSvrPort,
    compress: false,
    inline: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
  entry: {
    index: [
      'babel-polyfill',
      ...(isProd ? [] : [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://127.0.0.1:${devSvrPort}`,
        'webpack/hot/only-dev-server',
      ]),
      path.join(__dirname, './src/'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'file-loader', query: { name: '[name].[ext]' } },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?.+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
      },
    ],
  },
  output: isProd ? {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, './public/dist'),
    publicPath: '/',
    sourceMapFilename: '[file].map',
  } : {
    filename: 'index.js',
    path: path.join(__dirname, './public/dist'),
    publicPath: `http://127.0.0.1:${devSvrPort}/assets`,
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
  },
  plugins: commonPlugins.concat(isProd ? prodPlugins : devPlugins),
  stats: {
    colors: {
      green: '\u001b[32m',
    },
  },
};
