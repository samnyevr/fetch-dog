const DogCard = ({ dog, favorites, setFavorites }) => {
  const isFavorited = favorites.includes(dog.id);
  const toggleFavorite = () => {
    setFavorites(isFavorited ? favorites.filter((id) => id !== dog.id) : [...favorites, dog.id]);
  };

  return (
    <div className="dogCard">
      <img src={dog.img} alt={dog.name}/>
      <h3>{dog.name} ({dog.breed})</h3>
      <button  onClick={toggleFavorite}>
        {isFavorited ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
};

export default DogCard;
