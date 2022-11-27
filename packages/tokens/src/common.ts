import { ChainId, Token } from '@pancakeswap/sdk'

export const USDT_DYNO = new Token(
  ChainId.DYNO,
  '0xd90656e356ed222c8b70a84cfcd5f9b2c6218ce0',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const DUSD_DYNO = new Token(
  ChainId.DYNO,
  '0x78baf24928fc4cf9b77ffe2902910e58c67578b4',
  18,
  'DUSD',
  'Dyno USD',
  'https://dynochain.io/',
)

export const USDT = {
  [ChainId.DYNO]: USDT_DYNO,
}

export const DUSD = {
  [ChainId.DYNO]: DUSD_DYNO,
}
