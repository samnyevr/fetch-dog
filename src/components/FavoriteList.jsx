const FavoritesList = ({ favorites, setFavorites, dogs}) => {
  const removeFavorite = (id) => setFavorites(favorites.filter((fav) => fav !== id));

  const favoriteDogList = dogs.filter(dog => favorites.includes(dog.id))

  return (
    <div className="favoriteList">
      <h2>Favorite Dogs 🐶</h2>
      {favorites.length === 0 ? <p>No favorites yet.</p> : (
        <ul>
          {favoriteDogList.map((dog) => (
            <li key={dog.id} >
              {dog.name}
              <button  onClick={() => removeFavorite(dog.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
