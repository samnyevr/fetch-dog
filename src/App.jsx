import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import MatchPage from "./pages/MatchPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    function getSessionStorageWithExpiry(key) {
      const itemStr = sessionStorage.getItem(key);
      if (!itemStr) {
        return null;
      }
      const item = JSON.parse(itemStr);
      const now = new Date();
      if (now.getTime() > item.expiry) {
        sessionStorage.removeItem(key);
        return null;
      }
      return item.value;
    }
  
    const expireyTime = getSessionStorageWithExpiry("loginSuccess")
  
    if(expireyTime) {
      setUser(true)
    }
  }, []);

  return (
    <Router>
      {user && <Header />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/search" /> : <LoginPage setUser={setUser} />} />
        <Route path="/search" element={user ? <SearchPage favorites={favorites} setFavorites={setFavorites} /> : <Navigate to="/" />} />
        <Route path="/match" element={user ? <MatchPage favorites={favorites} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
