import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SymbolSelector from './SymbolSelector';

describe('SymbolSelector', () => {
  const mockSymbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];

  test('renders the symbol selector', () => {
    render(<SymbolSelector symbols={mockSymbols} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  test('displays the correct symbols', () => {
    render(<SymbolSelector symbols={mockSymbols} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(mockSymbols.length);
    mockSymbols.forEach(symbol => {
      expect(screen.getByText(symbol)).toBeInTheDocument();
    });
  });

  test('calls onSelect when a symbol is selected', () => {
    const handleSelect = jest.fn();
    render(<SymbolSelector symbols={mockSymbols} onSelect={handleSelect} />);
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: mockSymbols[0] } });
    expect(handleSelect).toHaveBeenCalledWith(mockSymbols[0]);
  });
});