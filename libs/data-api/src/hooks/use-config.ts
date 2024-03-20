'use client';

import { useContext } from 'react';
import { AppConfig, ConfigProviderContext } from '../providers/config-provider';

export function useConfig(): AppConfig {
  const config = useContext(ConfigProviderContext);

  if (!config) {
    throw new Error('useConfig must call from inside of ConfigProvider');
  }

  return config;
}
