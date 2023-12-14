import React, { useRef, useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import html2pdf from "html2pdf.js";
import "./StyleLogin.css";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useLocation } from "react-router-dom";
import { Tab } from "bootstrap";
import axios from "axios";

function PDFdata() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const tableRef = useRef([]);
  const location = useLocation();
  const selectedData = location.state?.selectedData || [];
  const [DataId, setDataId] = [selectedData[0][0]]; // เก็บArray ตัวที่ 1
  const [LoopDeatils, setLoopDetails] = useState([]);
  const [Count, setCount] = useState([]);
  const [mail, setMail] = useState("");
  const user = localStorage.getItem("token");
  console.log("ข้อมูลที่ได้รับ", selectedData);

  const [selectedDataSubset, setSelectedDataSubset] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ทำ POST request โดยส่ง DataId ไปด้วย
        const response = await axios.post(
          `http://localhost:3000/LoopDatils?id=${DataId}`
        );
        console.log("MMM", response);
        // ดึงข้อมูลที่ Server ส่งกลับมา
        const tableData = response.data;

        // กำหนดค่าให้กับ state
        setLoopDetails(tableData);

        console.log("dataloop", setLoopDetails);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [DataId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ทำ POST request โดยส่ง DataId ไปด้วย
        const response = await axios.post(
          `http://localhost:3000/SumCost?id=${DataId}`
        );
        console.log("MMM", response);
        // ดึงข้อมูลที่ Server ส่งกลับมา
        const tableData = response.data;

        // กำหนดค่าให้กับ state
        setCount(tableData);

        console.log("dataloop", setCount);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [DataId]);

  let x = [];
  let y = LoopDeatils;
  let z = [];
  let w = [];
  let count = Count;

  x = selectedData;
  y = LoopDeatils;
  z = LoopDeatils;
  w = LoopDeatils;
  count = Count;
  console.log("Y : dataloop : ", y);
  console.log("X : dataloop : ", x);
  console.log("X : dataloop :", z);
  console.log("count : dataloop :", count);
  const startingIndex = 21; // ตำแหน่งที่เริ่มต้นที่ต้องการดึงข้อมูล
  const dataToShow = z.slice(startingIndex - 1); // ดึงข้อมูลที่ต้องการแสดง
  const shownDataCount = 44;
  const dataW = w.slice(shownDataCount - 1);

  useEffect(() => {
    // เมื่อ selectedData เปลี่ยนแปลง, ดึงข้อมูลตั้งแต่ตำแหน่งที่ 21 ถึงตัวสุดท้าย
    const subset = w.slice(43);
    console.log("subset", subset); // เนื่องจาก JavaScript ใช้การนับเริ่มต้นที่ 0
    setSelectedDataSubset(subset);
  }, [LoopDeatils]);

  const numRows1 = 13;
  const numberOfCellsPerRow1 = 10;
  const numRows = 20;
  const numberOfCellsPerRow = 10;
  const numRows2 = 18;
  const numberOfCellsPerRow2 = 10;
  const numRows3 = 28;
  const numberOfCellsPerRow3 = 10;

  const trCount = y.length;
  useEffect(() => {
    const GetDataMail = async () => {
      const response = await axios.get(
        `http://localhost:3000/getSendEmail?InputEMAIL=${user}`
      );
      if (response.data.length > 0) {
        console.log("Email", response.data[0][0]);
        setMail(response.data[0][0]);
        // console.log("Check", emailMessage);
      }
    };
    GetDataMail();
  }, [user]);

  const downloadAsPDF = async () => {
    const container = document.createElement("div");

    tableRef.current.forEach((item, index) => {
      const clone = item.cloneNode(true);
      container.appendChild(clone);
      clone.style.marginTop =
        index < tableRef.current.length - 1 ? "12px" : "0";
      clone.style.marginBottom =
        index < tableRef.current.length - 1 ? "12px" : "0";
      clone.style.pageBreakInside = "avoid";
    });

    const options = {
      margin: 0,
      filename: "exported-file.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    const pdfBlob = await html2pdf(container, options).output("blob");
    const formData = new FormData();
    formData.append("toEmail", mail);
    formData.append("subject", "PDF Attachment");
    formData.append("emailMessage", "Here is your PDF file.");

    formData.append("pdfFile", pdfBlob, "exported-file.pdf");

    try {
      const response = await fetch("http://localhost:3000/sendEmail", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const TableLoop1 = () => (
    <>
      {selectedData.map((item, index) => (
        <div
          className="totaltable"
          style={{ padding: "30px" }}
          key={item[0]}
          ref={(el) => (tableRef.current[index] = el)}
        >
          <table
            className="bordertable"
            style={{
              width: "100%",
              pageBreakInside: "avoid",
            }}
          >
            <tr
              style={{
                fontSize: "14px",
                height: "30px",
                fontWeight: "bold",
              }}
            >
              <td colSpan="5">&nbsp; Fixed Assets Movement Slip Number</td>

              <td colSpan="5">&nbsp; FAM : {item[0]} </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "20px",
              }}
            >
              <td colSpan="2">&nbsp; 1) Requester</td>
              <td colSpan="4" className="borcol2">
                <tr
                  style={{
                    fontSize: "12px",
                    height: "30px",
                  }}
                >
                  &nbsp; NAME : {item[1]}&nbsp;{item[2]}
                  <React.Fragment>
                    <br />
                    &nbsp; Dept : {item[8]}
                  </React.Fragment>
                </tr>
              </td>
              <td colSpan="4" className="borcol2">
                <t>
                  {" "}
                  &nbsp; Ext. ...............................................{" "}
                </t>{" "}
                <t style={{ marginLeft: "12px" }}>
                  {" "}
                  Factory ..................................................
                </t>
                <br /> <t> &nbsp; Cost Center : ........... </t>
              </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "10px",
              }}
            >
              <td colSpan="2">&nbsp; 2) Type</td>

              <td
                colSpan="8"
                style={{
                  fontSize: "12px",
                  borderWidth: "1px 0 1px 1px",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                <tr style={{ width: "100%" }}>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Transfer
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Scrap
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Sales
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Loss
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Write-off
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Leading to Third-party
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Donation
                  </label>
                </tr>

                <tr>
                  <div style={{ marginLeft: "10px" }} className="remark">
                    Remark :
                  </div>
                </tr>
              </td>
            </tr>
            <tr style={{}}>
              <td
                colSpan="2"
                style={{
                  fontSize: "12px",
                }}
              >
                {" "}
                &nbsp; 3) &nbsp;Details
              </td>
            </tr>
          </table>

          <table className="bordertabletwo" style={{ width: "100%" }}>
            <tr
              style={{
                fontSize: "10px",
                textAlign: "center",
              }}
            >
              <th style={{ width: "60px" }}>Fixed Assets Number</th>
              <th style={{ width: "60px" }}>Comp.</th>
              <th style={{ width: "60px" }}>Cost Center</th>
              <th style={{ width: "350px" }}>Fixed Assets Name</th>
              <th style={{ width: "60px" }}>BOI Project</th>
              <th style={{ width: "40px" }}>Qty</th>
              <th style={{ width: "60px" }}>Invoice No.</th>
              <th style={{ width: "80px" }}>Acquisition Cost (Baht)</th>
              <th style={{ width: "80px" }}>Book Value (Baht)</th>
              <th style={{ width: "60px" }}>New Cost Center</th>
            </tr>
            {Array.from({ length: numRows1 }, (_, rowIndex) => (
              <tr key={rowIndex} style={{ height: "25px" }}>
                {y[rowIndex]
                  ? Object.values(y[rowIndex]).map((cell, cellIndex) => (
                      <td style={{ fontSize: "10px" }} key={cellIndex}>
                        {cell}
                      </td>
                    ))
                  : Array.from(
                      { length: numberOfCellsPerRow1 },
                      (_, cellIndex) => <td key={cellIndex}></td>
                    )}
              </tr>
            ))}
            {count.map((item, index) => (
              <tr
                key={index}
                className="Total"
                style={{
                  height: "10px",
                  borderWidth: "1px 0 0 1px",
                  borderStyle: "solid",
                  borderColor: "black",
                  width: "100%",
                }}
              >
                <td style={{ fontWeight: "bold" }}>Total</td>
                <td style={{ width: "60px" }}></td>
                <td style={{ width: "60px" }}></td>
                <td style={{ width: "350px" }}></td>
                <td style={{ width: "60px" }}></td>
                <td style={{ width: "60px" }}> </td>
                <td style={{ width: "60px" }}></td>
                <td
                  style={{
                    borderWidth: "0 0px 0 1px",
                    fontWeight: "bold",
                    width: "60px",
                  }}
                >
                  {item[0]}{" "}
                </td>
                <td
                  style={{
                    borderWidth: "0 1px 0 1px",
                    fontWeight: "bold",
                    width: "60px",
                  }}
                >
                  {item[1]}{" "}
                </td>
                <td></td>
              </tr>
            ))}
          </table>

          <table className="bordertablethree" style={{ width: "100%" }}>
            <tr style={{ height: "10px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 4) Plan
              </td>
              <td colSpan="4" style={{ fontSize: "12px" }}>
                &nbsp; Remove
                <br />
                &nbsp; Date: ………./………/……….
              </td>
              <td colSpan="4" style={{ fontSize: "12px" }}>
                &nbsp; Set up / Scrap <br />
                &nbsp; Date ………../……../……….
              </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "25px",
              }}
            >
              <td colSpan="2">&nbsp; 5) Service Dept.</td>
              <td colSpan="8">
                <t>&nbsp;Receipt by …………………………….</t>
                <t style={{ marginLeft: "100px" }}>
                  &nbsp;Dept. ……………………….……….
                </t>
                <t style={{ marginLeft: "100px" }}>
                  &&nbsp;Receipt date :……./……./..…..
                </t>
              </td>
            </tr>
            <tr style={{ height: "50px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 6) Approval
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp;Manager <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td
                colSpan="2"
                style={{
                  // border: "1px solid black",

                  fontSize: "12px",
                }}
              >
                &nbsp; BOI <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; FM up <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; ACC
                <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 7) Action Status <br />
                &nbsp; (Completed Date)
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Old Owner <br />
                &nbsp; Completed Date :
              </td>
              <td
                colSpan="2"
                style={{
                  // border: "1px solid black",

                  fontSize: "12px",
                }}
              >
                &nbsp; New Owner
                <br />
                &nbsp; Completed Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Sales / Scrap
                <br />
                &nbsp; Completed Date
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Service Dept
                <br />
                &nbsp; Completed Date
              </td>
            </tr>
          </table>

          <div style={{ display: "flex", fontSize: "12px", marginTop: "5px" }}>
            <div style={{ flex: 1, textAlign: "left" }}> A1-0001-1111</div>
            <div style={{ flex: 1, textAlign: "right" }}> A1-0001-1111</div>
          </div>
          <div style={{ textAlign: "center" }}></div>
        </div>
      ))}
    </>
  );

  const TableLoop2 = () => (
    <>
      <h1>newTable</h1>

      {selectedData.map((item, index) => (
        <div
          className="totaltable "
          style={{ padding: "10px 30px 0px 30px" }}
          key={item[0]}
          ref={(el) => (tableRef.current[index] = el)}
        >
          <table
            className="bordertable"
            style={{
              width: "100%",
            }}
          >
            <tr
              style={{
                fontSize: "14px",
                height: "30px",
                fontWeight: "bold",
              }}
            >
              <td colSpan="5">&nbsp; Fixed Assets Movement Slip Number</td>

              <td colSpan="5">&nbsp; FAM : {item[0]} </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "20px",
              }}
            >
              <td colSpan="2">&nbsp; 1) Requester</td>
              <td colSpan="4" className="borcol2">
                <tr
                  style={{
                    fontSize: "12px",
                    height: "30px",
                  }}
                >
                  &nbsp; NAME : {item[1]}&nbsp;{item[2]}
                  <React.Fragment>
                    <br />
                    &nbsp; Dept : {item[8]}
                  </React.Fragment>
                </tr>
              </td>
              <td colSpan="4" className="borcol2">
                <t>
                  {" "}
                  &nbsp; Ext. ...............................................{" "}
                </t>{" "}
                <t style={{ marginLeft: "12px" }}>
                  {" "}
                  Factory ..................................................
                </t>
                <br /> <t> &nbsp; Cost Center : ........... </t>
              </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "70px",
              }}
            >
              <td colSpan="2">&nbsp; 2) Type</td>

              <td
                colSpan="8"
                style={{
                  fontSize: "12px",
                  borderWidth: "1px 0 1px 1px",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                <tr style={{ width: "100%" }}>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Transfer
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Scrap
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Sales
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Loss
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Write-off
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Leading to Third-party
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Donation
                  </label>
                </tr>

                <tr>
                  <div style={{ marginLeft: "10px" }} className="remark">
                    Remark :
                  </div>
                </tr>
              </td>
            </tr>
            <tr style={{}}>
              <td
                colSpan="2"
                style={{
                  fontSize: "12px",
                }}
              >
                {" "}
                &nbsp; 3) &nbsp;Details
              </td>
            </tr>
          </table>

          <table className="bordertabletwo" style={{ width: "100%" }}>
            <tr
              style={{
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              <th style={{ width: "60px" }}>Fixed Assets Number</th>
              <th style={{ width: "60px" }}>Comp.</th>
              <th style={{ width: "60px" }}>Cost Center</th>
              <th style={{ width: "350px" }}>Fixed Assets Name</th>
              <th style={{ width: "60px" }}>BOI Project</th>
              <th style={{ width: "60px" }}>Qty</th>
              <th style={{ width: "60px" }}>Invoice No.</th>
              <th style={{ width: "60px" }}>Acquisition Cost (Baht)</th>
              <th style={{ width: "60px" }}>Book Value (Baht)</th>
              <th style={{ width: "60px" }}>New Cost Center</th>
            </tr>
            {Array.from({ length: numRows }, (_, rowIndex) => (
              <tr key={rowIndex} style={{ height: "25px" }}>
                {y[rowIndex]
                  ? Object.values(y[rowIndex]).map((cell, cellIndex) => (
                      <td style={{ fontSize: "10px" }} key={cellIndex}>
                        {cell}
                      </td>
                    ))
                  : Array.from(
                      { length: numberOfCellsPerRow },
                      (_, cellIndex) => <td key={cellIndex}></td>
                    )}
              </tr>
            ))}
            {count.map((item, index) => (
              <tr
                key={index}
                className="Total"
                style={{
                  height: "10px",
                  borderWidth: "1px 0 1px 1px",
                  borderStyle: "solid",
                  borderColor: "black",
                  width: "100%",
                }}
              >
                <td style={{ fontWeight: "bold" }}>Total</td>
                <td style={{ width: "60px" }}></td>
                <td style={{ width: "60px" }}></td>
                <td style={{ width: "350px" }}></td>
                <td style={{ width: "60px" }}></td>
                <td style={{ width: "60px" }}> </td>
                <td style={{ width: "60px" }}></td>
                <td
                  style={{
              
                    fontWeight: "bold",
                    width: "60px",
                  }}
                >
                  {item[0]}{" "}
                </td>
                <td
                  style={{
                  
                    fontWeight: "bold",
                    width: "60px",
                  }}
                >
                  {item[1]}{" "}
                </td>
                <td></td>
              </tr>
            ))}
          </table>
          <div style={{ display: "flex", fontSize: "12px", marginTop: "5px" }}>
            <div style={{ flex: 1, textAlign: "left" }}> A1-0001-1111</div>
            <div style={{ flex: 1, textAlign: "right" }}> A1-0001-1111</div>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              pageBreakAfter: "always",
            }}
          >
            Page {index + 1}/{selectedData.length}
          </div>

          <table
            className="bordertablethree"
            style={{
              width: "100%",
              marginTop: "30px",
            }}
          >
            <tr style={{ height: "20px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 4) Plan
              </td>
              <td colSpan="4" style={{ fontSize: "12px" }}>
                &nbsp; Remove
                <br />
                &nbsp; Date: ………./………/……….
              </td>
              <td colSpan="4" style={{ fontSize: "12px" }}>
                &nbsp; Set up / Scrap <br />
                &nbsp; Date ………../……../……….
              </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "20px",
              }}
            >
              <td colSpan="2">&nbsp; 5) Service Dept.</td>
              <td colSpan="8">
                <t>&nbsp;Receipt by …………………………….</t>
                <t style={{ marginLeft: "100px" }}>
                  &nbsp;Dept. ……………………….……….
                </t>
                <t style={{ marginLeft: "100px" }}>
                  &&nbsp;Receipt date :……./……./..…..
                </t>
              </td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 6) Approval
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp;Manager <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td
                colSpan="2"
                style={{
                  // border: "1px solid black",
                  width: "200px",
                  fontSize: "12px",
                }}
              >
                &nbsp; BOI <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; FM up <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; ACC
                <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 7) Action Status <br />
                &nbsp; (Completed Date)
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Old Owner <br />
                <br />
                &nbsp; Completed Date :
              </td>
              <td
                colSpan="2"
                style={{
                  // border: "1px solid black",
                  width: "200px",
                  fontSize: "12px",
                }}
              >
                &nbsp; New Owner
                <br />
                <br />
                &nbsp; Completed Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Sales / Scrap
                <br />
                <br />
                &nbsp; Completed Date
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Service Dept
                <br />
                <br />
                &nbsp; Completed Date
              </td>
            </tr>
          </table>
          <div style={{ display: "flex", fontSize: "12px", marginTop: "5px" }}>
            <div style={{ flex: 1, textAlign: "left" }}> A1-0001-1111</div>
            <div style={{ flex: 1, textAlign: "right" }}> A1-0001-1111</div>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              pageBreakAfter: "always",
            }}
          >
            Page {index + 1}/{selectedData.length}
          </div>
        </div>
      ))}
    </>
  );

  const TableLoop3 = () => (
    <>
      <h1>มากกว่า 20</h1>

      {selectedData.map((item, index) => (
        <div
          className="totaltable "
          style={{ padding: "10px 30px 0px 30px" }}
          key={item[0]}
          ref={(el) => (tableRef.current[index] = el)}
        >
          <table
            className="bordertable"
            style={{
              width: "100%",
              marginTop: "30px",
            }}
          >
            <tr
              style={{
                fontSize: "14px",
                height: "30px",
                fontWeight: "bold",
              }}
            >
              <td colSpan="5">&nbsp; Fixed Assets Movement Slip Number</td>

              <td colSpan="5">&nbsp; FAM : {item[0]} </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "20px",
              }}
            >
              <td colSpan="2">&nbsp; 1) Requester</td>
              <td colSpan="4" className="borcol2">
                <tr
                  style={{
                    fontSize: "12px",
                    height: "30px",
                  }}
                >
                  &nbsp; NAME : {item[1]}&nbsp;{item[2]}
                  <React.Fragment>
                    <br />
                    &nbsp; Dept : {item[8]}
                  </React.Fragment>
                </tr>
              </td>
              <td colSpan="4" className="borcol2">
                <t>
                  {" "}
                  &nbsp; Ext. ...............................................{" "}
                </t>{" "}
                <t style={{ marginLeft: "12px" }}>
                  {" "}
                  Factory ..................................................
                </t>
                <br /> <t> &nbsp; Cost Center : ........... </t>
              </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "70px",
              }}
            >
              <td colSpan="2">&nbsp; 2) Type</td>

              <td
                colSpan="8"
                style={{
                  fontSize: "12px",
                  borderWidth: "1px 0 1px 1px",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                <tr style={{ width: "100%" }}>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Transfer
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Scrap
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Sales
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Loss
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Write-off
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Leading to Third-party
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Donation
                  </label>
                </tr>

                <tr>
                  <div style={{ marginLeft: "10px" }} className="remark">
                    Remark :
                  </div>
                </tr>
              </td>
            </tr>
            <tr style={{}}>
              <td
                colSpan="2"
                style={{
                  fontSize: "12px",
                }}
              >
                {" "}
                &nbsp; 3) &nbsp;Details
              </td>
            </tr>
          </table>

          <table className="bordertabletwo" style={{ width: "100%" }}>
            <tr
              style={{
                fontSize: "10px",
                textAlign: "center",
              }}
            >
              <th style={{ width: "60px" }}>Fixed Assets Number</th>
              <th style={{ width: "60px" }}>Comp.</th>
              <th style={{ width: "60px" }}>Cost Center</th>
              <th style={{ width: "350px" }}>Fixed Assets Name</th>
              <th style={{ width: "60px" }}>BOI Project</th>
              <th style={{ width: "60px" }}>Qty</th>
              <th style={{ width: "60px" }}>Invoice No.</th>
              <th style={{ width: "60px" }}>Acquisition Cost (Baht)</th>
              <th style={{ width: "60px" }}>Book Value (Baht)</th>
              <th style={{ width: "60px" }}>New Cost Center</th>
            </tr>

            {Array.from({ length: numRows }, (_, rowIndex) => (
              <tr key={rowIndex} style={{ height: "25px", fontSize: "10px" }}>
                {y[rowIndex]
                  ? Object.values(y[rowIndex]).map((cell, cellIndex) => {
                      if (cellIndex < numberOfCellsPerRow) {
                        return <td key={cellIndex}>{cell}</td>;
                      } else {
                        // เพิ่มเงื่อนไขเพื่อตรวจสอบ index และเก็บไว้ใน z ถ้า index มากกว่า 21
                        if (cellIndex > 18) {
                          z.push(cell);
                        }
                        return null; // หรือคุณสามารถ return <td key={cellIndex}></td> หากไม่ต้องการแสดงผล
                      }
                    })
                  : Array.from(
                      { length: numberOfCellsPerRow },
                      (_, cellIndex) => <td key={cellIndex}></td>
                    )}
              </tr>
            ))}

            <tr
              style={{
                borderWidth: "0px 0px 1px 1px",
                borderStyle: "solid",
                borderColor: "black",
              }}
            ></tr>
          </table>
          <div style={{ pageBreakAfter: "always" }}>
            <div
              style={{ display: "flex", fontSize: "12px", marginTop: "5px" }}
            >
              <div style={{ flex: 1, textAlign: "left" }}> A1-0001-1111</div>
              <div style={{ flex: 1, textAlign: "right" }}> A1-0001-1111</div>
            </div>
            <div style={{ textAlign: "center", fontSize: "12px" }}>
              Page {index + 1}/{selectedData.length}
            </div>
          </div>

          <table
            className="bordertablefour"
            style={{ width: "100%", marginTop: "30px" }}
          >
            <tr
              style={{
                fontSize: "10px",
                textAlign: "center",
              }}
            >
              <th style={{ width: "60px" }}>Fixed Assets Number</th>
              <th style={{ width: "60px" }}>Comp.</th>
              <th style={{ width: "60px" }}>Cost Center</th>
              <th style={{ width: "350px" }}>Fixed Assets Name</th>
              <th style={{ width: "60px" }}>BOI Project</th>
              <th style={{ width: "60px" }}>Qty</th>
              <th style={{ width: "60px" }}>Invoice No.</th>
              <th style={{ width: "60px" }}>Acquisition Cost (Baht)</th>
              <th style={{ width: "60px" }}>Book Value (Baht)</th>
              <th style={{ width: "60px" }}>New Cost Center</th>
            </tr>
            {Array.from({ length: numRows2 }, (_, rowIndex) => {
              const rowData = dataToShow[rowIndex] || null;

              return (
                <tr key={rowIndex} style={{ height: "25px" }}>
                  {rowData
                    ? rowData.map((cell, cellIndex) => (
                        <td style={{ fontSize: "10px" }} key={cellIndex}>
                          {cell}
                        </td>
                      ))
                    : Array.from(
                        { length: numberOfCellsPerRow2 },
                        (_, cellIndex) => <td key={cellIndex}></td>
                      )}
                </tr>
              );
            })}
            {count.map((item, index) => (
              <tr
                key={index}
                className="Total"
                style={{
                  height: "10px",
                  borderWidth: "1px 0 0 1px",
                  borderStyle: "solid",
                  borderColor: "black",
                  width: "100%",
                }}
              >
                <td style={{ fontWeight: "bold" }}>Total</td>
                <td style={{ width: "60px" }}></td>
                <td style={{ width: "60px" }}></td>
                <td style={{ width: "350px" }}></td>
                <td style={{ width: "60px" }}></td>
                <td style={{ width: "60px" }}> </td>
                <td style={{ width: "60px" }}></td>
                <td
                  style={{
                    borderWidth: "0 0px 0 1px",
                    fontWeight: "bold",
                    width: "60px",
                  }}
                >
                  {item[0]}{" "}
                </td>
                <td
                  style={{
                    borderWidth: "0 1px 0 1px",
                    fontWeight: "bold",
                    width: "60px",
                  }}
                >
                  {item[1]}{" "}
                </td>
                <td></td>
              </tr>
            ))}
          </table>

          <table
            className="bordertablethree"
            style={{
              width: "100%",
            }}
          >
            <tr style={{ height: "10px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 4) Plan
              </td>
              <td colSpan="4" style={{ fontSize: "12px" }}>
                &nbsp; Remove
                <br />
                &nbsp; Date: ………./………/……….
              </td>
              <td colSpan="4" style={{ fontSize: "12px" }}>
                &nbsp; Set up / Scrap <br />
                &nbsp; Date ………../……../……….
              </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "20px",
              }}
            >
              <td colSpan="2">&nbsp; 5) Service Dept.</td>
              <td colSpan="8">
                <t>&nbsp;Receipt by …………………………….</t>
                <t style={{ marginLeft: "100px" }}>
                  &nbsp;Dept. ……………………….……….
                </t>
                <t style={{ marginLeft: "100px" }}>
                  &&nbsp;Receipt date :……./……./..…..
                </t>
              </td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 6) Approval
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp;Manager <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td
                colSpan="2"
                style={{
                  // border: "1px solid black",
                  width: "200px",
                  fontSize: "12px",
                }}
              >
                &nbsp; BOI <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; FM up <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; ACC
                <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 7) Action Status <br />
                &nbsp; (Completed Date)
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Old Owner <br />
                <br />
                &nbsp; Completed Date :
              </td>
              <td
                colSpan="2"
                style={{
                  // border: "1px solid black",
                  width: "200px",
                  fontSize: "12px",
                }}
              >
                &nbsp; New Owner
                <br />
                <br />
                &nbsp; Completed Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Sales / Scrap
                <br />
                <br />
                &nbsp; Completed Date
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Service Dept
                <br />
                <br />
                &nbsp; Completed Date
              </td>
            </tr>
          </table>
          <div style={{ display: "flex", fontSize: "12px", marginTop: "5px" }}>
            <div style={{ flex: 1, textAlign: "left" }}> A1-0001-1111</div>
            <div style={{ flex: 1, textAlign: "right" }}> A1-0001-1111</div>
          </div>
          <div style={{ textAlign: "center", fontSize: "12px" }}>
            Page {index + 1}/{selectedData.length}
          </div>
        </div>
      ))}
    </>
  );

  const TableLoop4 = () => (
    <>
      <h1>20 ไม่เกิน 36</h1>

      {selectedData.map((item, index) => (
        <div
          className="totaltable "
          style={{ padding: "10px 30px 0px 30px" }}
          key={item[0]}
          ref={(el) => (tableRef.current[index] = el)}
        >
          <table
            className="bordertable"
            style={{
              width: "100%",
              marginTop: "30px",
            }}
          >
            <tr
              style={{
                fontSize: "14px",
                height: "30px",
                fontWeight: "bold",
              }}
            >
              <td colSpan="5">&nbsp; Fixed Assets Movement Slip Number</td>

              <td colSpan="5">&nbsp; FAM : {item[0]} </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "20px",
              }}
            >
              <td colSpan="2">&nbsp; 1) Requester</td>
              <td colSpan="4" className="borcol2">
                <tr
                  style={{
                    fontSize: "12px",
                    height: "30px",
                  }}
                >
                  &nbsp; NAME : {item[1]}&nbsp;{item[2]}
                  <React.Fragment>
                    <br />
                    &nbsp; Dept : {item[8]}
                  </React.Fragment>
                </tr>
              </td>
              <td colSpan="4" className="borcol2">
                <t>
                  {" "}
                  &nbsp; Ext. ...............................................{" "}
                </t>{" "}
                <t style={{ marginLeft: "12px" }}>
                  {" "}
                  Factory ..................................................
                </t>
                <br /> <t> &nbsp; Cost Center : ........... </t>
              </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "70px",
              }}
            >
              <td colSpan="2">&nbsp; 2) Type</td>

              <td
                colSpan="8"
                style={{
                  fontSize: "12px",
                  borderWidth: "1px 0 1px 1px",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                <tr style={{ width: "100%" }}>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Transfer
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Scrap
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Sales
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Loss
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Write-off
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Leading to Third-party
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <Checkbox {...label} />
                    Donation
                  </label>
                </tr>

                <tr>
                  <div style={{ marginLeft: "10px" }} className="remark">
                    Remark :
                  </div>
                </tr>
              </td>
            </tr>
            <tr style={{}}>
              <td
                colSpan="2"
                style={{
                  fontSize: "12px",
                }}
              >
                {" "}
                &nbsp; 3) &nbsp;Details
              </td>
            </tr>
          </table>

          <table className="bordertabletwo" style={{ width: "100%" }}>
            <tr
              style={{
                fontSize: "10px",
                textAlign: "center",
              }}
            >
              <th style={{ width: "60px" }}>Fixed Assets Number</th>
              <th style={{ width: "60px" }}>Comp.</th>
              <th style={{ width: "60px" }}>Cost Center</th>
              <th style={{ width: "350px" }}>Fixed Assets Name</th>
              <th style={{ width: "60px" }}>BOI Project</th>
              <th style={{ width: "60px" }}>Qty</th>
              <th style={{ width: "60px" }}>Invoice No.</th>
              <th style={{ width: "60px" }}>Acquisition Cost (Baht)</th>
              <th style={{ width: "60px" }}>Book Value (Baht)</th>
              <th style={{ width: "60px" }}>New Cost Center</th>
            </tr>

            {Array.from({ length: numRows }, (_, rowIndex) => (
              <tr key={rowIndex} style={{ height: "25px", fontSize: "10px" }}>
                {y[rowIndex]
                  ? Object.values(y[rowIndex]).map((cell, cellIndex) => {
                      if (cellIndex < numberOfCellsPerRow) {
                        return <td key={cellIndex}>{cell}</td>;
                      } else {
                        // เพิ่มเงื่อนไขเพื่อตรวจสอบ index และเก็บไว้ใน z ถ้า index มากกว่า 21
                        if (cellIndex > 18) {
                          w.push(cell);
                        }
                        return null; // หรือคุณสามารถ return <td key={cellIndex}></td> หากไม่ต้องการแสดงผล
                      }
                    })
                  : Array.from(
                      { length: numberOfCellsPerRow },
                      (_, cellIndex) => <td key={cellIndex}></td>
                    )}
              </tr>
            ))}

        
                  <tr
                      className="bottom"
                      style={{
                        width: "100%",
                      }}
                    >
                      <td colSpan={5} style={{ textAlign: "left",  borderWidth: "1px 0 0px 0px" }}>
                        A1-011-001
                      </td>

                      <td colSpan={5} style={{ textAlign: "right" ,  borderWidth: "1px 0 0px 0px"  }}>
                        A1-011-001
                      </td>
                    </tr>
                    <tr
                      className="bottom"
                      style={{
                        width: "100%",
                      }}
                    >
                      <td
                        colSpan={10}
                        style={{ textAlign: "center", fontSize: "12px" }}
                      >
                        Page {index + 1}/{selectedData.length}
                      </td>{" "}
                    </tr>

                    <tr style={{ pageBreakAfter: "always",}}></tr>
          </table>
        
          <table className="bordertablefive" style={{ width: "100%" }}>
            {Array.from(
              { length: Math.ceil(dataToShow.length / 27) },
              (_, groupIndex) => {
                const groupStart = groupIndex * 27;
                const groupEnd = groupStart + 27;
                const groupData = dataToShow.slice(groupStart, groupEnd);

                console.log("EEEEEEEE", groupData);

                return (
                  <React.Fragment key={groupIndex}>
                    <tr
                      style={{
                        fontSize: "10px",
                        textAlign: "center",
                      }}
                    >
                      <th style={{ width: "60px" }}>Fixed Assets Number</th>
                      <th style={{ width: "60px" }}>Comp.</th>
                      <th style={{ width: "60px" }}>Cost Center</th>
                      <th style={{ width: "350px" }}>Fixed Assets Name</th>
                      <th style={{ width: "60px" }}>BOI Project</th>
                      <th style={{ width: "60px" }}>Qty</th>
                      <th style={{ width: "60px" }}>Invoice No.</th>
                      <th style={{ width: "60px" }}>Acquisition Cost (Baht)</th>
                      <th style={{ width: "60px" }}>Book Value (Baht)</th>
                      <th style={{ width: "60px" }}>New Cost Center</th>
                    </tr>

                    {groupData.map((row, rowIndex) => (
                      <tr
                        key={groupStart + rowIndex}
                        style={{ height: "25px" }}
                      >
                        {row
                          ? row.map((cell, cellIndex) => (
                              <td style={{ fontSize: "10px" }} key={cellIndex}>
                                {cell}
                              </td>
                            ))
                          : Array.from(
                              { length: numberOfCellsPerRow3 },
                              (_, cellIndex) => {
                                const dataIndex = shownDataCount + cellIndex;
                                const cell = z[dataIndex];

                                if (cell !== undefined) {
                                  w.push(cell);
                                  return null;
                                }

                                return <td key={cellIndex}></td>;
                              }
                            )}
                      </tr>
                    ))}
                    {Array.from({ length: 25 - groupData.length }).map(
                      (_, blankRowIndex) => (
                        <tr
                          key={`blank_${blankRowIndex}`}
                          style={{ height: "25px" }}
                        >
                          {/* สร้าง cell ว่างเท่ากับจำนวน cell ที่ควรมีในแต่ละ row */}
                          {Array.from({ length: numberOfCellsPerRow3 }).map(
                            (_, cellIndex) => (
                              <td key={`blank_cell_${cellIndex}`}></td>
                            )
                          )}
                        </tr>
                      )
                    )}
                    {groupIndex === Math.ceil(dataToShow.length / 26) - 1 && (
                      <>
                        {count.map((item, index) => (
                          <tr
                            key={index}
                            className="Total"
                            style={{
                              height: "25px",
                              borderWidth: "1px 1px 1px 1px",
                      
                              pageBreakAfter: "always",
                              display: "table-row",
                            }}
                          >
                            <td style={{ fontWeight: "bold" }}>Total</td>
                            <td style={{ width: "60px" }}></td>
                            <td style={{ width: "60px" }}></td>
                            <td style={{ width: "350px" }}></td>
                            <td style={{ width: "60px" }}></td>
                            <td style={{ width: "60px" }}> </td>
                            <td style={{ width: "60px" }}></td>
                            <td
                              style={{
                                borderWidth: "0 0px 0 1px",
                                fontWeight: "bold",
                                width: "60px",
                              }}
                            >
                              {item[0]}{" "}
                            </td>
                            <td
                              style={{
                                borderWidth: "0 1px 0 px",
                                fontWeight: "bold",
                                width: "60px",
                              }}
                            >
                              {item[1]}{" "}
                            </td>
                            <td></td>
                          </tr>
                        ))}
                      </>
                    )}

                    <tr
                      style={{
                        borderBottom: "1px solid black",
                       
                      }}
                    ></tr>

                    <tr
                      className="bottom"
                      style={{
                        width: "100%",
                      }}
                    >
                      <td colSpan={5} style={{ textAlign: "left" }}>
                        A1-011-001
                      </td>

                      <td colSpan={5} style={{ textAlign: "right" }}>
                        A1-011-001
                      </td>
                    </tr>
                    <tr
                      className="bottom"
                      style={{
                        width: "100%",
                      }}
                    >
                      <td
                        colSpan={10}
                        style={{ textAlign: "center", fontSize: "12px" }}
                      >
                        Page {index + 1}/{selectedData.length}
                      </td>{" "}
                    </tr>

                    <tr style={{ pageBreakAfter: "always",}}></tr>
                  </React.Fragment>
                );
              }
            )}
          </table>

          {/* <table
            className="bordertablefour"
            style={{ width: "100%", marginTop: "40px" }}
          >
            <tr
              style={{
                fontSize: "10px",
                textAlign: "center",
              }}
            >
              <th style={{ width: "60px" }}>Fixed Assets Number</th>
              <th style={{ width: "60px" }}>Comp.</th>
              <th style={{ width: "60px" }}>Cost Center</th>
              <th style={{ width: "350px" }}>Fixed Assets Name</th>
              <th style={{ width: "60px" }}>BOI Project</th>
              <th style={{ width: "60px" }}>Qty</th>
              <th style={{ width: "60px" }}>Invoice No.</th>
              <th style={{ width: "60px" }}>Acquisition Cost (Baht)</th>
              <th style={{ width: "60px" }}>Book Value (Baht)</th>
              <th style={{ width: "60px" }}>New Cost Center</th>
            </tr>
            {Array.from({ length: numRows2 }, (_, rowIndex) => {
  const rowData = dataW[rowIndex] || null;

  return (
    <tr key={rowIndex} style={{ height: "25px" }}>
      {rowData
        ? rowData.map((cell, cellIndex) => {
            const dataIndex = rowIndex * numberOfCellsPerRow2 + cellIndex;
            if (dataIndex >= shownDataCount) {
              w.push(cell);
              return null;
            }

            return (
              <td style={{ fontSize: "10px" }} key={cellIndex}>
                {cell}
              </td>
            );
          })
        : Array.from(
            { length: numberOfCellsPerRow2 },
            (_, cellIndex) => {
              const dataIndex = rowIndex * numberOfCellsPerRow2 + shownDataCount + cellIndex;
              const cell = w[dataIndex];

              if (cell !== undefined) {
                w.push(cell);
                return null;
              }

              return <td key={cellIndex}></td>;
            }
          )}
    </tr>
  );
})} 
            {selectedDataSubset.map((row, rowIndex) => (
  <tr key={rowIndex} style={{ height: "25px" }}>
    {row
      ? Object.values(row).map((cell, cellIndex) => (
          <td style={{ fontSize: "10px" }} key={cellIndex}>
            {cell}
          </td>
        ))
      : Array.from(
          { length: numberOfCellsPerRow1 },
          (_, cellIndex) => <td key={cellIndex}></td>
        )}
  </tr>
))}

            <tr
              style={{
                height: "25px",
                borderWidth: "1px 0 0px 1px",
                borderStyle: "solid",
                borderColor: "black",
              }}
            ></tr>
          </table> */}

          <table
            className="bordertablethree"
            style={{
              width: "100%",
            }}
          >
            <tr style={{ height: "10px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 4) Plan
              </td>
              <td colSpan="4" style={{ fontSize: "12px" }}>
                &nbsp; Remove
                <br />
                &nbsp; Date: ………./………/……….
              </td>
              <td colSpan="4" style={{ fontSize: "12px" }}>
                &nbsp; Set up / Scrap <br />
                &nbsp; Date ………../……../……….
              </td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "20px",
              }}
            >
              <td colSpan="2">&nbsp; 5) Service Dept.</td>
              <td colSpan="8">
                <t>&nbsp;Receipt by …………………………….</t>
                <t style={{ marginLeft: "100px" }}>
                  &nbsp;Dept. ……………………….……….
                </t>
                <t style={{ marginLeft: "100px" }}>
                  &&nbsp;Receipt date :……./……./..…..
                </t>
              </td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 6) Approval
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp;Manager <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td
                colSpan="2"
                style={{
                  // border: "1px solid black",
                  width: "200px",
                  fontSize: "12px",
                }}
              >
                &nbsp; BOI <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; FM up <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; ACC
                <br />
                &nbsp; Signature : <br />
                &nbsp; Date :
              </td>
            </tr>
            <tr style={{ height: "10px" }}>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; 7) Action Status <br />
                &nbsp; (Completed Date)
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Old Owner <br />
                <br />
                &nbsp; Completed Date :
              </td>
              <td
                colSpan="2"
                style={{
                  // border: "1px solid black",
                  width: "200px",
                  fontSize: "12px",
                }}
              >
                &nbsp; New Owner
                <br />
                <br />
                &nbsp; Completed Date :
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Sales / Scrap
                <br />
                <br />
                &nbsp; Completed Date
              </td>
              <td colSpan="2" style={{ fontSize: "12px" }}>
                &nbsp; Service Dept
                <br />
                <br />
                &nbsp; Completed Date
              </td>
            </tr>
          </table>

          <div style={{ display: "flex", fontSize: "12px", marginTop: "5px" }}>
            <div style={{ flex: 1, textAlign: "left" }}> A1-0001-1111</div>
            <div style={{ flex: 1, textAlign: "right" }}> A1-0001-1111</div>
          </div>
          <div style={{ textAlign: "center", fontSize: "12px" }}>
            Page {index + 1}/{selectedData.length}
          </div>
        </div>
      ))}
    </>
  );

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "40px",
            marginRight: "10px",
          }}
        >
          <Button
            style={{ borderRadius: "30px", justify: "right" }}
            component="label"
            variant="contained"
            startIcon={<FileDownloadIcon />}
            className="btnExport"
            onClick={downloadAsPDF}
          >
            Download as PDF
          </Button>
        </div>

        {trCount < 14 ? (
          <TableLoop1 />
        ) : trCount < 22 ? (
          <TableLoop2 />
        ) : trCount < 37 ? (
          <TableLoop3 />
        ) : (
          <TableLoop4 />
        )}
      </div>
    </>
  );
}

export default PDFdata;
