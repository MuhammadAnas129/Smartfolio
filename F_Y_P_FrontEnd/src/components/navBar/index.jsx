import {
  AppBar,
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../assets/newlogo.png";
// import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
const navContainer = {
  height: "60px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: "Roboto",
};
const navMenuIcon = {
  display: {
    xs: "flex",
    sm: "flex",
    md: "none",
    lg: "none",
  },
};
export default function Default() {
  let navigator = useNavigate();
  let location = useLocation();
  let routes = [
    // {
    //   name: 'DASHBOARD',
    //   path: '/Dashboard'
    // },
    {
      name: "COVERLETTER",
      path: "/LetterDashboard",
    },
    {
      name: "Resume Builder",
      path: "/ResumeDashboard",
    },
    {
      name: "Portfolio Creation",
      path: "/PortfolioDashboard",
    },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const noNavbarRoutes = [
    "/userPortfolio/corporatePortfolio",
    "/userPortfolio/persuasivePortfolioTemplate",
    "/userPortfolio/relevantPortfolioTemplate",
  ];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar ? (
        <AppBar
          style={{
            backgroundColor: "white",
            padding: "0px 10px",
          }}
        >
          {/* <Container style={navContainer}> */}
          <Box style={navContainer}>
            <Box>
              <div className="flex flex-row ml-20">
                <img src={logo} alt="logo" />
                <Link
              to="/"
              className="font-semibold text-2xl text-lime-500 p-1 mt-1.5 cursor-pointer"
            >
              SmartFolio
            </Link>
              </div>
            </Box>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                },
                position: "relative",
                fontSize: "14px",
              }}
            >
              {routes.map((item, index) => (
                <React.Fragment key={index}>
                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <MenuItem
                      key={index}
                      onClick={() => {
                        navigator(`${item.path}`);
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "14px",
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: "500",
                          textTransform: "uppercase",
                          color:
                            location.pathname === item.path
                              ? "#40A578"
                              : "#979797",
                          "&:hover": {
                            color: "#40A578",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        {item.name}
                      </Typography>
                    </MenuItem>
                  </Box>
                </React.Fragment>
              ))}
              <>
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      localStorage.clear();
                      navigator(`/`);
                      window.location.reload();
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: "500",
                        textTransform: "uppercase",
                        color: "#979797",
                        "&:hover": {
                          color: "#40A578",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      logout
                    </Typography>
                  </MenuItem>
                </Box>
              </>
            </Box>
            <IconButton
              sx={navMenuIcon}
              aria-label="menu"
              onClick={handleClick}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Menu
              sx={{
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "none",
                  lg: "none",
                },
                marginTop: "15px",
                alignItems: "center",
              }}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {routes.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    navigator(`${item.path}`);
                    setAnchorEl(null);
                  }}
                  sx={{
                    fontSize: "14px",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    color:
                      location.pathname === item.path ? "#40A578" : "#979797",
                    "&:hover": {
                      color: "#40A578",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </AppBar>
      ) : null}
    </>
  );
}
