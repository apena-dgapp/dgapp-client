import React, { useEffect } from 'react'
import Images from '../../common/images';
import { shortDate } from '../../utils/shortDate';
import { replaceTxt } from "../../utils/textLink.js";
import { FiSend, FiHeart } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";

const DashboardSection7 = ({ tweets, instagram }) => {

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
                        <p>FACEBOOK</p>
                        <div className="dashboard-section-7-section-cont">
                            <div className="dashboard-section-7-scroll-fb">
                                <section className="dashboard-section-7-fb">
                                    <iframe
                                        title='facebook'
                                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdgapprd&tabs=timeline&width=380&height=2500&small_header=true&adapt_container_width=false&hide_cover=true&show_facepile=true&appId=616510976770949"
                                        // width={400}
                                        // height={2500}
                                        style={{ border: 'none', overflow: 'hidden' }}
                                        scrolling="no"
                                        frameBorder={0}
                                        allowFullScreen={true}
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                        className='facebook-timeline'
                                    />

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
                            {
                                instagram?.map((item, key) => {
                                    return (
                                        key < 1 ? <a key={key} href={item.permalink} target="_blank" rel="noreferrer" className="dashboard-section-7-section-instagram">
                                            <div className="dashboard-section-7-section-instagram-logo">
                                                <img src={Images.dgappicon} alt="" />
                                                <p>dgapprd</p>
                                            </div>
                                            <div className="dashboard-section-7-section-instagram-img">
                                                {
                                                    item?.media_type === "VIDEO" ? <iframe title='video' src={item?.media_url} frameborder="0" /> : <img src={item?.media_url} alt="" />
                                                }
                                                <div className="dashboard-section-7-section-instagram-text">
                                                    <p className="">
                                                        {replaceTxt(item.caption)}
                                                    </p>
                                                </div>
                                                <div className="dashboard-section-7-section-instagram-icons">
                                                    <span>
                                                        <i className="fi fi-heart" />
                                                        <FiHeart
                                                            className="dashboard-section-7-section-instagram-icon"
                                                            size="1.2rem"
                                                        />
                                                    </span>
                                                    <span>
                                                        <i className="fa fa-regcomment" />
                                                        <FaRegComment
                                                            className="dashboard-section-7-section-instagram-icon"
                                                            size="1.2rem"
                                                        />
                                                    </span>
                                                    <span>
                                                        <i className="fi fi-send" />
                                                        <FiSend
                                                            className="dashboard-section-7-section-instagram-icon"
                                                            size="1.2rem"
                                                        />
                                                    </span>
                                                </div>

                                            </div>
                                            <div className="dashboard-section-7-section-instagram-likes">
                                                <p>32 personas le han dado me gusta</p>
                                                <p style={{ color: "gray", fontWeight: "normal" }}>{shortDate(item.timestamp)}</p>
                                            </div>
                                        </a> : null
                                    )
                                })
                            }
                            {/* <div className="dashboard-section-7-section-instagram">
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
                            </div> */}
                            {/* <div className="dashboard-section-7-section-instagram">
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSection7