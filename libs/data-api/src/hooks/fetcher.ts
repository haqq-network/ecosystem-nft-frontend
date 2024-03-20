'use client';

import axios from 'axios';

export async function apiGetFetcher([url, token]: [string, string]) {
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      console.log(err);
    });

  return response?.data;
}

export const DEFAULT_CHAIN_ID = 11235;

export async function apiPostFetcher([url, token, chainId, data]: [
  string,
  string | null,
  number,
  unknown,
]) {
  const response = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
      'X-Chain-Id': chainId || DEFAULT_CHAIN_ID,
    },
  });

  return response.data;
}
