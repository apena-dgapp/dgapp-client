import React, { useState, useEffect, useContext } from "react";
import RegulationsForm from "./RegulationsForm";
import { apiFiles } from "../../api/files";
import GlobalContext from "../../context/GlobalContext";

const Regulations = (state) => {
  const [contextState] = useContext(GlobalContext);
  const [arrayFiles, setArrayFiles] = useState("");
  const title = state.location.state;

  useEffect(() => {
    apiFiles(contextState.token, title)
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error al hacer el fetch");
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
        // console.log(res);
        setArrayFiles(res);
        // alert("el nuevo post se creo exitosamente");
      })
      .catch((err) => {
        console.error(err.status);
      });
  }, [contextState.token, title]);

  return (
    <>
      <RegulationsForm arrayFiles={arrayFiles} title={title} />
    </>
  );
};

export default Regulations;
