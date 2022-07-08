import React, { useState, useContext } from "react";
import Images from "../../images";
import GlobalContext from "../../../context/GlobalContext";
import { ImTree } from "react-icons/im";
import { MdLogout, MdKeyboardArrowDown } from "react-icons/md";
import { FaUserCog, FaUsers } from "react-icons/fa";
const Navbar = ({
  logOut,
  createPost,
  correspo,
  person,
  inConstruction,
  allPost,
  employeeProfile,
  home,
  employeedirectory,
  employeeNew,
  employeeTree,
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
            <p>INICIO</p>
          </li>
          <li className="class-list">
            <p>
              SERVICIOS
              <img className="icondown" src={Images.icondown} alt="" />
            </p>
            <ul>
              {/* <li>
                <a  onClick={correspo}>
                  Correspondencia
                </a>
              </li> */}
              <li>
                <p onClick={inConstruction}>Crear Ticket</p>
              </li>
            </ul>
          </li>
          <li className="class-list">
            <p onClick={allPost}>NOTICIAS</p>
          </li>
          {/* <li className="class-list">
            <a >
              SOLICITUDES
              <img className="icondown" src={Images.icondown} alt="" />
            </a>
            <ul>
              <li>
                <a onClick={inConstruction} >
                  Carta Laboral
                </a>
              </li>
              <li>
                <a  onClick={inConstruction}>
                  Vacaciones
                </a>
              </li>
              <li>
                <a  onClick={inConstruction}>
                  Seguro Medico
                </a>
              </li>
              <li>
                <a  onClick={inConstruction}>
                  Maternidad
                </a>
              </li>
              <li>
                <a  onClick={inConstruction}>
                  Enfermedad
                </a>
              </li>
            </ul>
          </li> */}

          <li className="class-list">
            <p onClick={inConstruction}>ENTRENAMIENTO</p>
          </li>
          {contextState.isAdmin ? (
            <li className="class-list">
              <p>
                ADMINISTRACIÓN
                <img className="icondown" src={Images.icondown} alt="" />
              </p>
              <ul>
                <li>
                  <p onClick={createPost}>Crear Entradas</p>
                </li>
                <li>
                  <p onClick={employeeNew}>Nuevo Empleado</p>
                </li>
                {/* <li>
                  <a  onClick={employeedirectory}>
                    Directorio de Empleados
                  </a>
                </li> */}
              </ul>
            </li>
          ) : null}
        </ul>

        <figure className="container-menu-right">
          <div className="nav-user-txt-cont">
            {/* <div className="nav-user-name" onClick={() => logOut()}>{`Hola, ${contextState.userName}`}</div>  */}
            <div
              id={person.personId}
              className="nav-user-name"
            >{`Hola, ${person.fullName}`}</div>
            <div className="nav-user-position">{person.position}</div>
            <div className="nav-user-notf-cont">
              {/* <div onClick={() => logOut()} className="nav-user-close">
                <p>
                  <i className="md md-logout " />
                  <MdLogout size="1.5em" color="white" />
                  Cerrar sesión
                </p>
              </div> */}
              {/* <div onClick={() => logOut()} className="nav-user-close">
                <p>
                  <i className="md md-notifications-none" />
                  <MdNotificationsNone size="1.5em" color="white" />
                  Notificaciones
                </p>
              </div> */}
            </div>
          </div>
          {/* <img className="flag-us" src={Images.flagUs} type="button" onClick={() => handeleLang('en-US')} alt="" />
                <img className="flag-spain" src={Images.flagSpain} type="button" onClick={() => handeleLang('es-DR')} alt="" />
                <img className="user-icon" src={Images.iconUser} onClick={() => logOut()} type="button" alt="" />
                <div className="user-text" onClick={() => logOut()}>{contextState.userName}</div> */}
          <div className="dropdown">
            <i className="md md-keyboard-arrow-down" />
            <MdKeyboardArrowDown
              // style={{ marginLeft: "3rem", marginTop: "-0.8rem" }}
              size="2rem"
              color="white"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            />
            <img
              // onClick={employeeProfile}
              // id={person.personId}
              id="dropdownMenuButton1"
              className="nav-user-img dropdown-toggle"
              src={person.photo}
              alt=""
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <p
                  id={person.personId}
                  onClick={employeeProfile}
                  className="dropdown-item"
                >
                  <i className="fa fa-user-cog" />
                  <FaUserCog
                    style={{ marginRight: "0.5rem" }}
                    size="1.2rem"
                    color="darkcyan"
                  />
                  Mi Prefil
                </p>
              </li>
              <li>
                <p className="dropdown-item" onClick={employeedirectory}>
                  <i className="fa fa-users" />
                  <FaUsers
                    style={{ marginRight: "0.5rem" }}
                    size="1.2rem"
                    color="darkcyan"
                  />
                  Directorio de Empleados
                </p>
              </li>
              {/* <li>
                <p className="dropdown-item">
                  <i className="fa fa-user-edit" />
                  <FaUserEdit
                    style={{ marginRight: "0.5rem" }}
                    size="1.2rem"
                    color="darkcyan"
                  />
                  Editar Perfil
                </p>
              </li> */}
              <li>
                <p onClick={employeeTree} className="dropdown-item">
                  <i className="im im-tree" />
                  <ImTree
                    style={{ marginRight: "0.5rem" }}
                    size="1.2rem"
                    color="darkcyan"
                  />
                  Organigrama
                </p>
              </li>
              <li>
                <p onClick={() => logOut()} className="dropdown-item">
                  <i className="md md-logoute" />
                  <MdLogout
                    style={{ marginRight: "0.5rem" }}
                    size="1.2rem"
                    color="darkcyan"
                  />
                  Cerrar sesión
                </p>
              </li>
            </ul>
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
