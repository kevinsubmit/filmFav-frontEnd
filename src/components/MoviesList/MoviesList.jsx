
import { Link } from 'react-router';

const MoviesList = ({ movies }) => {
  const movieArray = Array.isArray(movies) ? movies : movies?.results || [];

  return (
    <ul>
      {movieArray.length > 0 ? (
        movieArray.map((movie) => (
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
        <p>No movies available</p>
      )}
    </ul>
  );
};

export default MoviesList;
