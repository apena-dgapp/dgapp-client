import React from 'react'
import { FormattedMessage } from 'react-intl';

const Button = ({ className, name, type, formatMsgId, formatMsgDefault, onClick }) => {

    return (

        <>
            <div>
                <button
                    className={className}
                    name={name}
                    type={type}
                    onClick={onClick}>
                    {<FormattedMessage id={formatMsgId} defaultMessage={formatMsgDefault} />}
                </button>
            </div>
        </>
    )
}

export default Button
