import React, { useState, useEffect } from 'react'
import PDFCoversForm from './PDFCoversForm'
import { apiFiles } from "../../../api/files"
import { useNavigate, useLocation } from "react-router-dom";

const PDF = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [pdf, setPdf] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            apiFiles(location?.pathname?.split("/")[3].includes("%20") ? location?.pathname?.split("/")[3].replace(/%20/g, " ") : location?.pathname?.split("/")[3])
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setPdf(res)
                    const array = [...new Set(res.map(obj => obj.subCategory))];

                    if (array.includes(null)) {
                        var index = array.map(function (item) {
                            return item;
                        }).indexOf(null);
                        array.splice(index, 1);
                        setSubCategory(array)
                    } else {
                        setSubCategory(array)
                    }

                    // console.log(unique);
                    // res.map((item) => {
                    //     return (
                    //         item.subCategory ? setSubCategory((category) => [...category, item.subCategory]) : null
                    //     )
                    // })
                })
                .catch((err) => {
                    console.error(err.status);
                });
        }

        return () => {
            unmounted = true;
        };
    }, [location?.pathname]);

    const goTpPdf = (pdfName, file, title, subCategory) => {
        // console.log(subCategory);
        navigate(`/nosotros/politicas&procesos/${location?.pathname?.split("/")[3]}/${pdfName}`, { state: { pdf: file, arrayPdf: pdf, title: title, subCategory: subCategory } });
    };

    return (
        <PDFCoversForm
            pdf={pdf}
            goTpPdf={goTpPdf}
            pdfTitle={location?.pathname?.split("/")[3].includes("%20") ? location?.pathname?.split("/")[3].replace(/%20/g, " ") : location?.pathname?.split("/")[3]}
            subCategory={subCategory}
        />
    )
}

export default PDF