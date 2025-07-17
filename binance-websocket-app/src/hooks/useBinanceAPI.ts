import { useEffect, useState } from 'react';
import axios from 'axios';
import { ExchangeInfoSymbol, ExchangeInfoResponse } from '../types/binance';

const useBinanceAPI = () => {
    const [symbols, setSymbols] = useState<ExchangeInfoSymbol[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const response = await axios.get<ExchangeInfoResponse>('https://api.binance.com/api/v3/exchangeInfo');
                setSymbols(response.data.symbols);
            } catch (err) {
                setError('Failed to fetch symbols');
            } finally {
                setLoading(false);
            }
        };

        fetchSymbols();
    }, []);

    return { symbols, loading, error };
};

export default useBinanceAPI;