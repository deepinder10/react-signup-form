import useFetch from "../../hooks/useFetch";

const campaignUuid= "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a";
const useSignupService = () => {
  const fetchRef = useFetch();
  return {
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
      if (response.data.status === 'EXISTS') {
        return {emailCheckError: "Email already exists"};
      } else {
        return {emailCheckResponse: "Ok"};
      }
    },
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
      if (response) {
        console.log(response.message);
        return response.message;
      } else {
        console.log(error);
        return error.errors[0].code;
      }
    }
  }
}

export default useSignupService;