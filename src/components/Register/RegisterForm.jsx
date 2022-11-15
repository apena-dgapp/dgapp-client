import React from "react";
import Images from "../../common/images";
const RegisterForm = ({
  person,
  getPerson,
  user,
  handlerInputChange,
  setAutoName,
  autoName,
  createUser,
  formData,
  userName,
  exist,
}) => {
  return (
    <>
      <div className="register-card-container">
        <div className="register-card">
          <div className="register-img-cont">
            <div>
              <img
                className="register-img"
                src={user.photo ? user.photo : Images.noImg}
                alt="..."
              />

              <p className="register-img-txt">{exist ? "Registrado" : null}</p>
            </div>
          </div>
          <div className="register-inputs-cont">
            <div className="register-input-list">
              <p className="edit-input-title">Lista de Empleados</p>
              <select
                name="employees"
                className="edit-input"
                onChange={getPerson}
                defaultValue={"DEFAULT"}
                // value={reportsTo?.fullName}
              >
                <option disabled value="DEFAULT">
                  Seleccionar un Empleado
                </option>
                {person
                  ? person.map((item, index) => {
                      return (
                        <option
                          id={item.personId}
                          key={index}
                          value={{
                            user: {
                              firstName: item.firstName,
                              lastName: item.lastName,
                              photo: item.photo,
                            },
                          }}
                        >
                          {item.fullName}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className="">
              <div className="register-switch-cont">
                <p className="edit-input-title">Nombre de Usuario</p>
                {exist ? null : (
                  <div
                    onClick={() => setAutoName((autoName) => !autoName)}
                    className="switch-button"
                  >
                    <input className="switch-button-checkbox" type="checkbox" />
                    <label className="switch-button-label" htmlFor="">
                      <span className="switch-button-label-span">Auto</span>
                    </label>
                  </div>
                )}
              </div>
              <input
                id="username"
                onChange={handlerInputChange}
                name="username"
                type="text"
                placeholder={userName}
                className="edit-input"
                value={autoName ? userName : formData.username || ""}
                disabled={autoName ? true : false}
              />
            </div>
  
            <div className="mt-1">
              <p className="edit-input-title">Privilegio</p>
              <select
                name="role"
                className="edit-input"
                onChange={handlerInputChange}
                defaultValue={"DEFAULT"}
                disabled={exist ? true : false}
                // value={formData.role === "" ? "DEFAULT" : undefined}
              >
                <option value="DEFAULT" disabled>
                  Seleccionar privilegio
                </option>
                <option value="1">Administrador</option>
                <option value="3">Editar</option>
                <option value="2">Usuario</option>
              </select>
            </div>
          </div>

          <div className="register-btn">
            <button
              onClick={createUser}
              className="register-btn-done"
              name="btn-done"
              type="submit"
            >
              Crear Usuario
            </button>
          </div>
        </div>
      </div>
      <div className="register-header-container">
        <div className="register-header-title">REGISTRAR EMPLEADO</div>
      </div>
    </>
  );
};

export default RegisterForm;
