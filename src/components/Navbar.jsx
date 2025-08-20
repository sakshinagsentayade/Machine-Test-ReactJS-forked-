import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery("");
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        padding: 15,
        borderBottom: "1px solid #ccc",
      }}
    >
      <button onClick={() => navigate("/")}>Popular</button>
      <button onClick={() => navigate("/top-rated")}>Top Rated</button>
      <button onClick={() => navigate("/upcoming")}>Upcoming</button>
      <form onSubmit={submitSearch} style={{ marginLeft: "auto" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
      </form>
    </nav>
  );
}

export default Navbar;
