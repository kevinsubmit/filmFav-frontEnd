import { useState } from 'react';

const ReviewForm = ({ handleAddReview }) => {
  const [formData, setFormData] = useState({ text: '', rating: 0 });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddReview(formData);
    setFormData({ text: '', rating: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your Review:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
      <label htmlFor='rating-input'>Rating (1-5):</label>
      <input
        required
        type='number'
        name='rating'
        id='rating-input'
        min='1'
        max='5'
        step='0.01'
        value={formData.rating}
        onChange={handleChange}
      />
      <button type='submit'>SUBMIT Review</button>
    </form>
  );
};

export default ReviewForm;
