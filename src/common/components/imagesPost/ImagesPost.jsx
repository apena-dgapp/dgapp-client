import React, { useEffect, useState } from 'react';
import { srcFiles, getImage } from '../../../api/post';
import { getVideoId } from "../../../utils/getYoutubeId"

const ImagesPost = ({ id, desing, func, isFrame, table }) => {

    const [img, setImg] = useState({
        type: "",
        src: ""
    });

    useEffect(() => {
        let unmounted = false;

        if (table === "post") {
            getImage(id)
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    if (!unmounted) {
                        setImg({
                            type: "",
                            src: data.image,
                        });
                    }
                })
                .catch((err) => {
                    console.error(err.status);
                });
            return () => {
                unmounted = true;
            };
        } else {
            srcFiles(id)
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    if (!unmounted) {
                        setImg({
                            type: data[0].type,
                            src: data[0].src
                        });
                    }
                })
                .catch((err) => {
                    console.error(err.status);
                });
            return () => {
                unmounted = true;
            };
        }

    }, [id, table]);

    return (
        <>
            {
                isFrame === true && img.src ?
                    <iframe
                        onClick={func}
                        className={desing}
                        src={`https://www.youtube.com/embed/${getVideoId(img.src)}?autoplay=1`}
                        title="video"
                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    /> :
                    (
                        img.type === "URL" ?
                            <img onClick={func} className={desing} src={`http://img.youtube.com/vi/${getVideoId(img.src)}/mqdefault.jpg`} alt="img" /> :
                            <img onClick={func} className={desing} src={img.src} alt="img" />
                    )

            }
        </>


    )
}

export default ImagesPost