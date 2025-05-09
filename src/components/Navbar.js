import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: "Home", path: "/" },
    { text: "Favorites", path: "/favorites" },
  ];

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            🎬 Movie App
          </Typography>

          {isMobile ? (
            <>
              <Box display="flex" alignItems="center">
                <ThemeToggle />
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 200 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                >
                  <List>
                    {navItems.map((item) => (
                      <ListItem
                        button
                        key={item.text}
                        component={Link}
                        to={item.path}
                      >
                        <ListItemText primary={item.text} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box display="flex" alignItems="center">
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{ ml: 2, textTransform: "none" }}
                >
                  {item.text}
                </Button>
              ))}
              <ThemeToggle />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
