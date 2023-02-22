import React, { useContext } from "react";
import TrainingCard from "./TrainingCard";
import GlobalContext from "../../context/GlobalContext";

const TrainingForm = ({
  filterArrayCourses,
  nextPage,
  backPage,
  onSearchChange,
  search,
  arrayDepartament,
  filterDep,
  searchDep,
  pageLength,
  page,
  goToNew,
  goToEdit,
  goToCourse,
  disableCourse
}) => {

  const [contextState] = useContext(GlobalContext);

  return (
    <>
      <div className="news-container">
        <div className="news-title">
          <p>CAPACITACIÓN</p>
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
        <div className="dropdown emDirectory-dropdown">
          <p
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filtrar por categoria
          </p>
          {contextState.userRole === 1 ?
            <div className="training-new-text">
              <p onClick={goToNew}>
                Nuevo <strong>+</strong>
              </p>
            </div> :
            null}
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

        <div className="emDirectory-input-cont">
          <div className="emDirectory-input">
            <input
              id="search"
              name="searchpost"
              type="text"
              placeholder="Buscar curso por titulo..."
              className="emDirectory-input-search"
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
          <div className={contextState.userRole === 1 ? "training-grid-container" : "grid-container"}>
            {filterArrayCourses().map((course, index) => {
              return (
                <TrainingCard
                  key={index}
                  id={course.id}
                  title={course.title}
                  img={course.image}
                  description={course.description}
                  madeby={course.madeBy}
                  duration={course.duration}
                  collaborators={course.collaborators}
                  edit={goToEdit}
                  goToCourse={goToCourse}
                  disableCourse={disableCourse}
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
      </div>
    </>
  );
};

export default TrainingForm;
