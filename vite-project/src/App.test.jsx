// testar vi så att användaren kan markera ord till favorit samt ta bort ett ord från favorit

import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App'; 


global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ word: 'example' }]), 
  })
);

describe('Favorites functionality', () => {
  it('allows the user to mark a word as favorite', async () => {
    render(<App />);

    const user = userEvent.setup();

    
    const input = screen.getByPlaceholderText('Search for a word...');
    await user.type(input, 'example');

   
    const searchButton = screen.getByText('Search');
    await user.click(searchButton);

   
    const addToFavoritesButton = await screen.findByText('Add to Favorites');
    await user.click(addToFavoritesButton);

  
    const favoritesList = screen.getByRole('list');
    const favoriteWord = within(favoritesList).getByText('example');
    expect(favoriteWord).toBeInTheDocument();
  });

  it('allows the user to remove a word from favorites', async () => {
    render(<App />);

    const user = userEvent.setup();

    
    const input = screen.getByPlaceholderText('Search for a word...');
    await user.type(input, 'example');

  
    const searchButton = screen.getByText('Search');
    await user.click(searchButton);

 
    const addToFavoritesButton = await screen.findByText('Add to Favorites');
    await user.click(addToFavoritesButton);


    const favoritesList = screen.getByRole('list');
    const favoriteWord = within(favoritesList).getByText('example');
    expect(favoriteWord).toBeInTheDocument();

    const removeButton = within(favoritesList).getByText('Remove', { exact: false });
    await user.click(removeButton); 

    await waitFor(() => {
      const removedWord = within(favoritesList).queryByText('example');
      expect(removedWord).not.toBeInTheDocument();
    });
  });
});