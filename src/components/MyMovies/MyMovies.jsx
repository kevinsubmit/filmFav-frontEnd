import { Link } from "react-router";
import React, { useState, useEffect } from 'react';
import * as mineService from "../../services/mineService";

const MyMovies = () => {
  const [myMovies, setmyMovies] = useState({});
  useEffect(() => {
    fetchMyMovies();
  }, []);
  const fetchMyMovies = async () => {
    const res = await mineService.getMyMovies();
    setmyMovies(res.movies);
  };

  return (
    <ul>
      {myMovies.length > 0 ? (
        myMovies.map((movie) => (
          <li key={movie.id}>
            <article>
              <h2>{movie.title}</h2>
              <img src={movie.poster_url} alt="poster_img" />
              <p>{movie.description}</p>
              <Link to={`/movies/${movie.id}`}>View Details</Link>
            </article>
          </li>
        ))
      ) : (
        <p>my movies cart is empty</p>
      )}
    </ul>
  );
};

export default MyMovies;
