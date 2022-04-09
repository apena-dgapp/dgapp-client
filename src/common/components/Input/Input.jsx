import React from 'react';

const Input = ({ name, type,classInput, maxLength, minLength, placeholder, onChange, value }) => {

    return (
        <>
            <input
                name={name}
                type={type}
                className={classInput}
                maxLength={maxLength}
                minLength={minLength}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </>
    )
}

export default Input;
