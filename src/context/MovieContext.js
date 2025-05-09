import React, { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Optional: Load from localStorage
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    // Optional: Save to localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    if (!favorites.find((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
  };

  const isFavorite = (id) => favorites.some((movie) => movie.id === id);

  return (
    <MovieContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </MovieContext.Provider>
  );
};
