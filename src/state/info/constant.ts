import { infoClient, infoClientETH, infoStableSwapClient } from 'utils/graphql'
import { INFO_CLIENT, INFO_CLIENT_ETH, BLOCKS_CLIENT, BLOCKS_CLIENT_ETH } from 'config/constants/endpoints'
import { ChainId } from '@pancakeswap/sdk'
import { PCS_V2_START, PCS_ETH_START, ETH_TOKEN_BLACKLIST, TOKEN_BLACKLIST } from 'config/constants/info'

export type MultiChainName = 'DYNO'

export const multiChainQueryMainToken = {
  DYNO: 'DYNO',
}

export const multiChainBlocksClient = {
  DYNO: BLOCKS_CLIENT,
}

export const multiChainStartTime = {
  DYNO: PCS_V2_START,
}

export const multiChainId = {
  DYNO: ChainId.DYNO,
}

export const multiChainPaths = {
  [ChainId.DYNO]: '',
}

export const multiChainQueryClient = {
  DYNO: infoClient,
}

export const multiChainQueryEndPoint = {
  DYNO: INFO_CLIENT,
}

export const multiChainScan = {
  DYNO: 'BscScan',
}

export const multiChainTokenBlackList = {
  DYNO: TOKEN_BLACKLIST,
}

export const getMultiChainQueryEndPointWithStableSwap = (chainName: MultiChainName) => {
  const isStableSwap = checkIsStableSwap()
  if (isStableSwap) return infoStableSwapClient
  return multiChainQueryClient[chainName]
}

export const checkIsStableSwap = () => window.location.href.includes('stableSwap')
