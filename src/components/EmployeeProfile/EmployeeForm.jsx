import React, { useEffect, useContext } from "react";
import { BsFlag } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { GiTrophyCup } from "react-icons/gi";
import { MdArrowForwardIos, MdEmail, MdPhoneInTalk } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Images from "../../common/images/index";
import GlobalContext from "../../context/GlobalContext";

const EmployeeForm = ({
  profile,
  reportsTo,
  generateDocument,
  msgDisable,
  edit,
  handleIsActive,
}) => {
  const history = useHistory();
  const [contextState] = useContext(GlobalContext);
  // const [profileChart, setProfileChart] = useState({
  //   id: "",
  //   fullName: "",
  //   position: "",
  //   departament: "",
  //   photo: "",
  //   idReportTo: "",
  //   fullNameReportTo: "",
  //   positionReportTo: "",
  //   departamentReportTo: "",
  //   photoReportTo: "",
  // });
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
  }

  if (reportsTo) {
    const firstN = reportsTo.firstName.split(" ");
    const lastN = reportsTo.lastName.split(" ");
    var reportsTofirstN = firstN[0];
    var reportsTolastN = lastN[0];
    var reportsToPosition = reportsTo.position;
    var reportsToPhoto = reportsTo.photo;
  }

  useEffect(() => {
    // setProfileChart({
    //   id: profile.personId,
    //   fullName: `${firstNSplit} ${lastNSplit}`,
    //   position: profile.position,
    //   departament: profile ? profile.Departament.name : null,
    //   photo: profile.photo,
    //   idReportTo: reportsTo ? reportsTo.personId : 0,
    //   fullNameReportTo: reportsTo
    //     ? `${reportsTofirstN} ${reportsTolastN}`
    //     : null,
    //   positionReportTo: reportsTo ? reportsTo.position : null,
    //   departamentReportTo: reportsTo ? reportsTo.Departament.name : null,
    //   photoReportTo: reportsTo ? reportsTo.photo : Images.noImg,
    // });
  }, [
    // setProfileChart,
    firstNSplit,
    lastNSplit,
    profile,
    reportsTo,
    reportsTofirstN,
    reportsTolastN,
  ]);

  // const goTochart = () => {
  //   if (profileChart.fullName) {
  //     history.push({
  //       pathname: "./employeechart",
  //       state: profileChart,
  //     });
  //   }
  // };

  const goToProfileReportTo = () => {
    history.push({
      pathname: "./employeeprofile",
      state: reportsTo.personId,
    });
  };

  // const goToDownload = (e, name) => {
  //   e.preventDefault();
  //   history.push({
  //     pathname: "./docdynamic",
  //     state: name,
  //   });
  // };

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
                  <p className="employee-report-position m-0">
                    <i className="md md-arrow-forward-ios" />
                    <MdArrowForwardIos
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
            <button
              // onClick={(e) => goToDownload(e, "MIS DOCUMENTOS")}
              onClick={msgDisable}
              type="button"
              className="btn btn-primary employee-btn"
            >
              Documentacion
            </button>
            {contextState.isAdmin ? (
              <button
                onClick={edit}
                type="button"
                className="btn btn-warning employee-btn"
              >
                Editar
              </button>
            ) : null}

            {/* <button
              onClick={goTochart}
              type="button"
              className="btn btn-light employee-btn"
            >
              Ver en Organigrama
            </button> */}
            {contextState.isAdmin ? (
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
              <div className="employee-updates-title">Informacion personal</div>
              <div className="employe-line-container">
                <p className="employee-line" style={{ width: "97%" }}></p>
              </div>
            </div>
            <div className="employee-upcoming-container">
              <div className="employee-info-container">
                <i className="md md-Email mt-5" />
                <MdEmail size="1.5em" color="gray" />
                <p className="employee-upcoming-birthday">Seguro medico:</p>
                <p className="employee-contact-email">
                  {profile.healthInsurance
                    ? profile.healthInsurance
                    : "No definido!"}
                </p>
              </div>
            </div>
            <div className="employee-updates-container">
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
            </div>
          </>
        ) : (
          <>
            <div className="employee-updates-container">
              <div className="employee-updates-title">Informacion</div>
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
                <i className="md md-phone-in-talk" />
                <MdPhoneInTalk size="1.5em" color="gray" />
                <p className="employee-upcoming-birthday">Telefono:</p>
                <p className="employee-contact-email">
                  {profile.phoneNumber ? profile.phoneNumber : null}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmployeeForm;
