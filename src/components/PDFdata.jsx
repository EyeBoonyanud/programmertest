import React, { useRef } from "react";
import Checkbox from "@mui/material/Checkbox";
import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";


const PDFdata = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const tableRef = useRef();
  const downloadAsPDF = () => {
    const input = tableRef.current;
    html2pdf(input);
  
  };
  return (
    <>
      <table
        ref={tableRef}
        style={{
          borderCollapse: "collapse",
          width: "100%",
          border: "1px solid black",
        }}
      >
        <tr style={{ border: "1px solid black" }}>
          <td colSpan="5">Fixed Assets Movement Slip Number</td>

          <td colSpan="5">FAM : 01-2345-67-8901</td>
        </tr>
        <tr>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            &nbsp; 1) Requester
          </td>
          <td colSpan="4" style={{ border: "1px solid black" }}>
            Name : ..............
            <br />
            Dept : .........
          </td>
          <td colSpan="4" style={{ border: "1px solid black" }}>
            Ext. ....... Factory ........ <br /> Cost Center : ...........
          </td>
        </tr>
        <tr>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            &nbsp; 2) Type
          </td>

          <td colSpan="8" style={{ border: "1px solid black" }}>
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
        <tr>
          <td colSpan="2"> &nbsp; 3) &nbsp;Details</td>
        </tr>
        <tr style={{ border: "1px solid black" }}>
          <td style={{ border: "1px solid black" }}>Fixed Assets Number</td>
          <td style={{ border: "1px solid black" }}>Comp.</td>
          <td style={{ border: "1px solid black" }}>Cost Center</td>
          <td style={{ border: "1px solid black" }}>Fixed Assets Name</td>
          <td style={{ border: "1px solid black" }}>BOI Project</td>
          <td style={{ border: "1px solid black" }}>Qty</td>
          <td style={{ border: "1px solid black" }}>Invoice No.</td>
          <td style={{ border: "1px solid black" }}>Acquisition Cost (Baht)</td>
          <td style={{ border: "1px solid black" }}>Book Value (Baht)</td>
          <td style={{ border: "1px solid black" }}>New Cost Center</td>
        </tr>
        <tr style={{ height: "25px" }}>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
        </tr>
        <tr style={{ height: "25px" }}>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
        </tr>{" "}
        <tr style={{ height: "25px" }}>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
        </tr>{" "}
        <tr style={{ height: "25px" }}>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
        </tr>{" "}
        <tr style={{ height: "25px" }}>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
          <td style={{ border: "1px solid black" }}></td>
        </tr>
        <tr style={{ height: "25px" }}>
          <td></td>
        </tr>
        <tr>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            &nbsp; 4) Plan
          </td>
          <td colSpan="4" style={{ border: "1px solid black" }}>
            Remove
            <br />
            Date: ………./………/……….
          </td>
          <td colSpan="4" style={{ border: "1px solid black" }}>
            Set up / Scrap <br /> Date ………../……../……….
          </td>
        </tr>
        <tr style={{ border: "1px solid black" }}>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            &nbsp; 5) Service Dept.
          </td>
          <td colSpan="3">Receipt by …………………………….</td>
          <td colSpan="3">Dept. ……………………….……….</td>
          <td colSpan="2">Receipt date :……./……./..…..</td>
        </tr>
        <tr>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            &nbsp; 6) Approval
          </td>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            Manager <br />
            Signature : <br />
            Date :
          </td>
          <td colSpan="2" style={{ border: "1px solid black", width: "200px" }}>
            BOI <br />
            Signature : <br />
            Date :
          </td>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            FM up <br />
            Signature : <br />
            Date :
          </td>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            ACC
            <br />
            Signature : : <br />
            Date :
          </td>
        </tr>
        <tr>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            &nbsp; 7) Action Status <br />
            (Completed Date)
          </td>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            Old Owner <br />
            <br />
            Completed Date :
          </td>
          <td colSpan="2" style={{ border: "1px solid black", width: "200px" }}>
            New Owner
            <br />
            <br />
            Completed Date :
          </td>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            Sales / Scrap
            <br />
            <br />
            Completed Date
          </td>
          <td colSpan="2" style={{ border: "1px solid black" }}>
            Service Dept
            <br />
            <br />
            Completed Date
          </td>
        </tr>
      </table>
      <button onClick={downloadAsPDF}>Download as PDF</button>
    </>
  );
};

export default PDFdata;
