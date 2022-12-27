import React from 'react'
import Images from "../../common/images/index";
import { tConvert } from "../../utils/Time24To12";

const DashboardSection4 = ({ birthday, events, goToProfile }) => {

    var optionsDate = { month: "long", day: "numeric", timeZone: 'UTC' };

    return (
        <>
            <div className="dashboard-section-4">
                <div className="dashboard-section-4-grid">
                    <div className="dashboard-section-4-birhtday">
                        <div className="dashboard-section-4-header">
                            <img
                                className="dashboard-section-4-img-birhtday"
                                src={Images.birth}
                                alt=""
                            />
                        </div>
                        <div className="dashboard-section-4-scroll">
                            {birthday.length ? (
                                birthday?.map((item, index) => {
                                    return (
                                        <div
                                            onClick={() => goToProfile({ id: item?.personId, name: item?.name })}
                                            key={index}
                                            className="dashboard-section-4-content-birth"
                                        >
                                            <div className="dashboard-section-4-date">
                                                <p className="dashboard-section-4-day">
                                                    {item.day?.split("-")[0]}
                                                </p>
                                                <p className="dashboard-section-4-month">
                                                    {item.day?.split("-")[1]}
                                                </p>
                                            </div>
                                            <div className="dashboard-section-4-employee">
                                                <img
                                                    className="dashboard-section-4-employee-img"
                                                    src={item?.photo ? item.photo : Images.noImg}
                                                    alt=""
                                                />
                                                <div className="dashboard-section-4-text">
                                                    {" "}
                                                    <p style={{ fontWeight: "bold" }}>{item?.name}</p>
                                                    <p>{item?.position}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (null
                                // <div className="dashboard-nodata-cont">
                                // <img src={Images.nodata} alt="" />
                                // <p>No se registran cumpleaños para este mes</p>
                                // </div>
                            )}
                        </div>
                    </div>
                    <div></div>
                    <div className="dashboard-section-4-birhtday">
                        <div className="dashboard-section-4-header">
                            <img
                                className="dashboard-section-4-img-birhtday"
                                src={Images.calendar}
                                alt=""
                            />
                        </div>
                        <div className="dashboard-section-4-scroll">
                            {events.length ? (
                                events?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="dashboard-section-4-content-calendar"
                                        >
                                            <div style={{ backgroundColor: item.color ? item.color : null }} className="dashboard-section-4-event-num">
                                                <p className="dashboard-section-4-event-txt">
                                                    {index + 1}
                                                </p>
                                            </div>
                                            <div className="dashboard-section-4-event">
                                                <p className="dashboard-section-4-event-txt">
                                                    {item.name}
                                                </p>
                                                <p className="dashboard-section-4-event-time">
                                                    Salón {item.room}
                                                </p>
                                            </div>
                                            <div className="dashboard-section-4-employee">
                                                <div className="dashboard-section-4-text">
                                                    <div className="dashboard-section-4-event-date-cont">
                                                        <p className="dashboard-section-4-event-date">
                                                            {new Date(item.from).toLocaleDateString(
                                                                "es-ES",
                                                                optionsDate
                                                            )}
                                                        </p>
                                                        <p className="dashboard-section-4-event-date">
                                                            {item.to ? new Date(item.to).toLocaleDateString(
                                                                "es-ES",
                                                                optionsDate
                                                            ) : null}
                                                        </p>
                                                        <p className="dashboard-section-4-event-time">
                                                            {tConvert(item.startTime)} -{" "}
                                                            {tConvert(item.endingTime)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (null
                                // <div className="dashboard-nodata-cont">
                                // <img src={Images.nodata} alt="" />
                                // <p>No se registran proximos eventos</p>
                                // </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSection4