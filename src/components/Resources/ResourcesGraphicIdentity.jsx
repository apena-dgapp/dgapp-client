import React from 'react'
import Images from '../../common/images'

const ResourcesGraphicIdentity = ({ files }) => {
    return (
        <>
            <div className="news-container">
                <div className="news-title">
                    <p>IDENTIDAD GRÁFICA</p>
                    <span className='news-title-line'></span>
                </div>
                <div className="resources-cover-container">
                    <div className="identity-subtitle">
                        <p>Logos</p>
                        <div className='identity-subtitle-line'></div>
                    </div>
                    <div className="resources-cover-box-container">
                        {
                            files?.map((item, key) => {
                                return (
                                    item.type === "PNG" ?
                                        <>
                                            <div key={key} className="identity-cover-box">
                                                <div className="identity-cover-box-img">
                                                    <img key={key} src={item.cover} alt="cover" />
                                                </div>
                                                <div className="identity-cover-box-menu">
                                                    <div className="identity-cover-description-title">
                                                        <p>DESCARGAR</p>
                                                        <span></span>
                                                    </div>
                                                    <div className="identity-cover-description-icons">

                                                        {
                                                            files && files?.find(o => o.type === 'JPG' && o.name === item.name) ?
                                                                <a href={files?.find(o => o.type === 'JPG' && o.name === item.name)?.file} download={`${files?.find(o => o.type === 'JPG' && o.name === item.name)?.name}.jpg`} className="identity-cover-description-icon">
                                                                    <>
                                                                        <img src={Images.jpg} alt="" />
                                                                        <p>JPG</p>
                                                                    </>
                                                                </a> :
                                                                null
                                                        }

                                                        {
                                                            files && files?.find(o => o.type === 'PNG' && o.name === item.name) ?
                                                                <a href={files?.find(o => o.type === 'PNG' && o.name === item.name)?.file} download={`${files?.find(o => o.type === 'PNG' && o.name === item.name)?.name}`} className="identity-cover-description-icon">
                                                                    <>
                                                                        <img src={Images.png} alt="" />
                                                                        <p>PNG</p>
                                                                    </>
                                                                </a> :
                                                                null
                                                        }

                                                        {
                                                            files && files?.find(o => o.type === 'PDF' && o.name === item.name) ?
                                                                <a href={files?.find(o => o.type === 'PDF' && o.name === item.name)?.file} download={files?.find(o => o.type === 'PDF' && o.name === item.name)?.name} className="identity-cover-description-icon">
                                                                    <>
                                                                        <img src={Images.pdf2} alt="" />
                                                                        <p>PDF</p>
                                                                    </>

                                                                </a> :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </> : null
                                )
                            })
                        }
                    </div>
                </div>
                <div className="resources-cover-container">
                    <div className="identity-subtitle">
                        <p>Colores</p>
                        <div className='identity-subtitle-line'></div>
                    </div>
                    <div className="identity-color-container">
                        <div className="identity-color-box-container">
                            <div onClick={() => navigator.clipboard.writeText("#b8ccde")} style={{ backgroundColor: "#b8ccde" }} className="identity-color-box"><span>Click para copiar</span></div>
                            <p onClick={() => navigator.clipboard.writeText("#b8ccde")} >#b8ccde</p>
                        </div>
                        <div className="identity-color-box-container">
                            <div onClick={() => navigator.clipboard.writeText("#003057")} style={{ backgroundColor: "#003057" }} className="identity-color-box"><span>Click para copiar</span></div>
                            <p onClick={() => navigator.clipboard.writeText("#003057")} >#003057</p>
                        </div>
                        <div className="identity-color-box-container">
                            <div onClick={() => navigator.clipboard.writeText("#6699c2")} style={{ backgroundColor: "#6699c2" }} className="identity-color-box"><span>Click para copiar</span></div>
                            <p onClick={() => navigator.clipboard.writeText("#6699c2")} >#6699c2</p>
                        </div>
                        {/* <div className="identity-color-box-container">
                            <div style={{ backgroundColor: "#b8ccde" }} className="identity-color-box"></div>
                            <p>#b8ccde</p>
                        </div> */}
                        <div className="identity-color-box-container">
                            <div onClick={() => navigator.clipboard.writeText("#eb5b27")} style={{ backgroundColor: "#eb5b27" }} className="identity-color-box"><span>Click para copiar</span></div>
                            <p onClick={() => navigator.clipboard.writeText("#eb5b27")}> #eb5b27</p>
                        </div>
                    </div>
                </div>
                <div className="resources-cover-container">
                    <div className="identity-subtitle">
                        <p>Fuentes</p>
                        <div className='identity-subtitle-line'></div>
                    </div>
                    <div className="identity-color-container">
                        <div className="identity-font-box-container">
                            <img src={Images.font} alt="" />
                            <a href={files?.find(o => o.type === 'RAR')?.file} download={`${files?.find(o => o.type === 'RAR')?.name}.rar`} style={{ backgroundColor: "#e9e6e6" }} className="identity-color-box"><span style={{ color: "#113250", fontWeight: "bold" }}>Click para descargar</span></a>
                            <p>Seans Beam</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResourcesGraphicIdentity