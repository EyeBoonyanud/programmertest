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
  const [DataId,setDataId] = [selectedData[0][0]]; // เก็บArray ตัวที่ 1
  const [LoopDeatils, setLoopDetails] = useState([]);
  console.log("ข้อมูลที่ได้รับ",selectedData);
 
  const [selectedDataSubset, setSelectedDataSubset] = useState([]);
  const [Loopdata, setLoopdata] = useState([]);


 
 useEffect(() => {
  const fetchData = async () => {
    try {
      // ทำ POST request โดยส่ง DataId ไปด้วย
      const response = await axios.post(
        `http://localhost:3000/LoopDatils?id=${DataId}`
        
      );
console.log("MMM",response)
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
    async function fetchData() {
      try {
        const DataResponse = await axios.get(
          "http://localhost:3000/getDataPro"
        );
        const TableData = DataResponse.data;
        setLoopdata(TableData);
        console.log("dataloop", TableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  let x = [];
  let y = [];
  x = selectedData;
  y = LoopDeatils;
  console.log("Y : dataloop : ", y);
  console.log("X : dataloop : ", x);
  useEffect(() => {
    // เมื่อ selectedData เปลี่ยนแปลง, ดึงข้อมูลตั้งแต่ตำแหน่งที่ 21 ถึงตัวสุดท้าย
    const subset = selectedData.slice(21); // เนื่องจาก JavaScript ใช้การนับเริ่มต้นที่ 0
    setSelectedDataSubset(subset);
  }, [selectedData]);
  console.log("Y ", selectedDataSubset);
  const numRows1 = 14;
  const numberOfCellsPerRow1 = 10;
  const numRows = 21;
  const numberOfCellsPerRow = 10;
  const numRows2 = 30;
  const numberOfCellsPerRow2 = 10;

  // const prevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  const trCount = y.length;
  // console.log("gggg", x);
  // console.log("ข้อมูล", selectedData);

  // useEffect(() => {
  //   // ให้มี page break ถ้ามีมากกว่า 8 rows
  //   const tableTwo = document.querySelector(".bordertabletwo");
  //   const tableThree = document.querySelector(".bordertablethree");
  //   // const trCount = tableTwo.querySelectorAll('tr').length;
  //   const trCount = x.length;

  //   if (trCount > 8 && trCount < 17) {
  //     console.log("entry");
  //     tableTwo.style.pageBreakAfter = "always";
  //   } else {
  //     console.log("no entry");
  //   }
  // }, []);

  const TableLoop1 = () => (
    <>
      {selectedData.map((item, index) => (
        <div
          className="totaltable"
          style={{ padding: "30px", pageBreakBefore: "always" }}
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
             <th style={{width:'60px'}}>Fixed Assets Number</th>
              <th style={{width:'60px'}}>Comp.</th>
              <th style={{width:'60px'}}>Cost Center</th>
              <th style={{width:'350px'}} >Fixed Assets Name</th>
              <th style={{width:'60px'}}>BOI Project</th>
              <th style={{width:'60px'}} >Qty</th>
              <th style={{width:'60px'}}>Invoice No.</th>
              <th style={{width:'60px'}}>Acquisition Cost (Baht)</th>
              <th style={{width:'60px'}}>Book Value (Baht)</th>
              <th style={{width:'60px'}}>New Cost Center</th>
            </tr>
            {Array.from({ length: numRows1 }, (_, rowIndex) => (
              <tr key={rowIndex} style={{ height: "25px" }}>
                {y[rowIndex]
                  ? Object.values(y[rowIndex]).map((cell, cellIndex) => (
                      <td style={{fontSize: "10px",}} key={cellIndex}>{cell}</td>
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
                borderWidth: "1px 0 0 1px",
                borderStyle: "solid",
                borderColor: "black",
              }}
            ></tr>
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
          <br></br>
          <div style={{ textAlign: "center" }}>
            Page {index + 1}/{selectedData.length}
          </div>
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
                height: "60px",
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

          <table
            className="bordertabletwo"
            style={{ width: "100%", pageBreakAfter: "always" }}
          >
            <tr
              style={{
                fontSize: "12px",
                textAlign: "center",
              }}
            >
             <th style={{width:'60px'}}>Fixed Assets Number</th>
              <th style={{width:'60px'}}>Comp.</th>
              <th style={{width:'60px'}}>Cost Center</th>
              <th style={{width:'350px'}} >Fixed Assets Name</th>
              <th style={{width:'60px'}}>BOI Project</th>
              <th style={{width:'60px'}} >Qty</th>
              <th style={{width:'60px'}}>Invoice No.</th>
              <th style={{width:'60px'}}>Acquisition Cost (Baht)</th>
              <th style={{width:'60px'}}>Book Value (Baht)</th>
              <th style={{width:'60px'}}>New Cost Center</th>
            </tr>
            {Array.from({ length: numRows }, (_, rowIndex) => (
              <tr key={rowIndex} style={{ height: "25px" }}>
                {y[rowIndex]
                  ? Object.values(y[rowIndex]).map((cell, cellIndex) => (
                      <td style={{fontSize: "10px",}} key={cellIndex}>{cell}</td>
                    ))
                  : Array.from(
                      { length: numberOfCellsPerRow },
                      (_, cellIndex) => <td key={cellIndex}></td>
                    )}
              </tr>
            ))}
            <tr
              style={{
                height: "25px",
                borderWidth: "1px 0 1px 1px",
                borderStyle: "solid",
                borderColor: "black",
              }}
            ></tr>
          </table>

          <table
            className="bordertablethree"
            style={{
              width: "100%",
              marginTop: "30px",
              pageBreakAfter: "always",
            }}
          >
            <tr style={{ height: "70px" }}>
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
                height: "50px",
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
            <tr style={{ height: "80px" }}>
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
            <tr style={{ height: "80px" }}>
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
          <br></br>
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
                height: "60px",
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

          <table
            className="bordertabletwo"
            style={{ width: "100%", pageBreakAfter: "always" }}
          >
            <tr
              style={{
                fontSize: "10px",
                textAlign: "center",
              }}
            >
              <th style={{width:'60px'}}>Fixed Assets Number</th>
              <th style={{width:'60px'}}>Comp.</th>
              <th style={{width:'60px'}}>Cost Center</th>
              <th style={{width:'350px'}} >Fixed Assets Name</th>
              <th style={{width:'60px'}}>BOI Project</th>
              <th style={{width:'60px'}} >Qty</th>
              <th style={{width:'60px'}}>Invoice No.</th>
              <th style={{width:'60px'}}>Acquisition Cost (Baht)</th>
              <th style={{width:'60px'}}>Book Value (Baht)</th>
              <th style={{width:'60px'}}>New Cost Center</th>
            </tr>
            {Array.from({ length: numRows2 }, (_, rowIndex) => (
              <tr key={rowIndex} style={{ height: "25px" }}>
                {y[rowIndex]
                  ? Object.values(y[rowIndex]).map((cell, cellIndex) => (
                      <td style={{fontSize: "10px",}} key={cellIndex}>{cell}</td>
                    ))
                  : Array.from(
                      { length: numberOfCellsPerRow2 },
                      (_, cellIndex) => <td key={cellIndex}></td>
                    )}
              </tr>
            ))}
          

            <tr
              style={{
                height: "25px",
                borderWidth: "1px 0 1px 1px",
                borderStyle: "solid",
                borderColor: "black",
              }}
            ></tr>
          </table>

          <table
            className="bordertablethree"
            style={{
              width: "100%",
              marginTop: "30px",
              pageBreakAfter: "always",
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
                height: "50px",
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
            <tr style={{ height: "80px" }}>
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
            <tr style={{ height: "80px" }}>
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
          <br></br>
        </div>
      ))}
    </>
  );

  const downloadAsPDF = () => {
    const container = document.createElement("totaltable");

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

    console.log("print success");

    html2pdf(container, options);
  };

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

        {/* {selectedData.map((item, index) => (
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
                  height: "60px",
                }}
              >
                <td colSpan="2">&nbsp; 1) Requester</td>
                <td colSpan="4" className="borcol2">
                  <tr
                    style={{
                      fontSize: "14px",
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
                <th>Fixed Assets Number</th>
                <th>Comp.</th>
                <th>Cost Center</th>
                <th>Fixed Assets Name</th>
                <th>BOI Project</th>
                <th>Qty</th>
                <th>Invoice No.</th>
                <th>Acquisition Cost (Baht)</th>
                <th>Book Value (Baht)</th>
                <th>New Cost Center</th>
              </tr>
              {x.map((item, index) => (
                <tr key={index} style={{ height: "25px" }}>
                  {item.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
              <tr
                style={{
                  height: "25px",
                  borderWidth: "1px 0 0 1px",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              ></tr>
            </table>

            <table className="bordertablethree" style={{ width: "100%" }}>
              <tr style={{ height: "70px" }}>
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
                  height: "50px",
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
              <tr style={{ height: "80px" }}>
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
              <tr style={{ height: "80px" }}>
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
            <br></br>
          </div>
        ))} */}

        {trCount < 15 ? (
          <TableLoop1 />
        ) : trCount < 22 ? (
          <TableLoop2 />
        ) : (
          <TableLoop3 />
        )}
      </div>
    </>
  );
}

export default PDFdata;
