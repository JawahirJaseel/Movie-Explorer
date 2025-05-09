import React from "react";
import { Grid, Typography } from "@mui/material";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useMovieContext();

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Typography>No favorites yet. Start liking movies!</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Favorites;
