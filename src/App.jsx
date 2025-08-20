import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PopularMovies from "./pages/PopularMovies";
import TopRatedMovies from "./pages/TopRatedMovies";
import UpcomingMovies from "./pages/UpcomingMovies";
import MovieDetail from "./pages/MovieDetail";
import SearchedMovies from "./pages/SearchedMovies";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PopularMovies />} />
        <Route path="/top-rated" element={<TopRatedMovies />} />
        <Route path="/upcoming" element={<UpcomingMovies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchedMovies />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
