import React, { useState } from "react";
import "../App";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./SideBar";
import { Button, Toolbar, Typography, IconButton, AppBar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  const Logout = () =>{
    navigate('/');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleSidebar}
        >
          <MenuIcon />
          <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Button color="inherit" onClick={Logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
