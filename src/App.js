import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import { MovieProvider } from "./context/MovieContext";
import { CustomThemeProvider } from "./theme/ThemeContext";
import Navbar from "./components/Navbar"; // Import Navbar
import Container from "@mui/material/Container";
import "./App.css";

function App() {
  return (
    <CustomThemeProvider>
      <MovieProvider>
        <Router>
          <Navbar />
          <Container sx={{ mt: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Container>
        </Router>
      </MovieProvider>
    </CustomThemeProvider>
  );
}

export default App;
