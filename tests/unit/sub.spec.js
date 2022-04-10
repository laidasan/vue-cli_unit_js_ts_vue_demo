import { sub } from '../../src/base/tool/sub.js'
import { expect } from 'chai'

describe('calc test', function () {
  it('sub_2_sub_1_should_1', function () {
    expect(sub(2, 1)).to.equal(1)
  })
})
