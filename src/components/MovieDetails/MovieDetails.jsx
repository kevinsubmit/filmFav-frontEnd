import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as movieService from "../../services/movieService";
import ReviewForm from "../ReviewForm/ReviewForm";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await movieService.show(movieId);
        setMovie(movieData);
        console.log(movieData);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };
    fetchMovie();
  }, [movieId]);

  const handleAddReview = async (reviewFormData) => {
    try {
      const review = await movieService.createReview(movieId, reviewFormData);
      setMovie((prevMovie) => ({
        ...prevMovie,
        reviews: [...(prevMovie.reviews || []), review],
      }));
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  if (!movie) {
    return (
      <main>
        <h1>Movie Details</h1>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Movie Details</h1>
      <li key={movie.id}>
        <article>
          <h2>{movie.title}</h2>
          <img src={movie.poster_url} alt={`${movie.title} Poster`} />
          <p>{movie.description}</p>
        </article>
        <section>
          <h3>Reviews</h3>
          <ReviewForm handleAddReview={handleAddReview} />
          {!movie.reviews?.length && <p>No reviews yet</p>}
          {movie.reviews?.map((review, index) => (
            <div key={`${review.id}-${index}`}>
              <article>
                <header>
                  <p>
                    {review.author
                      ? `${review.author.username} posted on: ${new Date(
                          review.createdAt
                        ).toLocaleDateString()}`
                      : "Anonymous"}
                  </p>
                </header>
                <p>{review.text}</p>
              </article>
            </div>
          ))}
        </section>
      </li>
    </main>
  );
};

export default MovieDetails;
