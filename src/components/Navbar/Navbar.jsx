import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import User from "../../assets/user.png";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedOut } from "../../Reducer/Authslice";
import gifFile from "../../assets/2nd.gif"; // Update the path accordingly

const settings = ["Logout"];
const datasets = ["dataset-1", "dataset-2", "dataset-3", "dataset-4"];

// Custom styling for MenuItem
const StyledMenuItem = styled(MenuItem)({
  color: "#333",
  width: "200px",
});

function Navbar({ onDatasetSelect }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElDataset, setAnchorElDataset] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenDatasetMenu = (event) => {
    setAnchorElDataset(event.currentTarget);
  };

  const handleCloseDatasetMenu = (dataset) => {
    setAnchorElDataset(null);
    onDatasetSelect(dataset);
  };

  const handleLogout = () => {
    dispatch(setLoggedOut());
    sessionStorage.removeItem("isLoggedIn");
  };

  return (
    <AppBar
      className="Navbar"
      position="static"
      sx={{
        background: "#1c1e33",
        width: "100%",
        maxWidth: "100%",
        borderBottom: "1px solid #fff",
        borderRadius: "0", // Removed border-radius to remove rounded corners
        boxShadow: "0px 10px 15px rgba(255, 255, 255, 0.5)", // Apply shadow directly
        zIndex: 1200, // Ensure it's above other elements
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  background: "#fff",
                  "&:hover": {
                    background: "#fff",
                  },
                }}
              >
                <Avatar
                  alt="User"
                  src={User}
                  sx={{ padding: "2px", margin: "2px" }}
                />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* GIF Animation Box */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "240px", // Set the width of the box
            }}
          >
            <img
              src={gifFile}
              alt="Animation"
              style={{
                width: "200px", // Adjusts GIF width
                objectFit: "contain", // Ensures the GIF is contained within the Box
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
