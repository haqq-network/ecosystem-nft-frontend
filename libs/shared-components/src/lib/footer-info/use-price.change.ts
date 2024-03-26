'use client';

import { useQuery } from '@tanstack/react-query';
import { apiGetFetcher, useApiUrl } from '@haqq-nft/data-api';

interface PriceChangeResponse {
  price: number;
}

export const usePriceChange = (timePeriod: '7d' | '30d') => {
  const url = useApiUrl();

  return useQuery<PriceChangeResponse, Error, PriceChangeResponse, [string]>({
    queryKey: ['usePriceChange' + timePeriod],
    queryFn: async () => {
      return apiGetFetcher(`${url}/${timePeriod}`);
    },
  });
};
