import { Container } from './layout';
import { Text } from '../typography/text';

export function Footer() {
  // const currentYear = new Date().getFullYear();

  return (
    <footer className="py-[32px]">
      <Container>
        <Text>
          The HAQQ Ecosystem Token, a unique and innovative digital asset,
          serves as the core driving force of the HAQQ blockchain network, a
          burgeoning system that is steadily making its mark in the digital
          world. This token is not just an ordinary asset; it enables the smooth
          execution of transactions across the network, acting as the vital fuel
          that powers the operation of smart contracts, which are self-executing
          contracts with the terms of the agreement directly written into code.
        </Text>
      </Container>
    </footer>
  );
}
