import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { clearUser } from "../../features/user";
import styles from "./PageNav.module.css";
import logo from "/logo.png";

const pages = ["Product", "Pricing", "Contact"];

export default function PageNavUpdated() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      className={styles.nav}
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        "& .MuiButton-root": {
          color: "var(--bs-gray-200)",
          fontSize: "1rem",
        },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to={"/"}>
            <Box
              component="img"
              sx={{
                height: 70,
                display: { xs: "none", md: "flex" },
                mr: 1,
                mb: 1.2,
              }}
              alt="Logo"
              src={logo}
            />
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiMenu-paper": { backgroundColor: "var(--color-dark--2)" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink
                    style={{
                      textDecoration: "none",
                      textTransform: "capitalize",
                      color: "var(--color-light--2)",
                    }}
                    to={`/`}
                  >
                    Home
                  </NavLink>
                </Typography>
              </MenuItem>

              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink
                      style={{
                        textDecoration: "none",
                        textTransform: "capitalize",
                        color: "var(--color-light--2)",
                      }}
                      to={`/${page}`}
                    >
                      {page}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <NavLink to={"/"}>
            <Box
              component="img"
              sx={{
                height: 55,
                display: { xs: "flex", md: "none" },
                mr: 5,
              }}
              alt="Logo"
              src={logo}
            />
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink key={page} to={`/${page}`}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>

          {!user.uid ? (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Typography
                    mr={1}
                    sx={{
                      color: "var(--color-light--2)",
                    }}
                  >
                    Welcome, {user.email.split("@")[0]}
                  </Typography>
                  <Avatar alt="user icon" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiMenu-paper": {
                    backgroundColor: "var(--color-dark--2)",
                  },

                  "& .MuiMenu-list": {
                    p: 0,
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <NavLink
                  style={{
                    color: "var(--color-light--2)",
                    textDecoration: "none",
                  }}
                  to="/"
                  onClick={handleLogout}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Sign out</Typography>
                  </MenuItem>
                </NavLink>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
