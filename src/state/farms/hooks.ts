import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { FAST_INTERVAL } from 'config/constants'
import { useCakeBusdPrice, useDNDDusdPrice } from 'hooks/useBUSDPrice'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import useSWRImmutable from 'swr/immutable'
import { BIG_ZERO } from 'utils/bigNumber'
import { getMasterchefContract } from 'utils/contractHelpers'
import { useFastRefreshEffect } from 'hooks/useRefreshEffect'
import { featureFarmApiAtom, useFeatureFlag } from 'hooks/useFeatureFlag'
import { ChainId } from '@pancakeswap/sdk'
import { getFarmConfig } from '@pancakeswap/farms/constants'
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync, fetchInitialFarmsData } from '.'
import { DeserializedFarm, DeserializedFarmsState, DeserializedFarmUserData, State } from '../types'
import {
  farmFromLpSymbolSelector,
  farmSelector,
  makeBusdPriceFromPidSelector,
  makeFarmFromPidSelector,
  makeLpTokenPriceFromLpSymbolSelector,
  makeUserFarmFromPidSelector,
} from './selectors'

export function useFarmsLength() {
  const { chainId } = useActiveWeb3React()
  return useSWRImmutable(chainId ? ['farmsLength', chainId] : null, async () => {
    const mc = getMasterchefContract(undefined, chainId)
    return (await mc.poolLength()).toNumber()
  })
}

export const usePollFarmsWithUserData = () => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useActiveWeb3React()
  const farmFlag = useFeatureFlag(featureFarmApiAtom)

  const { data: farmDataInitialized } = useSWRImmutable(
    chainId ? ['initialPublicFarmData', chainId] : null,
    async () => {
      await dispatch(fetchInitialFarmsData({ chainId }))
      return true
    },
  )

  useSWRImmutable(
    chainId && farmDataInitialized ? ['publicFarmData', chainId] : null,
    async () => {
      const farmsConfig = await getFarmConfig(chainId)
      const pids = farmsConfig.map((farmToFetch) => farmToFetch.pid)

      dispatch(fetchFarmsPublicDataAsync({ pids, chainId, flag: farmFlag }))
    },
    {
      refreshInterval: farmFlag === 'api' ? 50 * 1000 : FAST_INTERVAL,
    },
  )

  const name = ['farmsWithUserData', account, chainId]
  useSWRImmutable(
    account && chainId && farmDataInitialized ? name : null,
    async () => {
      const farmsConfig = await getFarmConfig(chainId)
      const pids = farmsConfig.map((farmToFetch) => farmToFetch.pid)
      const params = { account, pids, chainId }

      dispatch(fetchFarmUserDataAsync(params))
    },
    {
      refreshInterval: FAST_INTERVAL,
    },
  )
}

/**
 * Fetches the "core" farm data used globally
 * 2 = CAKE-BNB LP
 * 3 = BUSD-BNB LP
 */
const coreFarmPIDs = {
  7363: [0, 1, 2, 3, 4, 5, 6, 7],
}

export const usePollCoreFarmData = () => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()
  const farmFlag = useFeatureFlag(featureFarmApiAtom)

  useEffect(() => {
    if (chainId) {
      dispatch(fetchInitialFarmsData({ chainId }))
    }
  }, [chainId, dispatch])

  useFastRefreshEffect(() => {
    if (chainId && farmFlag !== 'api') {
      dispatch(fetchFarmsPublicDataAsync({ pids: coreFarmPIDs[chainId], chainId, flag: farmFlag }))
    }
  }, [dispatch, chainId, farmFlag])
}

export const useFarms = (): DeserializedFarmsState => {
  const { chainId } = useActiveWeb3React()
  return useSelector(useMemo(() => farmSelector(chainId), [chainId]))
}

export const useFarmsPoolLength = (): number => {
  return useSelector((state: State) => state.farms.poolLength)
}

export const useFarmFromPid = (pid: number): DeserializedFarm => {
  const farmFromPid = useMemo(() => makeFarmFromPidSelector(pid), [pid])
  return useSelector(farmFromPid)
}

export const useFarmFromLpSymbol = (lpSymbol: string): DeserializedFarm => {
  const farmFromLpSymbol = useMemo(() => farmFromLpSymbolSelector(lpSymbol), [lpSymbol])
  return useSelector(farmFromLpSymbol)
}

export const useFarmUser = (pid): DeserializedFarmUserData => {
  const farmFromPidUser = useMemo(() => makeUserFarmFromPidSelector(pid), [pid])
  return useSelector(farmFromPidUser)
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const busdPriceFromPid = useMemo(() => makeBusdPriceFromPidSelector(pid), [pid])
  return useSelector(busdPriceFromPid)
}

export const useLpTokenPrice = (symbol: string) => {
  const lpTokenPriceFromLpSymbol = useMemo(() => makeLpTokenPriceFromLpSymbolSelector(symbol), [symbol])
  return useSelector(lpTokenPriceFromLpSymbol)
}

/**
 * @deprecated use the BUSD hook in /hooks
 */
export const usePriceCakeBusd = ({ forceMainnet } = { forceMainnet: false }): BigNumber => {
  const price = useCakeBusdPrice()
  return useMemo(() => (price ? new BigNumber(price.toSignificant(6)) : BIG_ZERO), [price])
}
/**
 * @deprecated use the BUSD hook in /hooks
 */
export const useDusdDNDPrice = ({ forceMainnet } = { forceMainnet: false }): BigNumber => {
  const price = useDNDDusdPrice({ forceMainnet })
  return useMemo(() => (price ? new BigNumber(price.toSignificant(6)) : BIG_ZERO), [price])
}
