import React from "react";
import Images from "../../common/images/index";

const OrganizationChart = () => {
    return (
        <>
            <div className="chart-container">
                <div className="news-title">
                    <p>Organigrama de la Dirección General de </p>
                    <p>Alianzas Público Privadas</p>
                    <span className='chart-title-line'></span>
                </div>
                <div className="chart-img">
                    <img src={Images.chart} alt="" />
                </div>
            </div>
        </>
    );
};

export default OrganizationChart;
