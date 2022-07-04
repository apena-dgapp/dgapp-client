import React from "react";
// import Input from "../../common/components/Input/Input";
import { BsPlusCircleDotted, BsDashCircleDotted } from "react-icons/bs";
import Images from "../../common/images";
import PersonalInformation from "./PersonalInformation";
import OrganizationInformation from "./OrganizationInformation";

function EmployeeNewForm({
  departaments,
  formData,
  handlerInputChange,
  person,
  seletedHandler,
  photo,
  removeImg,
  createHandlerForm,
  handlerdDepartament,
  handlerdReportTo,
  next,
  back,
  screen,
}) {
  //   const date = new Date("06/29/2022").toISOString().split("T")[0];
  //     if (person) {
  //       var reportsTo = person?.filter(
  //         (item) => item.personId !== profile?.personId
  //       );
  //     }

  // console.log(formData);

  return (
    <>
      <div className="edit-card-container">
        <div className="new-card">
          <div className="edit-img-cont">
            <div
              onClick={photo ? removeImg : null}
              className="upload-btn-wrapper"
            >
              <img
                className="boton-standar-rw"
                src={photo ? photo : Images.noImg}
                alt="..."
              />
              <input
                onChange={seletedHandler}
                name="img"
                className="upload-file-buton"
                type="file"
                accept=".jpg, .jpeg, .jfif, .png, .webp"
              />
              {photo ? (
                <div className="d-flex">
                  <p className="edit-img-text">Cargar Foto</p>
                  <i className="bs bs-dash-circle-dotted" />
                  <BsDashCircleDotted
                    style={{ marginRight: "0.5rem" }}
                    size="1.5rem"
                    color="red"
                  />
                </div>
              ) : (
                <div className="d-flex">
                  <p className="edit-img-text">Cargar Foto</p>
                  <i className="bs bs-plus-circle-dotted" />
                  <BsPlusCircleDotted
                    style={{
                      marginRight: "0.5rem",
                    }}
                    size="1.5rem"
                    color="darkcyan"
                  />
                </div>
              )}
            </div>
          </div>

          {screen === 1 ? (
            <PersonalInformation
              handlerInputChange={handlerInputChange}
              formData={formData}
            />
          ) : null}

          <div className="edit-org-cont">
            {screen === 2 ? (
              <OrganizationInformation
                person={person}
                departaments={departaments}
                handlerdDepartament={handlerdDepartament}
                handlerdReportTo={handlerdReportTo}
                formData={formData}
                handlerInputChange={handlerInputChange}
              />
            ) : null}

            <div className="edit-btn-cont">
              <div className="edit-btns">
                {screen === 2 ? (
                  <button
                    onClick={back}
                    className="new-btn-back"
                    name="btn-back"
                    type="submit"
                  >
                    Atras
                  </button>
                ) : null}

                <button
                  onClick={screen === 1 ? next : createHandlerForm}
                  name="btn-done"
                  className={screen === 1 ? "new-btn-next" : "btn-done"}
                  type="submit"
                >
                  {screen === 1 ? "Continuar" : "Crear"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="new-header-container">
        <div className="edit-header-title">CREAR NUEVO EMPLEADO</div>
      </div>
    </>
  );
}
export default EmployeeNewForm;
