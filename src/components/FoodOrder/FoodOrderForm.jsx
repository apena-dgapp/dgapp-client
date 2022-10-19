import React from "react";
import Images from "../../common/images";

const FoodOrderForm = () => {
  return (
    <>
      <div className="edit-card-container">
        <div className="new-card">
          <div className="foodorder-grid-cont">
            <div className="foodorder-menu">
              <div className="foodorder-icon-cont">
                <div className="foodorder-header-title">
                  <p>ARROZ</p>
                </div>
                <img className="foodorder-icon" src={Images.iconArroz} alt="" />
                <div className="foodorder-list-cont">
                  <p>- Arroz Blanco</p>
                  <p>- Morro de Habichuela Roja</p>
                </div>
              </div>
            </div>
            <div className="foodorder-menu">
              <div className="foodorder-icon-cont">
                <div className="foodorder-header-title">
                  <p>CARNE Y PESCADO</p>
                </div>
                <img className="foodorder-icon" src={Images.iconCarne} alt="" />
                <div className="foodorder-list-cont">
                  <p>- Pollo Frito</p>
                  <p>- Cerdo Asado</p>
                </div>
              </div>
            </div>
            <div className="foodorder-menu">
              <div className="foodorder-icon-cont">
                <div className="foodorder-header-title">
                  <p>VIVIERES</p>
                </div>
                <img
                  className="foodorder-icon"
                  src={Images.iconPlatano}
                  alt=""
                />
                <div className="foodorder-list-cont">
                  <p>- Pollo Frito</p>
                  <p>- Cerdo Asado</p>
                </div>
              </div>
            </div>
            <div className="foodorder-menu">
              <div className="foodorder-icon-cont">
                <div className="foodorder-header-title">
                  <p>GUISOS</p>
                </div>
                <img
                  className="foodorder-icon"
                  src={Images.iconHabichuela}
                  alt=""
                />
              </div>
            </div>
            <div className="foodorder-menu">
              <div className="foodorder-icon-cont">
                <div className="foodorder-header-title">
                  <p>ENSALADAS</p>
                </div>
                <img
                  className="foodorder-icon"
                  src={Images.iconEnsalda}
                  alt=""
                />
              </div>
            </div>
            <div className="foodorder-menu">
              <div className="foodorder-icon-cont">
                <div className="foodorder-header-title">
                  <p>SNACKS Y POSTRES</p>
                </div>
                <img className="foodorder-icon" src={Images.iconSnack} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="foodorder-header-container">
        <div className="edit-header-title">ORDERNAR ALMUERZO</div>
      </div>
    </>
  );
};

export default FoodOrderForm;
