import React, { useEffect, useState } from "react";
import Portal from "../../utils/Portal";
import { getFiles } from '../../api/post'

const EditImagesGallery = ({
    children,
    EditToggle,
    editActive,
    editId
    // formData,
    // setFormData,
    // modalToggleCancel,
    // modalToggleAceppt,
}) => {
    const [array, setArray] = useState([]);

    useEffect(() => {
        let unmounted = false;

        if (!unmounted) {
            getFiles(editId)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setArray(res);
                })
                .catch((err) => {
                    console.error(err.status);
                });
        }

        return () => {
            unmounted = true;
        };
    }, [editId]);

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
                        <p className="modal-title-newpost">EDITAR GALERIA</p>
                        <div className="caption-box">
                            {
                                array.length > 0 ?
                                    array?.map((item, index) => {
                                        return (
                                            <>
                                                <div key={index} className="caption-box-img">
                                                    <img src={item?.src} alt="" />
                                                    <textarea
                                                        name="caption"
                                                        // onChange={(val) => textareaChange(val, index)}
                                                        maxLength={75}
                                                        placeholder={"Escribe un pie de foto"}
                                                        value={item?.caption}
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
