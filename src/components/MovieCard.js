import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useMovieContext } from "../context/MovieContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click from navigating
    isFavorite(movie.id)
      ? removeFromFavorites(movie.id)
      : addToFavorites(movie);
  };

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{
        maxWidth: 250,
        m: 1,
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {movie.poster_path && (
        <CardMedia
          component="img"
          height="350"
          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {movie.title}
          </Typography>
          <IconButton onClick={toggleFavorite} color="error">
            {isFavorite(movie.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date?.substring(0, 4)} • ⭐{" "}
          {movie.vote_average?.toFixed(1)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
