import React from 'react';
import { BinanceProvider } from '../../context/BinanceProvider';
import SymbolSelector from '../SymbolSelector/SymbolSelector';
import SymbolList from '../SymbolList/SymbolList';
import PriceTracker from '../PriceTracker/PriceTracker';
import './Layout.css';

const Layout: React.FC = () => {
    return (
        <BinanceProvider>
            <div className="layout">
                <header className="header">
                    <h1>Binance Price Tracker</h1>
                </header>
                <main className="main-content">
                    <div className="left-panel">
                        <SymbolSelector />
                    </div>
                    <div className="middle-panel">
                        <SymbolList />
                    </div>
                    <div className="right-panel">
                        <PriceTracker />
                    </div>
                </main>
            </div>
        </BinanceProvider>
    );
};

export default Layout;