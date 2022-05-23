import React, { useEffect, useContext, useState } from "react";
import BirthdayForm from "./BirthdayForm";
import GlobalContext from "../../../context/GlobalContext";
import { getBirthday } from "../../../api/person";

const Birthday = () => {
  const [contextState] = useContext(GlobalContext);

  const [arrayBirthday, setArrayBirthday] = useState([]);

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

  return (
    <>
      <BirthdayForm arrayBirthday={arrayBirthday} />
    </>
  );
};

export default Birthday;
