import React, { useState, useEffect } from 'react';
import { SymbolData } from '../../types/binance';
import { useBinanceContext } from '../../hooks/useBinanceContext';
import useBinanceWebSocket from '../../hooks/useBinanceWebSocket';
import './PriceTracker.css';

const PriceTracker: React.FC = () => {
    const { selectedSymbols } = useBinanceContext();
    const [symbolData, setSymbolData] = useState<SymbolData[]>([]);

    useBinanceWebSocket(selectedSymbols, setSymbolData);

    // Filtra dados apenas para símbolos selecionados
    const filteredData = symbolData.filter(data => 
        selectedSymbols.includes(data.symbol)
    );

    const formatPrice = (price: string, symbol: string) => {
        const value = parseFloat(price);
        
        // Detecta se é par USDT para mostrar símbolo de dólar
        if (symbol.endsWith('USDT')) {
            if (value < 0.01) {
                return `$${value.toFixed(8)}`;
            } else if (value < 1) {
                return `$${value.toFixed(4)}`;
            } else {
                return `$${value.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`;
            }
        }
        
        // Para outros pares, formatação normal
        if (value < 0.01) {
            return value.toFixed(8);
        } else if (value < 1) {
            return value.toFixed(4);
        } else {
            return value.toFixed(2);
        }
    };

    const formatPercent = (percent: string) => {
        const value = parseFloat(percent);
        return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
    };

    return (
        <div className="price-tracker">
            <h2>Price Tracker</h2>
            
            {selectedSymbols.length === 0 ? (
                <div className="loading-state">
                    <p>No symbols selected</p>
                </div>
            ) : filteredData.length === 0 ? (
                <div className="loading-state">
                    <p>Loading prices...</p>
                </div>
            ) : (
                <div className="price-list">
                    {filteredData.map(data => (
                        <div key={data.symbol} className="price-item">
                            <div className="price-symbol">{data.symbol}</div>
                            <div className="price-details">
                                <div className="price-detail">
                                    <span className="price-label">Last Price:</span>
                                    <span className="price-value">{formatPrice(data.lastPrice, data.symbol)}</span>
                                </div>
                                <div className="price-detail">
                                    <span className="price-label">Change:</span>
                                    <span className={`price-value price-change ${parseFloat(data.priceChangePercent) >= 0 ? 'positive' : 'negative'}`}>
                                        {formatPercent(data.priceChangePercent)}
                                    </span>
                                </div>
                                <div className="price-detail">
                                    <span className="price-label">Bid:</span>
                                    <span className="price-value">{formatPrice(data.bestBidPrice, data.symbol)}</span>
                                </div>
                                <div className="price-detail">
                                    <span className="price-label">Ask:</span>
                                    <span className="price-value">{formatPrice(data.bestAskPrice, data.symbol)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PriceTracker;