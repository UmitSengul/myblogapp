import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useSelector } from "react-redux";
import {
  userMenuItems,
  userNavBarPages,
  visitorNavBarPages,
} from "../helpers/variables";
import useAuthCall from "../hooks/useAuthCalls";
import { useNavigate } from "react-router-dom";

function Navbar({ setPrefersDarkMode, prefersDarkMode }) {
  const { logout } = useAuthCall();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const handleThemeChange = () => {
    setPrefersDarkMode(!prefersDarkMode);
  };

  const NavigateMenu = (event) => {
    console.log(event.target.innerText);
    if (event.target.innerText.toUpperCase() === "LOGOUT") {
      logout();
    } else if (event.target.innerText.toUpperCase() === "ADMIN PANEL") {
      navigate(`/AdminPanel`);
    } else if (event.target.innerText.toUpperCase() === "HOME") {
      navigate(`/`);
    } else {
      navigate(`/${event.target.innerText}`);
    }
  };
  console.log(userNavBarPages);
  console.log(currentUser);

  return (
    <AppBar position="static" style={{ marginBottom: "1rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" } }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

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
              }}
            >
              {currentUser !== null
                ? userNavBarPages.map((page, index) => (
                    <MenuItem
                      key={index}
                      onClick={(e) => {
                        handleCloseNavMenu();
                        NavigateMenu(e);
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))
                : visitorNavBarPages.map((page, index) => (
                    <MenuItem
                      key={index}
                      onClick={(e) => {
                        handleCloseNavMenu();
                        NavigateMenu(e);
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" } }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {currentUser !== null
              ? userNavBarPages.map((page, index) => (
                  <MenuItem
                    key={index}
                    onClick={(e) => {
                      handleCloseNavMenu();
                      NavigateMenu(e);
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))
              : visitorNavBarPages.map((page, index) => (
                  <MenuItem
                    key={index}
                    onClick={(e) => {
                      handleCloseNavMenu();
                      NavigateMenu(e);
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
          </Box>
          <Box sx={{ marginRight: "1.5rem" }}>
            <Tooltip
              title="Theme"
              variant="contain"
              sx={{ width: "20px", height: "20px" }}
              onClick={handleThemeChange}
            >
              <IconButton>
                <WbSunnyIcon sx={{ width: "1.2rem" }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://picsum.photos/200" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              {currentUser !== null ? (
                userMenuItems.map((item) => (
                  <MenuItem
                    key={item}
                    onClick={(e) => {
                      handleCloseUserMenu();
                      NavigateMenu(e);
                    }}
                  >
                    <Typography textAlign="center">{item}</Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem
                  onClick={(e) => {
                    handleCloseUserMenu();
                    NavigateMenu(e);
                  }}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
