import React, { useState } from "react";
import "../App";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  styled,
  TextField,
  Button,
  Toolbar,
  Typography,
  IconButton,
  AppBar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import MenuIcon from "@mui/icons-material/Menu";
import Test from "./SideBar"; //sidebar ที่สร้างมามั้ย
import DataeRecord from "./DataePro";
import Header from "../components/Header";

function Page1() {
  //ใช้สำหรับเก็บตัวแปล
  //useStae ใช้ในการสร้างข้อมูล เก็บข้อมูล อัพเดตข้อมูล

  const [Year, setYear] = useState(""); // Year คือ state หรือ ค่าเริ่มต้น  ส่วน setYear เป็น function ที่เอาไว้ Update state ในที่นี้คือ update Year
  const [Factory, setFactory] = useState("");
  const [IssueFrom, setIssueFrom] = useState("");
  const [IssueTo, setIssueTo] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  const handleChangeFactory = (event) => {
    setFactory(event.target.value);
  };
  const handleChangeIssueFrom = (event) => {
    setIssueFrom(event.target.value);
  };
  const handleChangeIssueTo = (event) => {
    setIssueTo(event.target.value);
  };

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  //   height: "100%", // Set the height to fill the container
  //   border: "none", // Remove border
  // }));

  return (
    <>
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
            <Test isOpen={isSidebarOpen} onClose={toggleSidebar} />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button color="inherit" onClick={toggleSidebar}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: "80px" }}>
        <div className="formsearch">
          <Paper sx={{ height: "300px", width: "800px", margin: "auto" }}>
            <h1 style={{ margin: "10px" }}>
              <SearchIcon style={{ fontSize: "40px", margin: "5px" }} />
              Search Data
            </h1>

            <table style={{ margin: "auto", marginTop: "20px" }}>
              <tr>
                <td>
                  <FormControl
                    style={{
                      width: "300px",
                      marginBottom: "10px",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Year}
                      label="Year"
                      onChange={handleChangeYear}
                    >
                      <MenuItem value="2023">2023</MenuItem>
                      <MenuItem value="2022">2022</MenuItem>
                      <MenuItem value="2021">2021</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl
                    style={{
                      width: "300px",
                      marginBottom: "10px",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Factory
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Factory}
                      label="Factory"
                      onChange={handleChangeFactory}
                    >
                      <MenuItem value="HQ">HQ</MenuItem>
                      <MenuItem value="A1">A1</MenuItem>
                      <MenuItem value="N1">N1</MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>

              <tr>
                <td>
                  <FormControl
                    style={{
                      width: "300px",
                      marginBottom: "10px",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Issue From
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={IssueFrom}
                      label="IssueFrom"
                      onChange={handleChangeIssueFrom}
                    >
                      <MenuItem value="April">April</MenuItem>
                      <MenuItem value="May">May</MenuItem>
                      <MenuItem value="June">June</MenuItem>
                      <MenuItem value="July">July</MenuItem>
                      <MenuItem value="August">August</MenuItem>
                      <MenuItem value="September">September</MenuItem>
                      <MenuItem value="October">October</MenuItem>
                      <MenuItem value="November">November</MenuItem>
                      <MenuItem value="December">December</MenuItem>
                      <MenuItem value="January">January</MenuItem>
                      <MenuItem value="February">February</MenuItem>
                      <MenuItem value="March">March</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl
                    style={{
                      width: "300px",
                      marginBottom: "10px",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Issue To
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={IssueTo}
                      label="Issue To"
                      onChange={handleChangeIssueTo}
                    >
                      <MenuItem value="April">April</MenuItem>
                      <MenuItem value="May">May</MenuItem>
                      <MenuItem value="June">June</MenuItem>
                      <MenuItem value="July">July</MenuItem>
                      <MenuItem value="August">August</MenuItem>
                      <MenuItem value="September">September</MenuItem>
                      <MenuItem value="October">October</MenuItem>
                      <MenuItem value="November">November</MenuItem>
                      <MenuItem value="December">December</MenuItem>
                      <MenuItem value="January">January</MenuItem>
                      <MenuItem value="February">February</MenuItem>
                      <MenuItem value="March">March</MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <br></br>

              <tr>
                <td
                  colspan={2}
                  style={{ textAlign: "center", marginTop: "30px" }}
                >
                  <Button
                    style={{ backgroundColor: "#80aaff" }}
                    variant="contained"
                    endIcon={<SearchIcon />}
                  >
                    Execute
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    style={{ backgroundColor: "#E5E5E5 ", color: "black" }}
                    variant="contained"
                    endIcon={<RefreshIcon />}
                  >
                    Reset
                  </Button>
                  &nbsp;
                </td>
              </tr>
            </table>
          </Paper>
        </div>
      </div>
    </>
  );
}
export default Page1;
