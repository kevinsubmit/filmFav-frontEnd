
import { Link } from 'react-router';
import './MoviesList.css';

const MoviesList = ({ movies }) => {
  const movieArray = Array.isArray(movies) ? movies : movies?.results || [];

  return (
    <main>
    <ul className="movies-list">
      {movieArray.length > 0 ? (
        movieArray.map((movie) => (
          <li key={movie.id} className="movie-card">
            <article>
            <Link to={`/movies/${movie.id}`} className="movie-link">
            <img src={movie.poster_url} alt="poster_img" className="img" /></Link>
            </article>
          </li>
        ))
      ) : (
        <p>No movies available</p>
      )}
    </ul>
    </main>
  );
};

export default MoviesList;
