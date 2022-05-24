import React from "react";

const BirthdayForm = ({ arrayBirthday }) => {
  // const month = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
  //   new Date()
  // );
  return (
    <>
      <div className="birthday-cont">
        <p className="birtday-title">CUMPLEAÑOS</p>
        <div className="birtday-list-cont">
          <div className="birtday-list">
            {arrayBirthday.map((file) => {
              const day = file.birthdayDate.split("-");
              const daySplit = day[2];
              const currentDay = `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${daySplit}`;
              const fechaComoCadena = currentDay; // día lunes
              const dias = [
                "domingo",
                "lunes",
                "martes",
                "miércoles",
                "jueves",
                "viernes",
                "sábado",
              ];
              const numeroDia = new Date(fechaComoCadena).getDay();
              const nombreDia = dias[numeroDia];
              // console.log("Nombre de día de la semana: ", nombreDia);

              return (
                <div key={file.personId} className="birtday-enl">
                  &#127880; {file.firstName} -{" "}
                  {nombreDia.replace(/^\w/, (c) => c.toUpperCase())} {daySplit}
                  <p className="birthday-position">{file.position}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BirthdayForm;
