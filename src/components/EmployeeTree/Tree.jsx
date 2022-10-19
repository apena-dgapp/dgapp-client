import React, { useEffect, useState } from "react";
import TreeForm from "./TreeForm";
import { getEmployeeTree } from "./../../api/person";
import ClipLoader from "react-spinners/ClipLoader";

const Tree = () => {
  const [loading, seLoading] = useState(false);
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

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      seLoading(true);
    }
    setTimeout(() => {
      if (!unmounted) {
        seLoading(false);
      }
    }, 1500);
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;

    getEmployeeTree()
      .then((res) => {
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
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#113250" loading={loading} size={150} />
        </div>
      ) : (
        <>
          <div className="tree-title">
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
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Tree;
