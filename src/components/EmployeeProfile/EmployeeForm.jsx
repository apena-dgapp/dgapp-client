import React from "react";
import { BsFlag } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { GiTrophyCup } from "react-icons/gi";
import { MdArrowForwardIos, MdEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import Images from "../../common/images";
const EmployeeForm = () => {
  return (
    <>
      <div className="employee-container">
        <div className="employee-card-container">
          <div className="employee-img-container">
            <img className="employee-img" src={Images.empleado} alt="" />
            <div className="employee-report-to">
              <p className="m-0">Reporta a</p>
            </div>
            <div className="employe-line-container">
              <p className="employee-line"></p>
            </div>

            <div className="employee-report-container">
              <img
                className="employee-report-img"
                src={Images.empleado2}
                alt=""
              ></img>
              <div className="employee-report-txt">
                <p className="employee-report-position m-0">
                  <i className="md md-arrow-forward-ios" />
                  <MdArrowForwardIos
                    className="employee-report-arrow"
                    size="1.5em"
                    color="grey"
                  />
                  Gerente de Proyecto
                </p>
                <p className="employee-report-name m-0">Martin Olivero</p>
              </div>
            </div>
          </div>
        </div>
        <div className="employee-header-container">
          <div className="employee-name">Alison Batista</div>
          <div className="employee-position">Ing. Sistemas</div>

          <div className="employee-info-container">
            <i className="bs bs-Flag" />
            <BsFlag size="1.5em" color="white" />
            <p className="employee-info-text">Lider de Proyecto</p>
          </div>
          <div className="employee-info-container">
            <i className="go go-Location" />
            <GoLocation size="1.5em" color="white" />
            <p className="employee-info-text">Tecnología</p>
          </div>
          <div className="employee-info-container">
            <i className="gi gi-Trophy-Cup" />
            <GiTrophyCup size="1.5em" color="white" />
            <p className="employee-info-text">Comenzó en Agosto 24, 2021</p>
          </div>

          <div className="employee-btn-container">
            <button type="button" class="btn btn-success employee-btn">
              Success
            </button>
            <button type="button" class="btn btn-primary employee-btn">
              Editar
            </button>
            <button type="button" class="btn btn-light employee-btn">
              Ver en Organigrama
            </button>
          </div>
        </div>

        <div className="employee-updates-container">
          <div className="employee-updates-title">Actualizaciones</div>
          <div className="employe-line-container">
            <p className="employee-line" style={{ width: "97%" }}></p>
          </div>
        </div>
        <div className="employee-upcoming-container">
          <div className="employee-upcoming-title">PRÓXIMO</div>
          <div className="employee-info-container">
            <i className="fa fa-birthday-cake" />
            <FaBirthdayCake size="1.3em" color="orange" />
            <p className="employee-upcoming-birthday">
              Cumpleaños el Martes, Noviembre 15
            </p>
          </div>
          <div className="employee-info-container">
            <p className="employee-upcoming-wishing">
              "Deseale a Alison un feliz cumpleaños!"
            </p>
          </div>
        </div>
        <div className="employee-updates-container">
          <div className="employee-updates-title">Conctatos</div>
          <div className="employe-line-container">
            <p className="employee-line" style={{ width: "97%" }}></p>
          </div>
        </div>
        <div className="employee-email-container">
          <div className="employee-info-container">
            <i className="md md-Email" />
            <MdEmail size="1.5em" color="gray" />
            <p className="employee-upcoming-birthday">Email</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
