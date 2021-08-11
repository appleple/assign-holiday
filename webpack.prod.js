const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: "production",
  target: ["web", "es5"],
  entry: {
    'event-maker': './src/index',
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        include: /src\/js/,
        use: {
          loader: 'babel-loader',
        },
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
