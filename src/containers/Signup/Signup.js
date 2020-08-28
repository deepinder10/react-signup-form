import React, { useRef } from "react";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import useSignupService from "./Signup.service";
import "./Signup.scss";

// fields in our form in form of Array of objects
const formFields = [
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    validation: { required: 'This field is required' }
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    validation: { required: 'This field is required' }
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    validation: { 
      pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: 'Please enter a valid email'
      },
      required: 'This field is required' }
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    validation: { required: 'This field is required' }
  }
];
// name of the fields which he have to watch
const watchFields = ["email"];
const Signup = () => {
  const formRef = useRef();
  const signupService = useSignupService()
  // watch callback handles all watcher fields on change of input
  // this can be used to handle on change events.
  const watchCallback = (fields) => {
    // console.log(fields);
  }
  // on form submit is called when form is valid and submitted
  const onFormSubmit = async (formFields, setError) => {
    const emailValid = await checkEmail(formFields.email, setError);
    if (emailValid) {
      // if no error in checking emai, we submit the form
      const message = await signupService.submitForm(formFields);
      // alert the message from response
      alert(message);
    }
  };

  const checkEmail = async (email, setError) => {
    const {emailCheckResponse, emailCheckError} = await signupService.validateEmail(email);
    // check if there has been an error in checking email api and set that error under input
    if (emailCheckError) {
      // set error on email field
      setError("email", {
        type: "manual",
        message: emailCheckError
      });
      // to focus the email input via form ref
      formRef.current.elements["email"].focus()
      return false;
    }
    return true;
  }
  return (
    <Form refValue={formRef} classes="d-flex flex-column" watchFields={watchFields} watchCallback={watchCallback} onFormSubmit={onFormSubmit}>
      {(register, errors) => (
        <React.Fragment>
          {formFields.map((params, index) => (
            <Input key={index} {...params}
             error={errors[params.name]}
             refValue={register(params.validation)} />
          ))}
          <button className="submit-btn" type="submit">Submit</button>
        </React.Fragment>
      )}
    </Form>
  );
};

export default Signup;
