import { ChainId } from '@pancakeswap/sdk'
import FarmsDynoMainnetPriceHelper from './7363'
import FarmsDynoTestnetPriceHelper from './7364'

export const getFarmsPriceHelperLpFiles = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.DYNO:
      return FarmsDynoMainnetPriceHelper
    default:
      return []
  }
}
