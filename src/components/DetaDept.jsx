import React, { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import axios from "axios"; 

function DetaDept() {
  const [dataDept, setDataDept] = useState([]); 
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
 // console.log(dataDept);
  return (
    <div>
      <Header />
      <div className="Record" style={{ margin: "100px 200px 0px 200px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Id Department</TableCell>
                <TableCell align="right">Department Name</TableCell>
                <TableCell align="right">Status</TableCell>
          
              </TableRow>
            </TableHead>
            <TableBody>
              {dataDept.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{item[0]}</TableCell>
                  <TableCell align="right">{item[1]}</TableCell>
                  <TableCell align="right">{item[2]}</TableCell>
              
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
