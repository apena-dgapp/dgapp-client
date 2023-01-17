import React, { useEffect } from 'react'
import Images from '../../common/images';
// import { replaceTxt } from "../../utils/textLink.js";
import { FiSend, FiHeart } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";

const DashboardSection7 = ({ tweets }) => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        document.getElementsByClassName("twitter-embed")[0].appendChild(script);
    }, []);


    return (
        <>
            <div className="dashboard-section-7">
                <div className="dashboard-section-7-grid">
                    <div className="dashboard-section-7-section">
                        <p>TWITTER</p>
                        <div className="dashboard-section-7-section-cont">
                            <div className="dashboard-section-7-scroll">
                                {/* {tweets.length ? (
                                    tweets?.map((item, index) => {
                                        return (
                                            <a
                                                key={index}
                                                href={`https://twitter.com/DGAPPRD/status/${item.tweet_id}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="dashboard-section-7-box"
                                            >
                                                <div className="dashboard-section-7-content">
                                                    <div className="dashboard-section-7-content-container">
                                                        <div className="dashboard-section-7-content-logo">
                                                            <img src={Images.dgappLogo3} alt="" />
                                                        </div>
                                                        <div className="dashboard-section-7-content-title">
                                                            <p>Dirección General de Alianzas Público Priva...</p>
                                                        </div>
                                                        <div className="dashboard-section-7-content-date">
                                                            <p>{`@DGAPP... ${item.created_at}`}</p>
                                                        </div>
                                                    </div>
                                                    <div className="dashboard-section-7-content-text">
                                                        <p> {replaceTxt(item.text)}</p>
                                                    </div>
                                                    <div className="dashboard-section-7-content-text">
                                                        <p style={{ color: "#5CB8E4", marginTop: "0.5rem", fontWeight: "bold" }}> {`#${item.entities.hashtags ? item.entities.hashtags[0]?.tag : null} #${item.entities.hashtags ? item.entities.hashtags[1]?.tag : null}`}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    })
                                ) : (null
                                )} */}
                                <section className="twitterContainer">
                                    <div className="twitter-embed">
                                        <a
                                            className="twitter-timeline"
                                            // data-theme="dark"
                                            data-tweet-limit="5"
                                            data-chrome="noheader nofooter noborders"
                                            href="https://twitter.com/DGAPPRD"
                                        >
                                        </a>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-section-7-section-line">
                        <span></span>
                    </div>
                    <div className="dashboard-section-7-section">
                        <p>INSTAGRAM</p>
                        <div className="dashboard-section-7-section-cont">
                            <div className="dashboard-section-7-section-instagram">
                                <div className="dashboard-section-7-section-instagram-logo">
                                    <img src={Images.dgappicon} alt="" />
                                    <p>dgapprd</p>
                                </div>
                                <div className="dashboard-section-7-section-instagram-img">
                                    <img src={Images.director} alt="" />
                                    <div className="dashboard-section-7-section-instagram-icons">
                                        <span>
                                            <i className="fi fi-heart" />
                                            <FiHeart
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                        <span>
                                            <i className="fa fa-regcomment" />
                                            <FaRegComment
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                        <span>
                                            <i className="fi fi-send" />
                                            <FiSend
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="dashboard-section-7-section-instagram-likes">
                                    <p>32 personas le han dado me gusta</p>
                                    <p style={{ color: "gray", fontWeight: "normal" }}>10 de enero</p>
                                </div>
                            </div>
                            <div className="dashboard-section-7-section-instagram">
                                <div className="dashboard-section-7-section-instagram-logo">
                                    <img src={Images.dgappicon} alt="" />
                                    <p>dgapprd</p>
                                </div>
                                <div className="dashboard-section-7-section-instagram-img">
                                    <img src={Images.director} alt="" />
                                    <div className="dashboard-section-7-section-instagram-icons">
                                        <span>
                                            <i className="fi fi-heart" />
                                            <FiHeart
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                        <span>
                                            <i className="fa fa-regcomment" />
                                            <FaRegComment
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                        <span>
                                            <i className="fi fi-send" />
                                            <FiSend
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="dashboard-section-7-section-instagram-likes">
                                    <p>32 personas le han dado me gusta</p>
                                    <p style={{ color: "gray", fontWeight: "normal" }}>10 de enero</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-section-7-section-line">
                        <span></span>
                    </div>
                    <div className="dashboard-section-7-section">
                        <p>FACEBOOK</p>
                        <div className="dashboard-section-7-section-cont">
                            <div className="dashboard-section-7-section-instagram">
                                <div className="dashboard-section-7-section-instagram-logo">
                                    <img src={Images.dgappicon} alt="" />
                                    <p>dgapprd</p>
                                </div>
                                <div className="dashboard-section-7-section-instagram-img">
                                    <img src={Images.director} alt="" />
                                    <div className="dashboard-section-7-section-instagram-icons">
                                        <span>
                                            <i className="fi fi-heart" />
                                            <FiHeart
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                        <span>
                                            <i className="fa fa-regcomment" />
                                            <FaRegComment
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                        <span>
                                            <i className="fi fi-send" />
                                            <FiSend
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="dashboard-section-7-section-instagram-likes">
                                    <p>32 personas le han dado me gusta</p>
                                    <p style={{ color: "gray", fontWeight: "normal" }}>10 de enero</p>
                                </div>
                            </div>
                            <div className="dashboard-section-7-section-instagram">
                                <div className="dashboard-section-7-section-instagram-logo">
                                    <img src={Images.dgappicon} alt="" />
                                    <p>dgapprd</p>
                                </div>
                                <div className="dashboard-section-7-section-instagram-img">
                                    <img src={Images.director} alt="" />
                                    <div className="dashboard-section-7-section-instagram-icons">
                                        <span>
                                            <i className="fi fi-heart" />
                                            <FiHeart
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                        <span>
                                            <i className="fa fa-regcomment" />
                                            <FaRegComment
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                        <span>
                                            <i className="fi fi-send" />
                                            <FiSend
                                                className="dashboard-section-7-section-instagram-icon"
                                                size="1rem"
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="dashboard-section-7-section-instagram-likes">
                                    <p>32 personas le han dado me gusta</p>
                                    <p style={{ color: "gray", fontWeight: "normal" }}>10 de enero</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSection7