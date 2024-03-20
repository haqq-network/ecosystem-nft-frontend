import NextLink from 'next/link';
import { Container } from './layout';
import { DiscordIcon, TwitterIcon } from '../icons/icons';
import { Logo } from '../logo/logo';
import { Link } from '../typography/link';

export function Footer() {
  // const currentYear = new Date().getFullYear();

  return (
    <footer className="py-[32px]">
      <Container>
        <div className="flex flex-col items-start justify-start gap-y-[16px] lg:flex-row lg:gap-x-[80px]">
          <div>
            <NextLink href="/">
              <Logo />
            </NextLink>
            {/* <div className="mt-[8px] text-white/20">© {currentYear}</div> */}
          </div>
          <div className="flex flex-row gap-x-[12px] lg:gap-x-[60px]">
            <div className="flex flex-col gap-[8px] lg:flex-row">
              <div className="flex min-w-[140px] flex-col gap-[8px]">
                <Link href="#">Collection</Link>
              </div>
              <div className="flex min-w-[140px] flex-col gap-[8px]">
                <Link href="#">NFT’s</Link>
                <Link href="#">Privacy Policy</Link>
              </div>
            </div>
            {/* social */}
            <div className="flex flex-col gap-[8px]">
              <Link
                href="#"
                className="inline-flex flex-row items-center gap-[10px]"
              >
                <DiscordIcon />
                <span>Discord</span>
              </Link>
              <Link
                href="#"
                className="inline-flex flex-row items-center gap-[10px]"
              >
                <TwitterIcon />
                <span>Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
