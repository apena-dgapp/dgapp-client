import React, { useEffect, useState, useContext } from "react";
import TreeForm from "./TreeForm";
import { getEmployeeTree } from "./../../api/person";
import GlobalContext from "../../context/GlobalContext";

const Tree = () => {
  const [persons, setPersons] = useState({
    name: "",
    children: "",
    attributes: { age: "" },
    departament: "",
    position: "",
    photo: "",
    firstName: "",
    lastName: "",
  });

  const [, , contextMiddleware] = useContext(GlobalContext);

  useEffect(() => {
    let unmounted = false;

    getEmployeeTree()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        contextMiddleware.showSpinner(true);
        if (!unmounted) {
          const userFalt = res.reduce((acc, el, i) => {
            acc[el.personId] = i;
            return acc;
          }, {});

          let root;
          res.forEach((el) => {
            if (el.reportsTo === null) {
              root = el;
              return;
            }
            const parentEl = res[userFalt[el.reportsTo]];
            parentEl.children = [...(parentEl.children || []), el];
          });

          setPersons({
            name:
              root.firstName.split(" ")[0] + " " + root.lastName.split(" ")[0],
            children: root.children,
            Departament: {
              name: root.Departament.name,
            },
            position: root.position,
            photo: root.photo,
            firstName: root.firstName.split(" ")[0],
            lastName: root.lastName.split(" ")[0],
            personId: root.personId,
          });
        }
        contextMiddleware.showSpinner(false);
      })
      .catch((err) => {
        contextMiddleware.showSpinner(false);
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      {/* <div className="tree-title">DGAPP ORGANIGRAMA</div> */}

      <div className="tree-title">
        {" "}
        <div className="container-tree-title">
          <div className="box">
            <div className="title">
              <span className="block" />
              <h1>
                DIRECCIÓN GENERAL DE ALIANZAS PÚBLICO-PRIVADAS
                <span />
              </h1>
            </div>
            <div className="role">
              <div className="block" />
              <p>Organigrama</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tree-chart">
        <TreeForm persons={persons} />
      </div>
    </>
  );
};

export default Tree;
