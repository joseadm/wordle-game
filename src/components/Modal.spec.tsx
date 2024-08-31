import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

test('renders win message correctly', () => {
  render(<Modal gameState="win" />);
  
  const winMessage = screen.getByText(/You're a Winner, Champ!/i);
  expect(winMessage).toBeInTheDocument();
  
  const tryAgainButton = screen.getByText(/Try Again/i);
  expect(tryAgainButton).toBeInTheDocument();
});

test('renders loss message correctly', () => {
  render(<Modal gameState="loss" />);
  
  const lossMessage = screen.getByText(/Oops! Tough Luck, But Don't Give Up!/i);
  expect(lossMessage).toBeInTheDocument();
  
  const tryAgainButton = screen.getByText(/Try Again/i);
  expect(tryAgainButton).toBeInTheDocument();
});

test('clicking try again button reloads the page', () => {
  render(<Modal gameState="win" />);
  
  const tryAgainButton = screen.getByText(/Try Again/i);
  fireEvent.click(tryAgainButton);
  
  expect(window.location.reload).toHaveBeenCalled();
});