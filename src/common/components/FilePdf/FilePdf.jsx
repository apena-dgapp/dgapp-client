import React from "react";

const FilePdf = (state) => {
  const pdf = state.location.state;
  return (
    <embed src={pdf} type="application/pdf" width="100%" height="700rem" />
  );
};

export default FilePdf;
