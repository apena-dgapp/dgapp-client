import React from 'react';

const Input = ({ name, type, maxLength, minLength, placeholder, onChange, value }) => {

    return (
        <>
            <input
                className="input"
                name={name}
                type={type}
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
