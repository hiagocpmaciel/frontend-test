import React, { createContext, useState, ReactNode } from 'react';

interface BinanceContextType {
    selectedSymbols: string[];
    addSymbol: (symbol: string) => void;
    removeSymbol: (symbol: string) => void;
    clearSymbols: () => void;
}

export const BinanceContext = createContext<BinanceContextType | undefined>(undefined);

interface BinanceProviderProps {
    children: ReactNode;
}

export const BinanceProvider: React.FC<BinanceProviderProps> = ({ children }) => {
    const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

    const addSymbol = (symbol: string) => {
        setSelectedSymbols(prev => {
            if (!prev.includes(symbol)) {
                console.log('➕ Adding symbol:', symbol);
                return [...prev, symbol];
            }
            return prev;
        });
    };

    const removeSymbol = (symbol: string) => {
        setSelectedSymbols(prev => {
            console.log('➖ Removing symbol:', symbol);
            return prev.filter(s => s !== symbol);
        });
    };

    const clearSymbols = () => {
        console.log('🧹 Clearing all symbols');
        setSelectedSymbols([]);
    };

    const value = {
        selectedSymbols,
        addSymbol,
        removeSymbol,
        clearSymbols
    };

    return (
        <BinanceContext.Provider value={value}>
            {children}
        </BinanceContext.Provider>
    );
};