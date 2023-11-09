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
  const [status, setStatus] = useState("");

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const Save = async () => {
    try {
      const ID = document.getElementById("ID").value;
      const department = document.getElementById("Dept").value;

      console.log(ID, department, status);

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
            handleClosePopup();
          }
        });
      }
    } catch (error) {
      console.log("Save Error : ", error);
    }
  };

  const Delete = async (ID) => {
    console.log(ID);
    try {
      const shouldSave = await Swal.fire({
        title: "Confirm data deletion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
      });

      if (shouldSave.isConfirmed) {
        const response = await axios.post(
          `http://localhost:3000/deleteDataDept?id=${ID}`
        );
        if (response.status === 200) {
          Swal.fire({
            title: "Delete Success!",
            text: "",
            icon: "success",
            confirmButtonText: "Close!",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
              handleClosePopup();
            }
          });
        } else {
          // Handle deletion failure
          console.log("Data deletion failed");
        }
      }
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  }

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "100px 200px 0px 200px",
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Department</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataDept.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item[0]}</TableCell>
                <TableCell>{item[1]}</TableCell>
                <TableCell>{item[2]}</TableCell>
                <TableCell>
                  <EditNoteIcon
                    style={{ color: "#F4D03F", cursor: "pointer" }}
                    onClick={() => handleOpenEdit(item[0])}
                  />
                </TableCell>
                <TableCell>
                  <DeleteForeverIcon
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => Delete(item[0])}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
          <div class="container">
            <div
              class="row"
              style={{
                margin: "10px 0px 20px 0px",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              Insert
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
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                    <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div class="Button" style={{ marginLeft: "270px", marginTop: "10px" }}>
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
    </div>
  );
}

export default DetaDept;
