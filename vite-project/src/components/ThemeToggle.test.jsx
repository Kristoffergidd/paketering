// Här testar vi så att vår dark och lightmodeknapp funkar

import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle Component', () => {
  test('toggles theme from light to dark and vice versa', () => {
    const mockToggleTheme = vi.fn();
    
    const lightThemeValue = { theme: 'light', toggleTheme: mockToggleTheme };
    
    const { rerender } = render(
      <ThemeContext.Provider value={lightThemeValue}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );
    
    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    
    const darkThemeValue = { theme: 'dark', toggleTheme: mockToggleTheme };
    rerender(
      <ThemeContext.Provider value={darkThemeValue}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );
    
    const updatedButton = screen.getByRole('button', { name: /switch to light mode/i });
    expect(updatedButton).toBeInTheDocument();
  });
});