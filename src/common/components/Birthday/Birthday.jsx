import React, { useEffect, useContext, useState } from "react";
import BirthdayForm from "./BirthdayForm";
import GlobalContext from "../../../context/GlobalContext";
import { getBirthday } from "../../../api/person";
import { useHistory } from "react-router-dom";

const Birthday = () => {
  const [contextState] = useContext(GlobalContext);
  const [arrayBirthday, setArrayBirthday] = useState([]);
  const history = useHistory();
  const [modalActive, setModalActive] = useState(false);
  // const [isToday, setIsToday] = useState(false);

  const modalToggle = () => {
    setModalActive(!modalActive);
  };

  useEffect(() => {
    let unmounted = false;

    getBirthday(contextState.token)
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error usuario incorrecto");
        return res.json();
      })

      .then((res) => {
        if (!unmounted) {
          setArrayBirthday((arrayBirthday) => [...arrayBirthday, ...res]);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [contextState.token]);
  // if (arrayBirthday) {
  //   var day = `${new Date().getDate()}`.padStart(2, "0");
  //   var isToday = "";

  //   arrayBirthday.map((file) => {
  //     const date = `${new Date(
  //       file.birthdayDate.split("-")
  //     ).getDate()}`.padStart(2, "0");
  //     // const arrayDate = date[2]);
  //     // return day === date ? setIsToday(true) : null;
  //    date === day ? isToday === true: null

  //     // console.log(date + " /// " + day);
  //   });
  // }
  const employeeProfile = (e) => {
    const employeeId = e.currentTarget.id;
    history.push({
      pathname: "./employee",
      state: employeeId,
    });
  };
  // console.log(isToday);
  return (
    <>
      <BirthdayForm
        arrayBirthday={arrayBirthday}
        employeeProfile={employeeProfile}
        modalActive={modalActive}
        modalToggle={modalToggle}
      />
    </>
  );
};

export default Birthday;
