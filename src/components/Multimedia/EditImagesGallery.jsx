import React, { useEffect } from "react";
import Portal from "../../utils/Portal";

const EditImagesGallery = ({
    children,
    EditToggle,
    editActive,
    setCaption,
    // formData,
    // setFormData,
    // modalToggleCancel,
    // modalToggleAceppt,
}) => {
    // const [array, setArray] = useState([]);

    // useEffect(() => {
    //     let unmounted = false;

    //     if (!unmounted && uploadFiles.imagenes.length > 0) {
    //         uploadFiles?.imagenes?.map((item, index) => {
    //             return (
    //                 setCaption(caption => [...caption, ''])
    //             )
    //         })
    //         // setArray(oldArray => [...oldArray,newValue] );
    //     }

    //     return () => {
    //         unmounted = true;
    //     };
    // }, [uploadFiles, setCaption]);

    // const textareaChange = (e, index) => {
    //     if (e.target.name === "caption") {
    //         let temp = caption;
    //         temp[index] = e.target.value;
    //         setCaption([...caption], temp);
    //     }
    // };

    // const cancel = () => {
    //     setCaption([]);
    //     if (uploadFiles.imagenes.length > 0) {
    //         uploadFiles?.imagenes?.map((item, index) => {
    //             return (
    //                 setCaption(caption => [...caption, ''])
    //             )
    //         })
    //         EditToggle();
    //     }
    // }

    return (
        <Portal>
            {editActive && (
                <div className="wrapper-caption">
                    <div className="window-caption">
                        <p className="modal-title-newpost">PIE DE FOTO</p>
                        <div className="caption-box">
                            {/* {
                                uploadFiles.imagenes.length > 0 ?
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
                            } */}
                        </div>
                        <div className="d-flex justify-content-evenly mt-4">
                            <button
                                className="btn-apply-newpost"
                                name="btn-Apply"
                                type="button"
                                onClick={EditToggle}
                            >
                                Aplicar
                            </button>

                            <button
                                className="btn-cancel-newpost"
                                name="btn-cancel"
                                type="button"
                            // onClick={cancel}
                            >
                                Cancelar
                            </button>

                        </div>
                    </div>
                    <div>{children}</div>
                    <div className="background-newpost" onClick={EditToggle}></div>
                </div>
            )}
        </Portal>
    );
};

export default EditImagesGallery;
