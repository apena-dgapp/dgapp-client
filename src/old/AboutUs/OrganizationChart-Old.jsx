import React from "react";
import Images from "../../common/images/index";

const OrganizationChart = () => {
    return (
        <>
            <div className="chart-container">
                <div>
                    <figure>
                        <img className="chart" src={Images.chart} alt="" />
                    </figure>
                </div>
            </div>
        </>
    );
};

export default OrganizationChart;
