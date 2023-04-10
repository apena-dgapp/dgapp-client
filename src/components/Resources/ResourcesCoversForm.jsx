import React from 'react'
import Images from '../../common/images'

const ResourcesCoversForm = ({ formTitle, files }) => {
    var title = ""
    if (formTitle === "papeleria institucional") {
        title = "Papelería institucional"
    } else if (formTitle === "plantillas") {
        title = "Plantillas"
    } else if (formTitle === "identidad grafica") {
        title = "Identidad gráfica"
    }

    return (
        <>
            <div className="news-container">
                <div className="news-title">
                    <p>{title?.toUpperCase()}</p>
                    <span className='news-title-line'></span>
                </div>
                <div className="resources-cover-container">
                    <div className="resources-cover-box-container">
                        {
                            files?.map((item, key) => {
                                return (
                                    item.type === "PNG" ?
                                        <>
                                            <div key={key} className={formTitle === "plantillas" ? 'resources-cover-box-templates' : 'resources-cover-box'}>
                                                <div className={formTitle === "plantillas" ? 'resources-cover-box-img-templates' : 'resources-cover-box-img'}>
                                                    <img key={key} src={item.cover} alt="cover" />
                                                </div>
                                                <div className={formTitle === "plantillas" ? 'resources-cover-box-menu-templates' : 'resources-cover-box-menu'}>
                                                    <div className="resources-cover-description-title">
                                                        <p>DESCARGAR</p>
                                                        <span className='resources-title-line'></span>
                                                    </div>
                                                    <div className="resources-cover-description-icons">

                                                        {
                                                            files && files?.find(o => o.type === 'DOCX' && o.name === item.name) ?
                                                                <a href={files?.find(o => o.type === 'DOCX' && o.name === item.name)?.file} download={`${files?.find(o => o.type === 'DOCX' && o.name === item.name)?.name}.docx`} className="resources-cover-description-icon">
                                                                    <>
                                                                        <img src={Images.word} alt="" />
                                                                        <p>Word</p>
                                                                    </>
                                                                </a> :
                                                                null
                                                        }

                                                        {
                                                            files && files?.find(o => o.type === 'PPTX' && o.name === item.name) ?
                                                                <a href={files?.find(o => o.type === 'PPTX' && o.name === item.name)?.file} download={`${files?.find(o => o.type === 'PPTX' && o.name === item.name)?.name}.pptx`} className="resources-cover-description-icon">
                                                                    <>
                                                                        <img src={Images.powerpoint} alt="" />
                                                                        <p>PowerPoint</p>
                                                                    </>
                                                                </a> :
                                                                null
                                                        }

                                                        {
                                                            files && files?.find(o => o.type === 'PDF' && o.name === item.name) ?
                                                                <a href={files?.find(o => o.type === 'PDF' && o.name === item.name)?.file} download={`${files?.find(o => o.type === 'PDF' && o.name === item.name)?.name}.pdf`} className="resources-cover-description-icon">
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
            </div>
        </>
    )
}

export default ResourcesCoversForm