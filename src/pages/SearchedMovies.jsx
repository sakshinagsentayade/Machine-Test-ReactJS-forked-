import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedMovies } from "../redux/slices/moviesSlice";
import MovieGrid from "../components/MovieGrid";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchedMovies() {
  const dispatch = useDispatch();
  const queryParam = useQuery();
  const movieName = queryParam.get("q") || "";
  const { movies, loading, error, totalPages } = useSelector(
    (state) => state.movies.search
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (movieName) {
      dispatch(fetchSearchedMovies({ query: movieName, page }));
    }
  }, [dispatch, movieName, page]);

  return (
    <div>
      <h2>Searched Movies "{movieName}"</h2>
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

export default SearchedMovies;
