const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

let core = {
  mode: "development",
  watch: true,
  // entry: {},
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, './core/static/core/dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './node_modules/bootstrap/dist', to: './vendors/bootstrap-5-1-3/dist' },
        { from: './node_modules/bootstrap-icons/', to: './vendors/bootstrap-icons/' },
        { from: './node_modules/popper.js/dist/umd/popper.min.js', to: './vendors/popper.js/popper.min.js' },
        { from: './node_modules/js-cookie/dist/js.cookie.js', to: './vendors/js-cookie/js.cookie.js' },
        { from: './node_modules/bootstrap-icons/font/bootstrap-icons.css', to: './vendors/bootstrap-icons/font/bootstrap-icons.css'
        },
      ]
    }),
  ]
};

let task = {
  mode: "development",
  watch: true,
  entry: {
    'task/register.js': './task/resources/js/register.js',
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, './task/static/task/dist'),
  },
};

module.exports = [
  core, task
]
