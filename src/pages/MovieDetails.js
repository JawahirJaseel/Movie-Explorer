import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Chip,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { getMovieDetails } from "../api/tmdb";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await getMovieDetails(id);
        const data = res.data;
        setMovie(data);

        // Extract trailer
        const trailer = data.videos?.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading || !movie) return <CircularProgress sx={{ mt: 5 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {movie.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", borderRadius: 10 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body1" mb={2}>
            {movie.overview}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Genres:
          </Typography>
          {movie.genres.map((genre) => (
            <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
          ))}

          <Typography variant="subtitle1" mt={2}>
            Release Date: {movie.release_date}
          </Typography>
          <Typography variant="subtitle1">
            Rating: {movie.vote_average}
          </Typography>

          {trailerUrl && (
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              href={trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Trailer
            </Button>
          )}
        </Grid>
      </Grid>

      {movie.credits?.cast?.length > 0 && (
        <>
          <Typography variant="h5" mt={5} mb={2}>
            Top Cast
          </Typography>
          <Grid container spacing={2}>
            {movie.credits.cast.slice(0, 6).map((actor) => (
              <Grid item xs={6} sm={4} md={2} key={actor.id}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={actor.name}
                  />
                  <CardContent>
                    <Typography variant="body2" noWrap>
                      {actor.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default MovieDetails;
