import useFetch from "../../hooks/useFetch";
// static id needed for Raisely API that i am using
const campaignUuid= "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a";
const useSignupService = () => {
  const fetchRef = useFetch();
  return {
    // method to validate the email, sends a fetch request and returns the repsonse
    validateEmail: async (email) => {
      const reqObj = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          campaignUuid,
          data: {
            email
          }
        })
      };
      const { response, error } = await fetchRef(
        "https://api.raisely.com/v3/check-user", reqObj
      );
      // if email already exists, send the error message
      if (response.data.status === 'EXISTS') {
        return {emailCheckError: "Email already exists"};
      } else {
        return {emailCheckResponse: "Ok"};
      }
    },
    // called when email validation passes and we have to submit the information
    submitForm: async (formFields) => {
      const reqObj = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          campaignUuid,
          data: {...formFields}
        })
      };
      const { response, error } = await fetchRef(
        "https://api.raisely.com/v3/signup", reqObj
      );
      // send back messages based on API response and alert them back
      if (response) {
        return `Successful : ${response.message}`;
      } else {
        return `Error: ${error.errors[0].code}`;
      }
    }
  }
}

export default useSignupService;