import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as movieService from "../../services/movieService";
import './ReviewForm.css'

const ReviewForm = ({ handleAddReview }) => {
  const [formData, setFormData] = useState({ text: "", rating: 0 });
  const { reviewId, movieId } = useParams();
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (reviewId) {
      movieService.updateReview(reviewId, formData);
      navigate(`/movies/${movieId}`);
    } else {
      handleAddReview(formData);
      setFormData({ text: "", rating: 0 });
    }
  };

  return (
    <div className="review-form">
  <form onSubmit={handleSubmit} className="form-container">
    <div className="form-title">{reviewId ? "Edit Review" : "Add Your Review"}</div>
    <div className="form-group">
      <label htmlFor="text-input" className="form-label">Your Review:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        className="form-textarea"
        value={formData.text}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="rating-input" className="form-label">Rating (1-5):</label>
      <input
        required
        type="number"
        name="rating"
        id="rating-input"
        className="form-input"
        min="1"
        max="5"
        step="0.01"
        value={formData.rating}
        onChange={handleChange}
      />
    </div>
    <button type="submit" className="form-button">Submit Review</button>
  </form>
</div>

  );
};

export default ReviewForm;
