import React, { useEffect, useContext } from "react";
import { BsFlag } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { GiTrophyCup } from "react-icons/gi";
import {
  MdArrowForwardIos,
  MdEmail,
  MdPhoneInTalk,
  MdSmartphone,
} from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Images from "../../common/images/index";
import GlobalContext from "../../context/GlobalContext";

const EmployeeForm = ({
  profile,
  reportsTo,
  msgDisable,
  edit,
  handleIsActive,
  goTodocuments
}) => {
  const navigate = useNavigate();
  const [contextState] = useContext(GlobalContext);

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

    if (profile.birthdayDate) {
      var day = profile.birthdayDate.split("-");
      var daySplit = day[2];
      const currentDay = `${new Date().getFullYear()}-${new Date().getMonth() + 1
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
  }

  if (reportsTo) {
    const firstN = reportsTo.firstName.split(" ");
    const lastN = reportsTo.lastName.split(" ");
    var reportsTofirstN = firstN[0];
    var reportsTolastN = lastN[0];
    var reportsToPosition = reportsTo.position;
    var reportsToPhoto = reportsTo.photo;
  }

  useEffect(() => { }, [
    firstNSplit,
    lastNSplit,
    profile,
    reportsTo,
    reportsTofirstN,
    reportsTolastN,
  ]);

  const goToProfileReportTo = () => {
    navigate(`/perfil/${reportsTofirstN + " " + reportsTolastN}`, {
      state: reportsTo.personId,
    });
  };
  return (
    <>
      <div className="employee-container">
        <div className="employee-card-container">
          <div className="employee-img-container">
            {profile.personId === 1 ? (
              <img
                className="employee-img"
                src={profile.photo ? profile.photo : Images.ministerio}
                alt=""
              />
            ) : (
              <img
                className="employee-img"
                src={profile.photo ? profile.photo : Images.noImg}
                alt=""
              />
            )}
            <div className="employee-report-to">
              <p className="m-0">Reporta a</p>
            </div>
            <div className="employe-line-container">
              <p className="employee-line"></p>
            </div>

            <div className="employee-report-container">
              {/* <img
                onClick={reportsTo ? goToProfileReportTo : null}
                className="employee-report-img"
                src={reportsTo ? reportsToPhoto : Images.noImg}
                alt=""
              ></img> */}

              {profile.personId === 1 ? (
                <img
                  onClick={reportsTo ? goToProfileReportTo : null}
                  className="employee-report-img"
                  src={reportsTo ? reportsToPhoto : Images.ministerio}
                  alt=""
                />
              ) : (
                <img
                  onClick={reportsTo ? goToProfileReportTo : null}
                  className="employee-report-img"
                  src={reportsTo ? reportsToPhoto : Images.noImg}
                  alt=""
                />
              )}
              <div className="employee-report-txt">
                {profile.personId !== 1 ? (
                  <p
                    onClick={reportsTo ? goToProfileReportTo : null}
                    className="employee-report-position m-0"
                  >
                    <i className="md md-arrow-forward-ios" />
                    <MdArrowForwardIos
                      style={{ cursor: "pointer" }}
                      className="employee-report-arrow"
                      size="1.5em"
                      color="grey"
                    />
                    {reportsTo ? reportsToPosition : null}
                  </p>
                ) : (
                  <p className="employee-report-position m-0">
                    Ministerio de la Presidencia
                  </p>
                )}

                <p className="employee-report-name m-0">
                  {reportsTo ? reportsTofirstN + " " + reportsTolastN : null}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="employee-header-container">
          <div className="employee-img-con-cel">
            <img
              className="employee-img-cel"
              src={profile.photo ? profile.photo : Images.noImg}
              alt=""
            />
          </div>
          <div className="employee-name">{firstNSplit + " " + lastNSplit}</div>
          <div className="employee-position">
            {/* {profile.career ? profile.career : "No definido!"} */}
          </div>

          <div className="employee-info-container">
            <i className="bs bs-Flag" />
            <BsFlag size="1.5em" color="white" />
            <p className="employee-info-text">
              {profile.position ? profile.position : "No definido!"}
            </p>
          </div>
          <div className="employee-info-container">
            <i className="go go-Location" />
            <GoLocation size="1.5em" color="white" />
            <p className="employee-info-text">
              {profile ? profile.Departament.name : "No definido!"}
            </p>
          </div>
          <div className="employee-info-container">
            <i className="gi gi-Trophy-Cup" />
            <GiTrophyCup size="1.5em" color="white" />
            {dateES ? (
              <p className="employee-info-text">{`Comenzó en ${dateES}`}</p>
            ) : (
              <p className="employee-info-text">No definido!</p>
            )}
          </div>

          <div className="employee-btn-container">
            {/* <button
              onClick={() => goTodocuments("MIS DOCUMENTOS")}
              type="button"
              className="employee-btn-documentation"
            >
              Documentación
            </button> */}
            {contextState.userRole === 1 || contextState.personId === 2 || contextState.personId === 88 ? (
              <button
                onClick={edit}
                type="button"
                className="employee-btn-edit"
              >
                Editar
              </button>
            ) : null}

            {/* <button
              onClick={goToChat}
              type="button"
              className="btn btn-light employee-btn"
            >
              Chatear
            </button> */}
            {contextState.userRole === 1 ? (
              <div className="onoffswitch1">
                <input
                  onClick={handleIsActive}
                  type="checkbox"
                  name="onoffswitch1"
                  className="onoffswitch1-checkbox"
                  id="myonoffswitch1"
                  defaultChecked={profile.isActive}
                />
                <label className="onoffswitch1-label" htmlFor="myonoffswitch1">
                  <span className="onoffswitch1-inner" />
                  <span className="onoffswitch1-switch" />
                </label>
              </div>
            ) : null}
          </div>
        </div>

        {contextState.personId === profile.personId ? (
          <>
            <div className="employee-updates-container">
              <div className="employee-updates-title">Información personal</div>
              <div className="employe-line-container">
                <p className="employee-line" style={{ width: "97%" }}></p>
              </div>
            </div>
            <div className="employee-upcoming-container">
              <div className="employee-info-container">
                <i className="md md-Email mt-5" />
                <MdEmail size="1.5em" color="gray" />
                <p className="employee-upcoming-birthday">Seguro medicó:</p>
                <p className="employee-contact-email">
                  {profile.healthInsurance
                    ? profile.healthInsurance
                    : "No definido!"}
                </p>
              </div>
            </div>
            {/* <div className="employee-updates-container">
              <div className="employee-updates-title">
                Documentos Personales
              </div>
              <div className="employe-line-container">
                <p className="employee-line" style={{ width: "97%" }}></p>
              </div>
            </div>
            <div className="employee-email-container">
              <div className="employee-info-container">
                <p className="employee-contact-email">- Volante de pago</p>
              </div>
              <div className="employee-info-container">
                <p className="employee-contact-email">- Cursos Realizados</p>
              </div>
            </div> */}
          </>
        ) : (
          <>
            <div className="employee-updates-container">
              <div className="employee-updates-title">Información</div>
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
                  "Deséale a {firstNSplit} un feliz cumpleaños!"
                </p>
              </div>
            </div>
            <div className="employee-updates-container">
              <div className="employee-updates-title">Contactos</div>
              <div className="employe-line-container">
                <p className="employee-line" style={{ width: "97%" }}></p>
              </div>
            </div>
            <div className="employee-email-container">
              <div className="employee-info-container">
                <i className="md md-Email mt-5" />
                <MdEmail size="1.5em" color="gray" />
                <p className="employee-upcoming-birthday">Email:</p>
                <p className="employee-contact-email">
                  {profile.email ? profile.email.toLowerCase() : null}
                </p>
              </div>
              <div className="employee-info-container">
                <i className="md md-phone-in-talk mt-5" />
                <MdPhoneInTalk size="1.5em" color="gray" />
                <p className="employee-upcoming-birthday">Extensión:</p>
                <p className="employee-contact-email">
                  {profile.phoneNumber ? profile.phoneNumber : null}
                </p>
              </div>
              {contextState.userRole === 1 ?
                <div className="employee-info-container">
                  <i className="md md-smart-phone" />
                  <MdSmartphone size="1.5em" color="gray" />
                  <p className="employee-upcoming-birthday">Celular:</p>
                  <p className="employee-contact-email">
                    {profile.celNumber ? profile.celNumber : null}
                  </p>
                </div> :
                null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmployeeForm;
