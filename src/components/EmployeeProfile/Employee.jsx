import React, { useEffect, useState, useContext } from "react";
import EmployeeForm from "./EmployeeForm";
import { getOnePerson, isActivePerson } from "../../api/person";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

const Employee = (props) => {
  const [contextState] = useContext(GlobalContext);
  const id = props.location.state;
  const [profile, setProfile] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const history = useHistory();

  const msgDisable = () => {
    return toast.error(
      "Lo sentimos por el momento esta opción esta deshabilita. Estamos trabajando en ello."
    );
    //history.push('./')
  };

  const edit = () => {
    const reportName = {
      reportname: reportsTo?.firstName + " " + reportsTo?.lastName,
    };

    const newProfile = Object.assign(profile, reportName);
    history.push({
      pathname: "./employeeedit",
      state: newProfile,
    });
  };

  useEffect(() => {
    let unmounted = false;

    getOnePerson(id)
      .then((res) => {
        return res.json();
      })

      .then((res) => {
        if (!unmounted) {
          setProfile(res);
          getOnePerson(res.reportsTo)
            .then((res) => {
              return res.json();
            })

            .then((res) => {
              if (!unmounted) {
                setReportsTo(res);
              }
            })
            .catch((err) => {
              console.error(err.status);
            });
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [id]);
  const generateDocument = () => {
    loadFile("../../common/Docs/carta-laboral.docx", function (error, content) {
      if (error) {
        throw error;
      }
      var zip = new PizZip(content);
      var doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      doc.setData({
        fecha: "6 de junio 2022, Santo Domingo, Rep. Dom.",
        nombre: "Carlos Perez",
        tiempo: "6",
        carrera: "Ingenieria en Sistema",
        posicion: "Soporte Tecnico",
        departamento: "Tecnologia",
      });
      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function (error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);
          // errorMessages is a humanly readable message looking like this :
          // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
      }
      var out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }); //Output the document using Data-URI
      saveAs(out, "output.docx");
    });
  };

  const handleIsActive = (e) => {
    const isActive = e.target.checked;
    const modifiedAt = new Date();
    isActivePerson(id, isActive, contextState.userName, modifiedAt)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(err.status);
      });
  };

  console.log(profile);

  return (
    <>
      <EmployeeForm
        generateDocument={generateDocument}
        reportsTo={reportsTo}
        profile={profile}
        msgDisable={msgDisable}
        edit={edit}
        handleIsActive={handleIsActive}
      />
    </>
  );
};

export default Employee;
