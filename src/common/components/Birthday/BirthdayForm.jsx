import React, { useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";
import ModalBirthday from "../../components/Modal/ModalBirthday";

const BirthdayForm = ({
  arrayBirthday,
  employeeProfile,
  modalActive,
  modalToggle,
}) => {
  // const month = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
  //   new Date()
  // );

  const [modalToday, setModalToday] = useState(false);
  return (
    <>
      <ModalBirthday
        // modalTitle={modalValidaton ? modalTitleAuth : modalTitle}
        modalToggle={modalToggle}
        modalActive={modalActive}
        arrayBirthday={arrayBirthday}
        employeeProfile={employeeProfile}
      />

      <div className="birthday-cont">
        <p className="birtday-title m-0">CUMPLEAÑOS</p>
        {modalToday ? (
          <div onClick={modalToggle} className="d-flex justify-content-center">
            <i className="fa fa-birthday-cake" />
            <FaBirthdayCake size="1.3em" color="orange" />
            <p className="animate-charcter">Ver cumpleaños de hoy</p>
          </div>
        ) : null}

        <div className="birtday-list-cont">
          <div className="birtday-list">
            {arrayBirthday.map((file) => {
              const day = file.birthdayDate.split("-");
              const month = new Date(day).getMonth();
              const currentMonth = new Date().getMonth();
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
              const numero = new Date().getDate();

              const firstN = file.firstName.split(" ");
              const lastN = file.lastName.split(" ");
              const firstNSplit = firstN[0];
              const lastNSplit = lastN[0];

              if (currentMonth === month && numero === Number(daySplit)) {
                if (!modalToday) {
                  setModalToday(true);
                }
              }

              return currentMonth === month ? (
                <div
                  onClick={employeeProfile}
                  key={file.personId}
                  id={file.personId}
                >
                  <p className="birthday-name">
                    &#127880; {firstNSplit + " " + lastNSplit} -{" "}
                    {nombreDia.replace(/^\w/, (c) => c.toUpperCase())}{" "}
                    {daySplit}
                  </p>
                  <p className="birthday-position">{file.position}</p>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BirthdayForm;
