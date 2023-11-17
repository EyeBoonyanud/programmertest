import React, { useState, useEffect } from "react";
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
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import MenuIcon from "@mui/icons-material/Menu";
import { Empty } from "antd";
import ClearIcon from "@mui/icons-material/Clear";
import { InfoCircleOutlined } from "@ant-design/icons";
import Test from "./SideBar";
import axios from "axios";
import "./StyleLogin.css";

function Page1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); //ตัวแปรเปิดปิด Sidebar
  const [isSearch, setSearch] = useState([]); //ตัวแปร Search
  const [checkHead, setCheckHead] = useState("hidden"); //ตัวแปรเช็คค่าของ ตาราง
  const [checkEmpty, setCheckEmpty] = useState("hidden"); // ตัวแปรเช็คค่าว่าง
  const [checkData, setCheckData] = useState("visible"); // ตัวแปร datashow warning
  const [secondRoundSearchValue, setSecondRoundSearchValue] = useState(""); // ตัวแปรไว้เก็บค่าครั้งที่ 2
  const [isFirstSearchDone, setIsFirstSearchDone] = useState(false); //ตัวแปรใช้สำหรับ check การซ่อนปุ่มเมื่อมีการ Search ของปุ่มแรกไปแล้ว ให้เป็น true ไปก่อน
  const [isDataSecond, setisDataSecond] = useState([]); 
  // ตัว 3 ขีด เอาไว้บอกว่าเปิดหรือปิด
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ชุดเก็บค่าของ status
  const [status, setStatus] = useState("");
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };
  //ชุดเก็บค่า ของ department
  const [departmentOptions, setDepartmentOptions] = useState([]); //ตัวแปรไว้เก็บค่า ข้อมูล Data Dept ที่เป็น Dropdown
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const handleDept = (event) => {
    setSelectedDepartment(event.target.value);
    console.log("Selected Department:", event.target.value);
  };

  //Search ครั้งที่ 1
  const Search = async () => {
    const value = document.getElementById("Search").value;
    const fname = document.getElementById("Name").value;

    console.log(status);

    if (!value && !fname && !status && !selectedDepartment) {
      try {
        const rollNoSearch = await axios.get(
          `http://localhost:3000/getDataPro`
        );
        const dataSearch = rollNoSearch.data;
        setSearch(dataSearch);
        setCheckHead("visible");
        setCheckEmpty("hidden");
        setCheckData("hidden");
        setIsFirstSearchDone(true); // ถ้ามีการค้นหา ให้ Button กับ textfield ครั้งที่ 2 ให้เป็น True
        console.log("Roll Server list:", dataSearch);
      } catch (error) {
        console.error("Error requesting data:", error);
      }
    } else {
      try {
        const rollNoSearch = await axios.get(
          `http://localhost:3000/getSearch?value=${value}&fname=${fname}&status=${status}&dept=${selectedDepartment}`
        );
        const dataSearch = rollNoSearch.data;
        setSearch(dataSearch);
        setCheckHead("visible");
        setIsFirstSearchDone(true);

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
  // const SearchSecondRound = async () => {
  //   try {
  //     const rollNoSearch = await axios.get(
  //       `http://localhost:3000/getSearch?value=&secondRoundSearchValue=${secondRoundSearchValue}`
  //     );
  //     const dataSearch = rollNoSearch.data;

  //     // ต่อข้อมูลที่ค้นหาจากชุดที่ 2 เข้าไป
  //     setSearch(dataSearch);
  //     setCheckHead("visible");

  //     if (dataSearch.length === 0) {
  //       setCheckEmpty("visible");
  //       setCheckData("hidden");
  //     } else {
  //       setCheckEmpty("hidden");
  //       setCheckData("visible");
  //     }

  //     console.log("Roll Server list:", dataSearch);
  //   } catch (error) {
  //     console.error("Error requesting data:", error);
  //   }
  // };

  const SearchSecondRound = async () => {
    // console.log("malaa", isSearch);

    for (let i = 0; i < isSearch.length; i++) {
      // console.log("มา", isSearch[i][0]);
      if (secondRoundSearchValue == isSearch[i][0]) {
        console.log("เจอ", [isSearch[i]]);
        setSearch([isSearch[i]]);
        setCheckHead("visible");
        setCheckEmpty("hidden");
        setSearch(isSearch);
      } else {
        console.log("ไม่เจอvvvvvvvvvvvvvv");
        // setCheckHead("hidden");
        // setCheckEmpty("visible");
        // setSearch([]);
        // if (isSearch.length != 0)
        //

        //
      }
    }
  };

  // Get ข้อมูลใน Department มาโชว์ ใน Dropdown
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsResponse = await axios.get(
          "http://localhost:3000/getDepartments"
        );
        const departmentOptionsData = departmentsResponse.data;
        setDepartmentOptions(departmentOptionsData);
        console.log("Department Options:", departmentOptionsData);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchData(); // เรียก fetchData เมื่อ component ถูกโหลด
  }, []);

  //เอาไว้ Reset ค่า ทั้งหมด
  const handleResetData = () => {
    document.getElementById("Search").value = "";
    document.getElementById("Name").value = "";
    setSearch([]);
    setStatus("");
    setSelectedDepartment("");
    setCheckHead("hidden");
    setCheckEmpty("hidden");
    setCheckData("visible");
    setIsFirstSearchDone(false);
  };
  //ของตัวกากบาท เอาไว้เคลียร์ค่าในกากบาท
  const handleReset = () => {
    document.getElementById("Search").value = "";
    document.getElementById("Name").value = "";
  };
  console.log(isSearch, "//////////");
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
              width: "1300px",
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
                marginRight: "5px",
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
              <InputLabel htmlFor="Status">Status</InputLabel>
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
            <FormControl sx={{ width: "220px", marginRight: "5px" }}>
              <InputLabel htmlFor="Department">Department</InputLabel>
              <Select
                id="Department"
                size="small"
                style={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  width: "200px",
                  marginTop: "10px",
                  marginRight: "5px",
                }}
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                }}
              >
                {departmentOptions.map((item) => (
                  <MenuItem key={item[1]} value={item[0]}>
                    {item[1]}
                  </MenuItem>
                ))}
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
                borderRadius: "4px",
                width: "200px",
                marginTop: "10px",
                color: "black",
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
      <div style={{ marginTop: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "30px",
            margin: "auto",
            width: "1500px",
            marginBottom: "20px",
          }}
        >
          <div style={{ marginLeft: "78px" }}>
            <TextField
              size="small"
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                width: "200px",
                marginTop: "10px",
                visibility: isFirstSearchDone ? "visible" : "hidden",
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
            <Button
              onClick={SearchSecondRound}
              style={{
                backgroundColor: "#80aaff",
                marginLeft: "10px",
                borderRadius: "4px",
                width: "200px",
                marginTop: "10px",
                marginRight: "5px",
                visibility: isFirstSearchDone ? "visible" : "hidden",
              }}
              variant="contained"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </div>
        </div>

        <div
          className="table"
          style={{
            marginTop: "40px",
            margin: "auto",
            width: "1500px",

            borderRadius: "10px",
            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <TableContainer
            style={{
              visibility: checkHead,
              borderRadius: "5px",
            }}
          >
            <Table>
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
      </div>
    </>
  );
}

export default Page1;
