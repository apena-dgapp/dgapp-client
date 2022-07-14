import React from "react";

const FilePdf = (state) => {
  const pdf = state.location.state;
  // console.log(pdf);

  return (
    <embed src={pdf} type="application/pdf" width="100%" height="800rem" />
  );
};

export default FilePdf;
