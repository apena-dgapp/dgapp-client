import React from "react";

const BirthdayForm = ({ arrayBirthday, employeeProfile }) => {
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

              const firstN = file.firstName.split(" ");
              const lastN = file.lastName.split(" ");
              const firstNSplit = firstN[0];
              const lastNSplit = lastN[0];

              return (
                <div
                  onClick={employeeProfile}
                  key={file.personId}
                  id={file.personId}
                  className="birtday-enl"
                >
                  &#127880; {firstNSplit + " " + lastNSplit} -{" "}
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
