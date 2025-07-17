import React from 'react';
import { useBinanceContext } from '../../hooks/useBinanceContext';
import './SymbolList.css';

const SymbolList: React.FC = () => {
    const { selectedSymbols, removeSymbol } = useBinanceContext();

    return (
        <div className="symbol-list-container">
            <div className="symbol-list-header">
                <h3>Selected Symbols</h3>
                <span className="count">({selectedSymbols.length})</span>
            </div>

            {selectedSymbols.length === 0 ? (
                <div className="empty-state">
                    <p>No symbols selected</p>
                    <p className="empty-subtitle">Select symbols from the left panel to track their prices</p>
                </div>
            ) : (
                <div className="selected-symbols">
                    {selectedSymbols.map(symbol => (
                        <div key={symbol} className="selected-symbol-item">
                            <span className="symbol-name">{symbol}</span>
                            <button 
                                className="remove-button"
                                onClick={() => removeSymbol(symbol)}
                                title="Remove symbol"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SymbolList;