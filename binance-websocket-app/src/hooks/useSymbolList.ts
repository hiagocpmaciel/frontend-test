import { useState, useEffect } from 'react';

const useSymbolList = () => {
    const [symbols, setSymbols] = useState<string[]>([]);

    const addSymbol = (symbol: string) => {
        if (!symbols.includes(symbol)) {
            setSymbols(prevSymbols => [...prevSymbols, symbol]);
        }
    };

    const removeSymbol = (symbol: string) => {
        setSymbols(prevSymbols => prevSymbols.filter(s => s !== symbol));
    };

    const clearSymbols = () => {
        setSymbols([]);
    };

    useEffect(() => {
        // Optionally, you can add logic to persist symbols or fetch initial data here
    }, []);

    return {
        symbols,
        addSymbol,
        removeSymbol,
        clearSymbols,
    };
};

export default useSymbolList;