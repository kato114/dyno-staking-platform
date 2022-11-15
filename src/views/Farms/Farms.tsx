import { createContext, useCallback, useState, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Heading, Text, Button, Flex, Box, useModal, Spinner } from '@pancakeswap/uikit'
import styled from 'styled-components'
import Page from 'components/Layout/Page'
import { useFarms, usePollFarmsWithUserData, useDusdDNDPrice } from 'state/farms/hooks'
import { DeserializedFarm } from 'state/types'
import { useTranslation } from '@pancakeswap/localization'
import { getFarmApr } from 'utils/apr'
import Table from './components/FarmTable/FarmTable'
import NFTCard from './components/NFTCard/NFTCard'
import { FarmWithStakedValue } from './components/types'
import SwapModal from './components/SwapModal'
import Footer from '../Footer'

const FarmFlexWrapper = styled(Flex)`
  flex-direction: column;
  border: 1px solid rgb(1, 36, 32);
  border-radius: 16px;
  background-color: rgb(1, 36, 32);
  margin-top: 40px;
  padding: 30px 30px;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-wrap: nowrap;
  }
`
const Farms: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const { chainId, account } = useActiveWeb3React()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const dndPrice = useDusdDNDPrice()

  //useCakeVaultUserData()
  usePollFarmsWithUserData()

  const userDataReady = !account || (!!account && userDataLoaded)

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTokenPrice).times(farm.stakedAmount).div(10 ** 18)

        const { rewardsApr, rewardsApy } = getFarmApr(dndPrice, totalLiquidity, farm.rewardPerBlock)
        return { ...farm, apr: rewardsApr, rewardsApy, liquidity: totalLiquidity }
      })

      return farmsToDisplayWithAPR
    },
    [chainId, dndPrice],
  )

  const chosenFarms = useMemo(() => {
    let chosenFs = farmsList(farmsLP)

    return chosenFs
  }, [farmsList])

  const nftCardData = [
    {
      id: 1,
      cardImage: '/images/nfts/nft_1.jpg',
      cardName: 'Dyno NFT',
    },
    {
      id: 2,
      cardImage: '/images/nfts/nft_2.jpg',
      cardName: 'Dyno NFT',
    },
    {
      id: 3,
      cardImage: '/images/nfts/nft_3.jpg',
      cardName: 'Dyno NFT',
    },
  ]

  const [onPresentSwap] = useModal(<SwapModal />)

  return (
    <FarmsContext.Provider value={chosenFarms}>
      <Page>
        <FarmFlexWrapper>
          <Flex
            flexDirection={['column', 'column', 'column', 'row']}
            justifyContent={'space-between'}
            alignItems="center"
          >
            <Box>
              <Heading scale="xl">Yield Farming</Heading>
              <Text m="10px 5px">Stake tokens and earn DND.</Text>
            </Box>
            <Flex
              flexDirection={['column', 'column', 'row', 'row']}
              justifyContent={'space-between'}
              alignItems="center"
              style={{ gap: '10px' }}
            >
              <Button minWidth="150px" width="100%" onClick={onPresentSwap}>
                Buy WDND
              </Button>
            </Flex>
          </Flex>
          <Table farms={chosenFarms} cakePrice={dndPrice} userDataReady={userDataReady} />
          {account && !userDataLoaded && (
            <Flex justifyContent="center">
              <Spinner size={64} />
            </Flex>
          )}
        </FarmFlexWrapper>
        <FarmFlexWrapper>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Heading scale="xl">Mint & Farm Dyno NFTs</Heading>
              <Text m="10px 5px">Earn DND at high APYs by minting and farming official Dyno NFTs.</Text>
            </Box>
          </Flex>
          <Flex
            flexDirection={['column', 'column', 'row', 'row']}
            justifyContent="space-between"
            alignItems="center"
            mt="20px"
            style={{ gap: '15px' }}
          >
            {nftCardData.map((item) => (
              <NFTCard key={item.id} id={item.id} cardImage={item.cardImage} cardName={item.cardName} />
            ))}
          </Flex>
        </FarmFlexWrapper>
      </Page>
      <Footer />
    </FarmsContext.Provider>
  )
}

export const FarmsContext = createContext({})

export default Farms
