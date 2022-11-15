import { dynoTestnetTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '@pancakeswap/farms'

const farms: SerializedFarmConfig[] = [
  {
    pid: 0,
    vaultPid: 1,
    lpSymbol: 'DND-TRU LP',
    lpAddress: '0xc6292Ebb50Af78D7fE87414c491A3bCdC12023F4',
    quoteToken: dynoTestnetTokens.wdnd,
    token: dynoTestnetTokens.tru,
  },
  {
    pid: 1,
    vaultPid: 2,
    lpSymbol: 'DND-DUSD LP',
    lpAddress: '0xB37690BD5811A1C924cd1cAff6dA980DcC3dbE85',
    quoteToken: dynoTestnetTokens.wdnd,
    token: dynoTestnetTokens.dusd,
  },
  {
    pid: 2,
    vaultPid: 3,
    lpSymbol: 'WDND - Single Token',
    lpAddress: '0xB2cD91b79df296ea181AA5f6d729E5136e1853A4',
    quoteToken: dynoTestnetTokens.wdnd,
    token: dynoTestnetTokens.wdnd,
  },
  {
    pid: 3,
    vaultPid: 4,
    lpSymbol: 'WDND - Single Token',
    lpAddress: '0xB2cD91b79df296ea181AA5f6d729E5136e1853A4',
    quoteToken: dynoTestnetTokens.wdnd,
    token: dynoTestnetTokens.wdnd,
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
