import React, { useState, useEffect } from "react";
import { getTweets } from "../../../api/tweets";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaYoutube,
  FaRegComment,
} from "react-icons/fa";
import { FiRepeat, FiHeart } from "react-icons/fi";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { replaceTxt } from "../../../utils/textLink.js";
import "react-ig-feed/dist/index.css";

const Footer = () => {
  const history = useHistory();
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [postInstagram, setPostInstagram] = useState([]);

  const aboutUSChange = (e, name) => {
    e.preventDefault();

    history.push({
      pathname: "./aboutus",
      state: name,
    });
  };

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      location.pathname !== `${process.env.REACT_APP_RUTE}` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/home` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/siglepost` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/allpost` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/userregister` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/newpost` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employee` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/aboutus` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employeetree` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employeeedit` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employeenew` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/docdynamic` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employeeprofile` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/chat` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employeedirectory` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/training` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/createevents` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/register`
        ? setIsHidden(true)
        : setIsHidden(false);
    }

    getTweets()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setTweets(res.tweets);
        }
      });

    if (!unmounted) {
      fetch(
        `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption&limit=3&refresh_access_token
      ?grant_type=ig_refresh_token&access_token=${process.env.REACT_APP_INSTAGRAM_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          // setPostInstagram(data.data);
        });
    }

    // if (!unmounted) {
    //   fetch(
    //     `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=IGQVJYTldiSzF3MG1LQVRsRmdfeGJEejhDREhITjB5V1pxdm9uSFVVaE9sSG1aQXF0T2dwOE9HdTI0M1dXSnQ0djhCWllPQ3ZA3RVNCdXpQdy1mOXVpbXNNR3J2SldFdFhqOVh5RDhRMnlCZAHI1dkp0NgZDZD`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       // setAccessToken(data.access_token);
    //       console.log(data);
    //       // fetch(
    //       //   `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption&limit=3&refresh_access_token
    //       //       ?grant_type=ig_refresh_token&access_token=${data.access_token}`
    //       // )
    //       //   .then((res) => res.json())
    //       //   .then((data) => {
    //       //     setPostInstagram(data.data);
    //       //   });
    //     });
    // }

    return () => {
      unmounted = true;
    };
  }, [location.pathname]);

  // console.log(postInstagram);

  // console.log(tweets);

  return (
    <>
      <footer
        className="footer-container"
        style={{ display: isHidden ? "none" : null }}
      >
        <div className="footer-social">
          <div className="footer-social-title">
            <p>Conéctate con nosotros en las redes sociales:</p>
          </div>
          <div className="footer-social-icons">
            {" "}
            <div>
              <a
                href="https://twitter.com/dgapprd"
                className="text-white me-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter" />
                <FaTwitter size="2.5em" />
              </a>
              <a
                href="https://www.instagram.com/dgapprd/?hl=en"
                className="text-white me-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram size-icon" />
                <FaInstagram size="2.5em" />
              </a>
              <a
                href="https://www.facebook.com/dgapprd"
                className="text-white me-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f" />
                <FaFacebookF size="2.5em" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCD4BpzpTLbXj4G7xHhOxP4g"
                className="text-white me-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube" />
                <FaYoutube size="2.5em" />
              </a>
              <a
                href="https://dgapp.gob.do/"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-google" />
                <FaGoogle size="2.5em" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-grid-container">
          <div className="footer-grid-information">
            <p className="footer-grid-title">
              DIRECCIÓN GENERAL DE ALIANZAS PÚBLICO-PRIVADAS
            </p>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
            />
            <p className="footer-grid-text">
              La DGAPP es la institución responsable de la estructuración,
              promoción, supervisión y regulación de los proyectos de
              infraestructura, bienes y servicios de interés social, que se
              planifiquen y desarrollen en República Dominicana bajo la
              modalidad de alianzas público privadas (APP).
            </p>
          </div>
          <div className="footer-grid-aboutus">
            <p className="footer-grid-title">NOSOTROS</p>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
            />

            <p
              onClick={(e) => aboutUSChange(e, "MISION, VISION Y VALORES")}
              className="footer-grid-aboutus-txt"
            >
              Mision, Vision y Valores
            </p>

            <p
              onClick={(e) => aboutUSChange(e, "FUNCIONES")}
              className="footer-grid-aboutus-txt"
            >
              Funciones
            </p>

            <p
              onClick={(e) => aboutUSChange(e, "MARCO INSTITUCIONAL")}
              className="footer-grid-aboutus-txt"
            >
              Marco Institucional
            </p>

            <p
              onClick={(e) => aboutUSChange(e, "DIRECTOR GENERAL")}
              className="footer-grid-aboutus-txt"
            >
              Director General
            </p>

            <p
              onClick={(e) => aboutUSChange(e, "ORGANIGRAMA")}
              className="footer-grid-aboutus-txt"
            >
              Organigrama
            </p>
          </div>

          <div className="footer-grid-twitter">
            <p className="footer-grid-title">TWITTER</p>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
            />
            {tweets?.map((item, index) => {
              return (
                <div key={index}>
                  <div className="footer-twitter-date">
                    <p>{item.created_at}</p>
                  </div>
                  {/* <div className="footer-twitter-text">
                    {item.referenced_id !== ""
                      ? replaceTxt(item.referenced_text)
                      : replaceTxt(item.text)}
                  </div> */}
                  <div className="footer-twitter-text">
                    {replaceTxt(item.text)}
                  </div>
                  <div className="footer-twitter-buttons">
                    <a
                      href={`https://twitter.com/intent/tweet?in_reply_to=${item.tweet_id}&related=DGAPPRD`}
                      className="footer-tweets-card-menu-txt"
                    >
                      <i className="fa fa-regcomment" />
                      <FaRegComment
                        className="footer-tweets-icons"
                        size="1rem"
                        // color="#A5BECC"
                        cursor="pointer"
                        style={{
                          marginLeft: "0.1rem",
                          marginRight: "0.3rem",
                        }}
                      />
                      {item.public_metrics.reply_count}
                    </a>
                    <p className="footer-tweets-card-menu-txt">
                      <a
                        href={`https://twitter.com/intent/retweet?tweet_id=${item.tweet_id}&related=DGAPPRD`}
                        className="footer-tweets-card-menu-txt"
                      >
                        <i className="fi fi-repeat" />
                        <FiRepeat
                          className="footer-tweets-icons"
                          size="1rem"
                          // color="#A5BECC"
                          cursor="pointer"
                          style={{
                            marginLeft: "0.1rem",
                            marginRight: "0.3rem",
                            transform: "rotate(90deg)",
                          }}
                        />{" "}
                        {item.public_metrics.retweet_count}
                      </a>
                    </p>

                    <p className="footer-tweets-card-menu-txt">
                      <a
                        href={`https://twitter.com/intent/like?tweet_id=${item.tweet_id}&related=DGAPPRD`}
                        className="footer-tweets-card-menu-txt"
                      >
                        <i className="fi fi-heart" />
                        <FiHeart
                          className="footer-tweets-icons"
                          size="1rem"
                          // color="#A5BECC"
                          cursor="pointer"
                          style={{
                            marginLeft: "0.1rem",
                            marginRight: "0.3rem",
                          }}
                        />
                        {item.public_metrics.like_count}
                      </a>
                    </p>
                    <a
                      href={`https://twitter.com/DGAPPRD/status/${item.tweet_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="footer-tweets-card-menu-txt"
                    >
                      <p>
                        <i className="fa fa-Twitter" />
                        <FaTwitter
                          size="1.1rem"
                          color="#1D9BF0"
                          cursor="pointer"
                        />
                      </p>
                    </a>
                  </div>
                  <hr
                    style={{
                      width: "100%",
                      backgroundColor: "#7c4dff",
                      height: 1,
                      marginTop: "-0.6rem",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* <div className="footer-instagram-container">
            <p className="footer-grid-title">INSTAGRAM</p>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
            />
            <input type="radio" name="slider" id="item-1" defaultChecked />
            <input type="radio" name="slider" id="item-2" />
            <input type="radio" name="slider" id="item-3" />
            <div className="footer-instagram-cards">
              {" "}
              <label
                className="footer-instagram-card"
                htmlFor="item-1"
                id="song-1"
              >
                <img src={postInstagram[0]?.media_url} alt="song" />
                <div className="footer-instagram-caption-cont">
                  <a
                    href={postInstagram[0]?.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-instagram-logo"
                  >
                    <p>Ir a Instagram</p>
                  </a>
                  <p className="footer-instagram-caption">
                    {postInstagram[0]?.caption}
                  </p>
                </div>
              </label>
              <label
                className="footer-instagram-card"
                htmlFor="item-2"
                id="song-2"
              >
                <img src={postInstagram[1]?.media_url} alt="song" />
                <div className="footer-instagram-caption-cont">
                  <a
                    href={postInstagram[1]?.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-instagram-logo"
                  >
                    <p>Ir a Instagram</p>
                  </a>
                  <p className="footer-instagram-caption">
                    {postInstagram[1]?.caption}
                  </p>
                </div>
              </label>
              <label
                className="footer-instagram-card"
                htmlFor="item-3"
                id="song-3"
              >
                <img src={postInstagram[2]?.media_url} alt="song" />
                <div className="footer-instagram-caption-cont">
                  <a
                    href={postInstagram[2]?.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-instagram-logo"
                  >
                    <p>Ir a Instagram</p>
                  </a>
                  <p className="footer-instagram-caption">
                    {postInstagram[2]?.caption}
                  </p>
                </div>
              </label>
            </div>
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
