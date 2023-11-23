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
// import { CSVLink } from "react-csv";
import Checkbox from "@mui/material/Checkbox";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import * as XLSX from "xlsx";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useNavigate } from "react-router-dom";


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
  // const [department, setDept] = useState("");
  // const handleDept = (event) => {
  //   setDept(event.target.value);
  // };

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
    // const Birth = Birth_before.toISOString().slice(0, 10);
    console.log(
      ID,
      "",
      FirstName,
      " ",
      Lastname,
      " ",
      Telephone,
      " ",
      Age,
      " ",
      " ",
      selectedDepartment,
      " ",
      status
    );
    // const Lastanme = document.getElementById("ID")
    axios
      .post(
        `http://localhost:3000/insertData?id=${ID}&fname=${FirstName}&last=${Lastname} &age=${Age}&dept=${selectedDepartment}&birth=${Birth}&status=${status}&telephone=${Telephone}`
      )
      .then((response) => {
        // const addedData = response.data;
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

  // Export xlsx
  const dataExport = [];
  const sortedTableFirst = dataRoll.map((item) => [
    item[0],
    item[1],
    item[2],
    item[3],
    formatDateString(item[4]),
    item[8],
    item[6],
    item[7],
  ]);
  sortedTableFirst.sort((a, b) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] < b[i]) return -1;
      if (a[i] > b[i]) return 1;
    }
    return 0;
  });

  dataExport.push(...sortedTableFirst);

  // ออกExport Data for Excel 
  const exportToExcelTable1 = () => {
    const selectedData = dataRoll.filter((item) =>
      selectedRows.includes(item[0])
    );
  
    if (selectedRows.length > 0 && selectedData.length > 0) {
      // ถ้ามี checkbox ถูกเลือก
      const ws = XLSX.utils.aoa_to_sheet([
        [
          "Id Code",
          "Firstname",
          "Lestname",
          "Age",
          "Birthday",
          "Department",
          "Status",
          "Telephone",
        ],
        ...selectedData,
      ]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `Selected_RollLeaf_.xlsx`);
    } else {
      // ถ้าไม่มี checkbox ถูกเลือก หรือไม่มีข้อมูลที่ถูกเลือก
      const ws = XLSX.utils.aoa_to_sheet([
        [
          "Id Code",
          "Firstname",
          "Lestname",
          "Age",
          "Birthday",
          "Department",
          "Status",
          "Telephone",
        ],
        ...dataRoll,
      ]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `RollLeaf_.xlsx`);
    }
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      // ถ้า ID อยู่ใน selectedRows แล้ว ให้นำออก
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    } else {
      // ถ้า ID ยังไม่อยู่ใน selectedRows ให้เพิ่มเข้าไป
      setSelectedRows((prev) => [...prev, id]);
    }
  };

  // สร้าง function สำหรับ Export ที่เลือก
  const exportSelectedRows = () => {
    const selectedData = dataRoll.filter((item) =>
      selectedRows.includes(item[0])
    );
    // นำ selectedData ไปใช้ต่อตามที่คุณต้องการ
    console.log("Selected Data:", selectedData);
  };
  const navigate = useNavigate();
  const GoPDF = () =>{
    navigate('/PDFData');
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
          size="large"
          variant="contained"
          onClick={handleOpenPopup}
        >
          Insert
        </Button>
        <Button
          style={{ borderRadius: "30px" }}
          component="label"
          variant="contained"
          startIcon={<FileDownloadIcon />}
          className="btnExport"
          onClick={exportToExcelTable1}
        >
          Export
        </Button>
        
        <Button
          style={{ borderRadius: "30px" }}
          component="label"
          variant="contained"
          startIcon={<FileDownloadIcon />}
          className="btnExport"
          onClick={GoPDF}
        >
         PDF
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
                      ID code
                    </div>
                    <div class="col-6">
                      <TextField fullWidth size="small" label="" id="ID" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                      Firstname
                    </div>
                    <div class="col-9">
                      <TextField fullWidth size="small" label="" id="Name" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                      Lastname
                    </div>
                    <div class="col-9">
                      <TextField fullWidth size="small" label="" id="Last" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                      Age
                    </div>
                    <div class="col-4">
                      <TextField fullWidth size="small" label="" id="Age" />
                    </div>
                    <div class="col-2" style={{ margin: "10px 0px 10px 0px" }}>
                      Year
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                      Birthday
                    </div>
                    <div class="col-9">
                      <TextField
                        fullWidth
                        size="small"
                        label=""
                        id="Birth"
                        style={{ width: "150px" }}
                        type="date"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                      Department
                    </div>
                    <div class="col-3">
                      <FormControl sx={{ width: "300px", marginRight: "5px" }}>
                        <Select
                          id="Department"
                          size="small"
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
                          style={{ width: "300px" }}
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
                  <div class="row">
                    <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                      Telephone
                    </div>
                    <div class="col-9">
                      <TextField
                        fullWidth
                        size="small"
                        label=""
                        id="Telephone"
                      />
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
  <Checkbox
    {...label}
    onChange={() => handleCheckboxChange(item[0])}
    checked={selectedRows.includes(item[0])}
  />
</TableCell>
                  <TableCell>{item[0]}</TableCell>
                  <TableCell>{item[1]}</TableCell>
                  <TableCell>{item[2]}</TableCell>
                  <TableCell>{item[3]}</TableCell>
                  <TableCell>{formatDateString(item[4])}</TableCell>
                  <TableCell>{item[8]}</TableCell>
                  <TableCell>{item[6]}</TableCell>
                  <TableCell>{item[7]}</TableCell>
                  {/* <TableCell>
                    <Tooltip title="Edit">
                      <EditNoteIcon
                        style={{ color: "#F4D03F" }}
                        onClick={() => handleOpenEdit(item[0])}
                      />
                    </Tooltip>
                  </TableCell> */}
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
