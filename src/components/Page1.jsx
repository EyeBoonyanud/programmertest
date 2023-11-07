import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
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
import Test from "./SideBar";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Empty } from "antd";
import ClearIcon from "@mui/icons-material/Clear";
import { InfoCircleOutlined } from "@ant-design/icons";

function Page1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearch, setSearch] = useState([]);
  const [checkHead, setCheckHead] = useState("hidden");
  const [checkEmpty, setCheckEmpty] = useState("hidden");
  const [checkData, setCheckData] = useState("visible"); // datashow warning

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const Search = async () => {
    const value = document.getElementById("Search").value;
    const fname = document.getElementById("Name").value;
    console.log(value);
    console.log(fname);

    if (!value && !fname) {
      try {
        const rollNoSearch = await axios.get(`http://localhost:3000/getDataPro`);
        const dataSearch = rollNoSearch.data;
        setSearch(dataSearch);
        setCheckHead("visible");
        setCheckEmpty("hidden");
        setCheckData("hidden");
        console.log("Roll Server list:", dataSearch);
      } catch (error) {
        console.error("Error requesting data:", error);
      }
    } else {
      try {
        const rollNoSearch = await axios.get(
          `http://localhost:3000/getSearch?value=${value}&fname=${fname}`
        );
        const dataSearch = rollNoSearch.data;
        setSearch(dataSearch);
        setCheckHead("visible");

        // Update checkEmpty and checkData based on the length of dataSearch
        if (dataSearch.length === 0) {
          setCheckEmpty("visible");
          setCheckData("hidden");
        } else {
          setCheckEmpty("hidden");
          setCheckData("visible");
        }

        console.log("Roll Server list:", dataSearch);
      } catch (error) {
        console.error("Error requesting data:", error);
      }
    }
  };

  const handleResetData = () => {
    document.getElementById("Search").value = "";
    document.getElementById("Name").value = "";
    setSearch([]);
    setCheckHead("hidden");
    setCheckEmpty("hidden");
    setCheckData("visible");
  };

  const handleReset = () => {
    document.getElementById("Search").value = "";
    document.getElementById("Name").value = "";
  };

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

      <div style={{ margin: "0px 50px 0px 50px" }}>
        <div style={{ marginTop: "80px" }}>
          <h1 style={{ marginTop: "10px" }}>
            <SearchIcon style={{ fontSize: "40px", margin: "5px" }} />
            Search Data
          </h1>
          <div
            className="formsearch"
            style={{
              width: "750px",
              height: "70px",
              borderRadius: "10px",
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <table style={{ marginLeft: "30px", marginTop: "20px" }}>
              <tr>
                <td style={{ textAlign: "left" }}>
                  <TextField
                    size="small"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "4px",
                      width: "200px",
                      marginTop: "10px",
                      marginRight: "5px",
                    }}
                    id="Search"
                    label="CodeID"
                    InputProps={{
                      endAdornment: (
                        <ClearIcon
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={handleReset}
                        />
                      ),
                    }}
                  ></TextField>
                  <TextField
                    size="small"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "4px",
                      width: "200px",
                      marginTop: "10px",
                    }}
                    id="Name"
                    label="Name"
                    InputProps={{
                      endAdornment: (
                        <ClearIcon
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={handleReset}
                        />
                      ),
                    }}
                  ></TextField>
                </td>
                <td colspan={2}>
                  <Button
                    onClick={Search}
                    style={{
                      backgroundColor: "#80aaff",
                      marginTop: "10px",
                      marginLeft: "10px",
                    }}
                    variant="contained"
                    startIcon={<SearchIcon />}
                  >
                    Execute
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    onClick={handleResetData}
                    style={{
                      backgroundColor: "#E5E5E5 ",
                      color: "black",
                      marginTop: "10px",
                    }}
                    variant="contained"
                    startIcon={<RefreshIcon />}
                  >
                    Reset
                  </Button>
                  &nbsp;
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div
          className="table"
          style={{
            marginTop: "30px",
            borderRadius: "10px",
            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <TableContainer
            style={{
              visibility: checkHead,
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
            }}
          >
            <Table style={{ margin: "auto" }} aria-label="simple table">
              <TableHead align="left" style={{ backgroundColor: "#A7C9FA" }}>
                <TableRow>
                  <TableCell>Id Code</TableCell>
                  <TableCell>Firstname</TableCell>
                  <TableCell>Lestname</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Telephone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="left">
                {isSearch.length > 0 ? (
                  isSearch.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{item[0]}</TableCell>
                      <TableCell>{item[1]}</TableCell>
                      <TableCell>{item[2]}</TableCell>
                      <TableCell>{item[3]}</TableCell>
                      <TableCell>{item[5]}</TableCell>
                      <TableCell>{item[6]}</TableCell>
                      <TableCell>{item[9]}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow style={{ visibility: checkEmpty }}>
                    <TableCell colSpan={7} align="center">
                      <InfoCircleOutlined
                        style={{
                          visibility: checkData,
                          fontSize: "30px",
                          color: "#ffd580",
                        }}
                      />
                      <text
                        style={{
                          visibility: checkData,
                          fontSize: "25px",
                          marginLeft: "10px",
                        }}
                      >
                        {" "}
                        Please fill in information{" "}
                      </text>
                      <Empty style={{ visibility: checkEmpty }} />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default Page1;
