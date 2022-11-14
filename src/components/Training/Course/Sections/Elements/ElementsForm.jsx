import { FaPlayCircle }  from "react-icons/fa";

const ElementsForm = (props) => {
  
  return (
    <>
      <div
        key={props.index}
        className="section-element"
        onClick={props.HandleCookie}
      >
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id={props.video.id}
            checked={props.checked}
            onChange={props.HandleChange}
          />

          <label className="form-check-label" htmlFor={""}>
            {props.video.title}
          </label>
        </div>
        <label className="duration-video">
          <FaPlayCircle className="icon-play" />
          {props.video.duration}min
        </label>
      </div>
    </>
  );
};

export default ElementsForm;
