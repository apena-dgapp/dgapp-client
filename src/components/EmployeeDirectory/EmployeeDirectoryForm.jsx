import React, { useContext } from "react";
import Input from "../../common/components/Input/Input";
import CardEmployee from "./EmployeeDirectoryCard";
import { MdSearch } from "react-icons/md";
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
}) => {
  const [, , contextState] = useContext(GlobalContext);

  return (
    <>
      <div className="emDirectory-cont">
        <div className="emDirectory">DIRECTORIO DE EMPLEADOS</div>
      </div>
      <div className="emDirectory-input-search-cont">
        <i className="md md-arrow-forward-ios" />
        <MdSearch
          className="emDirectory-se"
          size="1.5em"
          color="rgb(153, 149, 149)"
        />
      </div>
      <div className="dropdown emDirectory-dropdown">
        <p
          className="dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filtrar por Area
        </p>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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

      <div className="emDirectory-input-cont">
        <div className="emDirectory-input">
          <Input
            id="search"
            name="searchpost"
            type="text"
            placeholder="Buscar empleados por nombre..."
            classInput="emDirectory-input-search"
            value={search}
            onChange={onSearchChange}
          />
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
            if (contextState.isAdmin === false) {
              return person.isActive ? (
                <CardEmployee
                  key={person.personId}
                  id={person.personId}
                  name={person.fullName}
                  img={person.photo}
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
                  name={person.fullName}
                  img={person.photo}
                  position={person.position}
                  departament={person.Departament.name}
                  email={person.email.toLowerCase()}
                  phone={person.phoneNumber}
                  cel={person.celNumber}
                  goToProfile={goToProfile}
                  isActive={person.isActive}
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
    </>
  );
};

export default EmployeeDirectoryForm;
