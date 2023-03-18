import React from "react";
import Images from "../../common/images/index";

const LoginForm = ({
  profileInputs,
  handeleSignIn,
  profile,
  inConstruction,
}) => {
  return (
    <>
      <div className="login-dgappLogo-container">
        <img className="login-dgappLogo-img" src={Images.dgappLogo} alt="" />
      </div>
      <div className="container-login">
        <div className="d-flex justify-content-center">
          <p className="txt-title">BIENVENIDO</p>
        </div>

        <div className="row container-input">
          <div className="d-flex justify-content-center mb-3">
            <p className="txt-subtitle">Inicie sesión en su cuenta</p>
          </div>

          <form className="" name="loginForm" action="" method="post">
            <div className="d-flex justify-content-center container-input-user">
              <input
                name="username"
                type="text"
                className="login-input"
                maxLength="16"
                minLength="4"
                placeholder="Escriba su nombre de usuario"
                required
                onChange={profileInputs}
                value={profile.username}
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                name="password"
                type="password"
                className="login-input"
                placeholder="Escriba su contraseña"
                required
                onChange={profileInputs}
                value={profile.password}
              />
            </div>
            {/* <div className="d-flex justify-content-center mt-1">
              <p onClick={inConstruction} className="txt-forgot">
                ¿Has olvidado tu contraseña?
              </p>
            </div> */}
            <div className="d-flex justify-content-center container-btn-login">
              <button
                className="btn-login"
                name="btn-submit"
                type="submit"
                onClick={handeleSignIn}
              >
                Acceso
              </button>
            </div>
            {/* <div className="d-flex justify-content-center container-btn-login">
              <button
                onClick={inConstruction}
                className="btn-create"
                name="btn-create"
                type="button"
              >
                Crear Nueva Cuenta
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
