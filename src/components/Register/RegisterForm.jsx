import React from "react";
import Images from "../../common/images";
import Input from "../../common/components/Input/Input";
const RegisterForm = ({
  person,
  getPerson,
  user,
  handlerInputChange,
  setAutoName,
  autoName,
  createUser,
  formData,
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
            </div>
          </div>
          <div className="register-inputs-cont">
            <div className="register-input-list">
              <p className="edit-input-title">Lista de Empleados</p>
              <select
                name="reportto"
                className="edit-input"
                onChange={getPerson}
                // value={reportsTo?.fullName}
              >
                <option value="" disabled selected>
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
                <div
                  onClick={() => setAutoName((autoName) => !autoName)}
                  className="switch-button"
                >
                  <input className="switch-button-checkbox" type="checkbox" />
                  <label className="switch-button-label" htmlFor>
                    <span className="switch-button-label-span">Auto</span>
                  </label>
                </div>
              </div>
              {user ? (
                <Input
                  id="username"
                  onChange={handlerInputChange}
                  name="username"
                  type="text"
                  placeholder={
                    autoName
                      ? user.firstName.split("")[0] +
                        user.lastName.split(" ")[0]
                      : "ej: crodirguez"
                  }
                  classInput="edit-input"
                  disabled={autoName ? true : false}
                  // value={formData.username}
                />
              ) : (
                <Input
                  id="username"
                  onChange={handlerInputChange}
                  name="username"
                  type="text"
                  placeholder="ej: crodirguez"
                  classInput="edit-input"
                  disabled={autoName ? true : false}
                  // value={formData.username}
                />
              )}
            </div>
            <div className="mt-1">
              <p className="edit-input-title">Contraseña</p>
              <Input
                id="password"
                onChange={handlerInputChange}
                name="password"
                type="password"
                placeholder="Escriba una contraseña facil de recordar"
                classInput="edit-input"
                value={formData.password}
              />
            </div>
            <div className="mt-1">
              <p className="edit-input-title">Privilegio</p>
              <select
                name="role"
                className="edit-input"
                onChange={handlerInputChange}
                // value={formData.role}
              >
                <option disabled selected>
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
