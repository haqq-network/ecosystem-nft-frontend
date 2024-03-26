'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { haqqMainnet } from 'viem/chains';
import { useChainId } from 'wagmi';

const TESTNET_URL =
  'https://ecosystem-rates.testedge2.haqq.network/api/historical';
const MAINNET_URL = 'https://ecosystem-rates.haqq.network/api/historical';

type IHistoricalItem = [string, number];

interface ChartDataResponse {
  historical: IHistoricalItem[];
}

export async function apiGetFetcher(url: string) {
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .catch((err) => {
      console.log(err);
    });

  return response?.data;
}

export function useChartData() {
  const chainId = useChainId();

  const url = chainId === haqqMainnet.id ? MAINNET_URL : TESTNET_URL;

  return useQuery<ChartDataResponse, Error, ChartDataResponse, [string]>({
    queryKey: ['useChartData'],
    queryFn: async () => {
      return apiGetFetcher(url);
    },
  });
}
