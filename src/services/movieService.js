const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/movies/`;

// const index = async () => {
//   const res = await fetch(BASE_URL);
//   if (!res.ok) {
//     throw new Error('Failed to fetch movies');
//   }
//   const movies = await res.json();
//   return movies;
// }

// export { index };

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { 
  index,
};