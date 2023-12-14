import React from "react";
import jsPDF from "jspdf";

class PdfGenerator extends React.Component {
  generatePdf = () => {
    const pdf = new jsPDF();

    // Define data for the table
    const tableData = [
      [
        "4) Plan",
        "Remove",
        "Date: ………./………/……….",
        "Set up / Scrap",
        "Date ………../……../……….",
      ],
      [
        "5) Service Dept.",
        "Receipt by ……………………………. Dept. ……………………….………. Receipt date :……./……./……..",
      ],
      [
        "6) Approval",
        "Manager Signature : Date :",
        "BOI Signature : Date :",
        "FM up Signature : Date :",
        "ACC Signature : Date :",
      ],
      [
        "7) Action Status (Completed Date)",
        "Old Owner Completed Date :",
        "New Owner Completed Date :",
        "Sales / Scrap Completed Date",
        "Service Dept Completed Date",
      ],
    ];

    // Set cell width and height
    const cellWidth = 40;
    const cellHeight = 10;

    // Set initial position for the table
    let xPos = 10;
    let yPos = 10;

    // Loop through each row and column to add content to PDF
    for (let i = 0; i < tableData.length; i++) {
      const row = tableData[i];

      for (let j = 0; j < row.length; j++) {
        const cell = row[j];

        // Draw the cell
        pdf.rect(xPos, yPos, cellWidth, cellHeight);
        pdf.text(cell, xPos + 2, yPos + 8); // Adjust the text position

        xPos += cellWidth; // Move to the next column

        // Check if the next column exceeds the page width
        if (xPos + cellWidth > pdf.internal.pageSize.width - 10) {
          xPos = 10; // Move back to the leftmost column
          yPos += cellHeight; // Move to the next row
        }
      }

      xPos = 10; // Reset the column position for the next row
      yPos += cellHeight; // Move to the next row
    }

    // Save PDF
    pdf.save("generated-pdf-with-custom-table.pdf");
  };

  render() {
    return (
      <div>
        {/* Your UI */}
        {/* Content to be converted to PDF */}

        {/* Button to generate PDF */}
        <button onClick={this.generatePdf}>
          Generate PDF with Custom Table
        </button>
      </div>
    );
  }
}

export default PdfGenerator;
