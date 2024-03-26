'use client';

import { useContext } from 'react';
import { haqqMainnet } from 'viem/chains';
import { useChainId } from 'wagmi';
import { AppConfig, ConfigProviderContext } from '../providers/config-provider';

const TESTNET_URL = 'https://ecosystem-rates.testedge2.haqq.network/api';
const MAINNET_URL = 'https://ecosystem-rates.haqq.network/api';

export const useApiUrl = () => {
  const chainId = useChainId();
  const url = chainId === haqqMainnet.id ? MAINNET_URL : TESTNET_URL;

  return url;
};

export function useConfig(): AppConfig {
  const config = useContext(ConfigProviderContext);

  if (!config) {
    throw new Error('useConfig must call from inside of ConfigProvider');
  }

  return config;
}
