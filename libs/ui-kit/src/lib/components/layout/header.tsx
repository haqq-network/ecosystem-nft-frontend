'use client';
import { Fragment, ReactNode, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import ScrollLock from 'react-scrolllock';
import logoImageData from '../../assets/logo.svg';
import { BurgerButton } from '../burger-button/burger-button';

export function Header({
  className,
  children,
  mobileButtonSlot,
  isMobileMenuOpen,
  setMobileMenuOpen,
}: {
  className?: string;
  children: ReactNode;
  mobileButtonSlot?: ReactNode;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
}) {
  const [distanceFromTopReached, setDistanceFromTopReached] = useState(false);

  const isTablet = useMediaQuery({
    query: `(max-width: 1023px)`,
  });

  const isMenusClosed = !isMobileMenuOpen;
  const isDarkHeader = distanceFromTopReached;

  useEffect(() => {
    const updateDistance = () => {
      if (document.body.scrollTop >= 460) {
        setDistanceFromTopReached(true);
      } else {
        setDistanceFromTopReached(false);
      }
    };
    const debouncedUpdateDistance = debounce(updateDistance, 70);
    debouncedUpdateDistance();
    document.body.addEventListener('scroll', debouncedUpdateDistance);

    return () => {
      document.body.removeEventListener('scroll', debouncedUpdateDistance);
    };
  }, []);

  useEffect(() => {
    if (!isTablet) {
      setMobileMenuOpen(false);
    }
  }, [isTablet, setMobileMenuOpen]);

  const handleCloseClick = useCallback(() => {
    setMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen, setMobileMenuOpen]);

  return (
    <header
      className={clsx(
        'relative h-[72px] px-[28px] py-[18px]',
        'bg-main-black h-[63px] w-full border-b border-t border-[#464647] sm:h-[72px]',
        'sticky top-0 z-50',
        isMobileMenuOpen || isDarkHeader
          ? '!bg-main-black'
          : 'bg-header-background',
        className,
      )}
      style={{
        backdropFilter: distanceFromTopReached ? 'unset' : 'blur(30px)',
        backgroundColor: distanceFromTopReached ? '#131313' : 'unset',
      }}
    >
      <div className="relative z-50 mx-auto flex h-full w-full flex-row items-center pr-[16px] sm:pr-[64px] lg:pr-[80px]">
        <div className="flex h-full w-[48px] flex-none items-center justify-center border-r border-[#464647] sm:w-[64px] lg:w-[80px]">
          <div className="relative h-[26px] w-[26px] sm:h-[32px] sm:w-[32px]">
            <Link href="/">
              <Image src={logoImageData} alt="HAQQ" fill />
            </Link>
          </div>
        </div>
        <div className="ml-[12px] flex flex-row items-center space-x-[15px] sm:ml-[20px] lg:ml-[32px]">
          <div>
            <Link
              href="/"
              className="font-clash text-[20px] font-medium leading-none sm:text-[24px]"
            >
              HAQQ
            </Link>
          </div>
        </div>

        <div className="flex-1" />

        <div className="lg:flex lg:flex-row lg:gap-[60px]">
          <div className="flex flex-row gap-[20px]">{children}</div>
          <div className="flex flex-row items-center gap-x-[20px] lg:hidden">
            <BurgerButton isOpen={!isMenusClosed} onClick={handleCloseClick} />
          </div>
          {isMobileMenuOpen && (
            <Fragment>
              <ScrollLock isActive />

              <div
                className={clsx(
                  'bg-main-black fixed right-0 z-40 w-full transform-gpu lg:hidden',
                  'top-[61px] h-[calc(100vh-61px)] sm:top-[71px] sm:h-[calc(100vh-71px)]',
                )}
              >
                <div className=" px-[16px]">{mobileButtonSlot}</div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </header>
  );
}
