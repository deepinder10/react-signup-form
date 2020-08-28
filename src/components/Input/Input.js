import React from "react";
import "./Input.scss";

const Input = (props) => {
  const { label, name, type, refValue, error } = props;
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={label}
        name={name}
        ref={refValue}
        className="input-control"
      />
      <span className="error-text">{error && error.message}</span>
    </React.Fragment>
  );
};

export default Input;
