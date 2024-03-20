'use client';

import { createContext, ReactNode } from 'react';

export interface AppConfig {
  apiUrl?: string;
}

const config = {};

export const ConfigProviderContext = createContext<AppConfig | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProviderContext.Provider value={config}>
      {children}
    </ConfigProviderContext.Provider>
  );
}
