import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    7363: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    7364: '0xFa60D973F7642B748046464e165A65B7323b0DEE',
  }

  it(`get address for mainnet (chainId 7363)`, () => {
    const expected = address[7363]
    expect(getAddress(address, 7363)).toEqual(expected)
  })
  it(`get address for testnet (chainId 7364)`, () => {
    const expected = address[7364]
    expect(getAddress(address, 7364)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    const expected = address[7363]
    expect(getAddress(address, 31337)).toEqual(expected)
  })
})
