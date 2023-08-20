import '@testing-library/jest-dom/';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';

test('renders the form and input fields', () => {
  render(<App/>);
  const formElement = screen.getAllByTestId('form') as HTMLFormElement[];
  const buttonElement = screen.getByDisplayValue('search') as HTMLInputElement;
  const inputElement = screen.getByPlaceholderText('enter a word') as HTMLInputElement
  expect(formElement[0] as HTMLFormElement).toBeInTheDocument();
  expect(buttonElement as HTMLButtonElement).toBeInTheDocument();
  expect(inputElement as HTMLInputElement).toBeInTheDocument();
});

test('handles input and form submission', async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText('enter a word') as HTMLInputElement
  const formElement = screen.getAllByTestId('form')[0] as HTMLFormElement;
//   .getByValue(/search/i);

  // Simulate user typing into input field
  fireEvent.change(inputElement, { target: { value: 'test' } });
  expect(inputElement.value).toBe('test');

  // Simulate form submission
  fireEvent.submit(formElement);

  // Wait for the error message to appear (since no mock API is set up)
  await waitFor(() => screen.getByTestId('error') || screen.getByTestId('result'));
});