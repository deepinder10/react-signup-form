import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

const Form = (props) => {
  // we initiliaze our react hook form
  const { register, handleSubmit, watch, setError, errors } = useForm({
    shouldFocusError: true,
  });
  // we destruct the props here
  const { children, classes, onFormSubmit, watchFields, watchCallback, refValue } = props;
  // using an effect to handle watching fields and calling back
  // the callback to notify parent on field change
  useEffect(() => {
    if (watchFields.length) {
      watchCallback(watch(watchFields));
    }
  });
  // when submit button is clicked, we callback the props onsubmit function
  const handleFormSubmit = (data) => {
    onFormSubmit(data, setError);
  }
  return (
    <form ref={refValue} className={classes} onSubmit={handleSubmit(handleFormSubmit)}>
      {children(register,errors)}
    </form>
  );
};

Form.PropTypes = {
  classes: PropTypes.string,
  onFormSubmit: PropTypes.func,
  children: PropTypes.element.isRequired,
  watchFields: PropTypes.array,
  watchCallback: PropTypes.func,
  refValue: PropTypes.func
}
export default Form;
