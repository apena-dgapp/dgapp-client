import React, { useState } from 'react'
import { useLocation } from "react-router-dom";

const PDFForm = () => {
    const location = useLocation();
    const [pdfSelected, setPdfSelected] = useState(location?.state?.pdf?.file);
    const [pdfCover, setPdfCover] = useState(location?.state?.pdf?.cover);
    const subCategory = location?.state?.subCategory;

    // console.log(pdfSelected);

    return (
        <>
            <div className="news-container">
                <div className="news-title">
                    <p>{location?.state?.title?.toUpperCase()}</p>
                    <span className='news-title-line'></span>
                </div>
                <div className="pdf-container">
                    <div className="pdf-grid-container">
                        <div className="pdf-menu-left">
                            <div className="pdf-menu-left-cover">
                                <img src={pdfCover} alt="" />
                            </div>
                            {
                                location?.state?.arrayPdf.map((item, key) => {
                                    return (
                                        !item.subCategory ?
                                            <div key={key}
                                                style={{ marginLeft: item?.file === pdfSelected ? "1rem" : null }} className="pdf-menu-left-text">
                                                <span
                                                    style={{ color: item?.file === pdfSelected ? "#75AAD3" : null, display: item?.file === pdfSelected ? "flex" : null }}></span>
                                                <p
                                                    onClick={() => {
                                                        setPdfSelected(item.file);
                                                        setPdfCover(item.cover)
                                                    }}
                                                    style={{ color: item?.file === pdfSelected ? "#75AAD3" : null, fontWeight: item?.file === pdfSelected ? "bold" : null }}
                                                >{item?.name}</p>
                                            </div> : null
                                    )
                                })
                            }

                            {
                                subCategory?.map((sub, key) => {
                                    return (
                                        <div key={key} className="">
                                            <div className="pdf-menu-left-sub-text">
                                                <p>{subCategory[key]?.toUpperCase()}</p>
                                                <span className='pdf-menu-left-sub-line'></span>
                                            </div>
                                            {
                                                location?.state?.arrayPdf.map((item, key) => {
                                                    return (
                                                        item.subCategory && sub === item.subCategory ? <div key={key}
                                                            style={{ marginLeft: item?.file === pdfSelected ? "1rem" : null }} className="pdf-menu-left-text">
                                                            <span
                                                                style={{ color: item?.file === pdfSelected ? "#75AAD3" : null, display: item?.file === pdfSelected ? "flex" : null }}></span>
                                                            <p
                                                                onClick={() => {
                                                                    setPdfSelected(item.file);
                                                                    setPdfCover(item.cover)
                                                                }}
                                                                style={{ color: item?.file === pdfSelected ? "#75AAD3" : null, fontWeight: item?.file === pdfSelected ? "bold" : null }}
                                                            >{item?.name}</p>
                                                        </div> : null
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div className="pdf-box">
                            <iframe
                                src={`${pdfSelected}#zoom=FitH`}
                                title='pdf'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PDFForm