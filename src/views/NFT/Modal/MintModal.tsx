import { parseUnits } from '@ethersproject/units'
import { ChainId, WDND } from '@pancakeswap/sdk'
import { InjectedModalProps, useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useContract, useTokenContract } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import { useState } from 'react'
import ApproveAndConfirmStage from '../components/BuySellModals/shared/ApproveAndConfirmStage'
import ConfirmStage from '../components/BuySellModals/shared/ConfirmStage'
import styled from 'styled-components'

import { Modal } from '@pancakeswap/uikit'
import { NftContractInfo } from '../contractInfo/nftContractABI'
import { useNFTContract } from '../hook'

const StyledModal = styled(Modal)`
  & > div:last-child {
    padding: 0;
  }
`

interface MintModalProps extends InjectedModalProps {
  id: number
}

const MintModal: React.FC<React.PropsWithChildren<MintModalProps>> = ({ id, onDismiss }) => {
  const { toastSuccess } = useToast()
  const wDNDContract = useTokenContract(WDND[ChainId.DYNO].address, true)
  const [mintAmount, setMintAmount] = useState(1)
  const { theme } = useTheme()

  const { mintPrice, allowance } = useNFTContract({ id })

  const nftContract = useContract(NftContractInfo.address, NftContractInfo.abi, true)

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      return true
    },
    onApprove: () => {
      return wDNDContract.approve(NftContractInfo.address, parseUnits('2000000000', 18), { gasLimit: 500000 })
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        'Contract approved - you can now buy NFT with WDND!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    onConfirm: () => {
      return nftContract.mint(mintAmount, id, {
        gasLimit: 500000,
        value: parseUnits((mintPrice * mintAmount).toString(), 18),
      })
    },
    onSuccess: ({ receipt }) => {
      toastSuccess('Your NFT has been sent to your wallet', <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onDismiss()
    },
  })

  const goBack = () => {}

  return (
    <StyledModal title={'Mint NFT'} onDismiss={onDismiss} headerBackground={theme.colors.gradientCardHeader}>
      {allowance == 0 && (
        <ApproveAndConfirmStage
          variant="Mint"
          handleApprove={handleApprove}
          isApproved={isApproved}
          isApproving={isApproving}
          isConfirming={isConfirming}
          handleConfirm={handleConfirm}
          mintAmount={mintAmount}
          setMint={setMintAmount}
        />
      )}
      {allowance != 0 && (
        <ConfirmStage
          isConfirming={isConfirming}
          handleConfirm={handleConfirm}
          mintAmount={mintAmount}
          setMint={setMintAmount}
        />
      )}
    </StyledModal>
  )
}

export default MintModal
