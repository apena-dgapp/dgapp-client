import React from "react";
import Images from "../../common/images";

const FoodOrderForm = () => {
  return (
    <>
      <div className="edit-card-container">
        <div className="new-card">
          <div className="foodorder-grid-cont">
            <div className="foodorder-menu">
              <p>Menu-1</p>
              <div className="foodorder-icon-com">
                <img className="foodorder-icon" src={Images.iconArroz} alt="" />
              </div>
              <div className="foodorder-list-com">
                <p>-Arroz Blanco</p>
                <p>-Morro de Habichuela Roja</p>
              </div>
            </div>
            <div className="foodorder-menu">
              <p>Menu-2</p>
              <div className="foodorder-icon-com">
                <img className="foodorder-icon" src={Images.iconCarne} alt="" />
              </div>
              <div className="foodorder-list-com">
                <p>-Pollo Frito</p>
                <p>-Cerdo Asado</p>
              </div>
            </div>
            <div className="foodorder-menu">
              <p>Menu-3</p>
              <div className="foodorder-icon-com">
                <img className="foodorder-icon" src={Images.iconArroz} alt="" />
              </div>
            </div>
            <div className="foodorder-menu">
              <p>Menu-4</p>
              <div className="foodorder-icon-com">
                <img className="foodorder-icon" src={Images.iconArroz} alt="" />
              </div>
            </div>
            <div className="foodorder-menu">
              <p>Menu-5</p>
              <div className="foodorder-icon-com">
                <img className="foodorder-icon" src={Images.iconArroz} alt="" />
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
