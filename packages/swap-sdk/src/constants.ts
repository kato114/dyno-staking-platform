import JSBI from 'jsbi'
import { Token } from './entities/token'

// exports for external consumption
export type BigintIsh = JSBI | number | string

export enum ChainId {
  DYNO = 7363,
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT,
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export const FACTORY_ADDRESS = '0xB2cD91b79df296ea181AA5f6d729E5136e1853A4'
export const FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.DYNO]: '0xB2cD91b79df296ea181AA5f6d729E5136e1853A4',
}
export const INIT_CODE_HASH = '0xb9d8a4cb1b1b40df96d32b6254d6766358613f5797700f374caf1e67fb8b1c54'
export const INIT_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.DYNO]: '0xb9d8a4cb1b1b40df96d32b6254d6766358613f5797700f374caf1e67fb8b1c54',
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _9975 = JSBI.BigInt(9975)
export const _10000 = JSBI.BigInt(10000)

export const MaxUint256 = JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256',
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
}

export const WDND = {
  [ChainId.DYNO]: new Token(
    ChainId.DYNO,
    '0x18A01F49413FF142397B665213254729186d158f',
    18,
    'WDND',
    'Wrapped DND',
    'https://www.dynochain.io'
  ),
}

export const WNATIVE: Record<number, Token> = {
  [ChainId.DYNO]: WDND[ChainId.DYNO],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.DYNO]: {
    name: 'Dyno Chain Native Token',
    symbol: 'DND',
    decimals: 18,
  },
}
