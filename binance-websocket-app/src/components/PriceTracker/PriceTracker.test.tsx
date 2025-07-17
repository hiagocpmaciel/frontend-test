import React from 'react';
import { render, screen } from '@testing-library/react';
import PriceTracker from './PriceTracker';

describe('PriceTracker Component', () => {
  test('renders PriceTracker component', () => {
    render(<PriceTracker />);
    const priceTrackerElement = screen.getByText(/price updates/i);
    expect(priceTrackerElement).toBeInTheDocument();
  });

  test('displays the correct price information', () => {
    const mockPrices = [
      { symbol: 'BTCUSDT', lastPrice: '50000', bidPrice: '49900', askPrice: '50100', priceChangePercent: '2.5%' },
      { symbol: 'ETHUSDT', lastPrice: '4000', bidPrice: '3990', askPrice: '4010', priceChangePercent: '1.5%' },
    ];

    render(<PriceTracker prices={mockPrices} />);
    
    mockPrices.forEach(price => {
      expect(screen.getByText(price.symbol)).toBeInTheDocument();
      expect(screen.getByText(price.lastPrice)).toBeInTheDocument();
      expect(screen.getByText(price.bidPrice)).toBeInTheDocument();
      expect(screen.getByText(price.askPrice)).toBeInTheDocument();
      expect(screen.getByText(price.priceChangePercent)).toBeInTheDocument();
    });
  });
});