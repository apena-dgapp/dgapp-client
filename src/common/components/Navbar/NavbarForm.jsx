import React, { useContext, useEffect, useState } from "react";
import Images from "../../images";
import GlobalContext from "../../../context/GlobalContext";
// import { ImTree } from "react-icons/im";
import { MdLogout, MdKeyboardArrowDown, } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const NavbarForm = ({
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
    aboutUSChange,
    active,
    navToggle,
    show,
    hidenToggle,
    action,
    width,
    formTemple
}) => {

    const [contextState] = useContext(GlobalContext);
    const [navShow, setNavShow] = useState(true);

    const controlNavbar = () => {
        if (window.scrollY > 100) {
            setNavShow(false);
        } else {
            setNavShow(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [])

    return (
        <>
            <nav style={{ display: isHidden ? "none" : null }} className={`bar_menu ${navShow && 'bar_menu-show'}`}>
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
                        <li onClick={home} className="class-list" style={{ width: width < 5021 ? "3.8rem" : "10.8rem" }}>
                            <p>Inicio</p>
                        </li>
                        {
                            width <= 721 ? <li className="class-list">
                                <p id={person.personId} onClick={employeeProfile}>Mi Perfil</p>
                            </li> : null
                        }

                        <li className="class-list" style={{ width: width < 5021 ? "6.6rem" : "18.8rem" }}>
                            <p onClick={width <= 721 ? () => hidenToggle("Nosotros") : null}>
                                Nosotros
                                <i className="io io-md-arrow-dopdown navbar-arrow" />
                                <IoMdArrowDropdown
                                    size={width < 5021 ? "1.3rem" : "2.3rem"}
                                    style={{ cursor: "pointer" }}
                                />
                            </p>
                            <ul className={action === "Nosotros" ? show : null}
                                style={{ width: width < 5021 ? "13rem" : "28.5rem", height: "15.5rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "0.5px" }}
                            >
                                <li>
                                    <span onClick={(e) => aboutUSChange(e, "MISIÓN, VISIÓN Y VALORES")}>Misión, Visión y Valores</span>
                                </li>
                                <li>
                                    <span onClick={(e) => aboutUSChange(e, "ORGANIGRAMA")}>Organigrama</span>
                                </li>
                                <li>
                                    <span onClick={inConstruction}>Políticas Institucionales</span>
                                </li>
                                <li>
                                    <span onClick={employeedirectory}>Directorio de Empleados</span>
                                </li>
                            </ul>
                        </li>

                        <li className="class-list" style={{ width: width < 5021 ? "6.7rem" : "15.7rem" }}>
                            <p onClick={width <= 721 ? () => hidenToggle("Servicios") : null}>
                                Servicios
                                <i className="io io-md-arrow-dopdown navbar-arrow" />
                                <IoMdArrowDropdown
                                    size={width < 5021 ? "1.3rem" : "2.3rem"}
                                    style={{ cursor: "pointer" }}
                                />
                            </p>
                            <ul className={action === "Servicios" ? show : null}
                                style={{ width: width < 5021 ? "12rem" : "23rem", height: "4.5rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "0.5px" }}
                            >
                                {/* <li style={{ width: "12rem", backgroundColor: "transparent" }}>
                                    <span style={{ width: "11rem" }}>
                                        Depto. Tecnología
                                        <i className="io io-md-arrow-dopdown navbar-arrow" />
                                        <IoMdArrowDropdown
                                            size="1.3rem"
                                            style={{ cursor: "pointer", transform: "rotate(270deg)" }}
                                        />
                                    </span>
                                    <ul className="" style={{ top: "-0.5rem", width: "6rem", marginLeft: "11.7rem", height: "3rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "1px" }}>
                                        <li style={{ width: "6rem", backgroundColor: "transparent" }}>
                                            <span style={{ width: "4.8rem" }}>
                                                Ticket
                                                <i className="io io-md-arrow-dopdown navbar-arrow" />
                                                <IoMdArrowDropdown
                                                    size="1.3rem"
                                                    style={{ cursor: "pointer", transform: "rotate(270deg)" }}
                                                />
                                            </span>
                                            <ul className="" style={{ top: "-0.6rem", width: "8rem", marginLeft: "5.6rem", height: "3rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "1px" }}>
                                                <li>
                                                    <span onClick={inConstruction}>Crear Ticket</span>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li> */}
                                <li style={{ width: width < 5021 ? "12rem" : "22.5rem", backgroundColor: "transparent" }}>
                                    <span style={{ width: width < 5021 ? "11rem" : "22rem" }}>
                                        Recursos Humanos
                                        <i className="io io-md-arrow-dopdown navbar-arrow" />
                                        <IoMdArrowDropdown
                                            size={width < 5021 ? "1.3rem" : "2.3rem"}
                                            style={{ cursor: "pointer", transform: "rotate(270deg)" }}
                                        />
                                    </span>
                                    <ul style={{ top: "0.6rem", width: width < 5021 ? "8rem" : "15rem", marginLeft: width < 5021 ? "11.5rem" : "22.5rem", height: "4.5rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "1px" }} >
                                        <li style={{ width: width < 5021 ? "8rem" : "14rem", backgroundColor: "transparent" }}>
                                            <span style={{ width: width < 5021 ? "6.8rem" : "14rem" }}>
                                                Solicitudes
                                                <i className="io io-md-arrow-dopdown navbar-arrow" />
                                                <IoMdArrowDropdown
                                                    size={width < 5021 ? "1.3rem" : "2.3rem"}
                                                    style={{ cursor: "pointer", transform: "rotate(270deg)" }}
                                                />
                                            </span>
                                            <ul style={{ top: "0.6rem", width: width < 5021 ? "8rem" : "14rem", marginLeft: width < 5021 ? "7.48rem" : "13.5rem", height: "9rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "1px" }}>
                                                <li>
                                                    <span onClick={() => formTemple("vacaciones")}>Vacaciones</span>
                                                </li>
                                                <li>
                                                    <span onClick={() => formTemple("asistencia")}>Asistencia</span>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li className="class-list" style={{ width: width < 5021 ? "8.8rem" : "20.8rem" }}>
                            <p onClick={width <= 721 ? () => hidenToggle("Publicaciones") : null}>
                                Publicaciones
                                <i className="io io-md-arrow-dopdown navbar-arrow" />
                                <IoMdArrowDropdown
                                    size={width < 5021 ? "1.3rem" : "2.3rem"}
                                    style={{ cursor: "pointer" }}
                                />
                            </p>
                            <ul className={action === "Publicaciones" ? show : null} style={{ width: width < 5021 ? "12rem" : "23rem", height: "12rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "0.5px" }}>
                                <li>
                                    <span onClick={allPost}>Noticias</span>
                                </li>
                                <li>
                                    <span onClick={inConstruction}>Multimedia</span>
                                </li>
                                <li>
                                    <span onClick={inConstruction}>Contenido Educativo</span>
                                </li>
                            </ul>
                        </li>

                        <li className="class-list" style={{ width: width < 5021 ? "7.5rem" : "18.5rem" }}>
                            <p onClick={training}>Capacitación</p>
                        </li>
                        {
                            width <= 721 ? <li className="class-list">
                                <p onClick={() => logOut()}>Cerrar sesión</p>
                            </li> : null
                        }

                        {contextState.userRole === 1 || contextState.userRole === 3 ? (
                            <li className="class-list admin-hiden" style={{ width: width < 5021 ? "9.5rem" : "22.5rem" }}>
                                <p>
                                    Administración
                                    <i className="io io-md-arrow-dopdown navbar-arrow" />
                                    <IoMdArrowDropdown
                                        size={width < 5021 ? "1.3rem" : "2.3rem"}
                                        style={{ cursor: "pointer" }}
                                    />
                                </p>
                                <ul style={{ width: width < 5021 ? "12rem" : "22.5rem", height: contextState.userRole === 3 ? "7rem" : "19rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "0.5px" }}>
                                    {contextState.userRole === 1 || contextState.userRole === 3 ?
                                        <>
                                            <li>
                                                <span onClick={createPost}>Crear Entrada</span>
                                            </li>
                                            <li>
                                                <span onClick={createEvents}>Crear Evento</span>
                                            </li>
                                            <li>
                                                <span onClick={createEvents}>Crear Avisos</span>
                                            </li>
                                        </>
                                        : null}
                                    {contextState.userRole === 1 ?
                                        <>
                                            <li>
                                                <span onClick={employeeNew}>Nuevo Empleado</span>
                                            </li>
                                            <li>
                                                <span onClick={register}>Crear Usuario</span>
                                            </li>
                                        </>
                                        : null}

                                </ul>
                            </li>
                        ) : null}
                    </ul>
                </div>

                <div className="nav-senction-user">
                    <figure className="container-menu-right">
                        <div className="nav-user-txt-cont">
                            <div id={person.personId} className="nav-user-name">{`Hola, ${person.fullName.split(" ")[0]
                                }`}</div>
                            {/* <div className="nav-user-position">{person.position}</div> */}
                            {/* <div className="nav-user-notf-cont"></div> */}
                        </div>
                        <div className="dropdown">
                            <i className="md md-keyboard-arrow-down" />
                            <MdKeyboardArrowDown
                                size={width < 5021 ? "1.5rem" : "2.5rem"}
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
                                {/* <li>
                  <p className="dropdown-item" onClick={employeedirectory}>
                    <i className="fa fa-users" />
                    <FaUsers
                      style={{ marginRight: "0.5rem" }}
                      size="1.2rem"
                      color="#113250"
                    />
                    Directorio de Empleados
                  </p>
                </li> */}
                                {/* <li>
                  <p onClick={employeeTree} className="dropdown-item">
                    <i className="im im-tree" />
                    <ImTree
                      style={{ marginRight: "0.5rem" }}
                      size="1.2rem"
                      color="#113250"
                    />
                    Organigrama
                  </p>
                </li> */}
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

export default NavbarForm;
