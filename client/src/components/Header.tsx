import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";
import { useSnackbar } from "./SnackBarContext";

const Header: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const {showMessage} = useSnackbar()

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
    showMessage("Logged out successfully", "success")
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Management App
        </Typography>
        {user ? (
          <>
            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
              Welcome, {user.username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
