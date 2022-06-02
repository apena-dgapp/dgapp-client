import React, { useState } from "react";
import Images from "../../images";
// import GlobalContext from '../../../context/GlobalContext';

const Navbar = ({
  logOut,
  createPost,
  correspo,
  person,
  ticket,
  training,
  allPost,
  employeeProfile,
}) => {
  // const [contextState] = useContext(GlobalContext);

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
        <figure>
          <a href="/home">
            <img className="logo_dgapp" src={Images.dgappLogo} alt="" />
          </a>
        </figure>

        <ul className={active}>
          <li className="class-list">
            <a href="/home">INICIO</a>
          </li>
          <li className="class-list">
            <a href="#/">
              SERVICIOS
              <img className="icondown" src={Images.icondown} alt="" />
            </a>
            <ul>
              <li>
                <a href="#/" onClick={createPost}>
                  Crear Entradas
                </a>
              </li>
              <li>
                <a href="#/" onClick={correspo}>
                  Correspondencia
                </a>
              </li>
              <li>
                <a href="#/" onClick={ticket}>
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
          <li className="class-list">
            <a href="#/">
              SOLICITUDES
              <img className="icondown" src={Images.icondown} alt="" />
            </a>
            <ul>
              <li>
                <a onClick={ticket} href="#/">
                  Carta Laboral
                </a>
              </li>
              <li>
                <a href="#/" onClick={ticket}>
                  Vacaciones
                </a>
              </li>
              <li>
                <a href="#/" onClick={ticket}>
                  Seguro
                </a>
              </li>
              <li>
                <a href="#/" onClick={ticket}>
                  Maternidad
                </a>
              </li>
              <li>
                <a href="#/" onClick={ticket}>
                  Enfermedad
                </a>
              </li>
            </ul>
          </li>
          <li className="class-list">
            <a href="#/" onClick={training}>
              ENTRENAMIENTO
            </a>
          </li>
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
            <div onClick={() => logOut()} className="nav-user-close">
              Cerrar sesión
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
