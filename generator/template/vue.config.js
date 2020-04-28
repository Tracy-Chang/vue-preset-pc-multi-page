const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const colors = require('colors-console');

process.env.VUE_APP_VERSION = require('./package.json').version

// 获取多页面的配置数据
function getPages() {
  const pages = {};
  const pagesJson = require('./src/config/page.js');

  glob.sync('./src/pages/**/*.vue').forEach(function (pageUrl) {
      const ext = path.extname(pageUrl);
      const pageCode = path.basename(pageUrl, ext);
      // 不在json配置中的页面，不做处理
      if (!pagesJson[pageCode]) {
        return
      }
      // 文件名不能重复的验证（pageCode 在这里取的是文件名）
      if(pages[pageCode]){
          console.error(colors('red', `文件名不能重复使用：${pageCode}。\n`));
          process.exit(1);
      }
      // 生成入口文件
      const entryFile = `./src/entry/${pageCode}.js`;
      // 判断js文件是否存在
      fs.access(entryFile, fs.constants.F_OK, (err) => {
        if (err) {
          console.error(colors('red', `${entryFile}不存在\n`));
          process.exit(1);
        }
      });
      // 自定义页面数据
      const pageData = pagesJson[pageCode] || {};
      Object.assign(pageData, {
          url: pageUrl,
          code: pageCode
      });
      // 配置多页面
      pages[pageCode] = {
          entry: entryFile,               // 入口文件
          template: './public/index.html',// 模板文件
          filename: pageCode + '.html',   // 打包后的文件路径
          minify: false,                  // 是否压缩
          chunks: ['chunk-vendors', 'chunk-common', pageCode],   // 引入资源文件
          chunksSortMode: 'manual',       // 控制 chunk 的排序。none | auto（默认）| dependency（依赖）| manual（手动）| {function}
          pageData: pageData
      };
  });
  return pages;
}

module.exports = {
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/styles/_variables.scss";
        @import "@/styles/_mixins.scss";
        @import "@/styles/_functions.scss";
        `
      }
    }
  },
  pages: getPages()
}
