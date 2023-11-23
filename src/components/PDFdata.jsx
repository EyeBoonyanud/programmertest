import React, { useRef } from "react";
import Checkbox from "@mui/material/Checkbox";
import html2pdf from "html2pdf.js";

import "./StyleLogin.css";

const PDFdata = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const tableRef = useRef();
  const downloadAsPDF = () => {
    const input = tableRef.current;

    const options = {
      margin: 10,
      filename: "exported-file.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }, // Set orientation to landscape
    };

    html2pdf(input, options);
  };
  return (
    <>
      <div>
        <button
          style={{ marginTop: "30px", marginLeft: "20px" }}
          onClick={downloadAsPDF}
        >
          Download as PDF
        </button>
        <div style={{ padding: "30px" }}>
          <table
            className="bordertable"
            ref={tableRef}
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

              <td colSpan="5">&nbsp; FAM : 01-2345-67-8901</td>
            </tr>
            <tr
              style={{
                fontSize: "12px",
                height: "60px",
              }}
            >
              <td colSpan="2">&nbsp; 1) Requester</td>
              <td colSpan="4" className="borcol2">
                &nbsp; Name : ..............
                <br />
                &nbsp; Dept : .........
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
            <tr
              style={{
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              <td>Fixed Assets Number</td>
              <td>Comp.</td>
              <td>Cost Center</td>
              <td>Fixed Assets Name</td>
              <td>BOI Project</td>
              <td>Qty</td>
              <td>Invoice No.</td>
              <td>Acquisition Cost (Baht)</td>
              <td>Book Value (Baht)</td>
              <td>New Cost Center</td>
            </tr>
            <tr style={{ height: "25px" }}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr style={{ height: "25px" }}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>{" "}
            <tr style={{ height: "25px" }}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>{" "}
            <tr style={{ height: "25px" }}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>{" "}
            <tr style={{ height: "25px" }}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr style={{ height: "25px" }}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr style={{ height: "25px" }}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr style={{ height: "25px" }}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr
              style={{
                height: "25px",
                borderWidth: "1px 0 0 1px",
                borderStyle: "solid",
                borderColor: "black",
              }}
            ></tr>
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
        </div>
      </div>
    </>
  );
};

export default PDFdata;
