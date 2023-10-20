// const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const VUE_APP_NAME = process.env.VUE_APP_NAME;

const fileName = process.env.VUE_APP_FOLDER;
process.env.VUE_APP_VERSION = process.env.npm_package_version;

const PATH = process.env.VUE_APP_ACCOUNT_TYPE_FOLDER;
if (!PATH) throw Error("NO BRANCH setting in .env");
const BRANCH_PATH = `vendor/modules/${PATH}`;

console.log('BRANCH_PATH', BRANCH_PATH);
const Time = new Date().getTime();

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  outputDir: VUE_APP_NAME ? VUE_APP_NAME : 'dist',
  devServer: {
    host: '0.0.0.0',
    overlay: {
      warnings: false,
    }
    // proxy: isProduction ? process.env.VUE_APP_URL : 'http://api.income88.tw',
  },
  lintOnSave: false,

  configureWebpack: {
    output: { // 輸出重構  打包編譯後的 檔名稱  【模組名稱.版本號.時間戳】
      // filename: utils.assetsPath('js/[name].[chunkhash].'+Time+'js'),
      // chunkFilename: utils.assetsPath('js/[id].[chunkhash].'+Time+'js')
      filename: `js/[name].${Time}.js`,
      chunkFilename: `js/[name].${Time}.js`
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('vendor'))
      .set("@branch", resolve(BRANCH_PATH));
  },

  /** pages和tap設定衝突 */
  pages: {
    index: {
      entry: 'vendor/modules/FPKG-230000-BackendCore/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '',
      favicon: process.env.VUE_APP_FAVICON ? path.resolve(`${BRANCH_PATH}/public/favicon.ico`) : path.resolve('./public/favicon.ico'),
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },

};
