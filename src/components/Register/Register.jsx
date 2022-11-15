import React, { useState, useEffect, useContext } from "react";
import RegisterForm from "./RegisterForm";
import { getAllPersons, getOnePerson } from "../../api/person";
import { singUp } from "../../api/auth";
import { existUser, existUsername } from "../../api/user";
import GlobalContext from "../../context/GlobalContext";
import toast from "react-hot-toast";

const Register = () => {
  const [contextState] = useContext(GlobalContext);
  const [person, setPerson] = useState("");
  const [user, setUser] = useState("");
  const [autoName, setAutoName] = useState(true);
  const [exist, setExist] = useState(false);
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    role: "",
  });

  const getPerson = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const id = el.getAttribute("id");

    setFormData({ id: id });

    existUser(id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== null) {
          setExist(true);
          setUserName(res.userName.toUpperCase());
          getOnePerson(id)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              setUser(res);
            });
        } else {
          setExist(false);
          getOnePerson(id)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              setUser(res);
              setUserName(
                res.firstName.split("")[0].toUpperCase() +
                  res.lastName.split(" ")[0].toUpperCase()
              );
            })
            .catch((err) => {
              console.error(err.status);
            });
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  };

  const handlerInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    let unmounted = false;

    getAllPersons()
      .then((res) => {
        return res.json();
      })

      .then((res) => {
        if (!unmounted) {
          setPerson(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  const createUser = () => {
    if (exist) {
      return toast.error("Este usuario ya se encuentra registrado!");
    }

    if (autoName) {
      if (userName === "" || userName === undefined) {
        return toast.error("Por favor escriba un nombre de usuario");
      }
    }
    if (!autoName) {
      if (formData.username === "" || formData.username === undefined) {
        return toast.error("Por favor escriba un nombre de usuario");
      }
    }

    // if (formData.password === "" || formData.password === undefined) {
    //   return toast.error("Por favor escriba una contraseña");
    // }

    if (formData.role === "" || formData.role === undefined) {
      return toast.error(
        "Por favor eliga el privilegio que debe tener el empleado"
      );
    }

    // if (formData.password !== formData.confirm) {
    //   return toast.error("Las contraseñas no coinciden");
    // }

    existUsername(formData.username ? formData.username : userName)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          return toast.error(
            "Por favor elegir otro nombre de usuario, dicho nombre ya está en nuestra base de datos"
          );
        } else {
          singUp(
            formData.id,
            autoName ? userName : formData.username,
            "000",
            contextState.userName,
            formData.role
          )
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              clearData();
              return toast.success(
                "El nuevo empleado fue registrado Exitosamente!"
              );
            })
            .catch((err) => {
              return toast.error("Error del servidor!");
            });
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  };

  const clearData = () => {
    setUser("");
    setFormData({
      id: "",
      username: "",
      // password: "",
      role: "Seleccionar privilegio",
    });
    setUserName("");
    setAutoName(true);
  };

  return (
    <>
      <RegisterForm
        person={person}
        getPerson={getPerson}
        user={user}
        formData={formData}
        handlerInputChange={handlerInputChange}
        setAutoName={setAutoName}
        autoName={autoName}
        createUser={createUser}
        userName={userName}
        exist={exist}
      />
    </>
  );
};

export default Register;
