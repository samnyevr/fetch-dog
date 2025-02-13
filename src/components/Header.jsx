import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const pathname = window.location.pathname;

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("https://frontend-take-home-service.fetch.com/auth/logout", {}, { withCredentials: true });
      sessionStorage.removeItem("loginSuccess")
      navigate("/fetch-dog");
      location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header>
      <h1>🐶 Fetch Dog Finder
        <button onClick={handleLogout} className="logout">
              Logout
            </button>
      </h1>
      <nav>
        <Link to="/search" className={pathname === "/search" ? "active" : ""} >Search</Link>
        <Link to="/match" className={pathname === "/match" ? "active" : ""} >Match</Link>
      </nav>
    </header>
  );
};

export default Header;
