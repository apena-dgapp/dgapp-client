import React, { useContext, useEffect, useState } from "react";
import Images from "../../images";
import GlobalContext from "../../../context/GlobalContext";
// import { ImTree } from "react-icons/im";
import { MdLogout, MdKeyboardArrowDown, } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDetectScroll } from "@smakss/react-scroll-direction";


const NavbarForm = ({
    logOut,
    createPost,
    person,
    inConstruction,
    news,
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
    formTemple,
    modalToggle,
    multimedia
}) => {

    const [contextState] = useContext(GlobalContext);
    const [navShow, setNavShow] = useState(true);
    const [scrollDir] = useDetectScroll({});

    useEffect(() => {
        if (scrollDir === "down") {
            setNavShow(false);
        } else if (scrollDir === "up") {
            setNavShow(true);
        }
    }, [scrollDir, navShow])

    return (
        <>
            <nav id="navbar" style={{ display: isHidden ? "none" : null }} className={`bar_menu ${navShow && 'bar_menu-show'}`}>
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
                        <li onClick={home} className="class-list" style={{ width: width >= 5120 ? "10.8rem" : "3.8rem" }}>
                            <p>Inicio</p>
                        </li>
                        {
                            width <= 721 ? <li className="class-list">
                                <p id={person.personId} onClick={employeeProfile}>Mi Perfil</p>
                            </li> : null
                        }

                        <li className="class-list" style={{ width: width >= 5120 ? "18.8rem" : "6.6rem" }}>
                            <p onClick={width <= 721 ? () => hidenToggle("Nosotros") : null}>
                                Nosotros
                                <i className="io io-md-arrow-dopdown navbar-arrow" />
                                <IoMdArrowDropdown
                                    size={width >= 5120 ? "2.3rem" : "1.3rem"}
                                    style={{ cursor: "pointer" }}
                                />
                            </p>
                            <ul className={action === "Nosotros" ? show : null}
                                style={{ width: width >= 5120 ? "28.5rem" : "13rem", height: width >= 5120 ? "15.5rem" : "9.3rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "0.5px" }}
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

                        <li className="class-list" style={{ width: width >= 5120 ? "15.7rem" : "6.7rem" }}>
                            <p onClick={width <= 721 ? () => hidenToggle("Servicios") : null}>
                                Servicios
                                <i className="io io-md-arrow-dopdown navbar-arrow" />
                                <IoMdArrowDropdown
                                    size={width >= 5120 ? "2.3rem" : "1.3rem"}
                                    style={{ cursor: "pointer" }}
                                />
                            </p>
                            <ul className={action === "Servicios" ? show : null}
                                style={{ width: width >= 5120 ? "23rem" : "12rem", height: width >= 5120 ? "4.5rem" : "3rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "0.5px" }}
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
                                <li style={{ width: width >= 5120 ? "22.5rem" : "12rem", backgroundColor: "transparent" }}>
                                    <span style={{ width: width >= 5120 ? "22rem" : "11rem" }}>
                                        Recursos Humanos
                                        <i className="io io-md-arrow-dopdown navbar-arrow" />
                                        <IoMdArrowDropdown
                                            size={width >= 5120 ? "2.3rem" : "1.3rem"}
                                            style={{ cursor: "pointer", transform: "rotate(270deg)" }}
                                        />
                                    </span>
                                    <ul style={{ top: "0.6rem", width: width >= 5120 ? "15rem" : "8rem", marginLeft: width >= 5120 ? "22.5rem" : "11.5rem", height: width >= 5120 ? "4.5rem" : "3.2rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "1px" }} >
                                        <li style={{ width: width >= 5120 ? "14rem" : "8rem", backgroundColor: "transparent" }}>
                                            <span style={{ width: width >= 5120 ? "14rem" : "6.8rem" }}>
                                                Solicitudes
                                                <i className="io io-md-arrow-dopdown navbar-arrow" />
                                                <IoMdArrowDropdown
                                                    size={width >= 5120 ? "2.3rem" : "1.3rem"}
                                                    style={{ cursor: "pointer", transform: "rotate(270deg)" }}
                                                />
                                            </span>
                                            <ul style={{ top: "0.6rem", width: width >= 5120 ? "14rem" : "8rem", marginLeft: width >= 5120 ? "13.5rem" : "7.48rem", height: width >= 5120 ? "9rem" : "5.3rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "1px" }}>
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

                        <li className="class-list" style={{ width: width >= 5120 ? "20.8rem" : "8.8rem" }}>
                            <p onClick={width <= 721 ? () => hidenToggle("Publicaciones") : null}>
                                Publicaciones
                                <i className="io io-md-arrow-dopdown navbar-arrow" />
                                <IoMdArrowDropdown
                                    size={width >= 5120 ? "2.3rem" : "1.3rem"}
                                    style={{ cursor: "pointer" }}
                                />
                            </p>
                            <ul className={action === "Publicaciones" ? show : null} style={{ width: width >= 5120 ? "23rem" : "12rem", height: width >= 5120 ? "12rem" : "7.5rem", backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "0.5px" }}>
                                <li>
                                    <span onClick={news}>Noticias</span>
                                </li>
                                <li>
                                    <span onClick={multimedia}>Multimedia</span>
                                </li>
                                <li>
                                    <span onClick={inConstruction}>Contenido Educativo</span>
                                </li>
                            </ul>
                        </li>

                        <li className="class-list" style={{ width: width >= 5120 ? "18.5rem" : "7.5rem" }}>
                            <p onClick={training}>Capacitación</p>
                        </li>
                        {
                            width <= 721 ? <li className="class-list">
                                <p onClick={() => logOut()}>Cerrar sesión</p>
                            </li> : null
                        }

                        {contextState.userRole === 1 || contextState.userRole === 3 ? (
                            <li className="class-list admin-hiden" style={{ width: width >= 5120 ? "22.5rem" : "9.5rem" }}>
                                <p>
                                    Administración
                                    <i className="io io-md-arrow-dopdown navbar-arrow" />
                                    <IoMdArrowDropdown
                                        size={width >= 5120 ? "2.3rem" : "1.3rem"}
                                        style={{ cursor: "pointer" }}
                                    />
                                </p>
                                <ul style={{ width: width >= 5120 ? "22.5rem" : "12rem", height: width >= 5120 ? "19rem" : (contextState.userRole === 3 ? "7.2rem" : "11.3rem"), backgroundColor: "white", border: "gainsboro solid 1px", borderRadius: "1rem", marginTop: "0.5px" }}>
                                    {contextState.userRole === 1 || contextState.userRole === 3 ?
                                        <>
                                            <li>
                                                <span onClick={createPost}>Crear Entrada</span>
                                            </li>
                                            <li>
                                                <span onClick={createEvents}>Crear Evento</span>
                                            </li>
                                            <li>
                                                <span onClick={modalToggle}>Crear Encuesta</span>
                                            </li>
                                        </>
                                        : null}
                                    {contextState.userRole === 1 ?
                                        <>
                                            {
                                                contextState.personId === 2 || contextState.personId === 88 || contextState.userRole === 1 ? <li>
                                                    <span onClick={employeeNew}>Nuevo Empleado</span>
                                                </li> : null
                                            }

                                            < li >
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
                                size={width >= 5120 ? "2.5rem" : "1.5rem"}
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
