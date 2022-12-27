import React, { useEffect, useState } from 'react'
import Images from '../../common/images'
import ClipLoader from "react-spinners/ClipLoader";

const StrategicMap = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            setLoading(true);
        }
        setTimeout(() => {
            if (!unmounted) {
                setLoading(false);
            }
        }, 2000);
        return () => {
            unmounted = true;
        };
    }, []);
    return (
        <>
            {loading ? (
                <div className="spinner-container">
                    <ClipLoader color="#113250" loading={loading} size={150} />
                </div>
            ) : (
                <div className="strategicmap-container">
                    <div className="strategicmap-img">
                        <img src={Images.mision} alt="mision" />
                    </div>
                    <div className="strategicmap-img">
                        <img src={Images.vision} alt="vison" />
                    </div>
                    <div className="strategicmap-img">
                        <img src={Images.valores} alt="mision" />
                    </div>
                </div>
            )}
        </>
    )
}

export default StrategicMap