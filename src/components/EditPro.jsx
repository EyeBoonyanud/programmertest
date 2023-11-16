import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import { format } from 'date-fns';
function EditPro({ modalIsOpen, closeEditModal, onCancel, SendID }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [dataRoll, setDataRoll] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const handleDept = (event) => {
    setSelectedDepartment(event.target.value || (SendID ? SendID[5] : ""));
  };

  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    if (SendID && SendID[5]) {
      setSelectedDepartment(SendID[5]);
    }
  }, [SendID]);

  // useEffect(() => {
  //   if (SendID && SendID[4]) {
  //     const date = new Date(SendID[4]);
  //     const formattedDate = date.toISOString().split("T")[0];
  //     setSelectedDate(formattedDate);
  //   }
  // }, [SendID]);

  useEffect(() => {
    if (SendID && SendID[4]) {
      const date = new Date(SendID[4]);
      const formattedDate = format(date, 'yyyy-MM-dd');
      setSelectedDate(formattedDate);
    }
  }, [SendID]);





  console.log("date", selectedDate);

  // dropdawn status
  const Save = () => {
    const ID = document.getElementById("ID").value;
    const FirstName = document.getElementById("Name").value;
    const Lastname = document.getElementById("Last").value;
    const Telephone = document.getElementById("Telephone").value;
    const Age = document.getElementById("Age").value;
    const Birth = document.getElementById("Birth").value;

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
        `http://localhost:3000/updateData?id=${ID}&fname=${FirstName}&last=${Lastname}&age=${Age}&dept=${
          selectedDepartment || (SendID ? SendID[5] : "")
        }&birth=${Birth}&status=${
          status || (SendID ? SendID[6] : "")
        }&telephone=${Telephone}`
      )
      .then((response) => {
        // const addedData = response.data;
        // console.log("Added Data:", addedData);

        if (response.status === 200) {
          Swal.fire({
            title: "completed",
            text: "",
            icon: "success",
            confirmButtonText: "Close!",
          }).then((response) => {
            if (response.isConfirmed) {
              window.location.reload();
              closeEditModal();
            }
          });
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const [status, setStatus] = useState("");
  const handleStatus = (event) => {
    setStatus(event.target.value || (SendID ? SendID[6] : ""));
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const rollNoResponse = await axios.get(
          // axios เพื่อทำ GET request ไปยัง URL
          "http://localhost:3000/getDataPro"
        );
        const dataRollResponse = rollNoResponse.data; // dataRollResponse และจากนั้นถูกใช้ในการอัพเดตค่าของ dataRoll

        const departmentsResponse = await axios.get(
          "http://localhost:3000/getDepartments"
        );
        const departmentOptionsData = departmentsResponse.data;
        setDepartmentOptions(departmentOptionsData);
        console.log("Department Options:", departmentOptionsData);
        setDataRoll(dataRollResponse);
        console.log("Roll Server list:", dataRollResponse);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Modal
        open={modalIsOpen}
        onClose={isPopupOpen}
        // onClose={closeEditModal}
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
              edit
            </div>
            <div class="row">
              <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                ID code
              </div>
              <div class="col-6">
                <TextField
                  defaultValue={SendID ? SendID[0] : ""}
                  fullWidth
                  size="small"
                  label=""
                  id="ID"
                  inputProps={
                    {
                   
                       readOnly: true }
                }
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                Firstname
              </div>
              <div class="col-9">
                <TextField
                  defaultValue={SendID ? SendID[1] : ""}
                  fullWidth
                  size="small"
                  label=""
                  id="Name"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                Lastname
              </div>
              <div class="col-9">
                <TextField
                  defaultValue={SendID ? SendID[2] : ""}
                  fullWidth
                  size="small"
                  label=""
                  id="Last"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                Age
              </div>
              <div class="col-4">
                <TextField
                  fullWidth
                  defaultValue={SendID ? SendID[3] : ""}
                  size="small"
                  label=""
                  id="Age"
                />
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
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3" style={{ margin: "10px 0px 10px 0px" }}>
                Department
              </div>
              <div class="col-3">
                {/* <FormControl sx={{ width: "300px", marginRight: "5px" }}>
  <Select
    id="Department"
    size="small"
    value={selectedDepartment}

    onChange={(e) => {
      setSelectedDepartment(e.target.value);
    }}
  >
    <MenuItem value="">{selectedDepartment}</MenuItem>
    {departmentOptions.map((item) => (
      <MenuItem key={item[1]} value={item[0]}>
        {item[1]}
      </MenuItem>
    ))}
  </Select>
</FormControl> */}

                {/* <FormControl sx={{ width: "300px", marginRight: "5px" }}>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value);
                    }}
                  >
                    <option value="">{selectedDepartment}</option>
                    {departmentOptions.map((item) => (
                      <option key={item[1]} value={item[0]}>
                        {item[1]}
                      </option>
                    ))}
                  </select>
                </FormControl> */}
                <FormControl sx={{ width: "300px", marginRight: "5px" }}>
  <Select
    value={selectedDepartment || (SendID ? SendID[8] : "")}
    onChange={(e) => {
      setSelectedDepartment(e.target.value);
    }}
    size="small"
  >
 {SendID && SendID[5] && (
  <MenuItem key={SendID[5]} value={SendID[5]}>
    {/* {SendID[5]} */}
  </MenuItem>
)}
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
                    // value={status}
                    onChange={handleStatus}
                    defaultValue={SendID ? SendID[6] : ""}
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
                  defaultValue={SendID ? SendID[7] : ""}
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
                closeEditModal();
              }}
              style={{ marginRight: "10px", backgroundColor: "green" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={onCancel}
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

export default EditPro;
