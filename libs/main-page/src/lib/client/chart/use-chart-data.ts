'use client';

import { useQuery } from '@tanstack/react-query';
import { apiGetFetcher, useApiUrl } from '@haqq-nft/data-api';

type IHistoricalItem = [string, number];

interface ChartDataResponse {
  historical: IHistoricalItem[];
}

export function useChartData() {
  const url = useApiUrl();

  return useQuery<ChartDataResponse, Error, ChartDataResponse, [string]>({
    queryKey: ['useChartData'],
    queryFn: async () => {
      return apiGetFetcher(`${url}/historical`);
    },
  });
}
