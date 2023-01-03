import React, { useEffect, useState } from "react";
import Portal from "../../utils/Portal";
import { getVideoId } from "../../utils/getYoutubeId"
import { getPostMultimediaMain } from "../../api/post";

const DashboardPopup = ({
  children,
  modalActive,
  modalToggle,
  modalData
}) => {
  const [recentVideos, setRecentVideos] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    let unmounted = false;

    getPostMultimediaMain("Multimedia", 4)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setRecentVideos(res?.filter((item) => item.postId !== modalData.id));
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
    return () => {
      unmounted = true;
    };
  }, [setRecentVideos, modalData]);

  return (
    <Portal>
      {modalActive && (
        <div className="dashboard-popup-wrapper">
          <div className="dashboard-popup-window">
            <iframe
              src={currentVideo ? `https://www.youtube.com/embed/${getVideoId(currentVideo?.FilesPosts[0].file)}?autoplay=1` : `https://www.youtube.com/embed/${getVideoId(modalData?.url)}?autoplay=1`}
              title="video"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              className="dashboard-popup-iframe"
            />
            <p className="dashboard-popup-txt">{currentVideo ? currentVideo?.title : modalData?.title}</p>
            <div className="dashboard-popup-recent">
              <div className="dashboard-popup-recent-box-text">
                <p>Más Videos</p>
              </div>
              <div className="dashboard-popup-recent-box-cont">
                {
                  recentVideos?.map((item, index) => {
                    return (
                      <>
                        <div id={index} className="dashboard-popup-recent-box">
                          <span onClick={() => setCurrentVideo(item)} className='dashboard-popup-box-onclick'></span>
                          <iframe
                            src={`https://www.youtube.com/embed/${getVideoId(item?.FilesPosts[0].file)}`}
                            title="video"
                            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            frameBorder="0"
                            className="dashboard-popup-iframe-box"
                          />
                          <p>{item?.title}</p>
                        </div>
                      </>
                    )
                  })
                }
              </div>
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