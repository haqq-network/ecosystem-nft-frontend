'use client';

import { useCallback } from 'react';
import { useConfig } from '@haqq-nft/data-api';
import { useTxResolver } from '@haqq-nft/types';
import abi from '../abi/ecosystem-mint-abi.json';

export function useMintAction() {
  const { walletAction, isConfirmed, isConfirming, isPending } =
    useTxResolver();

  const { mintAddress } = useConfig();

  const action = useCallback(
    async (amountRequested: number, value: bigint) => {
      return await walletAction({
        address: mintAddress,
        abi,
        functionName: 'mint',
        args: [BigInt(amountRequested)],
        value: value,
      });
    },
    [walletAction, mintAddress],
  );

  return { action, isPending, isConfirming, isConfirmed };
}
