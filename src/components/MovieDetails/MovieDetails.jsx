import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as movieService from "../../services/movieService";
import ReviewForm from "../ReviewForm/ReviewForm";
import CommentForm from "../CommentForm/CommentForm";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [comments, setComments] = useState({});
  const [toggle, setToggle] = useState(false);

  const fetchMovie = async () => {
    try {
      const movieData = await movieService.show(movieId);
      setMovie(movieData);
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
  };
  const fetchComments = async (reviewId) => {
    try {
      const commentsData = await movieService.showComments(reviewId);
      setComments((prevComments) => ({
        ...prevComments,
        [reviewId]: commentsData, // Store comments for the specific reviewId
      }));
      console.log(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    fetchReviews();
  }, [movieId, toggle]);

  useEffect(() => {
    if (reviews) {
      reviews.forEach((review) => {
        fetchComments(review.id); // Fetch comments for each review
      });
    }
  }, [reviews, toggle]);

  const handleAddReview = async (reviewFormData) => {
    try {
      await movieService.createReview(movieId, reviewFormData);
      setToggle((prev) => !prev);
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  const handleAddComment = async (reviewId, commentFormData) => {
    try {
      await movieService.createComment(reviewId, commentFormData);
      setToggle((prev) => !prev);
    } catch (err) {
      console.error("Error adding comment:", err);
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
          {!reviews?.length && <p>No reviews yet</p>}
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
              <section>
                <h3>Comments</h3>
                <CommentForm
                  handleAddComment={(commentData) =>
                    handleAddComment(review.id, commentData)
                  }
                />
                {comments[review.id] && comments[review.id].length === 0 && (
                  <p>There are no comments.</p>
                )}
                {comments[review.id]?.map((comment) => (
                  <article key={`${comment.id}-${index}`}>
                    <header>
                      <p>
                        {comment.username
                          ? `${comment.username} posted on: ${new Date(
                              comment.created_at
                            ).toLocaleDateString()}`
                          : "Anonymous"}
                      </p>
                    </header>
                    <p>{comment.text}</p>
                  </article>
                ))}
              </section>
            </div>
          ))}
        </section>
      </li>
    </main>
  );
};

export default MovieDetails;
