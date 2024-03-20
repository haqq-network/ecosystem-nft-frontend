'use client';

import { useState } from 'react';
import { Header } from '@haqq-nft/ui-kit';
import { Web3ConnectionBtns } from '@haqq-nft/web3-connections';

export function SharedHeader() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Header
      mobileButtonSlot={
        <Web3ConnectionBtns setMobileMenuOpen={setMobileMenuOpen} />
      }
      isMobileMenuOpen={isMobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    >
      <Web3ConnectionBtns
        className="hidden lg:block"
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </Header>
  );
}
