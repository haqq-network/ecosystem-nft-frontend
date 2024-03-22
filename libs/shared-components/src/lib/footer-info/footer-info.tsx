'use client';

import { useChainId, useBalance } from 'wagmi';
import { useConfig } from '@haqq-nft/data-api';
import { Footer } from '@haqq-nft/ui-kit';
import { useTotalSupply, useIslmEstimated } from '@haqq-nft/web3-connections';

export const FooterInfo = () => {
  const { value: totalSupply, loading } = useTotalSupply();

  const { value: price, loading: loadingPrice } = useIslmEstimated(1);

  const { mintAddress } = useConfig();

  const chainId = useChainId();

  const { data: balanceData } = useBalance({
    address: mintAddress,
    chainId: chainId,
  });

  return (
    <Footer
      loading={loading || loadingPrice}
      price={price}
      totalSupply={totalSupply}
      balance={balanceData?.value}
    />
  );
};
