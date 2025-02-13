import { useEffect, useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import DogCard from "../components/DogCard";
import FavoritesList from "../components/FavoriteList";

const SearchPage = ({ favorites, setFavorites }) => {
  const [dogs, setDogs] = useState([]);
  const [filters, setFilters] = useState({sort: "breed:asc", page: 0});
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchDogs = async () => {
      setIsLoading(true);
      let query = `size=50`;

      if (filters) {
        if (filters.breed) query += `&breeds=${filters.breed}`;
        if (filters.sort) query += `&sort=${filters.sort}`;
        if (filters.page) query += `&from=${filters.page * 50}`;
      } else {
        query = `size=10&from=0&sort=breed:asc`;
      }

      const response = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/search?${query}`,
        { credentials: "include" }
      );
      const data = await response.json();

      if(data.total === 0) setNotFound((prev) => !prev)

      const dogsResponse = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data.resultIds),
      });

      setDogs(await dogsResponse.json());
      setTotalResults(data.total);
      setIsLoading(false);
    };

    fetchDogs();
  }, [filters]);

  return (
    <>
      <main >
        <div className="searchPage">
          {filters && <FilterBar setFilters={setFilters} />}
          
          {isLoading ? (
            <p>Loading dogs...</p>
          ) : (notFound ? (
              <p>Can't Find Any Dog Breed</p>
            ) : (
              <div className="dogGrid">
                {dogs.map((dog) => (
                  <DogCard key={dog.id} dog={dog} favorites={favorites} setFavorites={setFavorites} />
                ))}
              </div>
            )
          )}

          {filters && <Pagination totalResults={totalResults} filters={filters} setFilters={setFilters} />}
        </div>
        
        <FavoritesList favorites={favorites} setFavorites={setFavorites} dogs={dogs} />
      </main>
    </>
  );
};

export default SearchPage;
