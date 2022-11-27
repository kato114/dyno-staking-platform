import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    7363: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  }

  it(`get address for mainnet (chainId 7363)`, () => {
    const expected = address[7363]
    expect(getAddress(address, 7363)).toEqual(expected)
  })
})
