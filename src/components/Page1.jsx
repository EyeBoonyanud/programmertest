import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  TextField,
  Button,
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  FormControl,
  Select,
  MenuItem,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import MenuIcon from "@mui/icons-material/Menu";
import { Empty } from "antd";
import ClearIcon from "@mui/icons-material/Clear";
import { InfoCircleOutlined } from "@ant-design/icons";
import Test from "./SideBar";
import axios from "axios";


function Page1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); //ตัวแปรเปิดปิด Sidebar
  const [isSearch, setSearch] = useState([]); //ตัวแปร Search
  const [checkHead, setCheckHead] = useState("hidden"); //ตัวแปรเช็คค่าของ ตาราง
  const [checkEmpty, setCheckEmpty] = useState("hidden"); // ตัวแปรเช็คค่าว่าง
  const [checkData, setCheckData] = useState("visible"); // ตัวแปร datashow warning
  const [firstSearchData, setFirstSearchData] = useState([]); // ตัวแปร ไว้เก็บค่าของ การ Search ครั้งแรก
  const [secondRoundSearchValue, setSecondRoundSearchValue] = useState(""); // ตัวแปรไว้เก็บค่าครั้งที่ 2
  // ชุดเก็บค่าของ status
  const [status, setStatus] = useState(""); // เก็บค่า status
  // เก็บค่า Dropdown ของ Status
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };
  // ตัว 3 ขีด เอาไว้บอกว่าเปิดหรือปิด
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  //Search ครั้งที่ 1
  const Search = async () => {
    const value = document.getElementById("Search").value;
    const fname = document.getElementById("Name").value;

    console.log(status);

    if (!value && !fname && !status ) {
      try {
        const rollNoSearch = await axios.get(
          `http://localhost:3000/getDataPro`
        );
        const dataSearch = rollNoSearch.data;
        setSearch(dataSearch);
        setFirstSearchData(dataSearch); // เก็บข้อมูลที่ค้นหาจากชุดที่ 1
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
          `http://localhost:3000/getSearch?value=${value}&fname=${fname}&status=${status}`
        );
        const dataSearch = rollNoSearch.data;
        setSearch(dataSearch);
        setFirstSearchData(dataSearch); // เก็บข้อมูลที่ค้นหาจากชุดที่ 1
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
  //Search ครั้งที่ 2
  const SearchSecondRound = async () => {
    try {
      const rollNoSearch = await axios.get(
        `http://localhost:3000/getSearch?value=&secondRoundSearchValue=${secondRoundSearchValue}`
      );
      const dataSearch = rollNoSearch.data;

      // ต่อข้อมูลที่ค้นหาจากชุดที่ 2 เข้าไป
      setSearch(dataSearch);
      setCheckHead("visible");

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
  };

  //เอาไว้ Reset ค่า ทั้งหมด
  const handleResetData = () => {
    document.getElementById("Search").value = "";
    document.getElementById("Name").value = "";
    setSearch([]);
    setStatus("");
    setCheckHead("hidden");
    setCheckEmpty("hidden");
    setCheckData("visible");
  };
  //ของตัวกากบาท เอาไว้เคลียร์ค่าในกากบาท
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
              display: "flex",
              alignItems: "center",
              borderRadius: "10px",
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
              height: "70px",
              padding: "10px",
            }}
          >
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
            <FormControl>
              <Select
                size="small"
                style={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  width: "200px",
                  marginTop: "10px",
                  marginRight: "5px",
                }}
                labelId="demo-simple-select-label"
                id="Status"
                value={status}
                onChange={(event) => handleStatus(event)}
              >
                <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                <MenuItem value="INACTIVE">INACTIVE</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={Search}
              style={{
                backgroundColor: "#80aaff",
                marginLeft: "10px",
                borderRadius: "4px",
                width: "200px",
                marginTop: "10px",
                marginRight: "5px",
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
                marginLeft: "10px",
                borderRadius: "4px",
                width: "200px",
                marginTop: "10px",
                marginRight: "5px",
              }}
              variant="contained"
              startIcon={<RefreshIcon />}
            >
              Reset
            </Button>
            &nbsp;
          </div>
        </div>
      </div>
      <div>
        <Button
          onClick={SearchSecondRound}
          style={{
            backgroundColor: "#80aaff",
            marginLeft: "10px",
            borderRadius: "4px",
            width: "200px",
            marginTop: "10px",
            marginRight: "5px",
          }}
          variant="contained"
          startIcon={<SearchIcon />}
        >
          Search Second Round
        </Button>

        <TextField
          size="small"
          style={{
            backgroundColor: "white",
            borderRadius: "4px",
            width: "200px",
            marginTop: "10px",
          }}
          id="SecondRoundSearch"
          label="Search by ID"
          value={secondRoundSearchValue}
          onChange={(e) => setSecondRoundSearchValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <ClearIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setSecondRoundSearchValue("")}
              />
            ),
          }}
        ></TextField>
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
                    <TableCell>{item[8]}</TableCell>
                    <TableCell>{item[6]}</TableCell>
                    <TableCell>{item[7]}</TableCell>
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
    </>
  );
}

export default Page1;
