import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
function EditPro({ modalIsOpen, closeEditModal, onCancel, SendID }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [dataRoll, setDataRoll] = useState([]);
  const [department, setDept] = useState("");
  const handleDept = (event) => {
    setDept(event.target.value);
  };
  console.log(SendID, "เข้าแล้วจ้าหนูอิอิ");
  const [selectedDate, setSelectedDate] = useState("");
  
 


  useEffect(() => {
    if (SendID && SendID[4]) {
      const date = new Date(SendID[4]);
      const formattedDate = date.toISOString().split("T")[0];
      setSelectedDate(formattedDate);
    }
  }, [SendID]);

  // dropdawn status
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
      department,
      " ",
      status
    );
    // const Lastanme = document.getElementById("ID")
    axios
      .post(
        `http://localhost:3000/updateData?id=${ID}&fname=${FirstName}&last=${Lastname} &age=${Age}&dept=${department}&birth=${Birth}&status=${status}&telephone=${Telephone}`
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
  const [status, setStatus] = useState([]);
  const handleStatus = (event) => {
    setStatus(event.target.value);
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
                <FormControl fullWidth>
                  <Select
                    size="small"
                    style={{ width: "300px" }}
                    labelId="demo-simple-select-label"
                    id="Department"
                    // value={department}
                    onChange={handleDept}
                    defaultValue={SendID ? SendID[5] : ""}
                  >
                    <MenuItem value="R120">R120</MenuItem>
                    <MenuItem value="R140">R140</MenuItem>
                    <MenuItem value="R150">R150</MenuItem>
                    <MenuItem value="R170">R170</MenuItem>
                    <MenuItem value="R190">R190</MenuItem>
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
                  defaultValue={SendID ? SendID[9] : ""}
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
