'use client';

import { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import { useBalance, useChainId, useConnect as useWagmiConnect } from 'wagmi';
import { useAuth } from '@haqq-nft/data-api';
import { Button, LogoutIcon, WrongNetworkModal } from '@haqq-nft/ui-kit';
import { formatNumber, shortenString } from '@haqq-nft/utils';
import { useCurrentAddress } from '../../hooks/useAddress';
import { useWallet } from '../../providers';

export const Web3ConnectionBtns = ({
  className = '',
  setMobileMenuOpen,
}: {
  className?: string;
  setMobileMenuOpen: (isOpen: boolean) => void;
}) => {
  const { openSelectWallet } = useWallet();

  const { connectAsync, connectors } = useWagmiConnect();

  const handleEvmConnect = useCallback(async () => {
    if (window.ethereum) {
      openSelectWallet();
    } else {
      connectors[0] && (await connectAsync({ connector: connectors[0] }));
    }
  }, [openSelectWallet, connectors, connectAsync]);

  const { ethAddress: targetAddress } = useCurrentAddress();

  if (connectors.length === 0) {
    return null;
  }

  return !targetAddress ? (
    <div className={clsx('flex flex-row gap-[16px]', className)}>
      <Button
        onClick={handleEvmConnect}
        variant="green"
        className="min-w-[170px] uppercase"
      >
        Connect wallet
      </Button>
    </div>
  ) : (
    <Web2LoginBlock
      className={className}
      setMobileMenuOpen={setMobileMenuOpen}
    />
  );
};

const Web2LoginBlock = ({
  className,
  setMobileMenuOpen,
}: {
  className: string;
  setMobileMenuOpen: (isOpen: boolean) => void;
}) => {
  const { ethAddress: targetAddress } = useCurrentAddress();

  const {
    disconnect: disconnectEvm,
    isNetworkSupported,
    selectNetwork,
  } = useWallet();

  const { signOut } = useAuth();

  const chainId = useChainId();

  const { data: balanceData } = useBalance({
    address: targetAddress,
    chainId: chainId,
  });

  const balance = useMemo(() => {
    if (!balanceData) {
      return undefined;
    }

    return {
      symbol: balanceData.symbol,
      value: formatNumber(Number.parseFloat(balanceData.formatted)),
    };
  }, [balanceData]);

  const isTablet = useMediaQuery({
    query: `(max-width: 1023px)`,
  });

  const onChangeNetwork = useCallback(() => {
    return selectNetwork();
  }, [selectNetwork]);

  return (
    <div className={clsx('flex flex-row items-center', className)}>
      {!isTablet ? (
        <div className="flex flex-row">
          <div className="border-default-green text-default-green mr-[-8px] rounded-l-[10px] border border-r-0 py-[12px] pl-[12px] pr-[20px] text-[14px] font-[800] leading-[14px]">
            {balance?.value} {balance?.symbol}
          </div>

          <Button
            variant="green"
            className="inline-flex flex-row items-center gap-[2px] !px-[12px] !pl-[16px] !pr-[8px] uppercase"
            onClick={disconnectEvm}
          >
            <LogoutIcon /> Disconnect
          </Button>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="border-default-green text-default-green mr-[-8px] whitespace-nowrap rounded-l-[10px] border border-r-0 py-[12px] pl-[12px] pr-[20px] text-[14px] font-[800] leading-[14px]">
              {balance?.value} {balance?.symbol}
            </div>

            <Button variant="green" className="!px-[12px] uppercase">
              <span>{shortenString(targetAddress, 3)}</span>
            </Button>
          </div>

          <div className="mt-[12px] flex flex-col">
            <div
              onClick={() => {
                disconnectEvm();
                signOut();
              }}
              className={clsx(
                'inline-flex w-[100%] cursor-pointer flex-row items-center gap-[10px] py-[8px] text-[18px] font-[600] leading-[26px]',
                'hover:text-white/50',
                'transition-colors duration-150 ease-in-out',
              )}
            >
              <LogoutIcon className="h-[20px] w-[20px]" /> Disconnect
            </div>
          </div>
        </div>
      )}

      <WrongNetworkModal
        onDisconnect={disconnectEvm}
        onChangeNetwork={onChangeNetwork}
        isOpen={!isNetworkSupported && !!targetAddress}
      />
    </div>
  );
};
