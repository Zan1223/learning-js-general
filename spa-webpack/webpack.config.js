const {
  join
} = require('path');
const glob = require('glob');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const PurifyCSSPlugin = require('purifycss-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
console.log("test argv--->",argv)
const merge = require('webpack-merge');
const _mode = argv.mode || 'development';
const _modeflag = (_mode == 'production' ? true : false);
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
webpackConfig = {
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
          loader: MiniCssExtractPlugin.loader
        },
        {
         // loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
         loader: 'css-loader'
        }
      ],
    }, ],
  },
  plugins: [
    new WebpackDeepScopeAnalysisPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: _modeflag ? 'style/[name].[hash:5].bundles.css' : 'style/[name].bundles.css',
      chunkFilename:  _modeflag ? 'style/[id].[hash:5].bundles.css' : 'style/[name].bundles.css',
    }),
    //css tree-shaking (maining if the css is not used then remove from the the build)
    // new PurifyCSSPlugin({
    //   // Give paths to parse for rules. These should be absolute!
    //   paths: glob.sync(join(__dirname, './dist/*.html')),
    // }),
  ]
}

module.exports = merge(_mergeConfig,webpackConfig);