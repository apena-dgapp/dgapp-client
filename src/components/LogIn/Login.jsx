import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";  
import GlobalContext from "../../context/GlobalContext";
import { apiAuth } from "../../api/auth";
import { passUpdate } from "../../api/user";
import LoginForm from "./LoginForm";
import toast from "react-hot-toast";
import Welcome from "../Welcome/Welcome";

const Login = () => {
  const navigate = useNavigate();
  //InitialState - ContexState
  const [, , contextMiddleware] = useContext(GlobalContext);

  //Estado de tipo objeto profile  que tendra como propiedades el nombre de usuario y contrasena
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    isAuth: false,
  });

  const [modalActive, setModalActive] = useState(false);
  const [formData, setFormData] = useState({
    id:"",
    password: "",
    confirm: ""
  });

  //function que sera el controlador de los valores del estado profile, donde por medio del nombre de el input capturara el valor correspondiente.
  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const inConstruction = () => {
    navigate("/construccion");
  };

  //funcion para llamar un boton con el evento key
  // const clickLogin = event => {
  //     if (event.key === 'Enter') {
  //         loginBtn.current.click()
  //     }
  // }

  //funcion encargada de logearse
  const handeleSignIn = (e) => {
    e.preventDefault();

    if (profile.username === "" || profile.password === "") {
      return toast.error("Por favor completar los campos");
    }

    //api para autorizar y obtener el token
    apiAuth(profile.username.toUpperCase(), profile.password)
      .then((res) => {
        if (res.status >= 400) throw new toast.error("Usuario Incorrecto");
        return res.json();
      })
      .then((res) => {

        if(profile.password ==="000"){
          setModalActive(true);
          setFormData({id:res.user.personId})
        }else{
          contextMiddleware.newToken(res.token);
          contextMiddleware.newUserName(
          res.user.personId,
          profile.username.toUpperCase(),
          res.user.UserRoles[0].roleId,
          (profile.isAuth = true)
        );
          navigate("/inicio");
        }
      })
      .catch((err) => {
        return console.log(err.status);
      });
  };

  const modalToggleAceppt = () => {
    if (!formData.password) {
      return toast.error("Por favor digitar una nueva contraseña");
    } else  if (!formData.confirm) {
      return toast.error("Por favor de confirmar la contraseña");
    } else  if (formData.password !== formData.confirm) {
      return toast.error("Las contraseñas no coinciden");
    } else  if (formData.password === "000") {
      return toast.error("Esta contraseña no es valida por favor de digitar otra");
    }else{
      passUpdate(formData?.id, formData.password)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setModalActive(!modalActive);
        setProfile({username:"", password:""});
        setFormData({password: "", confirm:""});
        return toast.success("Contraseña guardada exitosamente, puedes logearte con tu nueva contraseña");
      })
      .catch((err) => {
        return console.log(err.status);
      });
    } 
  };

  const modalToggle = () => {
    setModalActive(!modalActive);
  };

  const modalToggleCancel = () => {
    setModalActive(!modalActive);
    setFormData({password: "", confirm:""});
  };

  const modalInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Welcome
        modalToggle={modalToggle}
        modalActive={modalActive}
        formData={formData}
        setFormData={setFormData}
        modalToggleCancel={modalToggleCancel}
        modalToggleAceppt={modalToggleAceppt}
        modalInputChange={modalInputChange}
      />
      <LoginForm
        profileInputs={handleInputChange}
        handeleSignIn={handeleSignIn}
        profile={profile}
        inConstruction={inConstruction}
      />
    </>
  );
};

export default Login;
