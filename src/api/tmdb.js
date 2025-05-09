// src/api/tmdb.js
import axios from "axios";

// const BEARER_TOKEN =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2NhZTY5Y2I2OGVhNWRhMWI3ZDhkZTcyMzdlNjkzOCIsIm5iZiI6MS43NDY3MDE4OTE2NzkwMDAxZSs5LCJzdWIiOiI2ODFjOGU0M2EyZWMwZWYwYzU2M2I3NmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7RzZYq0AW7V74rq6Q7QAt0qq3VyOvCMeiUr5Uq9kN7A"; // Replace this

const API_KEY = "d3cae69cb68ea5da1b7d8de7237e6938"; // Replace with your actual TMDB API key

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
  },
});

export default axiosInstance;

export const getTrendingMovies = () =>
  axiosInstance.get("/trending/movie/week");

export const searchMovies = (query, page = 1) =>
  axiosInstance.get(`/search/movie?query=${query}&page=${page}`);

export const getMovieDetails = (id) =>
  axiosInstance.get(`/movie/${id}?append_to_response=videos,credits`);

export const getMovieVideos = (id) => axiosInstance.get(`/movie/${id}/videos`);
