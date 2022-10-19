import React, { useState, useContext } from "react";
import Images from "../../images";
import GlobalContext from "../../../context/GlobalContext";
import { ImTree } from "react-icons/im";
import { MdLogout, MdKeyboardArrowDown } from "react-icons/md";
import { FaUserCog, FaUsers } from "react-icons/fa";

const Navbar = ({
  logOut,
  createPost,
  person,
  inConstruction,
  allPost,
  employeeProfile,
  home,
  employeedirectory,
  employeeNew,
  employeeTree,
  isHidden,
  goToFile,
  training,
  register,
  createEvents,
  ticketSystem,
  // foodOrder,
  aboutUSChange
}) => {
  const [contextState] = useContext(GlobalContext);
  const [active, setActive] = useState("menu_items");
  const navToggle = () => {
    active === "menu_items"
      ? setActive("menu_items_show")
      : setActive("menu_items");
  };

  return (
    <>
      <nav style={{ display: isHidden ? "none" : null }} className="bar_menu">
        <div className="nav-senction-logo">
          <figure style={{ cursor: "pointer" }}>
            <img
              onClick={home}
              className="logo_dgapp"
              src={Images.dgappLogo}
              alt=""
            />
          </figure>
        </div>
    
        <div className="nav-senction-items">
          <ul className={active}>
            <li onClick={home} className="class-list">
              <p>Inicio</p>
            </li>

            <li className="class-list">
              <p>
                Nosotros
                <img className="icondown" src={Images.icondown} alt="" />
              </p>
              <ul style={{ width: "11rem" }}>
                <li>
                  <p onClick={(e) => aboutUSChange(e, "MISION, VISION Y VALORES")}>Mision, Vision y Valores</p>
                </li>
                <li>
                  <p onClick={(e) => aboutUSChange(e, "FUNCIONES")}>Funciones</p>
                </li>
                <li>
                  <p onClick={(e) => aboutUSChange(e, "MARCO INSTITUCIONAL")}>Marco Institucional</p>
                </li>
                <li>
                  <p onClick={(e) => aboutUSChange(e, "DIRECTOR GENERAL")}> Director General</p>
                </li>
                <li>
                  <p  onClick={(e) => aboutUSChange(e, "ORGANIGRAMA")}>Organigrama</p>
                </li>
              
              </ul>
            </li>

            <li className="class-list">
              <p>
                Servicios
                <img
                  // style={{ marginRight: "1.5rem" }}
                  className="icondown"
                  src={Images.icondown}
                  alt=""
                />
              </p>
              <ul style={{ width: "10.5rem" }}>
                {/* <li>
                  <p onClick={foodOrder}>Ordenar Almuerzo</p>
                </li> */}
                <li>
                  {/* <p onClick={ticketSystem}>
                    Ticket
                    <img
                      style={{ transform: "rotate(270deg)" }}
                      className="icondown"
                      src={Images.icondown}
                      alt=""
                    />
                  </p> */}
                  <p>
                    Ticket
                    <img
                      style={{ transform: "rotate(270deg)" }}
                      className="icondown"
                      src={Images.icondown}
                      alt=""
                    />
                  </p>
                  <ul className="menu-left">
                    <li>
                      <p onClick={inConstruction}>Crear Ticket</p>
                    </li>
                    <li>
                      <p onClick={inConstruction}>Ver Tickets</p>
                    </li>
                  </ul>
                </li>
                <li>
                  <p>
                    Solicitudes
                    <img
                      style={{ transform: "rotate(270deg)" }}
                      className="icondown"
                      src={Images.icondown}
                      alt=""
                    />
                  </p>
                  <ul className="menu-left">
                    <li>
                      {/* <p onClick={() => goToFile("carta-laboral")}>Formularios</p> */}
                      <p onClick={inConstruction}>Formularios</p>
                    </li>
                    <li>
                      {/* <p onClick={() => goToFile("carta-laboral")}>
                        Carta Laboral
                      </p> */}
                      <p onClick={inConstruction}>
                        Carta Laboral
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="class-list">
              <p>
                Publicaciones
                <img className="icondown" src={Images.icondown} alt="" />
              </p>
              <ul style={{ width: "11rem" }}>
                <li>
                  <p onClick={allPost}>Noticias</p>
                </li>
                <li>
                  {/* <p on4Click={() => goToPDF()}>Boletin</p> */}
                  {/* <p onClick={inConstruction}>Boletin</p> */}
                  <a
                    className=""
                    href="Boletin No.9.html"
                    target="_blank"
                  >
                    Boletin
                  </a>
                </li>
              </ul>
            </li>

            <li className="class-list">
              <p onClick={training}>Entrenamiento</p>
            </li>
            {contextState.isAdmin ? (
              <li className="class-list">
                <p>
                  Administración
                  <img className="icondown" src={Images.icondown} alt="" />
                </p>
                <ul style={{ width: "13.5rem" }}>
                  <li>
                    <p onClick={createPost}>Crear Entradas</p>
                  </li>
                  <li>
                    <p onClick={createEvents}>Crear Eventos</p>
                  </li>
                  <li>
                    <p onClick={employeeNew}>Nuevo Empleado</p>
                  </li>
                  <li>
                    <p onClick={register}>Crear usuario</p>
                  </li>
                </ul>
              </li>
            ) : null}
          </ul>
        </div>
        
        <div className="nav-senction-user">
          <figure className="container-menu-right">
            <div className="nav-user-txt-cont">
              <div id={person.personId} className="nav-user-name">{`Hola, ${
                person.fullName.split(" ")[0]
              }`}</div>
              {/* <div className="nav-user-position">{person.position}</div> */}
              {/* <div className="nav-user-notf-cont"></div> */}
            </div>
            <div className="dropdown">
              <i className="md md-keyboard-arrow-down" />
              <MdKeyboardArrowDown
                size="1.5rem"
                color="#113250"
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer", marginTop: "0.3rem" }}
              />
              <img
                id="dropdownMenuButton1"
                className="nav-user-img dropdown-toggle"
                src={person.photo ? person.photo : Images.noImg}
                alt=""
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul
                className="dropdown-menu profile-dropdown"
                aria-labelledby="dropdownMenuButton1"
              >
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
                      color="#113250"
                    />
                    Mi Perfil
                  </p>
                </li>
                <li>
                  <p className="dropdown-item" onClick={employeedirectory}>
                    <i className="fa fa-users" />
                    <FaUsers
                      style={{ marginRight: "0.5rem" }}
                      size="1.2rem"
                      color="#113250"
                    />
                    Directorio de Empleados
                  </p>
                </li>
                <li>
                  <p onClick={employeeTree} className="dropdown-item">
                    <i className="im im-tree" />
                    <ImTree
                      style={{ marginRight: "0.5rem" }}
                      size="1.2rem"
                      color="#113250"
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
                      color="#113250"
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
