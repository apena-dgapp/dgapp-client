import React from "react";
import {
  faBook,
  faCube,
  faImages,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModuleForm = (props) => {
  return (
    <section className="module-menu-container ">
      <div className="news-title">
        <p>CAPACITACIONES</p>
        <span className="news-title-line"></span>
      </div>
      {props?.courseData?.map((course, index) => {
        return (
          <div key={index} className="module-container">
            <div className="img-course">
              <img
                src={course?.image}
                onClick={() => {
                }}
              />
            </div>
            <div className="info">
              <h3>{course?.title}</h3>
              <p>{course?.description.substr(0, 260)}...</p>
              <div className="section">
                <div
                  className="content"
                  onClick={() => {
                    // props.setSelectedCourseId(course.id);
                    // props.setShow({ ...props.show, profile: true });
                  }}
                >
                  <FontAwesomeIcon icon={faBook} className="lesson-icons" />
                  <div>
                    <h4>Programa</h4>
                    {/* <p>Contiene tantos textos explicativos</p> */}
                  </div>
                </div>
                <div
                  className="content"
                  onClick={() => {
                    // props.setVisible(true);
                    // props.setSelectedCourseId(course.id);
                  }}
                >
                  <FontAwesomeIcon icon={faUser} className="lesson-icons" />
                  <div>
                    <h4>Perfil de Expositores</h4>
                    {/* <p>Contiene tantos textos explicativos</p> */}
                  </div>
                </div>
                <div
                  className="content"
                  onClick={() => {
                    // props.setVisible(true);
                    // props.setSelectedCourseId(course.id);
                  }}
                >
                  <FontAwesomeIcon icon={faImages} className="lesson-icons" />
                  <div
                    onClick={() => {
                    }}
                  >
                    <h4>Material de Apoyo</h4>
                    {/* <p>Contiene tantas imagenes</p> */}
                  </div>
                </div>
                <button
                  className="btn-disable"
                  onClick={() => {
                    // props.navigate(`/capacitacion/curso/${course?.id}`);
                  }}
                >
                  Curso en progreso...
                  {/* Comenzar con el curso */}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ModuleForm;
