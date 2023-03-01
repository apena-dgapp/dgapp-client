import React, { useEffect } from "react";
import Portal from "../../utils/Portal";

const Caption = ({
    children,
    captionToggle,
    captionActive,
    uploadFiles,
    caption,
    setCaption,
}) => {

    useEffect(() => {
        let unmounted = false;

        if (!unmounted && captionActive && uploadFiles?.imagenes) {
            uploadFiles?.imagenes?.map((item, index) => {
                return (
                    uploadFiles?.imagenes?.length > 1 ? setCaption(caption => [...caption, '']) : setCaption([''])
                )
            })
        }

        return () => {
            unmounted = true;
        };
    }, [uploadFiles, captionActive, setCaption]);

    const textareaChange = (e, index) => {
        if (e.target.name === "caption") {
            let temp = caption;
            temp[index] = e.target.value;
            setCaption([...caption], temp);
        }
    };

    const cancel = () => {
        setCaption([]);
        if (uploadFiles.imagenes.length > 0) {
            uploadFiles?.imagenes?.map((item, index) => {
                return (
                    setCaption(caption => [...caption, ''])
                )
            })
            captionToggle();
        }
    }

    return (
        <Portal>
            {captionActive && (
                <div className="wrapper-caption">
                    <div className="window-caption">
                        <p className="modal-title-newpost">PIE DE FOTO</p>
                        <div className="caption-box">
                            {console.log(uploadFiles?.imagenes?.length)}
                            {
                                uploadFiles?.imagenes?.length > 0 ?
                                    uploadFiles?.imagenes?.map((item, index) => {
                                        return (
                                            <>
                                                <div key={index} className="caption-box-img">
                                                    <img src={item} alt="" />
                                                    <textarea
                                                        name="caption"
                                                        onChange={(val) => textareaChange(val, index)}
                                                        maxLength={75}
                                                        placeholder="Escribe un pie de foto"
                                                    // value={array[index]}
                                                    />
                                                </div>
                                            </>
                                        )
                                    }) : null
                            }
                        </div>
                        <div className="d-flex justify-content-evenly mt-4">
                            <button
                                className="btn-apply-newpost"
                                name="btn-Apply"
                                type="button"
                                onClick={captionToggle}
                            >
                                Aplicar
                            </button>

                            <button
                                className="btn-cancel-newpost"
                                name="btn-cancel"
                                type="button"
                                onClick={cancel}
                            >
                                Cancelar
                            </button>

                        </div>
                    </div>
                    <div>{children}</div>
                    <div className="background-newpost" onClick={captionToggle}></div>
                </div>
            )}
        </Portal>
    );
};

export default Caption;
