import { ExchangeInfoResponse } from '../types/binance';

const BINANCE_API_BASE = 'https://api.binance.com/api/v3';

export const fetchExchangeInfo = async (): Promise<ExchangeInfoResponse> => {
  try {
    const response = await fetch(`${BINANCE_API_BASE}/exchangeInfo`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching exchange info:', error);
    throw error;
  }
};