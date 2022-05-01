const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  chainWebpack: config => {
    // issue: 使用測試覆蓋率時需要 devtool 設置 'eval'
    // 否則 .vue 檔案覆蓋率的 html 會錯誤
    // 相關討論串: https://github.com/istanbuljs/nyc/issues/718

    config.devtool('eval')
  }
})
