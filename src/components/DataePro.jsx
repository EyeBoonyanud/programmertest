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
import Swal from "sweetalert2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditPro from "./EditPro";
import Tooltip from "@mui/material/Tooltip";
import { ExcelFile, ExcelSheet } from "react-data-export";
import Checkbox from "@mui/material/Checkbox";
import { Select, MenuItem, FormControl } from "@mui/material";
//import * as XLSX from "xlsx";

function IdProgrammer() {
  const [dataRoll, setDataRoll] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isOpenEdit, setOpenEdit] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [data, setData] = useState([]);
  const handleOpenPopup = () => {
    setPopupOpen(true);
  };
  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  //เอาไว้ส่งค่าไปหน้า Edit
  const handleOpenEdit = (itemId) => {
    const selectedRow = data.find((item) => item[0] === itemId);
    if (selectedRow) {
      setSelectedRowData(selectedRow);
      setOpenEdit(true);
    }
  };
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const handleDept = (event) => {
    setSelectedDepartment(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const rollNoResponse = await axios.get(
          "http://localhost:3000/getDataPro"
        );
        const dataRollResponse = rollNoResponse.data;
        setDataRoll(dataRollResponse);
        setData(dataRollResponse);
        console.log("Roll Server list:", dataRollResponse);

        const departmentsResponse = await axios.get(
          "http://localhost:3000/getDepartments"
        );
        const departmentOptionsData = departmentsResponse.data;
        setDepartmentOptions(departmentOptionsData);
        console.log("Department Options:", departmentOptionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // format Data Show
  function formatDateString(rawDate) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(rawDate);
    return date.toLocaleDateString(undefined, options);
  }

  //dropdawn department

  // dropdawn status
  const [status, setStatus] = useState([]);
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  // Save Oncilck
  const Save = () => {
    const ID = document.getElementById("ID").value;
    const FirstName = document.getElementById("Name").value;
    const Lastname = document.getElementById("Last").value;
    const Telephone = document.getElementById("Telephone").value;
    const Age = document.getElementById("Age").value;
    const Birth = document.getElementById("Birth").value;
    console.log(
      ID,
      FirstName,
      Lastname,
      Telephone,
      Age,
      selectedDepartment,
      status
    );

    axios
      .post(
        `http://localhost:3000/insertData?id=${ID}&fname=${FirstName}&last=${Lastname} &age=${Age}&dept=${selectedDepartment}&birth=${Birth}&status=${status}&telephone=${Telephone}`
      )
      .then((response) => {
        console.log("", departmentOptions);
        if (response.status === 200) {
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // Delete
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
          `http://localhost:3000/deleteData?id=${ID}`
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
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const formatDataForExport = (data) => {
    return data.map((item) => ({
      IdCode: item[0],
      Firstname: item[1],
      Lastname: item[2],
      Age: item[3],
      Birthday: formatDateString(item[4]),
      Department: item[8],
      Status: item[6],
      Telephone: item[7],
    }));
  };

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
          size="large"
          variant="contained"
          onClick={handleOpenPopup}
        >
          Insert
        </Button>

        <Button
          style={{ borderRadius: "30px", marginLeft: "10px" }}
          size="large"
          variant="contained"
        >
          DOWNLOAD
        </Button>

        {/* <ExcelFile
          element={
            <Button
              style={{ borderRadius: "30px", marginLeft: "10px" }}
              size="large"
              variant="contained"
            >
              Export to Excel
            </Button>
          }
        >
          <ExcelSheet data={formatDataForExport(data)} name="ProgrammerData" />
        </ExcelFile> */}
      </div>

      <Modal
        open={isPopupOpen}
        onClose={handleClosePopup}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {/* ข้อมูลที่นำเข้า */}
      </Modal>

      <EditPro
        modalIsOpen={isOpenEdit}
        closeEditModal={() => setOpenEdit(false)}
        onCancel={handleCloseEdit}
        SendID={selectedRowData}
      />

      <div
        className="Record"
        style={{ margin: "20px 200px 0px 200px", backgroundColor: "#A7C9FA" }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#A7C9FA", align: "left" }}>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Id Code</TableCell>
                <TableCell>Firstname</TableCell>
                <TableCell>Lestname</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Birthday</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Telephone</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRoll.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox {...label} />
                  </TableCell>
                  <TableCell>{item[0]}</TableCell>
                  <TableCell>{item[1]}</TableCell>
                  <TableCell>{item[2]}</TableCell>
                  <TableCell>{item[3]}</TableCell>
                  <TableCell>{formatDateString(item[4])}</TableCell>
                  <TableCell>{item[8]}</TableCell>
                  <TableCell>{item[6]}</TableCell>
                  <TableCell>{item[7]}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <EditNoteIcon
                        style={{ color: "#F4D03F", fontSize: "30px" }}
                        onClick={() => handleOpenEdit(item[0])}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Delete">
                      <DeleteForeverIcon
                        style={{ color: "red", fontSize: "30px" }}
                        onClick={() => Delete(item[0])}
                      />
                    </Tooltip>
                  </TableCell>
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
