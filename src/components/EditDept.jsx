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
  const [status, setStatus] = useState(""); const [selectedDate, setSelectedDate] = useState("");
  // dropdawn status
  const handleStatus = (event) => {
    setStatus(event.target.value || (SendID ? SendID[2] : ""));
  };
  
  const Save = () => {
    const ID = document.getElementById("ID").value;
    const Dept = document.getElementById("Dept").value;
    console.log(
      ID,
      "",
      Dept,
      "",
      status
    );
   
    axios
      .post(
        `http://localhost:3000/updateDataDept?id=${ID}&dept=${Dept}&status=${status || (SendID ? SendID[2] : "")}`
      )
      .then((response) => {

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
 const handleClosePopup = () => {
    setPopupOpen(false);
  };
 
 useEffect(() => {
    async function fetchData() {
      try {
        const rollNoResponse = await axios.get(
          // axios เพื่อทำ GET request ไปยัง URL
          "http://localhost:3000/getDataDept"
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
        onClose={closeEditModal}
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
               Name
              </div>
              <div class="col-9">
                <TextField
                  defaultValue={SendID ? SendID[1] : ""}
                  fullWidth
                  size="small"
                  label=""
                  id="Dept"
                />
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
                    defaultValue={SendID ? SendID[2] : ""}
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
