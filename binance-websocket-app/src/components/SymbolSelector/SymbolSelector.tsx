import React, { useState, useEffect } from 'react';
import { useBinanceContext } from '../../hooks/useBinanceContext';

const SymbolSelector: React.FC = () => {
    const { selectedSymbols, addSymbol, removeSymbol } = useBinanceContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [availableSymbols, setAvailableSymbols] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Lista de símbolos populares para exibir por padrão
    const popularSymbols = [
        'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ETHBTC', 'BNBBTC',
        'LTCBTC', 'BCHBTC', 'XRPBTC', 'SOLBTC', 'NEOBTC',
    ];

    // Buscar símbolos da API da Binance
    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
                const data = await response.json();
                const symbols = data.symbols
                    .filter((symbol: any) => symbol.status === 'TRADING')
                    .map((symbol: any) => symbol.symbol)
                    .sort();
                setAvailableSymbols(symbols);
            } catch (error) {
                console.error('Erro ao buscar símbolos:', error);
                // Fallback para símbolos populares
                setAvailableSymbols(popularSymbols);
            } finally {
                setLoading(false);
            }
        };

        fetchSymbols();
    }, []);

    // Se não há termo de busca, mostra símbolos populares
    // Se há termo de busca, busca em todos os símbolos disponíveis
    const filteredSymbols = searchTerm.trim() === '' 
        ? popularSymbols
        : availableSymbols.filter(symbol =>
            symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleSymbolToggle = (symbol: string) => {
        if (selectedSymbols.includes(symbol)) {
            removeSymbol(symbol);
        } else {
            addSymbol(symbol);
        }
    };

    if (loading) {
        return (
            <div className="symbol-selector">
                <div className="loading">Carregando símbolos...</div>
            </div>
        );
    }

    return (
        <div className="symbol-selector">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search symbols (e.g., BTC, ETH, BNB)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <span className="search-icon">🔍</span>
            </div>

            <div className="symbol-list">
                <div className="symbol-header">
                    <span>
                        {searchTerm.trim() === '' 
                            ? `Popular Symbols (${filteredSymbols.length})` 
                            : `Symbol (${filteredSymbols.length} found)`
                        }
                    </span>
                </div>
                {filteredSymbols.slice(0, 10).map(symbol => (
                    <div key={symbol} className="symbol-item">
                        <label className="symbol-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedSymbols.includes(symbol)}
                                onChange={() => handleSymbolToggle(symbol)}
                            />
                            <span className="checkmark"></span>
                            {symbol}
                        </label>
                    </div>
                ))}
                {filteredSymbols.length > 10 && (
                    <div className="symbol-item">
                        <em>... e mais {filteredSymbols.length - 10} símbolos. Use a busca para filtrar.</em>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SymbolSelector;