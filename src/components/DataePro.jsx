import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import axios from "axios";
import Button from "@mui/material/Button";
import { Row } from "antd";
import Modal from "@mui/material/Modal";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function IdProgrammer() {
  const [dataRoll, setDataRoll] = useState([]);
  //สร้าง state variable dataRoll และ
  //setDataRoll โดยให้ dataRoll เป็นตัวแปรสำหรับเก็บข้อมูลที่จะถูกดึงมาจากเซิร์ฟเวอร์และ
  //setDataRoll เป็นฟังก์ชันที่ใช้ในการอัพเดตค่าของ dataRoll.

  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const rollNoResponse = await axios.get(
          // axios เพื่อทำ GET request ไปยัง URL
          "http://localhost:3000/getDataPro"
        );
        const dataRollResponse = rollNoResponse.data; // dataRollResponse และจากนั้นถูกใช้ในการอัพเดตค่าของ dataRoll
        setDataRoll(dataRollResponse);
        console.log("Roll Server list:", dataRollResponse);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
      }
    }
    fetchData();
  }, []);
  const handleOpenPopup = () => {
    setPopupOpen(true);
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  return (
    <div>
      <Header />
      <div
        style={{
          margin: "100px 200px 0px 200px",
          border: "1px solid red",
          display: "flex",
          justifyContent: "space-between", // จัดตำแหน่งปุ่ม
        }}
      >
        <table>
          <tr>
            <td>
              <Button
                style={{ borderRadius: "30px", marginLeft: "980px" }}
                variant="contained"
                onClick={handleOpenPopup}
              >
                Insert
              </Button>

              <Modal
                open={isPopupOpen}
                onClose={handleClosePopup}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    padding: "20px",
                    width: "500px",
                  }}
                >
                  {/* เนื้อหาของ popup ที่คุณต้องการแสดง */}
                  <div class="container">
                    <div class="row">
                      <div
                        class="col-3"
                        style={{ margin: "10px 0px 10px 0px" }}
                      >
                        ID code
                      </div>
                      <div class="col-6">
                        <TextField
                          fullWidth
                          size="small"
                          label=""
                          id="fullWidth"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="col-3"
                        style={{ margin: "10px 0px 10px 0px" }}
                      >
                        Firstname
                      </div>
                      <div class="col-9">
                        <TextField
                          fullWidth
                          size="small"
                          label=""
                          id="fullWidth"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="col-3"
                        style={{ margin: "10px 0px 10px 0px" }}
                      >
                        Lastname
                      </div>
                      <div class="col-9">
                        <TextField
                          fullWidth
                          size="small"
                          label=""
                          id="fullWidth"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="col-3"
                        style={{ margin: "10px 0px 10px 0px" }}
                      >
                        Age
                      </div>
                      <div class="col-4">
                        <TextField
                          fullWidth
                          size="small"
                          label=""
                          id="fullWidth"
                        />
                      </div>
                      <div
                        class="col-2"
                        style={{ margin: "10px 0px 10px 0px" }}
                      >
                        Year
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="col-3"
                        style={{ margin: "10px 0px 10px 0px" }}
                      >
                        Department
                      </div>
                      <div class="col-3">
                        <FormControl fullWidth>
                         
                          <Select
                            size="small"
                            style={{width:'300px'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <Button variant="contained" onClick={handleClosePopup}>
                    Save
                  </Button>
                  <Button variant="contained" onClick={handleClosePopup}>
                    Cancel
                  </Button>
                </div>
              </Modal>
            </td>
          </tr>
        </table>
      </div>
      <Row></Row>

      <div
        className="Record"
        style={{ margin: "20px 200px 0px 200px", backgroundColor: "#A7C9FA" }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#A7C9FA", align: "left" }}>
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
            <TableBody>
              {dataRoll.map((item, index) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default IdProgrammer;
