import { useCallback } from 'react'
import { stakeFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'

const useStakeFarms = (pid: number, account?: string) => {
  const dynoStakingContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      return stakeFarm(dynoStakingContract, pid, amount, account)
    },
    [dynoStakingContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
