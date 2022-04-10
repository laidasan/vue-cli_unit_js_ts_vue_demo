const defaultExclude = require('@istanbuljs/schema/default-exclude')
const defaultExtension = require('@istanbuljs/schema/default-extension')

module.exports = {
  cache: false,
  sourceMap: false,
  instrument: false,

  // 不論 exclude 是否包含 node_modules , 預設都會忽略 node_modules
  // https://github.com/istanbuljs/nyc#using-include-and-exclude-arrays
  extension: [
    ...defaultExtension,
    '.vue'
  ],
  exclude: [
    ...defaultExclude,
    'vue.config.js',
    '**/*.spec.{ts,js}'
  ]
}
