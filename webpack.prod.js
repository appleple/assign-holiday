const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  target: ['web', 'es5'],
  entry: {
    'assign-holiday': './src/index',
    'jquery-assign-holiday': './src/adaptor/jquery',
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: '[name].js',
    library: ['AssignHoliday'],
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src\/js/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false }
          }
        ]
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      context: './src',
      extensions: ['js'],
      exclude: ['/node_modules/'],
      emitError: true,
      emitWarning: true,
      failOnError: true,
      fix: true,
    }),
  ],
};
