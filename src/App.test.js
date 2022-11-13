import { render, screen } from '@testing-library/react';
import App from './App';

test('Truss displays', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading data/i);
  expect(linkElement).toBeInTheDocument();
});
