
import { useState } from 'react';

const ReviewForm = ({ handleAddReview }) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddReview(formData);
    setFormData({ text: '' });
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
      <button type='submit'>SUBMIT Review</button>
    </form>
  );
};

export default ReviewForm;

