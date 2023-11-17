import React from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer = ({ pdfUrl }) => (
  <Document file={pdfUrl}>
    <Page pageNumber={1} />
  </Document>
);

export default PdfViewer;