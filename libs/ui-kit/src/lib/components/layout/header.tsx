'use client';
import { Fragment, ReactNode, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import debounce from 'lodash/debounce';
import NextLink from 'next/link';
import { useMediaQuery } from 'react-responsive';
import ScrollLock from 'react-scrolllock';
import { BurgerButton } from '../burger-button/burger-button';
import { Logo } from '../logo/logo';

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
      <div className="flex flex-row items-center justify-between gap-x-[16px] lg:gap-x-[42px]">
        {!isMobileMenuOpen && (
          <div>
            <NextLink href="/">
              <Logo withSign={!isTablet} />
            </NextLink>
          </div>
        )}

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
