const fs = require('fs')
const path = require('path')
const NYC = require('nyc')

const isVueTsSFC = (filePath) => filePath.endsWith('.vue.ts')
const isVueTsSFCCoverage = (coverage) => {
  const inputSourceMap = coverage.inputSourceMap
  return inputSourceMap != null && isVueTsSFC(inputSourceMap.file)
}

const originWriteCoverageFile = NYC.prototype.writeCoverageFile

/**
 * @function
 * @description
 * @override NYC.writeCoverageFile
 * 此段在修復 ts 撰寫的 .vue 檔案無法包含在覆蓋率報表的問題, 但實際上覆蓋率有計算出
 * 產出覆蓋率報表的流程是
 * babel-plugin-istanbul -> 計算出覆蓋率 -> nyc.writeCoverageFile , 將覆蓋率寫入 .nyc_output
 * -> nyc.report , 讀取 .nyc_output/*.json 的檔案 (非 processInfo 底下) 並產出覆蓋率報表
 * 而 ts 檔案多經過 ts-loader (sourceMap: true), 計算覆蓋率時會產生 inputSourceMap 屬性 , 覆蓋率報表會依此計算
 */
NYC.prototype.writeCoverageFile = function writeCoverageFile () {
  originWriteCoverageFile.call(this)

  const globalCoverages = global.__coverage__ || {}
  const coverages = Object.keys(globalCoverages)
    .filter(absFilePath => isVueTsSFCCoverage(globalCoverages[absFilePath]))
    .reduce((globalCoverages, absFilePath) => {
      const coverage = globalCoverages[absFilePath]
      return {
        ...globalCoverages,
        [absFilePath]: {
          ...coverage,
          inputSourceMap: {
            ...coverage.inputSourceMap,
            sources: [coverage.path] // 覆蓋掉  inputSourceMap.sources , 讓檔案位置正確
          }
        }
      }
    }, globalCoverages)
  const id = this.processInfo.uuid
  const coverageFilename = path.resolve(this.tempDirectory(), `${id}.json`)

  fs.writeFileSync(
    coverageFilename,
    JSON.stringify(coverages),
    'utf-8'
  )

  this.processInfo.coverageFilename = coverageFilename
  this.processInfo.files = Object.keys(coverages)
  this.processInfo.saveSync()
}
