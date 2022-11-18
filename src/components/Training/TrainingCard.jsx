import React, {useContext} from "react";
import Images from "../../common/images/index";
import { RiEditBoxFill } from "react-icons/ri";
import { BsClockFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import GlobalContext from "../../context/GlobalContext";

const TrainingCard = (props) => {

  const [contextState] = useContext(GlobalContext);

  return (
    <>
      <div className={contextState.userRole === 1  ? "training-card":"emDirectory-card"}>
        <div className="emDirectory-card-cont">
          <img
            src={props.img ? props.img : Images.noImg}
            className="training-card-img"
            alt="..."
            onClick={() => props.goToCourse(props)}
          />
          <div className="card-body">
            <p className="emDirectory-card-departament">
              {props.madeby ? props.madeby : "No definido!"}
            </p>
            <h5 className="emDirectory-card-name">
              {props.title ? props.title : "No definido!"}
            </h5>
            <p className="training-card-position">
              {props.description ? props.description : "No definido!"}
            </p>
          </div>
          <div className="training-card-icon-cont">
            <div className="training-icon-card">
              <p className="training-card-text-contact">
                <i className="fa fa-users" />
                <FaUsers
                  style={{ marginRight: "0.5rem" }}
                  size="1.5rem"
                  color="#BCD3E6"
                />
                {props.collaborators ? props.collaborators : "No definido!"}
              </p>
            </div>
            <div className="training-icon-card">
              <p className="training-card-text-contact">
                <i className="bs bs-clock-fill" />
                <BsClockFill
                  style={{ marginRight: "0.5rem" }}
                  size="1.2rem"
                  color="#BCD3E6"
                />
                {props.duration ? props.duration : "No definido!"}
              </p>
            </div>    
          </div>
          <button
            onClick={() => props.goToCourse(props)}
            className="emDirectory-card-btn"
          >
            Ir al Curso
          </button>
        </div>
        {contextState.userRole === 1  ?

        
        <div className="training-actions-icon">
          <div>
             <p onClick={()=>props.edit(props.id)} className="training-card-text-edit">
              <i className="ri ri-edit-box-fill" />
                <RiEditBoxFill
                  // style={{ marginRight: "0.5rem" }}
                  size="1.4rem"
                  color="#FBB454"
                />
                Editar
              </p>
          </div>
          <div>
            <p onClick={()=>{
                props.disableCourse(props.id)
            }} className="training-card-text-delete">
              <i className="md md-delete-forever" />
              <MdDeleteForever
                // style={{ marginRight: "0.5rem" }}
                size="1.6rem"
                color="#FB2576"
              />
              Eliminar
            </p>  
          </div>            
        </div>:null
        }
      </div>
    </>
  );
};

export default TrainingCard;
