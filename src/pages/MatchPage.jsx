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

      const dogsResponse = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify([data.match]),
      });
  
      const dogs = await dogsResponse.json();

      if (!Array.isArray(dogs) || !dogs.length) {
        setPhrase("Can't find any dogs that match, select your favorites from the search tab")
        return
      }

      setMatch(dogs.find(ele => ele.id === data.match))
    };
    fetchMatch();
  }, [favorites]);

  return <div className="matchPage">
    <h2>{match ? `Your matched dog is: ${match.name}` : phrase}</h2>
    {match && <p><strong>Breed: </strong>{match ? match.breed : ''}</p>}
    {match && <img src={match.img} alt="" />}
    </div>;
};

export default MatchPage;
