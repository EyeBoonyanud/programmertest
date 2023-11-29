import React, { useState } from "react";
// import AppBar from "../Appbar/appbar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
 
function SendEmail() {
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  // const [text, setText] = useState('');
 
  // const sendEmail = async (toEmail, emailMessage) => {
  //   try {
  //     await transporter.sendMail({
  //       from: "paiboon.wongthongdee@gmail.com", // Your email
  //       to: toEmail, // Email to send to
  //       subject: "Subject of the Email",
  //       text: emailMessage,
  //     });
 
  //     console.log("Email sent successfully");
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //   }
  // };
 
  // const handleSend = async () => {
  //   const EMAIL = document.getElementById("E").value;
  //   console.log("Email to send", EMAIL);
 
  //   try {
  //     const login = await axios.get(
  //       `http://localhost:3000/getSendEmail?InputEMAIL=${EMAIL}`
  //     );
  //     console.log("data", login.data);
 
  //     if (login.data.includes(EMAIL)) {
  //       const emailMessage = `Message: ${message}`;
  //       sendEmail(login.data, emailMessage);
  //       console.log("Check", emailMessage);
  //     } else {
  //       console.error("ไม่สามารถส่งอีเมลย์ได้");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
 
  // const handleCancel = () => {
  //   setEmail("");
  //   setMessage("");
  //   console.log("Email sending canceled");
  // };
 
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
 
  const sendEmail = async (toEmail, emailMessage) => {
    try {
      const response = await axios.post("http://localhost:3000/sendEmail", {
        toEmail: email,
        subject: "Subject of the Email",
        emailMessage: message,
      });
 
      console.log(response.data.message);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
 
  const handleSend = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getSendEmail?InputEMAIL=${email}`
      );
 
      if (response.data.length > 0) {
        const emailMessage = `Message: ${message}`;
        sendEmail(email, emailMessage);
        // console.log("Check", emailMessage);
      } else {
        console.error("Cannot send email");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  const handleCancel = () => {
    setEmail("");
    setMessage("");
    console.log("Email sending canceled");
  };
 
  return (
    <div>
      {/* <AppBar /> */}
      <Paper
        elevation={5}
        style={{
          margin: "auto",
          width: "1200px",
          height: "auto",
          marginTop: "20px",
        }}
      >
        <div>
          <Box
            style={{
              margin: "auto",
              paddingBottom: "50px",
              paddingLeft: "10px",
            }}
          >
            <table style={{ margin: "auto" }}>
              <tr
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <TextField
                  id="E"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </tr>
              <tr
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Message"
                  variant="outlined"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </tr>
              <tr>
                <div>
                  <Stack direction="row" spacing={2}>
                    <Button
                      style={{
                        width: "120px",
                        height: "40px",
                        marginTop: "50px",
                      }}
                      variant="contained"
                      color="success"
                      startIcon={<SendIcon />}
                      onClick={sendEmail}
                    >
                      Send
                    </Button>
                    <Button
                      style={{
                        width: "120px",
                        height: "40px",
                        marginTop: "50px",
                      }}
                      variant="contained"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </div>
              </tr>
            </table>
          </Box>
        </div>
      </Paper>
    </div>
  );
}
 
export default SendEmail;