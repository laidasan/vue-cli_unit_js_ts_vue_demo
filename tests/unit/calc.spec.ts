import { add } from '../../src/base/tool/calc'
import { expect } from 'chai'

describe('calc test', function () {
  it('add_1_plus_2_should_3', function () {
    expect(add(1, 2)).to.equal(3)
  })
})
