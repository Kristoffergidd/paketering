// Sökbarkomponent som ger en inputsfält till användaren för att söka ord, även här har jag då lagt till felmeddelande om man söker med ett tomt inputsfält


import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setShowError(true);
    } else {
      setShowError(false);
      onSearch(query);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim() !== '') {
              setShowError(false);
            }
          }}
          placeholder="Search for a word..." 
        />
        <button type="submit">Search</button>
      </form>
      {showError && <p style={{ color: 'red' }}>Please enter a word to search</p>}
    </div>
  );
};

export default SearchBar;