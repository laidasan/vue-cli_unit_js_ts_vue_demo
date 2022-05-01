# 注意
!! 請切換到 branch [feature/babel-plugin](https://github.com/laidasan/vue-cli_unit_js_ts_vue_demo/tree/feature/babel-plugin), 使用 babel-plugin-istanbul 來當作計算覆蓋率的工具  
!! 請切換到 branch [feature/babel-plugin](https://github.com/laidasan/vue-cli_unit_js_ts_vue_demo/tree/feature/babel-plugin), 使用 babel-plugin-istanbul 來當作計算覆蓋率的工具  
!! 請切換到 branch [feature/babel-plugin](https://github.com/laidasan/vue-cli_unit_js_ts_vue_demo/tree/feature/babel-plugin), 使用 babel-plugin-istanbul 來當作計算覆蓋率的工具  
  
此分支 main 是使用 istanbul-instrumenter-loader 來做覆蓋率計算, 但此 loader 使用的 istanbul-lib-instrument 版本過舊
存在著許多問題, 故不推薦使用此方式了

# unit test demo
此專案為 unit test demo, 使用
* 測試: vue-cli + @vue/cli-plugin-unit-mocha + chai
* 覆蓋率: nyc  
  
Note: @vue/cli-plugin-unit-mocha 底層是使用 [mochapack](https://github.com/sysgears/mochapack)

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your unit tests and calc coverage report
```
yarn coverage
```

### Run unit tests and calc coverage report with all files
```
yarn coverage:all
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
