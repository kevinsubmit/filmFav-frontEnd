import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as movieService from "../../services/movieService";
import ReviewForm from "../ReviewForm/ReviewForm";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [toggle, setToggle] = useState(false);

  const fetchMovie = async () => {
    try {
      const movieData = await movieService.show(movieId);
      setMovie(movieData);
      console.log(movieData);
    } catch (err) {
      console.error("Error fetching movie:", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const reviewsData = await movieService.showReviews(movieId);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", err);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, [movieId]);
  
  useEffect(() => {
    fetchReviews();
  }, [movieId, toggle]);

  const handleAddReview = async (reviewFormData) => {
    try {
      await movieService.createReview(movieId, reviewFormData);
      setToggle((prev) => !prev);
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
          {reviews?.map((review, index) => (
            <div key={`${review.id}-${index}`}>
              <article>
                <header>
                  <p>
                    {review.username
                      ? `${review.username} posted on: ${new Date(
                          review.created_at
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
