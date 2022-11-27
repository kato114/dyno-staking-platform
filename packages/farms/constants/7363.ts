import { dynoTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '@pancakeswap/farms'

const farms: SerializedFarmConfig[] = [
  {
    pid: 0,
    vaultPid: 1,
    lpSymbol: 'DND-DUSD LP',
    lpAddress: '0x403e084c4A4314675c0f3FD5130523772bc8b3b5',
    quoteToken: dynoTokens.wdnd,
    token: dynoTokens.dusd,
  },
  {
    pid: 1,
    vaultPid: 2,
    lpSymbol: 'DND-DUSD LP',
    lpAddress: '0x403e084c4A4314675c0f3FD5130523772bc8b3b5',
    quoteToken: dynoTokens.wdnd,
    token: dynoTokens.dusd,
  },
  {
    pid: 2,
    vaultPid: 3,
    lpSymbol: 'DND-USDT LP',
    lpAddress: '0x48D03d4452AD45568E919b4625B7842e841D7006',
    quoteToken: dynoTokens.wdnd,
    token: dynoTokens.usdt,
  },
  {
    pid: 3,
    vaultPid: 4,
    lpSymbol: 'DND-USDT LP',
    lpAddress: '0x48D03d4452AD45568E919b4625B7842e841D7006',
    quoteToken: dynoTokens.wdnd,
    token: dynoTokens.usdt,
  },
  {
    pid: 4,
    vaultPid: 5,
    lpSymbol: 'WDND - Single Token',
    lpAddress: '0x18a01f49413ff142397b665213254729186d158f',
    quoteToken: dynoTokens.wdnd,
    token: dynoTokens.wdnd,
  },
  {
    pid: 5,
    vaultPid: 6,
    lpSymbol: 'WDND - Single Token',
    lpAddress: '0x18a01f49413ff142397b665213254729186d158f',
    quoteToken: dynoTokens.wdnd,
    token: dynoTokens.wdnd,
  },
  {
    pid: 6,
    vaultPid: 7,
    lpSymbol: 'WDND - Single Token',
    lpAddress: '0x18a01f49413ff142397b665213254729186d158f',
    quoteToken: dynoTokens.wdnd,
    token: dynoTokens.wdnd,
  },
  {
    pid: 7,
    vaultPid: 8,
    lpSymbol: 'WDND - Single Token',
    lpAddress: '0x18a01f49413ff142397b665213254729186d158f',
    quoteToken: dynoTokens.wdnd,
    token: dynoTokens.wdnd,
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
