import React from "react";
import Input from "../../common/components/Input/Input";
import CardEmployee from "./EmployeeDirectoryCard";
import { MdSearch } from "react-icons/md";

const EmployeeDirectoryForm = ({
  filteredArryPersons,
  nextPage,
  backPage,
  onSearchChange,
  search,
  goToProfile,
}) => {
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

      <div className="emDirectory-Container">
        <div className="grid-container">
          {filteredArryPersons().map((person) => {
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
                goToProfile={goToProfile}
              />
            );
          })}
        </div>
      </div>

      <div className="emDirectory-btn-cont">
        <div className="emDirectory-btns">
          <button
            onClick={backPage}
            className="btn-back"
            name="btn-back"
            type="submit"
          >
            Anterior
          </button>
          <button
            onClick={nextPage}
            className="btn-next"
            name="btn-next"
            type="submit"
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeDirectoryForm;
