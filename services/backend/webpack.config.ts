// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const root = path.join(__dirname);
const tsConfig = path.join(root, 'tsconfig.json');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    !isProd && 'webpack/hot/poll?100',
    path.join(root, 'src', 'index.ts'),
  ].filter(Boolean),
  watch: !isProd,
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: isProd ? undefined : ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: tsConfig,
            },
          },
        ],
      },
    ],
  },
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsConfigPathsPlugin({ configFile: tsConfig })],
  },
  plugins: [!isProd && new webpack.HotModuleReplacementPlugin()].filter(
    Boolean,
  ),
  output: {
    path: path.join(root, 'build'),
    filename: 'server.js',
  },
};
