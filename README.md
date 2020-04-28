# vue-preset-pc-multi-page
Vue 多页项目模板pc端 preset

## Usage
```bash
vue create --preset Tracy-Chang/vue-preset-pc-multi-page my-project
```
## 新建页面
* @/config/page.js 中添加页面 name 和 title
* @/entry/ 下新建页面入口 .js 文件
* @/pages/ 下新建页面路径和 .vue 文件

> 保证三个文件的 name 一致

## Preset Config
* babel, vuex, CSS Pre-processors, Linter / Formatter, Unit Testing
* Sass/SCSS (with dart-sass)
* eslint setup: ESLint + Standard config / Lint on save / Lint and fix on commit
* test: Mocha + Chai
* 配置文件放入新建文件中
* [preset.json](./preset.json)


## Features
* 集成`git-cz`规范提交message（中文提示信息），强制验证提交信息
* 集成`standard-version`自动生成changelog
* 预设三个 env 环境和三个 build scripts
* 使用`compression-webpack-plugin`进行资源 gzip 打包
* Service 层封装 axios
* 模块化 Vuex Store
* 集成 editorconfig, gitattributes, jsconfig.json 等对代码优化的功能配置