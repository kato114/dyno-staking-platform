import { formatEther } from '@ethersproject/units'
import { MultiCallV2 } from '@pancakeswap/multicall'
import { ChainId } from '@pancakeswap/sdk'
import { masterChefAddresses } from './const'
import { FarmWithPrices, getFarmsPrices } from './farmPrices'
import { farmV2FetchFarms, FetchFarmsParams, fetchMasterChefV2Data, fetchDynoStakingData } from './fetchFarms'

const supportedChainId = [ChainId.DYNO]
export const bCakeSupportedChainId = [ChainId.DYNO]

export function createFarmFetcher(multicallv2: MultiCallV2) {
  const fetchFarms = async (
    params: {
      isTestnet: boolean
    } & Pick<FetchFarmsParams, 'chainId' | 'farms'>,
  ) => {
    const { isTestnet, farms, chainId } = params
    const masterChefAddress = masterChefAddresses[ChainId.DYNO]
    const { poolLength } = await fetchDynoStakingData({
      multicallv2,
      masterChefAddress,
    })

    const farmsWithPrice = await farmV2FetchFarms({
      multicallv2,
      masterChefAddress,
      isTestnet,
      chainId,
      farms: farms.filter((f) => !f.pid || poolLength.gt(f.pid)),
    })
    return {
      farmsWithPrice,
      poolLength: poolLength.toNumber(),
    }
  }
  return {
    fetchFarms,
    isChainSupported: (chainId: number) => supportedChainId.includes(chainId),
    supportedChainId,
    isTestnet: (chainId: number) => ![ChainId.DYNO].includes(chainId),
  }
}

export * from './apr'
export * from './farmsPriceHelpers'
export * from './types'
export type { FarmWithPrices }

export { getFarmsPrices }
