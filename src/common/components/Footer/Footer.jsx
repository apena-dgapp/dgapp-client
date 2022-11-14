import React, { useState, useEffect } from "react";
// import { getTweets } from "../../../api/tweets";
import Images from '../../images'
import { useLocation } from "react-router-dom";

const Footer = () => {
  // const [tweets, setTweets] = useState([]);
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      location.pathname === `${process.env.REACT_APP_RUTE}/pdf` 
      ? setIsHidden(true)
      : setIsHidden(false);
  }

    // const token ="AAAAAAAAAAAAAAAAAAAAAEZIfwEAAAAATfBPZ8E7Swa0MX4vcfnTrt2ii%2BA%3DYPOIK0eqJTisuEf5w4f5ii9dR5zDYDCQ1XivJOxhVsstGd7TqX"

    // if (!unmounted) {
    //     fetch('https://api.twitter.com/2/users/1295813947518590976/tweets', {
    //         headers: {
    //           "User-Agent": "v2UserTweetsJS",
    //           "authorization": `Bearer ${token}`
    //         }
    //       })
    //      .then(resp => resp.json())
    //      .then(json => console.log(json))
    // }


    // if (!unmounted) {
    //   getTweets()
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     if (!unmounted) {
    //       // setTweets(res);
    //       // console.log(res)
    //     }
    //   });
    // }
  
    // if (!unmounted) {
    //   fetch(
    //     'https://api.twitter.com/2/users?ids=1295813947518590976&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified,withheld&expansions=pinned_tweet_id',
    //     {"token_type":"bearer","access_token":"AAAAAAAAAAAAAAAAAAAAAEZIfwEAAAAATfBPZ8E7Swa0MX4vcfnTrt2ii%2BA%3DYPOIK0eqJTisuEf5w4f5ii9dR5zDYDCQ1XivJOxhVsstGd7TqX"}
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
    // }

    

    return () => {
      unmounted = true;
    };
  }, [location.pathname]);

  return (
    <>
      <div style={{ display: isHidden ? "none" : null }} className="footer-container"> 
        <div className="footer-section-1-grid">
          <div className="footer-section-1-cont">
            <img className='footer-section-1-img' src={Images.abouticon} alt="" />
          </div>
          <div className="footer-section-1-cont">
            <div className="footer-section-1-text">
              <p>SÍGUENOS EN NUESTRAS<br/> PLATAFORMAS DIGITALES</p>
            </div>
            
            <div className="footer-section-1-icon-con">
              <a href="https://twitter.com/dgapprd/" target="_blank" rel="noreferrer">
                <img className="footer-section-1-icon" src={Images.twitter} alt="" />
              </a>
              <a href="https://www.instagram.com/dgapprd/" target="_blank" rel="noreferrer">
                <img className="footer-section-1-icon-instagram" src={Images.instagram} alt="" />
              </a>
              <a href="https://www.facebook.com/dgapprd" target="_blank" rel="noreferrer">
                <img className="footer-section-1-icon-facebook" src={Images.facebook} alt="" />
              </a>
              <a href="https://www.linkedin.com/company/dgapprd/?originalSubdomain=do" target="_blank" rel="noreferrer">
                <img className="footer-section-1-icon" src={Images.ind} alt="" />
              </a>
              <a href="https://www.youtube.com/channel/UCD4BpzpTLbXj4G7xHhOxP4g" target="_blank" rel="noreferrer">
                <img className="footer-section-1-icon-youtube" src={Images.youtube} alt="" />
              </a>
            </div>
            <p className='footer-section-1-mentions'>@DGAPPRD</p>
            {/* <img className='footer-section-1-img' src={Images.socialicon} alt="" /> */}
          </div>
          <a href="https://dgapp.gob.do/" target="_blank" rel="noreferrer">
          <div className="footer-section-1-cont">
              <img className='footer-section-1-img-logo' src={Images.logoicon} alt="" />
          </div>
          </a>
        </div> 
        <div className="footer-section-2">
          <p>WWW.DGAPP.GOB.DO</p>
        </div>
      </div>
    </>
  )
}

export default Footer