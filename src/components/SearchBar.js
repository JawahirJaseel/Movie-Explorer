import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ query, setQuery, onSearch }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && onSearch()}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
