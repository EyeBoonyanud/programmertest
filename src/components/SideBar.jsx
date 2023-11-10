import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import StorageIcon from "@mui/icons-material/Storage";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";

const SidebarMenu = ({ isOpen, onClose }) => {
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

  const [open1, setOpen1] = useState(false);

  const handleClick1 = (event) => {
    event.stopPropagation(); // ป้องกันการสั่นเมื่อคลิก
    setOpen1(!open1);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose} sx={{ border: "10" }}>
      <List sx={{ width: "250px", bgcolor: "background.paper" }}>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#2C3E50", // สีพื้นหลังส่วนหัว
            color: "white", // สีตัวหนังสือของส่วนหัว
            padding: "10px",
          }}
        >
          MGR_FAA
        </div>

        <div>
          <ListItemButton onClick={Home}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItemButton>
        </div>

        <div>
          <ListItemButton onClick={handleClick1}>
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Data Record" />
            {open1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ArrowCircleRightIcon />
                </ListItemIcon>
                <ListItemText onClick={DataPro} primary="Programmer" />
              </ListItemButton>
            </List>
          </Collapse>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ArrowCircleRightIcon />
                </ListItemIcon>
                <ListItemText onClick={DataDept} primary="Department" />
              </ListItemButton>
            </List>
          </Collapse>{" "}
        </div>
      </List>
    </Drawer>
  );
};

export default SidebarMenu;
