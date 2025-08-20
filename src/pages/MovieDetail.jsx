import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetail, fetchMovieCredits } from '../redux/slices/moviesSlice';
import { useParams } from 'react-router-dom';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

function MovieDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail, credits, loading, error } = useSelector(state => state.movies.selectedMovie);

  useEffect(() => {
    dispatch(fetchMovieDetail(id));
    dispatch(fetchMovieCredits(id));
  }, [dispatch, id]);

  if (loading || !detail) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h2>{detail.title}</h2>
      <img src={`${IMG_BASE}${detail.poster_path}`} alt={detail.title} style={{ width: 200 }} />
      <p><strong>Overview:</strong> {detail.overview}</p>
      <p><strong>Genres:</strong> {detail.genres.map(g => g.name).join(', ')}</p>
      <p><strong>Release Date:</strong> {detail.release_date}</p>
      <p><strong>Rating:</strong> {detail.vote_average}</p>
      <p><strong>Duration:</strong> {detail.runtime} minutes</p>
      <h3>Cast</h3>
      <ul>
        {credits?.cast?.slice(0, 6).map(actor => (
          <li key={actor.cast_id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetail;