import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div className="flex flex-col items-center p-4">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="shadow-lg rounded-lg"
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="flex justify-between w-full mt-4">
        <button onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} disabled={pageNumber <= 1} className="px-4 py-2 bg-blue-500 text-white rounded">Prev</button>
        <p>Page {pageNumber} of {numPages}</p>
        <button onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))} disabled={pageNumber >= numPages} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </div>
    </div>
  );
}
