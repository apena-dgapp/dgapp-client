import React from 'react'
import Images from "../../common/images"

const NewsForm = () => {
    return (
        <>
            <div className="news-container">
                <div className="news-title">
                    <p>NOTICAS</p>
                    <span className='news-title-line'></span>
                </div>
                <div className="news-grid-container">
                    <div className="news-grid-panel1">
                        <div className="news-box">
                            <div className="news-box-img">
                                <img src={Images.director} alt="" />
                            </div>
                            <div className="news-box-text">
                                <p className='news-box-text-title'>MAP y DGAPP firman acuerdo para aplicar Evaluación del Desempeño Institucional en Alianzas Público Privadas</p>
                                <p className='news-box-text-date'>23 de enero</p>
                                <p className='news-box-text-cont'>Santo Domingo, República Dominicana. Con la finalidad de dar cumplimiento a las buenas prácticas de gestión pública, el ministro de Administración Pública, Darío Castillo Lugo, y el director ejecutivo de la Dirección General de Alianzas PúblicoPrivadas (DGAPP), Sigmund Freund, firmaron un acuerdo interinstitucional con miras a la aplicación de la Evaluación del Desempeño Institucional (EDI) en la DGAPP.</p>
                            </div>
                        </div>
                        <div className="news-box">
                            <div className="news-box-img">
                                <img src={Images.director} alt="" />
                            </div>
                            <div className="news-box-text">
                                <p className='news-box-text-title'>MAP y DGAPP firman acuerdo para aplicar Evaluación del Desempeño Institucional en Alianzas Público Privadas</p>
                                <p className='news-box-text-date'>23 de enero</p>
                                <p className='news-box-text-cont'>Santo Domingo, República Dominicana. Con la finalidad de dar cumplimiento a las buenas prácticas de gestión pública, el ministro de Administración Pública, Darío Castillo Lugo, y el director ejecutivo de la Dirección General de Alianzas PúblicoPrivadas (DGAPP), Sigmund Freund, firmaron un acuerdo interinstitucional con miras a la aplicación de la Evaluación del Desempeño Institucional (EDI) en la DGAPP.</p>
                            </div>
                        </div>
                        <div className="news-box">
                            <div className="news-box-img">
                                <img src={Images.director} alt="" />
                            </div>
                            <div className="news-box-text">
                                <p className='news-box-text-title'>MAP y DGAPP firman acuerdo para aplicar Evaluación del Desempeño Institucional en Alianzas Público Privadas</p>
                                <p className='news-box-text-date'>23 de enero</p>
                                <p className='news-box-text-cont'>Santo Domingo, República Dominicana. Con la finalidad de dar cumplimiento a las buenas prácticas de gestión pública, el ministro de Administración Pública, Darío Castillo Lugo, y el director ejecutivo de la Dirección General de Alianzas PúblicoPrivadas (DGAPP), Sigmund Freund, firmaron un acuerdo interinstitucional con miras a la aplicación de la Evaluación del Desempeño Institucional (EDI) en la DGAPP.</p>
                            </div>
                        </div>
                    </div>
                    <span></span>
                    <div className="news-grid-panel2">klk</div>
                </div>
            </div>
        </>
    )
}

export default NewsForm