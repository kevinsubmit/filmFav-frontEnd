import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as movieService from "../../services/movieService";
import ReviewForm from "../Review/ReviewForm";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
 

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await movieService.show(movieId);
      setMovie(movieData);
    };
    fetchMovie();
  }, [movieId]);

  const  handleAddReview = async (reviewFormData) => {
    try {
      const review = await movieService.createReview(movieId, reviewFormData);
      setMovie ({...movie, reviews: [...movie.reviews, review]});
    } catch (err) {
      console.log(err);
    }
  }

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
      Movie Details
      <li key={movie.id}>
        {movie.title}
        <article>
          <h2>{movie.title}</h2>
          <img src={movie.poster_url} alt="poster_img" />
          <p>{movie.description}</p>
        </article>
        <section>
        <h3>Reviews</h3>
        <ReviewForm handleAddReview={handleAddReview}>
          {!movie.reviews?.length ? <p>No reviews yet</p> : null}
          {movie.reviews && movie.reviews.map((review) => (
            <article key={review.id}>
            <header>
            <p>
            {`${review.author.username} posted on: ${new Date(review.createdAt).toLocaleDateString()}`}
            </p>
            </header>
            <p>{review.text}</p>
            </article>
          ))}
        </ReviewForm>
        </section>
      </li>
    </main>
  );
};

export default MovieDetails;
