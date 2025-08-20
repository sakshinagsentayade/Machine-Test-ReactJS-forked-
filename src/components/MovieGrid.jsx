import React from "react";
import { useNavigate } from "react-router-dom";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function MovieGrid({ movies }) {
  const navigate = useNavigate();
  if (!movies?.length) return <p>No movies found.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {movies.map((movie) => (
        <div
          key={movie.id}
          style={{ width: 200, cursor: "pointer" }}
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <img
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", height: 300, objectFit: "cover" }}
          />
          <h4>{movie.title}</h4>
          <p>Rating: {movie.vote_average}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieGrid;
