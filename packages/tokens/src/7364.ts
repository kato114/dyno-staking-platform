import { ChainId, Token, WDND } from '@pancakeswap/sdk'
import { DUSD, USDT } from '@pancakeswap/tokens'

export const dynoTestnetTokens = {
  wdnd: WDND[ChainId.DYNO],
  usdt: USDT[ChainId.DYNO],
  dusd: DUSD[ChainId.DYNO],
  tru: new Token(
    ChainId.DYNO,
    '0x82572A0b69D2e22e096C8383914C3848adBE70A7',
    18,
    'TRU',
    'TruiumSwap Token',
    'https://www.truiumswap.finance/',
  ),
}
