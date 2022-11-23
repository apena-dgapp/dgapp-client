import React from "react";
import Portal from "../../../utils/Portal";
import toast from "react-hot-toast";

const NotificationModal = ({
    children,
    modalActive,
    modalToggle,
    modalInfo,
}) => {

    function deleteVideo() {
        const data = modalInfo.data
        if (data.id !== undefined) {
            modalInfo.disableElement("video/disable", data);
            const filtered = modalInfo.videoData.filter(
                (video) => video.localId !== data.localId
            );
            modalInfo.setVideoData(
                [...filtered].sort((a, b) => {
                    return a.localId - b.localId;
                })
            );
            modalToggle()
            return toast.success('El video ha sido eliminado correctamente')
        } else {
            const filtered = modalInfo.videoData.filter(
                (video) => video.localId !== data.localId
            );
            modalInfo.setVideoData(
                [...filtered].sort((a, b) => {
                    return a.localId - b.localId;
                })
            );
            modalToggle()
        }
    }

    function deleteSection() {
        const data = modalInfo.data
        if (data.id !== undefined) {
            modalInfo.disableElement("section/disable", data);
            const filteredSections = modalInfo.sectionData.filter(
                (section) => section.localId !== data.localId
            );

            let sections = [...filteredSections].sort((a, b) => {
                return a.localId - b.localId;
            });

            const filteredVideos = modalInfo.videoData.filter(
                (video) => video.sectionId !== data.localId
            );



            let videos = [...filteredVideos].sort((a, b) => {
                return a.localId - b.localId;
            });

            sections?.map((section, index) => {
                videos?.map((video) => {
                    if (section.localId === video.sectionId) {
                        video.sectionId = index;
                    }
                    return null;
                });
                section.localId = index;
                return null;
            });

            modalInfo.setSectionData(sections);
            modalInfo.setVideoData(videos);
            modalInfo.setSectionCount(modalInfo.sectionCount - 1);

            modalInfo.setSectionData(
                [...filteredSections].sort((a, b) => {
                    return a.localId - b.localId;
                })
            );
            modalInfo.setTabIndex(0);
            modalInfo.setRefresh(true);
            modalToggle()
            return toast.success('La seccion ha sido eliminada correctamente.')
        }
        else {
            return toast.error('Hubo un problema al momento de eliminar la sección.')
        }
    }

    function updateCourse() {
        if (
            !modalInfo.checkEmptyValue(modalInfo.videoData) &&
            !modalInfo.checkEmptyValue(modalInfo.sectionData)
        ) {
            modalInfo.postNewCourse();
            if (modalInfo?.type === "Publicar") {
                modalToggle()
            } else {
                modalToggle()
            }

        } else {
            return toast.error("Verifique los campos.")
        }
    }

    return (
        <Portal>
            {modalActive && (
                <div className="wrapper-notification">
                    <div className="window-notification">
                        <p className="modal-title-notification">{modalInfo?.title}</p>

                        <div className="modal-labelcont-notification">
                            <p>{modalInfo?.content}</p>
                        </div>

                        <div className="d-flex justify-content-evenly mt-4">
                            <button
                                className="btn-apply-notification"
                                name="btn-Apply"
                                type="button"
                                onClick={modalInfo.type === 'Video' ? deleteVideo : (
                                    modalInfo.type === 'Section' ? deleteSection : (
                                        updateCourse
                                    )
                                )}
                            >
                                Confirmar
                            </button>

                            <button
                                className="btn-cancel-notification"
                                name="btn-cancel"
                                type="button"
                                onClick={modalToggle}
                            >
                                Cancelar
                            </button>
                        </div>

                        <div>{children}</div>
                    </div>
                    <div className="background-notification"></div>
                </div>
            )}
        </Portal>
    );
};

export default NotificationModal;
