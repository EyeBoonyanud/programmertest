import React, { useEffect, useState, StrictMode } from "react";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import TransformIcon from "@mui/icons-material/Transform";

function SidebarMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const DataPro = () => {
    navigate("/DataPro");
  };
  const DataDept = () => {
    navigate("/DataDept");
  };
  const Home = () => {
    navigate("/Page1");
  };
  

  const [open1, setOpen1] = React.useState(false);

  const handleClick1 = (event) => {
    event.stopPropagation(); // ป้องกันการสั่นเมื่อคลิก
    setOpen1(!open1);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose} sx={{ border: "10" }}>
      <List
        sx={{ width: "250px", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <div style={{ textAlign: "center" }}>
          <text>MGR_FAA</text>
        </div>

        <div>
          <ListItemButton onClick={Home}>
            <ListItemIcon>
              <TransformIcon />
            </ListItemIcon>
            <ListItemText primary="Search"></ListItemText>
          </ListItemButton>
        </div>
        {/* DataRecord */}
        <div>
          <ListItemButton onClick={handleClick1}>
            <ListItemIcon>
              <TransformIcon />
            </ListItemIcon>
            <ListItemText primary="Data Record" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText onClick={DataPro} primary="Programmer" />
              </ListItemButton>
            </List>
          </Collapse>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText onClick={DataDept} primary="Department" />
              </ListItemButton>
            </List>
          </Collapse>{" "}
        </div>

      </List>
    </Drawer>
  );
}

export default SidebarMenu;
