import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (page = 1) => {
    const res = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return res.data;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMovies",
  async (page = 1) => {
    const res = await axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return res.data;
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async (page = 1) => {
    const res = await axios.get(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return res.data;
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id) => {
    const res = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    return res.data;
  }
);

export const fetchMovieCredits = createAsyncThunk(
  "movies/fetchMovieCredits",
  async (id) => {
    const res = await axios.get(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    return res.data;
  }
);

export const fetchSearchedMovies = createAsyncThunk(
  "movies/fetchSearchedMovies",
  async ({ query, page = 1 }) => {
    const res = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
    );
    return res.data;
  }
);

const initialState = {
  popular: { movies: [], loading: false, error: null, totalPages: 1 },
  topRated: { movies: [], loading: false, error: null, totalPages: 1 },
  upcoming: { movies: [], loading: false, error: null, totalPages: 1 },
  search: { movies: [], loading: false, error: null, totalPages: 1 },
  selectedMovie: { detail: null, credits: null, loading: false, error: null },
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popular.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular.movies = action.payload.results;
        state.popular.loading = false;
        state.popular.totalPages = action.payload.total_pages;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popular.loading = false;
        state.popular.error = action.error.message;
      })

      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.topRated.loading = true;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRated.movies = action.payload.results;
        state.topRated.loading = false;
        state.topRated.totalPages = action.payload.total_pages;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.topRated.loading = false;
        state.topRated.error = action.error.message;
      })

      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.upcoming.loading = true;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming.movies = action.payload.results;
        state.upcoming.loading = false;
        state.upcoming.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.upcoming.loading = false;
        state.upcoming.error = action.error.message;
      })

      .addCase(fetchMovieDetail.pending, (state) => {
        state.selectedMovie.loading = true;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.selectedMovie.detail = action.payload;
        state.selectedMovie.loading = false;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.selectedMovie.loading = false;
        state.selectedMovie.error = action.error.message;
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.selectedMovie.credits = action.payload;
      })

      .addCase(fetchSearchedMovies.pending, (state) => {
        state.search.loading = true;
      })
      .addCase(fetchSearchedMovies.fulfilled, (state, action) => {
        state.search.movies = action.payload.results;
        state.search.loading = false;
        state.search.totalPages = action.payload.total_pages;
      })
      .addCase(fetchSearchedMovies.rejected, (state, action) => {
        state.search.loading = false;
        state.search.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
