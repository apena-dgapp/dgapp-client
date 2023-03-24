import React, { useContext } from "react";
import CardEmployee from "./EmployeeDirectoryCard";
// import { MdSearch } from "react-icons/md";
// import { ImUsers } from "react-icons/im";
import GlobalContext from "../../context/GlobalContext";

const EmployeeDirectoryForm = ({
    filteredArryPersons,
    nextPage,
    backPage,
    onSearchChange,
    search,
    goToProfile,
    arrayDepartament,
    filterDep,
    searchDep,
    pageLength,
    page,
    male,
    female
}) => {
    const [, , contextState] = useContext(GlobalContext);

    return (
        <>
            <div className="news-container">
                <div className="news-title">
                    <p>DIRECTORIO DE EMPLEADOS</p>
                    <span className='news-title-line'></span>
                </div>
                {/* <div className="emDirectory-input-search-cont">
          <i className="md md-arrow-forward-ios" />
          <MdSearch
            className="emDirectory-se"
            size="1.5em"
            color="rgb(153, 149, 149)"
          />
        </div> */}

                <div className="emDirectory-input-cont">

                    <div className="dropdown emDirectory-dropdown">
                        <div className="directory-count-container">
                            <div className="directory-count">
                                <p style={{ color: "#113250", marginRight: "0.5rem", fontWeight: "bold" }}>Total de colaboradores y colaboradoras:</p>
                                <p style={{ color: "#75AAD3", fontWeight: "bold" }}>{pageLength}</p>
                            </div>
                            <div className="directory-count">
                                <div className="directory-count-gender">
                                    <p style={{ color: "#113250", marginRight: "0.5rem" }}>Masculino:</p>
                                    <p style={{ color: "#75AAD3", fontWeight: "bold" }}>{male.length}</p>
                                </div>
                                <div className="directory-count-gender">
                                    <p style={{ color: "#113250", marginRight: "0.5rem" }}>Femenino:</p>
                                    <p style={{ color: "#75AAD3", fontWeight: "bold" }}>{female.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="emDirectory-input">
                        <input
                            id="search"
                            name="searchpost"
                            type="text"
                            placeholder="Buscar empleados por nombre..."
                            className="emDirectory-input-search"
                            value={search}
                            onChange={onSearchChange}
                        />
                        <p
                            className="dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ fontWeight: "bold", color: "#75AAD3" }}
                        >
                            Filtrar por área
                        </p>
                        <ul className="dropdown-menu dropdown-menu-employee" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <div onClick={() => filterDep("todos")} className="dropdown-item">
                                    Todos
                                </div>
                                {arrayDepartament?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => filterDep(item.name)}
                                            className="dropdown-item"
                                        >
                                            {item.name}
                                        </div>
                                    );
                                })}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="emDirectory-filter-dep">
                    <div className="emDirectory-filter-txt">
                        <div
                            style={{
                                color: "#2a343f",
                                fontWeight: "bold",
                                marginLeft: "0.3rem",
                            }}
                        >
                            {searchDep === "" ? "TODOS" : searchDep.toUpperCase()}
                        </div>
                    </div>
                </div>
                <div className="emDirectory-Container">
                    <div className="grid-container">
                        {filteredArryPersons().map((person) => {
                            if (contextState.userRole === 1 || contextState.personId === 2 || contextState.personId === 88 || contextState.personId === 115) {
                                return person.isActive ? (
                                    <CardEmployee
                                        key={person.personId}
                                        id={person.personId}
                                        name={person.firstName.split(" ")[0] + " " + person.lastName.split(" ")[0]}
                                        // name={person.fullName}
                                        // img={()=> personPhoto(person?.personId)}
                                        birthday={person.birthdayDate}
                                        position={person.position}
                                        departament={person.Departament.name}
                                        email={person.email.toLowerCase()}
                                        phone={person.phoneNumber}
                                        cel={person.celNumber}
                                        goToProfile={goToProfile}
                                        isActive={person.isActive}
                                    />
                                ) : null;
                            } else {
                                return (
                                    <CardEmployee
                                        key={person.personId}
                                        id={person.personId}
                                        name={person.firstName.split(" ")[0] + " " + person.lastName.split(" ")[0]}
                                        // name={person.fullName}
                                        // img={()=> personPhoto(person?.personId)}
                                        // img={person.photo}
                                        birthday={person.birthdayDate}
                                        position={person.position}
                                        departament={person.Departament.name}
                                        email={person.email.toLowerCase()}
                                        phone={person.phoneNumber}
                                        cel={person.celNumber}
                                        goToProfile={goToProfile}
                                        isActive={person.isActive}
                                        isVacation={person.isVacation}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

                <div className="emDirectory-btn-cont">
                    <div className="emDirectory-btns">
                        <button
                            onClick={backPage}
                            className={page === 0 || page === 8 ? "btn-disabled" : "btn-back"}
                            name="btn-back"
                            type="submit"
                            disabled={page === 0 || page === 8 ? true : false}
                        >
                            Anterior
                        </button>
                        <button
                            onClick={nextPage}
                            className={page < pageLength ? "btn-next" : "btn-disabled"}
                            // className={numPersons.length === 8 ? "btn-back" : "btn-disabled"}
                            name="btn-next"
                            type="submit"
                            disabled={page < pageLength ? false : true}
                        // disabled={numPersons.length === 8 ? false : true}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeDirectoryForm;
