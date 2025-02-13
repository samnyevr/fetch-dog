const DogCard = ({ dog, favorites, setFavorites }) => {
  const isFavorited = favorites.includes(dog.id);
  const toggleFavorite = () => {
    setFavorites(isFavorited ? favorites.filter((id) => id !== dog.id) : [...favorites, dog.id]);
  };

  return (
    <div className="dogCard">
      <img src={dog.img} alt={dog.name}/>
      <h3>{dog.name} ({dog.breed})</h3>
      <p><strong>Age:</strong> {dog.age}</p>
      <p><strong>Zip Code:</strong> {dog.zip_code}</p>
      <button  onClick={toggleFavorite}>
        {isFavorited ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
};

export default DogCard;
