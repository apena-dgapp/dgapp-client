import React from 'react'
import Images from "../../common/images/index";
import { tConvert } from "../../utils/Time24To12";
import { VscCircleFilled } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";
import { CiSquareRemove } from "react-icons/ci";

const DashboardSection4 = ({
    birthday,
    events,
    selectedCaledary,
    setSelectedCaledary,
    commemorative,
    contextState,
    EditToggle,
    messageToggle,
    messageToggleActivity
}) => {

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
                                            // onClick={() => goToProfile({ id: item?.personId, name: item?.name })}
                                            key={index}
                                            className="dashboard-section-4-content-birth"
                                        >
                                            <div className="dashboard-section-4-date">
                                                <p className="dashboard-section-4-nextmonth">
                                                    {item.nextMonth}
                                                </p>
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
                            )}
                        </div>
                    </div>
                    <div></div>
                    <div className="dashboard-section-4-birhtday">

                        {selectedCaledary === "activities" ?
                            <div className='dashboard-section-4-silder-animation-activities'>
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
                                                                    {item.to && item.from !== item.to ? new Date(item.to).toLocaleDateString(
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
                                                        {
                                                            contextState.userRole === 1 || contextState.userRole === 3 ?
                                                                <div className="">
                                                                    <span onClick={() => messageToggleActivity(item)}>
                                                                        <i className="ci ci-square-remove" />
                                                                        <CiSquareRemove
                                                                            style={{ cursor: "pointer" }}
                                                                            size="1.2rem"
                                                                            color="#FB2576"
                                                                        />
                                                                    </span>
                                                                    <span onClick={() => EditToggle(item)}>
                                                                        <i className="fi fi-edit" />
                                                                        <FiEdit
                                                                            style={{ cursor: "pointer" }}
                                                                            size="1.1rem"
                                                                            color="#FBB454"
                                                                        />
                                                                    </span>
                                                                </div> : null
                                                        }
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (null
                                    )}
                                </div>
                            </div > :
                            <div className='dashboard-section-4-silder-animation-dates'>
                                <div className="dashboard-section-4-header">
                                    <img
                                        className="dashboard-section-4-img-birhtday"
                                        src={Images.commemorative}
                                        alt=""
                                    />
                                </div>
                                <div className="dashboard-section-4-scroll">
                                    {commemorative.length ? (
                                        commemorative?.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="dashboard-section-4-content-commemorative"
                                                >
                                                    <div style={{ backgroundColor: item.color ? item.color : null }} className="dashboard-section-4-event-num">
                                                        <p className="dashboard-section-4-event-txt">
                                                            {index + 1}
                                                        </p>
                                                    </div>
                                                    <div className="dashboard-section-4-event">
                                                        <div className='dashboard-section-4-commemorative-text'>
                                                            <div>
                                                                <p className="dashboard-section-4-event-txt">
                                                                    {item.title}
                                                                </p>
                                                            </div>
                                                            <div className="">
                                                                <p className="dashboard-section-4-event-date">
                                                                    {new Date(item.createdAt).toLocaleDateString(
                                                                        "es-ES",
                                                                        optionsDate
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <p className="dashboard-section-4-dates-descrp">
                                                            {item.description.replace(/(<([^>]+)>)/gi, "")}
                                                        </p>
                                                    </div>
                                                    <div className="dashboard-section-4-employee">
                                                        <div className="dashboard-section-4-text">
                                                            {/* <div className="dashboard-section-4-event-date-cont">
                                                                <p className="dashboard-section-4-event-date">
                                                                    {new Date(item.createdAt).toLocaleDateString(
                                                                        "es-ES",
                                                                        optionsDate
                                                                    )}
                                                                </p>
                                                            </div> */}
                                                        </div>
                                                        {
                                                            contextState.userRole === 1 || contextState.userRole === 3 ?
                                                                <div className="">
                                                                    <span onClick={() => messageToggle(item)}>
                                                                        <i className="ci ci-square-remove" />
                                                                        <CiSquareRemove
                                                                            style={{ cursor: "pointer" }}
                                                                            size="1.2rem"
                                                                            color="#FB2576"
                                                                        />
                                                                    </span>
                                                                    <span onClick={() => EditToggle(item)}>
                                                                        <i className="fi fi-edit" />
                                                                        <FiEdit
                                                                            style={{ cursor: "pointer" }}
                                                                            size="1.1rem"
                                                                            color="#FBB454"
                                                                        />
                                                                    </span>
                                                                </div> : null
                                                        }
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (null
                                    )}
                                </div>
                            </div>
                        }
                        <div className="dashboard-section-4-calendary-slider">
                            <div onClick={() => setSelectedCaledary("activities")} className="dashboard-section-4-calendary-activities">
                                <i className="vsc vsc-circle-filled" />
                                <VscCircleFilled
                                    size={"1.5rem"}
                                    color={selectedCaledary === "activities" ? "#75AAD3" : "#B2B2B2"}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                            <div onClick={() => setSelectedCaledary("dates")} className="dashboard-section-4-calendary-dates">
                                <i className="vsc vsc-circle-filled" />
                                <VscCircleFilled
                                    size={"1.5rem"}
                                    color={selectedCaledary === "activities" ? "#B2B2B2" : "#75AAD3"}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSection4