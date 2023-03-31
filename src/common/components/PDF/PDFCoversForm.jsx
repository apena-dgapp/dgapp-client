import React from 'react'

const PDFCoversForm = ({ pdf, goTpPdf, pdfTitle, subCategory }) => {

    var title = ""
    if (pdfTitle === "politicas") {
        title = "Políticas"
    } else if (pdfTitle === "planificacion y desarrollo") {
        title = "Planificación y Desarrollo"
    } else if (pdfTitle === "administracion financiera") {
        title = "Administración Financiera"
    } else if (pdfTitle === "subdireccion de supervision y gestion") {
        title = "Subdirección de Supervisión y Gestión"
    } else if (pdfTitle === "subdireccion de promocion") {
        title = "Subdirección de Promoción"
    } else if (pdfTitle === "subdireccion tecnica") {
        title = "Subdirección Técnica"
    } else {
        title = pdfTitle
    }
    // console.log(subCategory);
    return (
        <>
            <div className="news-container">
                <div className="news-title">
                    <p>{title?.toUpperCase()}</p>
                    <span className='news-title-line'></span>
                </div>
                <div className="pdf-cover-container">
                    <div className="pdf-cover-center">
                        {
                            pdf?.map((item, key) => {
                                return (
                                    !item.subCategory ?
                                        <div key={key} onClick={() => goTpPdf(item.name, item, pdfTitle)} className="pdf-cover-box">
                                            <img key={key} src={item.cover} alt="cover" />
                                        </div> : null
                                )
                            })
                        }
                    </div>
                </div>
                {
                    subCategory?.map((sub, index) => {
                        return (
                            <div key={index} className="pdf-subtitle">
                                <div className="pdf-subtitle-text">
                                    <p>{subCategory[index]?.toUpperCase()}</p>
                                    <span className='pdf-subtitle-line'></span>
                                </div>
                                <div className="pdf-cover-container-sub">
                                    <div className="pdf-cover-center">
                                        {
                                            pdf?.map((item, key) => {
                                                return (
                                                    item.subCategory && sub === item.subCategory ? <div key={key} onClick={() => goTpPdf(item.name, item, pdfTitle, subCategory)} className="pdf-cover-box">
                                                        <img key={key} src={item.cover} alt="cover" />
                                                    </div> : null
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default PDFCoversForm