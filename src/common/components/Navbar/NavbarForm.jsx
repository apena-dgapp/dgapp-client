import React, { useState, useContext } from "react";
import Images from "../../images";
import GlobalContext from "../../../context/GlobalContext";
import {
  MdNotificationsNone,
  MdNotificationsActive,
  MdLogout,
} from "react-icons/md";

const Navbar = ({
  logOut,
  createPost,
  correspo,
  person,
  inConstruction,
  allPost,
  employeeProfile,
  home,
}) => {
  const [contextState] = useContext(GlobalContext);

  // addEventListener('DOMContentLoaded', () => {
  //     const btn_menu = document.querySelector('.btn_menu')
  //     if (btn_menu){
  //         btn_menu.addEventListener('click', () => {
  //             const menu_items = document.querySelector('.menu_items')
  //             menu_items.classList.toggle('show')
  //         })
  //     }
  // })

  const [active, setActive] = useState("menu_items");

  const navToggle = () => {
    active === "menu_items"
      ? setActive("menu_items_show")
      : setActive("menu_items");
  };

  return (
    <>
      <nav className="bar_menu">
        <figure style={{ cursor: "pointer" }}>
          <img
            onClick={home}
            className="logo_dgapp"
            src={Images.dgappLogo}
            alt=""
          />
        </figure>

        <ul className={active}>
          <li onClick={home} className="class-list">
            <a href="#/">INICIO</a>
          </li>
          <li className="class-list">
            <a href="#/">
              SERVICIOS
              <img className="icondown" src={Images.icondown} alt="" />
            </a>
            <ul>
              {/* <li>
                <a href="#/" onClick={correspo}>
                  Correspondencia
                </a>
              </li> */}
              <li>
                <a href="#/" onClick={inConstruction}>
                  Crear Ticket
                </a>
              </li>
            </ul>
          </li>
          <li className="class-list">
            <a href="#/" onClick={allPost}>
              NOTICIAS
            </a>
          </li>
          {/* <li className="class-list">
            <a href="#/">
              SOLICITUDES
              <img className="icondown" src={Images.icondown} alt="" />
            </a>
            <ul>
              <li>
                <a onClick={inConstruction} href="#/">
                  Carta Laboral
                </a>
              </li>
              <li>
                <a href="#/" onClick={inConstruction}>
                  Vacaciones
                </a>
              </li>
              <li>
                <a href="#/" onClick={inConstruction}>
                  Seguro Medico
                </a>
              </li>
              <li>
                <a href="#/" onClick={inConstruction}>
                  Maternidad
                </a>
              </li>
              <li>
                <a href="#/" onClick={inConstruction}>
                  Enfermedad
                </a>
              </li>
            </ul>
          </li> */}

          <li className="class-list">
            <a href="#/" onClick={inConstruction}>
              ENTRENAMIENTO
            </a>
          </li>
          {contextState.isAdmin ? (
            <li className="class-list">
              <a href="#/">
                ADMINISTRACIÓN
                <img className="icondown" src={Images.icondown} alt="" />
              </a>
              <ul>
                <li>
                  <a href="#/" onClick={createPost}>
                    Crear Entradas
                  </a>
                </li>
                <li>
                  <a href="#/" onClick={inConstruction}>
                    Directorio de Empleados
                  </a>
                </li>
              </ul>
            </li>
          ) : null}
        </ul>

        <figure className="container-menu-right">
          {/* <img className="flag-us" src={Images.flagUs} type="button" onClick={() => handeleLang('en-US')} alt="" />
                <img className="flag-spain" src={Images.flagSpain} type="button" onClick={() => handeleLang('es-DR')} alt="" />
                <img className="user-icon" src={Images.iconUser} onClick={() => logOut()} type="button" alt="" />
                <div className="user-text" onClick={() => logOut()}>{contextState.userName}</div> */}

          <img
            onClick={employeeProfile}
            id={person.personId}
            className="nav-user-img"
            src={person.photo}
            alt=""
          />

          <div className="nav-user-txt-cont">
            {/* <div className="nav-user-name" onClick={() => logOut()}>{`Hola, ${contextState.userName}`}</div>  */}
            <div
              onClick={employeeProfile}
              id={person.personId}
              className="nav-user-name"
            >{`Hola, ${person.fullName}`}</div>
            <div className="nav-user-position">{person.position}</div>
            <div className="nav-user-notf-cont">
              <div onClick={() => logOut()} className="nav-user-close">
                <p>
                  <i className="md md-logout " />
                  <MdLogout size="1.5em" color="white" />
                  Cerrar sesión
                </p>
              </div>
              {/* <div onClick={() => logOut()} className="nav-user-close">
                <p>
                  <i className="md md-notifications-none" />
                  <MdNotificationsNone size="1.5em" color="white" />
                  Notificaciones
                </p>
              </div> */}
            </div>
          </div>
        </figure>

        <span className="btn_menu">
          <img
            className="btn_menu-img"
            src={Images.barmenu}
            alt=""
            onClick={navToggle}
          />
        </span>
      </nav>
    </>
  );
};

export default Navbar;
