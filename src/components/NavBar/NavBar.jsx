import { useState, useEffect, useContext } from "react";
import { AuthedUserContext } from "../../App";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ handleSignout }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const user = useContext(AuthedUserContext);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLinkClick = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }
      try {
        const response = await fetch(
          `${BACKEND_URL}/search/?query=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const debounceTimeout = setTimeout(fetchSearchResults, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return (
    <>
      {user ? (
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                <img
                  src="https://github.com/bschlo/filmFav-frontEnd/blob/LandingPage/src/assets/Film%20Favorite.png?raw=true"
                  alt="logo"
                />
              </Link>
            </li>
            <div className="searchbar-container">
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search movies..."
                  className="input-searchbar"
                />
              </div>
              {searchQuery && (
                <div className="search-results">
                  {searchResults.length > 0 ? (
                    <ul className="results-movie">
                      {searchResults.map((movie) => (
                        <li key={movie.id} className="results-text">
                          <Link
                            to={`/movies/${movie.id}`}
                            onClick={handleLinkClick}
                          >
                            {movie.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No results found</p>
                  )}
                </div>
              )}
            </div>
            <li>
              <Link to="/movies" className="nav-link">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/mymovies" className="nav-link">
                My Movies
              </Link>
            </li>
            <li>
              <Link to="/watchlist" className="nav-link">
                My Watchlist
              </Link>
            </li>
            <li>
              <Link to="" onClick={handleSignout} className="nav-link">
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                <img
                  src="https://github.com/bschlo/filmFav-frontEnd/blob/LandingPage/src/assets/Film%20Favorite.png?raw=true"
                  alt="logo"
                />
              </Link>
            </li>
            <div className="navbar-tab">
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </div>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
