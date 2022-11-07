import React, { useContext } from "react";
import Input from "../../common/components/Input/Input";
import TrainingCard from "./TrainingCard";
import { MdSearch } from "react-icons/md";
import GlobalContext from "../../context/GlobalContext";
import Images from "../../common/images/index";

const TrainingForm = ({
  filterArrayCourses,
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
  const [contextState] = useContext(GlobalContext);

  return (
    <>
      <div className="training-cont">
        <div className="training">ENTRANAMIENTO</div>
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
        <div className="training-filter-txt">
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
      <div className="training-Container">
        <div className="training-grid-container">
          {filterArrayCourses().map((course, index) => {
              return  (
                <TrainingCard
                  key={index}
                  id={course.id}
                  title={course.title}
                  img={course.image}
                  position="Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                  description={course.description}
                  madeby={course.madeby}
                  duration={course.duration}
                  cel="Obligatorio"
                />
              ) 
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
            name="btn-next"
            type="submit"
            disabled={page < pageLength ? false : true}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default TrainingForm;
