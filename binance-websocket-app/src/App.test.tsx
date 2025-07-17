import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/your app title/i); // Replace with actual text you expect
  expect(linkElement).toBeInTheDocument();
});

test('contains the layout component', () => {
  render(<App />);
  const layoutElement = screen.getByTestId('layout'); // Ensure you have a data-testid in your Layout component
  expect(layoutElement).toBeInTheDocument();
});