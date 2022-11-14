import { expect } from 'chai'
import { compile } from '../lib/index.js'

describe('Simple compilation', () => {
  it('Should encode the string to base64', () => {
    const out = compile('{test -> b64}', { test: 'Hello World!' })
    expect(out).to.be.eq('SGVsbG8gV29ybGQh')
  })
  it('Should encode the object to base64', () => {
    const out = compile('{b64 <- test -> json}', { test: [1, 2, 3] })
    expect(out).to.be.eq('WzEsMiwzXQ==')
  })
  it('Should compile a simple template', () => {
    const template = '{root}/{json <- man >>= (| "borgar": man |)}'
    const values = { root: 'yes', man: [{ man: 'MAN' }, { man: 'Watson' }] }
    const out = compile(template, values)
    expect(out).to.be.eq('yes/[{"borgar":"MAN"},{"borgar":"Watson"}]')
  })
  it('Should chain expression results', () => {
    const values = {
      plusOne (n) {
        return n + 1
      },
      timesTwo (n) {
        return n * 2
      }
    }
    const out = compile('{1 -> plusOne -> timesTwo}', values)
    expect(out).to.be.eq('4')
  })
})
