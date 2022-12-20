import React from "react";
import Elements from "./Elements/Elements";

function SectionsForm(props) {

  return (
    <>
      <div className="sections" onClick={props.HandleClick}>
        <h4>
          Sección {props.number}: {props.section.title}
        </h4>
        <label>
          {props.checkCount}/{props.videos.length} | {props.duration}min
        </label>
      </div>

      {props.videos.map((video, index) => {
        return (
          <div 
            key={index}
            className={props.show ? "show-elements" : "hide-elements"}>
            <Elements 
              key={index} 
              video={video} 
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
    </>
  );
}

export default SectionsForm;
