import clsx from 'clsx';
import { HaqqButton } from '@haqq-nft/ui-kit';
import { Web3ConnectionBtns } from '@haqq-nft/web3-connections';

export function BurgerMenu({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  return (
    <div
      className={clsx(
        'bg-haqq-black z-50 h-full px-[20px] py-[32px] sm:py-[40px] sm:pl-[40px] sm:pr-[64px]',
        'border-haqq-border overflow-y-auto sm:border-l',
        className,
      )}
    >
      <div className="mb-[60px] flex flex-col items-start space-y-[16px] sm:mb-[80px]">
        <Web3ConnectionBtns />
        <HaqqButton variant={2}>Add token in wallet</HaqqButton>
      </div>
    </div>
  );
}
