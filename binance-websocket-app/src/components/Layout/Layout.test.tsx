import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';

describe('Layout Component', () => {
  test('renders without crashing', () => {
    render(<Layout />);
  });

  test('contains the expected elements', () => {
    const { getByText } = render(<Layout />);
    expect(getByText(/some expected text/i)).toBeInTheDocument();
  });
});