// Här testar jag min searchbar komponent så att en användare kan söka för ett ord på inputsfältet, kollar även på andra testet så att min felmeddelande funkar att om man söker med tomt inpultsfält så dyker det upp


import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar'; 
import { vi } from 'vitest';

describe('SearchBar', () => {
  it ('User can search for a word in the input field', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search for a word...');
    await userEvent.type(input, 'example');
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('example');
  });

  it('Displays error message if search input is empty', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    const errorMessage = await screen.findByText('Please enter a word to search');
    expect(errorMessage).toBeInTheDocument();
  });
});