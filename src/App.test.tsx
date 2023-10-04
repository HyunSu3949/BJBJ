import { render, screen } from '@testing-library/react';
import { App } from './App';

test('Init', () => {
  render(<App />);
  const text = screen.getByText('Hi');
  expect(text).toBeInTheDocument();
});
