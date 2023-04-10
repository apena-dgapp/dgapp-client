import React from "react";
import { faPlayCircle, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Cookies from "js-cookie";
import {
  ElementSkeleton,
  SectionSkeleton,
  NavbarSkeleton,
  CourseSkeleton,
  ContentModuleSkeleton,
  DescriptionSkeleton,
} from "./ModuleSkeleton";

const ModuleForm = (props) => {
  return (
    <>
      <section className="moduleForm">
        {!props.courseLoading ? (
          <>
            <div className="navbar">
              <h3>{props.course[0]?.title}</h3>
              <div
                className="circle-progress"
                onMouseOut={() => {
                  props.setShow({ ...props.show, progress: false });
                }}
                onMouseOver={() => {
                  props.setShow({ ...props.show, progress: true });
                }}
              >
                <CircularProgressbar
                  value={
                    (props?.globalInfo?.checkCount / props?.globalInfo?.count) *
                    100
                  }
                  className="circle"
                  styles={buildStyles({
                    textSize: "20px",
                  })}
                  strokeWidth={15}
                />
                <label htmlFor="">Tu Progreso</label>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="chevron-icon"
                />

                <div
                  className={props?.show?.progress ? "show-progress" : "hide"}
                >
                  <h6>
                    Has visto {props?.globalInfo?.checkCount} de{" "}
                    {props?.globalInfo?.count} del contenido disponible!
                  </h6>
                  {/* <p>Disfruta del material!!</p> */}
                </div>
              </div>
            </div>
          </>
        ) : (
          <NavbarSkeleton />
        )}
        <div className="main-container">
          <div className="module-left-side">
            {props.contentModule === null && <ContentModuleSkeleton />}
            {props.contentModule?.contentType === "link" && (
              <iframe src={props?.contentModule.content} />
            )}

            {props.contentModule?.contentType === "text" && (
              <div className="text-container">
                {props.createMarkup(props?.contentModule?.content)}
              </div>
            )}

            {props.contentModule?.contentType === "exam" && (
              <div className="exam-container">
                {props?.show?.moduleExamIntro && (
                  <div className="Introduction">
                    <h2>Examen de nivel</h2>
                    <p className="introduction-text">
                      En este examen, se estarán comprobando todos los
                      conocimientos adquiridos a lo largo del módulo. De modo
                      que se pide que el mismo sea llenado con los conocimientos
                      reales que tengas en el momento. El mismo podrá ser
                      repetido cuantas veces sea necesario por el estudiante,
                      con el fin del que se tenga dominio de las lecciones
                      tratadas previamente.
                    </p>
                    <button
                      onClick={() => {
                        props.setShow({
                          ...props.show,
                          moduleExamIntro: false,
                          moduleExamStarted: true,
                          moduleExamResults: false,
                        });
                      }}
                    >
                      Comenzar
                    </button>

                    <div className="summary-exam">
                      <div className="heading">
                        <h4>Estado</h4>
                        <h4>Calificación / 100,00</h4>
                      </div>
                      <div className="description">
                        <div>
                          <h5>
                            {props?.previousGrade?.alreadyTaken
                              ? "Finalizado"
                              : "Pendiente"}
                          </h5>
                          {/* <p>Fecha: martes, 7 de marzo de 2023, 07:57</p> */}
                          <p>
                            {props?.previousGrade?.alreadyTaken
                              ? `Fecha: ${props?.previousGrade.date}`
                              : ""}
                          </p>
                        </div>
                        <h5 className="grade">
                          {props?.previousGrade?.alreadyTaken
                            ? `${props?.previousGrade.grade}`
                            : "___"}
                        </h5>
                      </div>
                    </div>
                    {/* <p>Calificación anterior: <strong>{props.previousAnswer}%</strong></p> */}
                  </div>
                )}
                {props?.show?.moduleExamStarted && (
                  <>
                    {props?.contentModule.content?.map((exam, index) => {
                      if (index === props.pageExam) {
                        return (
                          <div key={index} className="content">
                            <div className="material">
                              {exam?.type === "video" && (
                                <>
                                  <h4>{exam?.title}</h4>
                                  <iframe src={exam?.material} />
                                </>
                              )}
                            </div>
                            <div className="question">
                              {exam?.questions.map((info, i) => {
                                return (
                                  <div key={i}>
                                    <input
                                      type="radio"
                                      name={`question-${index}`}
                                      onClick={() => {
                                        props.handleAnswersSelected(
                                          exam.id,
                                          info.id
                                        );
                                      }}
                                      onChange={() => {}}
                                      checked={props.isASelectedAnswer(
                                        exam.id,
                                        info.id
                                      )}
                                    />
                                    <label htmlFor={`question-${index}`}>
                                      {info?.question}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="buttons">
                              <button
                                className={props.pageExam > 0 ? "left" : "hide"}
                                onClick={() => {
                                  props.moveThroughPages(false);
                                }}
                              >
                                Atras
                              </button>
                              <button
                                className={
                                  props?.contentModule.content?.length - 1 >
                                  props.pageExam
                                    ? "right"
                                    : "hide"
                                }
                                onClick={() => {
                                  props.moveThroughPages(true);
                                }}
                              >
                                Siguiente
                              </button>

                              <button
                                className={
                                  props.contentModule.content.length - 1 ===
                                  props.pageExam
                                    ? "right"
                                    : "hide"
                                }
                                onClick={() => {
                                  props.handleFinishedExam();
                                }}
                              >
                                Terminar
                              </button>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                )}
                {props.show.moduleExamResults && (
                  <div className="results">
                    <h1>Felicidades, has culminado con el examen!</h1>
                    <div>
                      <h4>Respuestas correctas:</h4>
                      <label htmlFor="">{props?.results?.correct}</label>
                    </div>
                    <div>
                      <h4>Respuestas incorrectas:</h4>
                      <label htmlFor="">{props?.results?.incorrect}</label>
                    </div>
                    <div>
                      <h4>Su calificación:</h4>
                      <label htmlFor="">{props.previousGrade?.grade}</label>
                    </div>
                    <button onClick={props?.resetExam}>
                      Volver a tomar el examen
                    </button>
                  </div>
                )}
              </div>
            )}

            {!props.contentLoading && props.contentModule !== null ? (
              <div className="content-profile">
                <div className="format">
                  <img src={props?.contentModule?.image} alt="" />
                  <div>
                    {props.createMarkup(props?.contentModule?.description)}
                  </div>
                </div>
                <hr />
              </div>
            ) : (
              <DescriptionSkeleton />
            )}

            {!props.courseLoading ? (
              <>
                <div className="info-course">
                  <div className="about-course">
                    <h3>Acerca de este curso</h3>
                    <p>{props.course[0]?.description}</p>
                  </div>
                  <div className="multiple">
                    <p>
                      <strong>Duración:</strong> {props?.globalInfo?.duration}
                      min
                    </p>
                    <p>
                      <strong>Vistas:</strong> {props?.course[0]?.views}
                    </p>
                    <p className="collaborators">
                      <strong>Expositores:</strong>{" "}
                      {props?.course[0]?.collaborators}
                    </p>
                    <p>
                      <strong>Certificado por:</strong>{" "}
                      {props?.course[0]?.madeBy}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <CourseSkeleton />
            )}
          </div>

          <div className="module-right-side">
            {!props.sectionLoading || props.sections?.length > 0 ? (
              <>
                {props?.sections?.map((section, index) => {
                  return (
                    <div key={index}>
                      <div
                        className="sections"
                        onClick={() => {
                          props.showSection(index);
                        }}
                      >
                        <h4>
                          Módulo {props.romanNumerals[index]}: {section.title}
                        </h4>
                        <p>
                          {props?.sectionsInfo[index]?.checkCount}/
                          {props?.sectionsInfo[index]?.count} |{" "}
                          {props?.sectionsInfo[index]?.duration}min
                        </p>
                      </div>
                      {!props.contentLoading ? (
                        <>
                          {props?.contents?.map((content, i) => {
                            if (
                              parseInt(
                                Cookies.get(
                                  `module-${props.courseId}-lastcontent-id`
                                )
                              ) === content.id && section?.id === content?.sectionId
                            ) {
                              // console.log(content.id, index);
                              props.showSection(index, true);
                            }

                            if (section?.id === content?.sectionId) {
                              return (
                                <div
                                  key={i}
                                  className={
                                    props?.sectionsInfo[index]?.show
                                      ? "elements"
                                      : "hide"
                                  }
                                  onClick={() => {
                                    props.handleContent(content);

                                    if (content?.content_Type === "exam") {
                                      props.setContentModule({
                                        id: content?.id,
                                        positionInTheArray: index,
                                        description: content?.description,
                                        image: content?.image,
                                        content: props.convertJsonToObject(
                                          content?.content
                                        ),
                                        contentType: "exam",
                                      });
                                      props.resetExam();
                                    } else {
                                      props.setShow({
                                        ...props.show,
                                        moduleExamIntro: false,
                                        moduleExamStarted: false,
                                        moduleExamResults: false,
                                      });
                                    }
                                    props.setPageExam(0);
                                  }}
                                >
                                  {/* {console.log(props.sectionsInfo)} */}
                                  <input
                                    type="checkbox"
                                    checked={props?.checkContent(content.id)}
                                    onChange={() => {
                                      props.handleCheck(
                                        content.id,
                                        props?.checkContent(content.id),
                                        index
                                      );
                                    }}
                                  />
                                  <p htmlFor="">{content?.title}</p>
                                  <br />
                                  <div className="duration">
                                    <FontAwesomeIcon
                                      icon={faPlayCircle}
                                      className="duration-icon"
                                    />
                                    <p>{content?.duration}min</p>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </>
                      ) : (
                        <>
                          <ElementSkeleton />
                          <ElementSkeleton />
                          <ElementSkeleton />
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <SectionSkeleton />
                <SectionSkeleton />
                <SectionSkeleton />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ModuleForm;
