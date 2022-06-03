import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const FilePdf = (state) => {
  const pdf = state.location.state;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  //   console.log(pdf);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <>
      <div>
        {pdf ? (
          <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        ) : null}
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </>
  );
};

export default FilePdf;
