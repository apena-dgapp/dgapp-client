import React from 'react'

const ResourcesCoversForm = ({ formTitle, files }) => {

    var title = ""
    if (formTitle === "papeleria institucional") {
        title = "Papelería institucional"
    } else if (formTitle === "plantillas") {
        title = "Plantillas"
    } else if (formTitle === "identidad grafica") {
        title = "Identidad gráfica"
    }

    console.log(files);

    return (
        <>
            <div className="news-container">
                <div className="news-title">
                    <p>{title?.toUpperCase()}</p>
                    <span className='news-title-line'></span>
                </div>
                <div className="pdf-cover-container">
                    <div className="resources-cover-description">
                        <p>Doc</p>
                        <p>PDF</p>
                        <p>PNG</p>
                    </div>
                    {
                        files?.map((item, key) => {
                            return (
                                item.type === "PNG" ?
                                    <div key={key} className="resources-cover-box">
                                        <img key={key} src={item.cover} alt="cover" />
                                    </div> : null
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ResourcesCoversForm