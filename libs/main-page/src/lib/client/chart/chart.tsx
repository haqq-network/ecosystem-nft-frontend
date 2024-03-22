'use client';

import { useMemo } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { BlockLoading, Container, HaqqHeading, Text } from '@haqq-nft/ui-kit';
import { formatEthDecimal } from '@haqq-nft/utils';
import { useIslmEstimated } from '@haqq-nft/web3-connections';

const NOW = new Date();

const data: {
  name: string;
  pv?: number;
}[] = [
  {
    name: '01.01',
    pv: 50,
  },
  {
    name: '15.01',
    pv: 80,
  },
  {
    name: '01.02',
    pv: 100,
  },
  {
    name: '15.02',
    pv: 120,
  },
  {
    name: '01.03',
    pv: 130,
  },
  {
    name: '15.03',
    pv: 140,
  },
  {
    name: '01.04',
  },
  {
    name: '15.04',
  },
];

const tickProps = {
  fill: 'white',
  opacity: 0.5,
  fontSize: '14px',
  fontWeight: 500,
  minWidth: 70,
  width: 70,
};

const MAX_BORDER = 200;

export const Chart = () => {
  const { value: price, loading } = useIslmEstimated(1);

  return (
    <Container>
      <HaqqHeading>Token price</HaqqHeading>

      <div className="mb-[16px] mt-[20px]">
        <Text size="large" className="text-white/50 ">
          On {NOW.getDate()}.{NOW.getMonth()}.{NOW.getFullYear()}:
        </Text>
        <Text size="large">
          {loading ? (
            <BlockLoading />
          ) : (
            `${formatEthDecimal(price)} ISLM for 1 token`
          )}
        </Text>
      </div>

      <ResponsiveContainer width={'100%'} height={123}>
        <LineChart
          data={data}
          margin={{ top: 0, left: 0, right: 50, bottom: 0 }}
          className="border-haqq-border rounded-[4px] border"
        >
          <CartesianGrid vertical={false} strokeOpacity={0.15} color="white" />
          <XAxis
            dataKey="name"
            opacity={0.15}
            color="white"
            tick={tickProps}
            tickLine={false}
          />
          <YAxis
            tickCount={5}
            orientation="right"
            tick={{
              ...tickProps,
              width: 80,
            }}
            domain={[0, MAX_BORDER]}
            tickFormatter={(val, index) => {
              if (
                index === 0 ||
                index === data.length - 1 ||
                val === MAX_BORDER
              )
                return '';

              return `${val} ISLM`;
            }}
            opacity={0.15}
            color="white"
            scale={'linear'}
          />
          <Line
            type="monotone"
            dataKey="pv"
            width={2}
            stroke="#1BDDAF"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};
