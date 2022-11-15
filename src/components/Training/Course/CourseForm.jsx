// import Youtube from "react-youtube";
import { useState } from "react";
import ReactPlayer from "react-player";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {GoChevronDown} from 'react-icons/go'
import Sections from "./Sections/Sections";

const TrainingForm = (props) => {
  const [state, setState] = useState(false);

  return (
    <>
      <div className="course-bar">
        <h4>{props.course[0]?.title}</h4>
        <div className="progress-bar-container">
          <CircularProgressbar
            className="circular-progress"
            value={(props.globalCheck / props.videos.length) * 100}
            styles={buildStyles({
              textSize: "20px",
            })}
            strokeWidth={15}
          />
          <>
            <label
              onMouseEnter={() => {
                setState(!state);
              }}
              onMouseLeave={() => {
                setState(!state);
              }}
            >
              Tu Progreso
              <GoChevronDown className="icon-progress" />
            </label>
            <div className={state ? "show-progress" : "hide-progress"}>
              <p>
                <strong>
                  Has visto {props.globalCheck} de {props.videos.length} videos.
                </strong>
              </p>
              <p>¡Disfruta del contenido!</p>
            </div>
          </>
        </div>
      </div>
      <div className="container-course ">
        <div className="left-container-video">
          <div className="video-container">
            <ReactPlayer
                  width="100%"
                  height="100%"
                  className="video_player"
                  style={{ marginBottom: "0.5rem" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  url={`https://www.youtube.com/watch?v=${props?.link}`}
                  controls
                />
          </div>

          <div className="info-container">
            <div className="about-container">
              <div>
                <h2 className="about-video-title">Acerca de este curso</h2>
                <p>{props.course[0]?.description}</p>
              </div>

              {/* <img className="img-logo" src={logo} /> */}
            </div>

            <hr />

            <div className="description-video">
              {/* <p>
                <strong>Información adicional:</strong>{" "}
                {props.course[0]?.additional_info}
              </p> */}
              <div>
                <p>
                  <strong>Duración:</strong> {props.globalDuration()} min
                </p>
                <p>
                  <strong>Vistas:</strong> {props.course[0]?.views}
                </p>
                <p>
                  <strong>Colaboradores:</strong>{" "}
                  {props.course[0]?.collaborators}
                </p>
              </div>
              <p>
                <strong>Hecho por: </strong>
                {props.course[0]?.madeBy}
              </p>
            </div>
          </div>
        </div>
        <div className="right-container-video">
          {props.sections?.map((section, index) => {
            return (
              <div key={index}>
                <Sections
                  id={section.id}
                  key={index}
                  number={index + 1}
                  section={section}
                  videos={props.videos}
                  records={props.records}
                  globalCheck={props.globalCheck}
                  setGlobalCheck={props.setGlobalCheck}
                  lastVideo={props.lastVideo}
                  setLastVideo={props.setLastVideo}
                  userId={props.userId}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TrainingForm;
