// kärnan till applikationen här har vi vart vi hämtar informationen från apiet och även vart vi visar upp sidan och renderar ut våra komponenter


import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WordDetail from './components/WordDetail';
import FavoritesList from './components/FavoritesList';
import ThemeToggle from './components/ThemeToggle';
import ThemeProvider from './context/ThemeContext';

const App = () => {
  const [wordData, setWordData] = useState(null); 
  const [favorites, setFavorites] = useState([]); 

  const fetchWord = async (word) => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    setWordData(data[0]);  
  };


  const addFavorite = (word) => {
    if (!favorites.includes(word)) {
      setFavorites([...favorites, word]);
    }
  };

  const removeFavorite = (word) => {
    setFavorites(favorites.filter(fav => fav !== word));
  };

  return (
    <ThemeProvider>
      <div>
        <ThemeToggle />
        <SearchBar onSearch={fetchWord} />
        {wordData && (
          <WordDetail 
            wordData={wordData} 
            onAddFavorite={() => addFavorite(wordData.word)}  
          />
        )}
        <FavoritesList 
          favorites={favorites} 
          onRemoveFavorite={removeFavorite}  
        />
      </div>
    </ThemeProvider>
  );
};

export default App;