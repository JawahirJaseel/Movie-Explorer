import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Slider,
  Grid,
  Typography,
} from "@mui/material";

const Filters = ({
  genres,
  selectedGenre,
  setGenre,
  year,
  setYear,
  rating,
  setRating,
}) => {
  return (
    <Box mt={2}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            select
            label="Genre"
            value={selectedGenre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 2023"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>Minimum Rating: {rating}</Typography>
          <Slider
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            min={0}
            max={10}
            step={0.5}
            marks
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
