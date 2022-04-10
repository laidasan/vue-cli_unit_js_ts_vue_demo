const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  chainWebpack: config => {
    // issue: 使用測試覆蓋率時需要 devtool 設置 'eval'
    // 相關討論串: https://github.com/istanbuljs/nyc/issues/718
    config.devtool('eval')

    // esModules: true 為了可以使用 esModule 規範的 import export, 否則測試的環境是在 nodeJs 環境底下
    // 為 CommonJs 規範的 require , module.export
    // 設定 esModules: true 後可以讓 istanbul-instrumenter-loader 不必經過 babel-loader 後才使用

    // before('babel-loader') 順序上會讓 istanbul-instrumenter-loader 排在 babel-loader 之後 ,
    // 從陣列來看是 [istanbul-instrumenter-loader , babel-loader] , webpack loader 的執行順序是 「 從下到上, 從右到左 」
    // 也就是 babel-loader 執行後才會執行 istanbul-instrumenter-loader
    // 在這裡雖然有 "esModules: true" 了 , 可以不使用, 但是經過測試, 會需要 babel-loader , 否則 '.vue' 檔案無法計算出測試覆蓋率報表

    // nyc 設置相關討論串: https://github.com/vuejs/vue-cli/issues/1363
    config.module.rule('ts')
      .use('istanbul-instrumenter-loader')
      .loader('istanbul-instrumenter-loader')
      .options({ esModules: true })
      .before('babel-loader')
      .end()

    config.module.rule('js')
      .use('istanbul-instrumenter-loader')
      .loader('istanbul-instrumenter-loader')
      .options({ esModules: true })
      .before('babel-loader')
      .end()
  }
})
