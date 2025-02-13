import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const MatchPage = ({ favorites }) => {
  const [match, setMatch] = useState(null);
  const [phrase, setPhrase] = useState("Finding your perfect match...")

  useEffect(() => {
    const fetchMatch = async () => {
      if (!Array.isArray(favorites) || !favorites.length) {
        setPhrase("Can't find any dogs that match, select your favorites from the search tab")
        return
      }
      const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(favorites),
      });
      const data = await response.json();

      let query = `size=50from=0&sort=breed:asc`;

      const dogResponse = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/search?${query}`,
        { credentials: "include" }
      );
      const dogData = await dogResponse.json();

      const dogsResponse = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dogData.resultIds),
      });
  
      const dogs = await dogsResponse.json();

      setMatch(dogs.find(ele => ele.id === data.match))
    };
    fetchMatch();
  }, [favorites]);

  return <div className="matchPage">
    <h2>{match ? `Your matched dog is: ${match.name}` : phrase}</h2>
    <p><strong>Breed: </strong>{match ? match.breed : ''}</p>
    <img src={match ? `${match.img}` : ``} alt="" />
    </div>;
};

export default MatchPage;
