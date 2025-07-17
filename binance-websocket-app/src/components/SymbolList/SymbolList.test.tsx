import React from 'react';
import { render, screen } from '@testing-library/react';
import SymbolList from './SymbolList';

describe('SymbolList', () => {
  const mockSymbols = [
    { symbol: 'BTCUSDT', lastPrice: '50000', bestBid: '49900', bestAsk: '50100', priceChangePercent: '2.5%' },
    { symbol: 'ETHUSDT', lastPrice: '4000', bestBid: '3990', bestAsk: '4010', priceChangePercent: '1.5%' },
  ];

  test('renders the list of symbols', () => {
    render(<SymbolList symbols={mockSymbols} />);
    
    mockSymbols.forEach(symbol => {
      expect(screen.getByText(symbol.symbol)).toBeInTheDocument();
      expect(screen.getByText(`Last Price: ${symbol.lastPrice}`)).toBeInTheDocument();
      expect(screen.getByText(`Best Bid: ${symbol.bestBid}`)).toBeInTheDocument();
      expect(screen.getByText(`Best Ask: ${symbol.bestAsk}`)).toBeInTheDocument();
      expect(screen.getByText(`Price Change: ${symbol.priceChangePercent}`)).toBeInTheDocument();
    });
  });

  test('renders empty message when no symbols are provided', () => {
    render(<SymbolList symbols={[]} />);
    
    expect(screen.getByText('No symbols to display')).toBeInTheDocument();
  });
});