import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as movieService from "../../services/movieService";
import * as mineService from "../../services/mineService";
import ReviewForm from "../ReviewForm/ReviewForm";
import { Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";

import CommentForm from "../CommentForm/CommentForm";

const MovieDetails = () => {
  const user = useContext(AuthedUserContext);
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
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const addToMyMovies = async (movie_ids) => {
    try {
      const myMoviesData = await mineService.addToMyMovies(movie_ids);
      alert(myMoviesData.detail)
      return;
    } catch (error) {
      console.error("Error addToMyMovies:", error);
    }
  };
  const addToMyWatchlist = async (movie_ids) => {
    try {
      const myWatchlistData = await mineService.addToMyWatchlist(movie_ids);
      alert(myWatchlistData.detail)
      return;
    } catch (error) {
      console.error("Error addToMyMovies:", error);
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

  const handleDeleteReview = async (reviewId) => {
    try {
      await movieService.deleteReview(reviewId);
      setToggle((prev) => !prev);
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const handleUpdateReview = async (reviewId, reviewFormData) => {
    try {
      await movieService.updateReview(reviewId, reviewFormData);
      setToggle((prev) => !prev);
    } catch (error) {
      console.error("Error updating review:", error);
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

  const handleDeleteComment = async (commentId) => {
    try {
      await movieService.deleteComment(commentId);
      setToggle((prev) => !prev);
    } catch (err) {
      console.error("Error deleting review:", err);
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
          <div>
            <button onClick={() => addToMyMovies([movie.id])}>
            mark it as myMovies
            </button>
            <button onClick={() => addToMyWatchlist([movie.id])}>
              Add to my watchlist
            </button>
          </div>
        </article>
        <section>
          <h3>Reviews</h3>
          <ReviewForm
            handleAddReview={handleAddReview}
            handleUpdateReview={handleUpdateReview}
          />
          {!reviews?.length && <p>No reviews yet</p>}
          {reviews?.map((review, index) => (
            <div key={`${review.id}-${index}`}>
              <article>
                <h3>Review </h3>
                <header>
                  <p>
                    {review.username
                      ? `${review.username} posted on: ${new Date(
                          review.created_at
                        ).toLocaleDateString()}`
                      : "Anonymous"}
                  </p>
                  {review.username === user && (
                    <>
                      <Link
                        to={`/movies/${movie.id}/reviews/${review.id}/edit`}
                      >
                        Edit Review
                      </Link>
                      <button onClick={() => handleDeleteReview(review.id)}>
                        Delete Review
                      </button>
                    </>
                  )}
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
                    {comment.username === user && (
                      <>
                        <button onClick={() => handleDeleteComment(comment.id)}>
                          Delete Comment
                        </button>
                      </>
                    )}
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