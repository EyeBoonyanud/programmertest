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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
function DetaDept() {
  useEffect(() => {
    async function fetchData() {
      try {
        const dataDeptResponse = await axios.get(
          "http://localhost:3000/getDataDept"
        );
        const dataDeptArray = dataDeptResponse.data;
        setDataDept(dataDeptArray);
        console.log("Department Server list:", dataDeptArray);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
      }
    }
    fetchData();
  }, []);

  const [dataDept, setDataDept] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  // console.log(dataDept);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  const handleOpenPopup = () => {
    setPopupOpen(true);
  };
  // dropdawn status
  const [status, setStatus] = useState([]);
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };
  const Save = async () => {
    try {
      const ID = document.getElementById("ID").value;
      const department =document.getElementById("Dept").value;

      console.log(
        ID,
        "",
        department,
        " ",
        status
      );
      // const Lastanme = document.getElementById("ID")
      
      const rollNoSearch = await axios.post(
        `http://localhost:3000/insertDataDept?id=${ID}&dept=${department}&status=${status}`
      );
     
      if (rollNoSearch.status === 200) {
        Swal.fire({
          title: "Value Inserted !",
          text: "",
          icon: "success",
          confirmButtonText: "Close!",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    // Close the popup
    handleClosePopup();

    } catch (error) {
      console.log("Save Error : ", error);
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end", // จัดตำแหน่งปุ่มทางขวา
          margin: "100px 200px 0px 200px",
          border: "1px solid red",
        }}
      >
        <Button
          style={{ borderRadius: "30px" }}
          onClick={handleOpenPopup}
          variant="contained"
        >
          Insert
        </Button>
      </div>
      <table>
        <tr>
          <td>
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
                  <div
                    class="row"
                    style={{
                      margin: "10px 0px 20px 0px",
                      fontSize: "40px",
                      fontWeight: "bold",
                    }}
                  >
                    insert
                  </div>
                  <div class="row">
                    <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                      ID Code
                    </div>
                    <div class="col-6">
                      <TextField fullWidth size="small" label="" id="ID" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                      Name
                    </div>
                    <div class="col-6">
                      <TextField fullWidth size="small" label="" id="Dept" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                      Status
                    </div>
                    <div class="col-3">
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          style={{ width: "205px" }}
                          labelId="demo-simple-select-label"
                          id="Status"
                          value={status}
                          onChange={handleStatus}
                        >
                          <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                          <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div
                  class="Button"
                  style={{ marginLeft: "270px", marginTop: "10px" }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      Save();
                      handleClosePopup();
                    }}
                    style={{ marginRight: "10px", backgroundColor: "green" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClosePopup}
                    style={{ backgroundColor: "gray" }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </td>
        </tr>
      </table>

      <div className="Record" style={{ margin: "100px 200px 0px 200px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{backgroundColor:''}}>
              <TableRow align="left">
                <TableCell >Id Department</TableCell>
                <TableCell >Department Name</TableCell>
                <TableCell >Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataDept.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell >{item[0]}</TableCell>
                  <TableCell >{item[1]}</TableCell>
                  <TableCell >{item[2]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default DetaDept;
