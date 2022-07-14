import React, { useState, useEffect } from "react";
import { apiFiles } from "../../../api/files";
const PizZip = require("pizzip");
const { saveAs } = require("file-saver");

const DocDynamic = () => {
  const [docs, setDocs] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    apiFiles("PERSONAL DOCUMENT")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setFile(...file, res.files);
        // console.log(res);
        // setArrayFiles(res);
        // alert("el nuevo post se creo exitosamente");
        // console.log(res);
        // fetch(res)
        //   .then((res) => res.blob())
        //   .then((blob) => {
        //     var formData = new FormData();
        //     formData.append("my_image", blob);
        //     console.log(blob);
        //     console.log(formData);
        //     setDocs(res);
        //     console.log(docs);
        //   });
      })
      .catch((err) => {
        console.error(err.status);
      });
  }, [file]);

  const seletedHandler = (e) => {
    setDocs(e.target.files[0]);
  };

  // const doc = "../../Docs/carta-laboral.docx";
  // const newDoc = new File(file, "carta-laboral.docx", {
  //   type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // });
  // console.log(newDoc);
  const generate = () => {
    // docs = document.getElementById("doc");

    if (docs) {
      var reader = new FileReader();
      // if (docs.files.length === 0) {
      //   alert("No files selected");
      // }
      reader.readAsBinaryString(docs);

      reader.onerror = function (evt) {
        console.log("error reading file", evt);
        alert("error reading file" + evt);
      };
      reader.onload = function (evt) {
        const content = evt.target.result;
        var zip = new PizZip(content);
        var doc = new window.docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });

        // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
        doc.render({
          fecha: "6 de junio 2022, Santo Domingo, Rep. Dom.",
          nombre: "Carlos Perez",
          tiempo: "6",
          carrera: "Ingenieria en Sistema",
          posicion: "Soporte Tecnico",
          departamento: "Tecnologia",
        });

        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          // compression: DEFLATE adds a compression step.
          // For a 50MB output document, expect 500ms additional CPU time
          compression: "DEFLATE",
        });
        // Output the document using Data-URI
        saveAs(out, "output.docx");
      };
    }
  };
  return (
    <>
      <div className="mmmm">
        <input onChange={seletedHandler} type="file" id="doc" />
        <button onClick={generate}>Generate document</button>
      </div>
    </>
  );
};

export default DocDynamic;
