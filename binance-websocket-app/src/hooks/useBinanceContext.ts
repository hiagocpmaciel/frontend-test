import { useContext } from 'react';
import { BinanceContext } from '../context/BinanceProvider';

export const useBinanceContext = () => {
    const context = useContext(BinanceContext);
    
    if (!context) {
        throw new Error('useBinanceContext must be used within a BinanceProvider');
    }
    
    return context;
};