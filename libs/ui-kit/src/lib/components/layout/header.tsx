'use client';
import { Fragment, ReactNode, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import debounce from 'lodash/debounce';
import NextLink from 'next/link';
import { useMediaQuery } from 'react-responsive';
import ScrollLock from 'react-scrolllock';
import { BurgerButton } from '../burger-button/burger-button';
import { IconButton } from '../button/icon-button';
import { BagIcon, MagnifierIcon, XMarkLargeIcon } from '../icons/icons';
import { Logo } from '../logo/logo';
import { Link } from '../typography/link';

export function Header({
  className,
  children,
  mobileButtonSlot,
  shoppingCartSlot,
  cartCountSlot,
  searchSlot,
  isSearchOpen,
  setIsSearchOpen,
  isMobileMenuOpen,
  setMobileMenuOpen,
}: {
  className?: string;
  children: ReactNode;
  mobileButtonSlot?: ReactNode;
  shoppingCartSlot?: ReactNode;
  cartCountSlot?: ReactNode;
  searchSlot?: ReactNode;
  isSearchOpen?: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
}) {
  const [distanceFromTopReached, setDistanceFromTopReached] = useState(false);

  const [isShoppingCartOpen, setShoppingCartOpen] = useState(false);
  const isTablet = useMediaQuery({
    query: `(max-width: 1023px)`,
  });

  const isMenusClosed = !isMobileMenuOpen && !isShoppingCartOpen;
  const isDarkHeader = distanceFromTopReached || isSearchOpen;

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
      setShoppingCartOpen(false);
    }
  }, [isTablet]);

  const handleCloseClick = useCallback(() => {
    isShoppingCartOpen
      ? setShoppingCartOpen(false)
      : setMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen, isShoppingCartOpen, setMobileMenuOpen]);

  const handleSearchClose = useCallback(() => {
    setIsSearchOpen(false);
  }, [setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && !isTablet) {
      setIsSearchOpen(false);
    }
  }, [isSearchOpen, isTablet, setIsSearchOpen]);

  return (
    <header
      className={clsx(
        'relative h-[72px] px-[28px] py-[18px]',
        isMobileMenuOpen || isShoppingCartOpen || isDarkHeader
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
        {!isSearchOpen && !isShoppingCartOpen && !isMobileMenuOpen && (
          <div>
            <NextLink href="/">
              <Logo withSign={!isTablet} />
            </NextLink>
          </div>
        )}

        <div
          className="mr-auto flex flex-grow"
          onClick={() => {
            isTablet && setIsSearchOpen(true);
          }}
        >
          {!isTablet && searchSlot}
          {isTablet && isSearchOpen && searchSlot}
          {isTablet &&
            !isSearchOpen &&
            !isMobileMenuOpen &&
            !isShoppingCartOpen && <MagnifierIcon />}
        </div>

        <div className="lg:flex lg:flex-row lg:gap-[60px]">
          <div className="hidden flex-row items-center gap-[28px] lg:flex">
            {/* POST MVP */}
            {/* <Link href="#">Explore</Link> */}
            <Link href="/collection/create">Create Collection</Link>
            <Link href="/nft/create">Create Nft</Link>
          </div>
          <div className="flex flex-row gap-[20px]">
            {children}
            <div className="hidden lg:block">
              <CartButton
                onClick={() => {
                  setShoppingCartOpen((prev) => {
                    return !prev;
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-[20px] lg:hidden">
            {isMenusClosed && !isSearchOpen && (
              <CartButtonMobile
                onClick={() => {
                  setShoppingCartOpen((prev) => {
                    return !prev;
                  });
                }}
                cartCountSlot={cartCountSlot}
              />
            )}
            {isSearchOpen ? (
              <div onClick={handleSearchClose} className="cursor-pointer">
                <XMarkLargeIcon />
              </div>
            ) : (
              <BurgerButton
                isOpen={!isMenusClosed}
                onClick={handleCloseClick}
              />
            )}
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
                <div className=" px-[16px]">
                  <div className="mb-[24px] flex flex-col items-start gap-[16px] sm:mb-[60px]">
                    {/* POST MVP */}
                    {/* <Link href="#">Explore</Link> */}
                    <Link
                      href="/collection/create"
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                    >
                      Create Collection
                    </Link>
                    <Link
                      href="/nft/create"
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                    >
                      Create Nft
                    </Link>
                  </div>
                  {mobileButtonSlot}
                </div>
              </div>
            </Fragment>
          )}
          {isShoppingCartOpen && (
            <Fragment>
              <ScrollLock isActive />

              <div
                className={clsx(
                  'bg-main-black fixed right-0 z-40 transform-gpu',
                  'top-[61px] h-[calc(100vh-61px)] sm:top-[71px] sm:h-[calc(100vh-71px)]',
                  'w-full lg:w-[35%]',
                )}
              >
                <div className="relative h-full px-[16px] pb-[24px]">
                  {shoppingCartSlot}
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </header>
  );
}

function CartButton({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick}>
      <IconButton variant="green">
        <BagIcon />
      </IconButton>
    </div>
  );
}

function CartButtonMobile({
  cartCountSlot,
  onClick,
}: {
  cartCountSlot?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className="relative cursor-pointer p-[6px]" onClick={onClick}>
      <BagIcon />

      {cartCountSlot}
    </div>
  );
}
