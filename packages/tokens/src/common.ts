import { ChainId, Token } from '@pancakeswap/sdk'

export const USDT_DYNO = new Token(
  ChainId.DYNO,
  '0xd90656E356eD222c8B70a84cFCd5F9b2C6218CE0',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const DUSD_DYNO = new Token(
  ChainId.DYNO,
  '0xBE3735517eB0C286E581A54f802D1218cFE781fD',
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
