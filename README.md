# 注意
!! 請切換到 branch [feature/babel-plugin](https://github.com/laidasan/vue-cli_unit_js_ts_vue_demo/tree/feature/babel-plugin), 使用 babel-plugin-istanbul 來當作計算覆蓋率的工具  
!! 請切換到 branch [feature/babel-plugin](https://github.com/laidasan/vue-cli_unit_js_ts_vue_demo/tree/feature/babel-plugin), 使用 babel-plugin-istanbul 來當作計算覆蓋率的工具  
!! 請切換到 branch [feature/babel-plugin](https://github.com/laidasan/vue-cli_unit_js_ts_vue_demo/tree/feature/babel-plugin), 使用 babel-plugin-istanbul 來當作計算覆蓋率的工具  
  
此分支 main 是使用 istanbul-instrumenter-loader 來做覆蓋率計算, 但此 loader 使用的 istanbul-lib-instrument 版本過舊
存在著許多問題, 故不推薦使用此方式了

# unit test demo
此專案為 unit test demo, 使用
* 測試: vue-cli + @vue/cli-plugin-unit-mocha + chai
* 覆蓋率: nyc(產生報表) + babel-plugin-istanbul(計算覆蓋率)
    
## Note: 
* 可以使用 npx vue-cli-service inspect 來查看目前 webpack config 設置
```
npx vue-cli-service inspect --rule ts
```

* @vue/cli-plugin-unit-mocha 底層是使用 [mochapack](https://github.com/sysgears/mochapack)
  
* ts 的檔案過 ts-loader 時, options complierOptions.sourceMap 一定要是 true, 否則產生的覆蓋率報表, 查看未覆蓋的 code 時會有誤差
  
* ts-loader 設置中, 若要對 ts 撰寫的 SFC (.vue) 編譯 , options 要加上 
```javascript
options: {
  appendTsSuffixTo: [ '\\.vue$'],
}
```

* vue-cli vue.config.js ts-loader options 預設設置為
```
options: {
  transpileOnly: true,
  appendTsSuffixTo: [
    '\\.vue$'
  ],
  happyPackMode: false
}
```

## 文章
在查找資料閱讀了很多 issue 與 文章, 這邊分享些還不錯的
* https://testerhome.com/topics/24122


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
