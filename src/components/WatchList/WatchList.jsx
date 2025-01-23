import { Link } from "react-router";
import React, { useState, useEffect } from 'react';
import * as mineService from "../../services/mineService";

const WatchList = () => {
  const [watchList, setwatchList] = useState({});
  useEffect(() => {
    fetchWatchList();
  }, []);
  const fetchWatchList = async () => {
    const res = await mineService.getWatchList();
    setwatchList(res.movies);
  };
 

    const removeFromMyWatchlist = async (movie_ids) => {
      try {
        const myWatchlistsData = await mineService.removeFromMyWatchlist(movie_ids);
        if (myWatchlistsData) {
          const movie_id = movie_ids[0];
          const myNewWatchList = watchList.filter((movie) => movie.id !== movie_id);
          setwatchList(myNewWatchList);
        }
      } catch (error) {
        console.error("Error removeFromMyMovies:", error);
      }
    };

  return (
    <ul>
      {watchList.length > 0 ? (
        watchList.map((movie) => (
          <li key={movie.id}>
            <article>
              <h2>{movie.title}</h2>
              <img src={movie.poster_url} alt="poster_img" />
              <p>{movie.description}</p>
              <Link to={`/movies/${movie.id}`}>View Details</Link>
              <div>
                <button onClick={() => removeFromMyWatchlist([movie.id])}>
                remove From MyWatchlist
                </button>
              </div>
            </article>
          </li>
        ))
      ) : (
        <p>my Watchlist is empty</p>
      )}
    </ul>
  );
};

export default WatchList;
