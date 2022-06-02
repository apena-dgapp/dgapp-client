import React, { useEffect, useContext, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import GlobalContext from "../../context/GlobalContext";
import { getOnePerson } from "../../api/person";

const Employee = (props) => {
  const id = props.location.state;
  const [contextState] = useContext(GlobalContext);
  const [profile, setProfile] = useState("");
  const [reportsTo, setReportsTo] = useState("");

  useEffect(() => {
    let unmounted = false;

    getOnePerson(contextState.token, id)
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error usuario incorrecto");
        return res.json();
      })

      .then((res) => {
        if (!unmounted) {
          setProfile(res);
          getOnePerson(contextState.token, res.reportsTo)
            .then((res) => {
              if (res.status >= 400)
                throw new alert.err("error usuario incorrecto");
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
  }, [contextState.token, id]);

  // console.log(reportsTo);

  return (
    <>
      <EmployeeForm reportsTo={reportsTo} profile={profile} />
    </>
  );
};

export default Employee;
