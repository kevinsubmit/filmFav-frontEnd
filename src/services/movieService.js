const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}`;

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/movies/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/movies/${movieId}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
    })
    return res.json ()
  } catch (error) {
    console.error(error)
  }
}

const createReview = async (movieId, reviewData) => {
  try {
    const res = await fetch(`${BASE_URL}/reviews/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify({...reviewData, movie: movieId}),
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export { 
  index,
  show,
  createReview,
};