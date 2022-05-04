const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  chainWebpack: config => {
    // issue: 使用測試覆蓋率時需要 devtool 設置 'eval'
    // 否則 .vue 檔案覆蓋率的 html 會錯誤
    // 相關討論串: https://github.com/istanbuljs/nyc/issues/718
    config.devtool('eval')

    /**
     * @doc fort-ts-checker  github 位置：https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
     * @doc tsconfig.json 文檔位置：https://www.typescriptlang.org/tsconfig
     * @description
     * 為了優化速度,  vue-cli 會將 ts-loader 的 transpileOnly 設為 true , 所以只會轉意不會檢查
     * 檢查使用 fort-ts-checker plugin 來達成, 所以要 override tsconfig.json 要在這裡
     * 如果執行覆蓋率計算時需要不 ts 檢查，可直接把此 plugin 移除, config.plugins.delete('fork-ts-checker')
     */
    config.plugins.delete('fork-ts-checker')
    // config.plugin('fork-ts-checker')
    //   .tap(options => {
    //     options[0].typescript.configOverwrite = {
    //       compilerOptions: {
    //         strict: false
    //       }
    //     }

    //     return options
    //   })

    /**
     * @description
     * 有些情況你會使用 eslint-loader , 例如使用 @vue/cli-plugin-eslint 時, 預設會在 所有 loader 前先使用
     * 只要是有過會異動 code 的 loader , 在經過 ts-loader 編譯後,  inputMap.sources 中的 路徑就會改變
     * 會導致計算覆蓋率的時候, 會被 nyc 過濾掉, 所以移除 eslint-loader
     */
    config.module.rules.delete('eslint')

    /**
     * @description
     * 移除 cache-loader , 確保每次編譯都使用當下編譯的內容
     * cache-loader 作用是會編譯後的內容放置在 node_modules/.cache/loader-cache (json 格式)
     * 如果檔案沒有異動, cache-loader 就有可能會使用上次編譯的結果來使用
     */
    config.module.rule('js').uses.delete('cache-loader')
    config.module.rule('ts').uses.delete('cache-loader')
    config.module.rule('tsx').uses.delete('cache-loader')
    config.module.rule('vue').uses.delete('cache-loader')
  }
})
