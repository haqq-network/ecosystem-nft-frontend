import { ReactNode } from 'react';
import { Metadata } from 'next';
import './global.scss';
import { AuthProvider, ConfigProvider } from '@haqq-nft/data-api';
import { FooterInfo, SharedHeader } from '@haqq-nft/shared-components';
import { HaqqButton, Page } from '@haqq-nft/ui-kit';
import {
  SelectWalletModalWrapper,
  WalletProvider,
  Web3ConnectionBtns,
  Web3Provider,
} from '@haqq-nft/web3-connections';

export const metadata: Metadata = {
  title: 'Ecosystem NFT',
  description: 'Mint your first HAQQ NFT today!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="body_over">
        <ConfigProvider>
          <Web3ProviderWrapper>
            <AuthProvider>
              <WalletProvider>
                <SelectWalletModalWrapper>
                  <Page
                    header={
                      <SharedHeader>
                        <Web3ConnectionBtns />
                      </SharedHeader>
                    }
                    footer={<FooterInfo />}
                  >
                    {children}
                  </Page>
                </SelectWalletModalWrapper>
              </WalletProvider>
            </AuthProvider>
          </Web3ProviderWrapper>
        </ConfigProvider>
      </body>
    </html>
  );
}

const WALLET_CONNECT_PROJECT_ID = '5cb33e12aa319209d1f9bd1af4b8a4b0';

const Web3ProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Web3Provider
      walletConnectProjectId={WALLET_CONNECT_PROJECT_ID}
      withDevtools={process.env['NODE_ENV'] !== 'production'}
    >
      {children}
    </Web3Provider>
  );
};
