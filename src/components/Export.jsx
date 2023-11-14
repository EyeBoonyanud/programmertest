import React from "react";
import { Button } from "@material-ui/core";
import { CsvDownloader } from 'react-csv';


function ExportData({ data }) {
  const downloadData = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      data.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <Button variant="contained" color="primary" onClick={downloadData}>
      Export Data
    </Button>
  );
}

export default ExportData;
