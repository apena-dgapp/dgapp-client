import React, { useEffect, useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import EmployeeTreeForm from "./EmployeeTreeForm";
import { getEmployeeTree } from "./../../api/person";

const EmployeeTree = () => {
  const [contextState] = useContext(GlobalContext);
  const [persons, setPersons] = useState();

  useEffect(() => {
    let unmounted = false;

    getEmployeeTree(contextState.token)
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error usuario incorrecto");
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          const userFalt = res.reduce((acc, el, i) => {
            acc[el.personId] = i;
            return acc;
          }, {});

          let root;
          res.forEach((el) => {
            // Handle the root element
            if (el.reportsTo === null) {
              root = el;
              return;
            }
            // Use our mapping to locate the parent element in our res array
            const parentEl = res[userFalt[el.reportsTo]];
            // Add our current el to its parent's `children` array
            parentEl.children = [...(parentEl.children || []), el];
          });

          setPersons(root);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [contextState.token]);
  // console.log(persons);
  return (
    <>
      <div style={{ marginTop: "10rem" }}>
        <EmployeeTreeForm persons={persons} />
      </div>
    </>
  );
};

export default EmployeeTree;
