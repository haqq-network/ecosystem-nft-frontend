'use client';

import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { Chain, haqqMainnet } from '@wagmi/chains';
import { createConfig, CreateConnectorFn, http, WagmiProvider } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';
import { ReactQueryProvider } from './react-query-provider';

export const haqqLocalnet: Chain = {
  id: 121799,
  name: 'HAQQ Localnet',
  network: 'haqq-localnet-1',
  nativeCurrency: {
    decimals: 18,
    name: 'Islamic Coin',
    symbol: 'ISLMT',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
  testnet: true,
};

export const SUPPORTED_CHAINS = [haqqMainnet, haqqLocalnet];
const SupportedChainsContext = createContext<Chain[]>(SUPPORTED_CHAINS);

export const isAllowedChain = (chainId: number) => {
  return SUPPORTED_CHAINS.some((x) => {
    return x.id === chainId;
  });
};

export function useSupportedChains() {
  const supportedChains = useContext(SupportedChainsContext);

  if (!supportedChains) {
    throw new Error(
      'useSupportedChains should be used only from child of SupportedChainsContext',
    );
  }

  return supportedChains;
}

export function Web3Provider({
  children,
  withDevtools = false,
  walletConnectProjectId,
}: PropsWithChildren<{
  withDevtools?: boolean;
  walletConnectProjectId?: string;
}>) {
  const connectors: CreateConnectorFn[] = useMemo(() => {
    const connectors = [];

    if (walletConnectProjectId) {
      connectors.push(
        walletConnect({
          projectId: walletConnectProjectId,
          showQrModal: true,
        }),
      );
    }

    return connectors;
  }, [walletConnectProjectId]);

  const config = useMemo(() => {
    return createConfig({
      chains: [haqqMainnet, haqqLocalnet],
      transports: {
        [haqqMainnet.id]: http(),
        [haqqLocalnet.id]: http(),
      },
      connectors,
    });
  }, [connectors]);

  return (
    <ReactQueryProvider withDevtools={withDevtools}>
      <SupportedChainsContext.Provider value={SUPPORTED_CHAINS}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </SupportedChainsContext.Provider>
    </ReactQueryProvider>
  );
}
