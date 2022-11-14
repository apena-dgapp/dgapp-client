import React from "react";
import { useLocation } from "react-router-dom";

const FilePdf = (state) => {
  const location = useLocation();
  const pdf = location.state;

  return (
    <embed src={pdf} type="application/pdf" width="100%" height="800rem" />
  );
};

export default FilePdf;
