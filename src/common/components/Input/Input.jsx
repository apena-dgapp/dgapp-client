import React from "react";

const Input = ({
  id,
  name,
  type,
  classInput,
  maxLength,
  minLength,
  placeholder,
  onChange,
  value,
  pattern,
  disabled,
}) => {
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        className={classInput}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </>
  );
};

export default Input;
