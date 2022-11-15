import React, { useState, useEffect } from "react";
import DownloadForm from "./DownloadForm";
import { apiFiles } from "../../api/files";
import { useLocation } from "react-router-dom";

const Download = () => {
  const [arrayFiles, setArrayFiles] = useState("");
  const location = useLocation();
  const state = location.state;

  useEffect(() => {

    let unmounted = false;
    apiFiles("PERSONAL DOCUMENT")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayFiles(res);
       
          // console.log(res);
          // fetch(res)
          // .then((res) => res.blob())
          // .then((blob) => {
          //   var formData = new FormData();
          //   formData.append("my_image", blob);
          // });
        }
        
      })
      .catch((err) => {
        console.error(err.status);
      });

      return () => {
        unmounted = true;
      };
  }, []);

  return (
    <>
      <DownloadForm arrayFiles={arrayFiles} title={state.title} />
    </>
  );
};

export default Download;
