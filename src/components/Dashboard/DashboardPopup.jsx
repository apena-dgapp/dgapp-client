import React, { useEffect, useState } from "react";
import Portal from "../../utils/Portal";
import { getVideoId } from "../../utils/getYoutubeId"
import { getPostMultimediaMain } from "../../api/post";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";

const DashboardPopup = ({
  children,
  modalActive,
  modalToggle,
  modalData
}) => {
  const [recentVideos, setRecentVideos] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let unmounted = false;

    getPostMultimediaMain("Multimedia", 5)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {

          setRecentVideos(res);
          // setRecentVideos(res?.filter((item) => item.postId !== modalData.id));
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
    return () => {
      unmounted = true;
    };
  }, [setRecentVideos, modalData]);

  const handlerBtnRight = () => {
    if (count < 4) {
      setCount(count + 1);
      // setCurrentVideo(recentVideos[count]);
    }
  }

  const handlerBtnLeft = () => {

    if (count !== 0) {
      setCount(count - 1);
      // setCurrentVideo(count ? recentVideos[count] : null);
    }
  }

  return (
    <Portal>
      {modalActive && (
        <div className="dashboard-popup-wrapper">
          <div className="dashboard-popup-window">
            <div onClick={handlerBtnLeft}>
              <i className="tfi tfi-arrow-circle-left" />
              <TfiArrowCircleLeft
                size={"2.5rem"}
                cursor={count > 0 ? 'pointer' : null}
                style={{ marginRight: "1rem" }}
                color={count > 0 ? "#75AAD3" : "gray"}
              />
            </div>
            <div>
              <iframe
                // src={count > 0 ? `https://www.youtube.com/embed/${getVideoId(recentVideos[count - 1]?.FilesPosts[0].file)}?autoplay=1` : `https://www.youtube.com/embed/${getVideoId(modalData?.url)}?autoplay=1`}
                src={`https://www.youtube.com/embed/${getVideoId(recentVideos[count]?.FilesPosts[0].file)}?autoplay=1`}
                title="video"
                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                className="dashboard-popup-iframe"
              />
              <p className="dashboard-popup-txt">{currentVideo ? currentVideo?.title : modalData?.title}</p>
            </div>
            <div onClick={handlerBtnRight}>
              <i className="tfi tfi-arrow-circle-right" />
              <TfiArrowCircleRight
                color={count < 4 ? "#75AAD3" : "gray"}
                cursor={count < 4 ? 'pointer' : null}
                size={"2.5rem"}
                style={{ marginLeft: "1rem" }}
              />
            </div>
            <div>{children}</div>
          </div>
          <div onClick={() => {
            modalToggle()
            setCurrentVideo("")
          }} className="dashboard-popup-background"></div>
        </div>
      )}
    </Portal>
  );
};

export default DashboardPopup;