// Favoritlista komponent där jag renderar mina favoritord samt lägger en knapp för användaren att ta bort favoritord


const FavoritesList = ({ favorites, onRemoveFavorite }) => {
  return (
    <div>
      <h3>Your Favorites</h3>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <ul>
          {favorites.map((word, index) => (
            <li key={index}>
              {word}
              <button onClick={() => onRemoveFavorite(word)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;