import React, { useState, useEffect } from "react";
import DownloadForm from "./DownloadForm";
import { apiFiles } from "../../api/files";
import { useLocation } from "react-router-dom";

const Download = (state) => {
  const [arrayFiles, setArrayFiles] = useState("");
  const location = useLocation();
  const title = location.state;

  useEffect(() => {
    apiFiles("PERSONAL DOCUMENT")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        setArrayFiles(res);
        // alert("el nuevo post se creo exitosamente");
        // console.log(res);
        fetch(res)
          .then((res) => res.blob())
          .then((blob) => {
            var formData = new FormData();
            formData.append("my_image", blob);
            // console.log(blob);
            // console.log(formData);
          });
      })
      .catch((err) => {
        console.error(err.status);
      });
  }, []);

  return (
    <>
      <DownloadForm arrayFiles={arrayFiles} title={title} />
    </>
  );
};

export default Download;
