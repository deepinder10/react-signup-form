import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Form = (props) => {
  // we initiliaze our react hook form
  const { register, handleSubmit, watch, setError, errors } = useForm({
    shouldFocusError: true,
  });
  // we destruct the props here
  const { children, classes, onFormSubmit, watchFields, watchCallback } = props;
  // using an effect to handle watching fields and calling back
  // the callback to notify parent on field change
  useEffect(() => {
    if (watchFields.length) {
      watchCallback(watch(watchFields));
    }
  });

  const handleFormSubmit = (data) => {
    onFormSubmit(data, setError);
  }
  return (
    <form className={classes} onSubmit={handleSubmit(handleFormSubmit)}>
      {children(register,errors)}
    </form>
  );
};

export default Form;
