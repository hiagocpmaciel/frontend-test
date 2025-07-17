import React, { createContext, useContext, useState, useEffect } from 'react';
import { BinanceTicker } from '../types/binance';

interface BinanceContextType {
  symbols: string[];
  addSymbol: (symbol: string) => void;
  removeSymbol: (symbol: string) => void;
  priceUpdates: BinanceTicker[];
}

const BinanceContext = createContext<BinanceContextType | undefined>(undefined);

export const BinanceProvider: React.FC = ({ children }) => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [priceUpdates, setPriceUpdates] = useState<BinanceTicker[]>([]);

  const addSymbol = (symbol: string) => {
    setSymbols((prev) => [...prev, symbol]);
  };

  const removeSymbol = (symbol: string) => {
    setSymbols((prev) => prev.filter((s) => s !== symbol));
  };

  useEffect(() => {
    // Logic to connect to WebSocket and handle price updates
    // This will be implemented in the useBinanceWebSocket hook
  }, [symbols]);

  return (
    <BinanceContext.Provider value={{ symbols, addSymbol, removeSymbol, priceUpdates }}>
      {children}
    </BinanceContext.Provider>
  );
};

export const useBinanceContext = () => {
  const context = useContext(BinanceContext);
  if (!context) {
    throw new Error('useBinanceContext must be used within a BinanceProvider');
  }
  return context;
};