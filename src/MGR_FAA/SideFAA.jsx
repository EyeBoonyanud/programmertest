import React, { useEffect, useState, StrictMode } from "react";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {List,ListItemButton,ListItemIcon,ListItemText,Collapse} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import TransformIcon from '@mui/icons-material/Transform';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AssessmentIcon from '@mui/icons-material/Assessment';



function SidebarMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const Page1 = () => {
    navigate("/DataRecord");
  };
  const Home = () => {
    navigate("/");
  };
  
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);

  const handleClick1 = (event) => {
    event.stopPropagation(); // ป้องกันการสั่นเมื่อคลิก
    setOpen1(!open1);
  };

  const handleClick2 = (event) => {
    event.stopPropagation(); // ป้องกันการสั่นเมื่อคลิก
    setOpen2(!open2);
  };
  const handleClick3 = (event) => {
    event.stopPropagation(); // ป้องกันการสั่นเมื่อคลิก
    setOpen3(!open3);
  };
  const handleClick4 = (event) => {
    event.stopPropagation(); // ป้องกันการสั่นเมื่อคลิก
    setOpen4(!open4);
  };
  const handleClick5 = (event) => {
    event.stopPropagation(); // ป้องกันการสั่นเมื่อคลิก
    setOpen5(!open5);
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

        {/* transection */}
        <div>
          <ListItemButton onClick={handleClick1}>
            <ListItemIcon>
              <TransformIcon />
            </ListItemIcon>
            <ListItemText primary="Transaction" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText onClick={Home} primary="Issue" />
              </ListItemButton>
            </List>
          </Collapse>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText onClick={Page1} primary="Approve" />
              </ListItemButton>
            </List>
          </Collapse>{" "}
        </div>

        {/* Monitoring Function */}
        <div>
          <ListItemButton onClick={handleClick3}>
            <ListItemIcon>
              <FileCopyIcon />
            </ListItemIcon>
            <ListItemText primary="Monitoring Function" />
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText onClick={Page1} primary="FAA Master List" />
              </ListItemButton>
            </List>
          </Collapse>
        </div>

        {/* repoert functions */}
        <div>
          <ListItemButton onClick={handleClick2}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Repoert Functions" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText onClick={Page1} primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </div>
      </List>
    </Drawer>
  );
}

export default SidebarMenu;
