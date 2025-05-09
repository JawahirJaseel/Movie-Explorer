import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Grid, Button, CircularProgress, Box, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";
import Filters from "../components/Filters";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(0);

  // Fetch genre list once
  const fetchGenres = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      setGenres(res.data.genres);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  }, []);

  // Fetch movies based on filters + page
  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: API_KEY,
            language: "en-US",
            page,
            with_genres: selectedGenre || undefined,
            primary_release_year: year || undefined,
            "vote_average.gte": rating || undefined,
          },
        }
      );

      setMovies((prev) =>
        page === 1 ? res.data.results : [...prev, ...res.data.results]
      );
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  }, [page, selectedGenre, year, rating]);

  // Reset page to 1 on filter change
  useEffect(() => {
    setPage(1);
  }, [selectedGenre, year, rating]);

  // Fetch genres on mount
  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  // Fetch movies when page or filters change
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        🎬 Explore Movies
      </Typography>

      <Filters
        genres={genres}
        selectedGenre={selectedGenre}
        setGenre={setGenre}
        year={year}
        setYear={setYear}
        rating={rating}
        setRating={setRating}
      />

      <Grid container spacing={2} mt={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      <Box mt={4} textAlign="center">
        {loading ? (
          <CircularProgress />
        ) : (
          page < totalPages && (
            <Button variant="contained" onClick={handleLoadMore}>
              Load More
            </Button>
          )
        )}
      </Box>
    </Box>
  );
};

export default Home;
