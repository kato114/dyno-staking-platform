import { ChainId, Token, WDND } from '@pancakeswap/sdk'
import { DUSD, USDT } from '@pancakeswap/tokens'

export const dynoTokens = {
  wdnd: WDND[ChainId.DYNO],
  usdt: USDT[ChainId.DYNO],
  dusd: DUSD[ChainId.DYNO],
}
