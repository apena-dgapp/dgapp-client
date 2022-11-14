import React, { useEffect, useState } from "react";
import BirthdayForm from "./BirthdayForm";
import { getBirthday } from "../../../api/person";
import { useNavigate } from "react-router-dom";

const Birthday = () => {
  const [arrayBirthday, setArrayBirthday] = useState([]);
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  // const [isToday, setIsToday] = useState(false);

  const modalToggle = () => {
    setModalActive(!modalActive);
  };

  useEffect(() => {
    let unmounted = false;

    getBirthday()
      .then((res) => {
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
  }, []);
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
    navigate("/employee",{state:employeeId})
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
