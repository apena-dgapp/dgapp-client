import React from 'react'
import Images from "../../common/images/index";
import DOMPurify from "dompurify";
import useScreenSize from "../../hooks/useScreenSize";

const DashboardSection8 = ({ notices }) => {
    const { width } = useScreenSize();
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html),
        };
    };
    return (
        <>
            <div className="dashboard-section-2-line-cont">
                <div className="dashboard-section-3-line"></div>
            </div>
            <div className="dashboard-section-2-notices">
                <div className="dashboard-section-2-notices-txt-cont">
                    <div className="dashboard-section-2-notices-txt">
                        <p style={{ fontSize: width < 5021 ? "1.3rem" : "2.3rem", fontWeight: "bold" }}>{notices[0]?.title}</p>
                        <p dangerouslySetInnerHTML={createMarkup(notices[0]?.description)}></p>
                    </div>
                    <div className="dashboard-section-2-notices-separte"></div>
                    <div className="dashboard-section-2-notices-txt">
                        <p style={{ fontSize: width < 5021 ? "1.3rem" : "2.3rem", fontWeight: "bold" }}>{notices[1]?.title}</p>
                        <p dangerouslySetInnerHTML={createMarkup(notices[1]?.description)}></p>
                    </div>
                </div>
                <div className="dashboard-section-2-notices-img-cont">
                    <div className="dashboard-section-2-notices-img">
                        <img src={Images.notices} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSection8