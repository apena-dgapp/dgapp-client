import React from 'react'
import Images from '../../common/images'

const StrategicMap = () => {
    return (
        <>
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
                {/* <div className="strategicmap-title-cont">
                    <p className='strategicmap-title'>MISIÓN</p>
                    <p className='strategicmap-txt'>Garantizar procesos competitivos, eficientes, transparentes y confiables; a través de la promoción,
                        estructuración y regulación de alianzas público-privadas, para contribuir aldesarrollo social y económico de la República Dominicana.
                    </p>
                </div> */}
            </div>
        </>
    )
}

export default StrategicMap