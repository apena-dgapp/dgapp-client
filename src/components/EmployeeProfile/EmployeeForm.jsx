import React from "react";
import { BsFlag } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { GiTrophyCup } from "react-icons/gi";
import { MdArrowForwardIos, MdEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
const EmployeeForm = ({ profile, reportsTo }) => {
  if (profile) {
    const firstN = profile.firstName.split(" ");
    const lastN = profile.lastName.split(" ");
    var firstNSplit = firstN[0];
    var lastNSplit = lastN[0];

    var dateES = new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(profile.startedOn));

    var birthdayMonth = new Intl.DateTimeFormat("es-ES", {
      month: "long",
    }).format(new Date(profile.birthdayDate));

    var day = profile.birthdayDate.split("-");
    var daySplit = day[2];
    const currentDay = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${daySplit}`;
    const fechaComoCadena = currentDay; // día lunes
    const dias = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    const numeroDia = new Date(fechaComoCadena).getDay();
    var nombreDia = dias[numeroDia];
  }

  if (reportsTo) {
    const firstN = reportsTo.firstName.split(" ");
    const lastN = reportsTo.lastName.split(" ");
    var reportsTofirstN = firstN[0];
    var reportsTolastN = lastN[0];
    var reportsToPosition = reportsTo.position;
    var reportsToPhoto = reportsTo.photo;
  }

  console.log(reportsTo);

  return (
    <>
      <div className="employee-container">
        <div className="employee-card-container">
          <div className="employee-img-container">
            <img
              className="employee-img"
              src={profile ? profile.photo : null}
              alt=""
            />
            <div className="employee-report-to">
              <p className="m-0">Reporta a</p>
            </div>
            <div className="employe-line-container">
              <p className="employee-line"></p>
            </div>

            <div className="employee-report-container">
              <img
                className="employee-report-img"
                src={reportsToPhoto}
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
                  {reportsToPosition}
                </p>
                <p className="employee-report-name m-0">
                  {reportsTofirstN + " " + reportsTolastN}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="employee-header-container">
          <div className="employee-name">{firstNSplit + " " + lastNSplit}</div>
          <div className="employee-position">
            {profile ? profile.career : null}
          </div>

          <div className="employee-info-container">
            <i className="bs bs-Flag" />
            <BsFlag size="1.5em" color="white" />
            <p className="employee-info-text">
              {profile ? profile.position : null}
            </p>
          </div>
          <div className="employee-info-container">
            <i className="go go-Location" />
            <GoLocation size="1.5em" color="white" />
            <p className="employee-info-text">
              {profile ? profile.Departament.name : null}
            </p>
          </div>
          <div className="employee-info-container">
            <i className="gi gi-Trophy-Cup" />
            <GiTrophyCup size="1.5em" color="white" />
            <p className="employee-info-text">{`Comenzó en ${dateES}`}</p>
          </div>

          <div className="employee-btn-container">
            <button type="button" className="btn btn-success employee-btn">
              Invitar
            </button>
            <button type="button" className="btn btn-primary employee-btn">
              Editar
            </button>
            <button type="button" className="btn btn-light employee-btn">
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
              Cumpleaños el {nombreDia} {daySplit} de {birthdayMonth}
            </p>
          </div>
          <div className="employee-info-container">
            <p className="employee-upcoming-wishing">
              "Deseale a {firstNSplit} un feliz cumpleaños!"
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
            <p className="employee-upcoming-birthday">Email:</p>
            <p className="employee-contact-email">
              {" "}
              {profile ? profile.email.toLowerCase() : null}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
