import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../redux/slices/moviesSlice";
import MovieGrid from "../components/MovieGrid";

function PopularMovies() {
  const dispatch = useDispatch();
  const { movies, loading, error, totalPages } = useSelector(
    (state) => state.movies.popular
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPopularMovies(page));
  }, [dispatch, page]);

  return (
    <div>
      <h2>Popular Movies</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <MovieGrid movies={movies} />
      <div>
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PopularMovies;
