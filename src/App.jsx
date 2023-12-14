import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Page1 from "./components/Page1";
import SideBar from "./components/SideBar";
import DataPro from "./components/DataePro";
import DataDept from "./components/DetaDept";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";
import PdfViewer from "./components/PdfViewer";
import PdfData from "./components/PDFdata";
// import TestPDF from "./components/TestPDF";
import Email from "./components/Email";
import Pdfnew from "./components/pdfnew";
const pdfUrl = "https://example.com/path/to/your/pdf/document.pdf";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

function App({}) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Page1" element={<Page1 />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Sidebar" element={<SideBar />} />
        <Route path="/DataPro" element={<DataPro />} />
        <Route path="/DataDept" element={<DataDept />} />
        <Route path="/PDF" element={<PdfViewer />} />
        <Route path="/PDFData" element={<PdfData />} />
        {/* <Route path="/TestPDF" element={<TestPDF />} /> */}
        <Route path="/Email" element={<Email />} />
        <Route path="/Pdfnew" element={<Pdfnew />} />
      </Routes>
    </>
  );
}

export default App;
