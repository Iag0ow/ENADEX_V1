import { customFetch, customFetchNoAuth } from "./custom-fetch";

const API = "https://enadex-api-v2.vercel.app";

// export const login = async (loginForm) => {
//   const bodyForm = JSON.stringify(loginForm);

//   const config = {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: bodyForm,
//   };

//   const response = await fetch(`${API}/session/signin`, config);

//   const auth = await response.json();

//   return {...auth, status: response.status};
// };

export const studentRegister = async (registerForm) => {
  const bodyForm = JSON.stringify(registerForm);
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: bodyForm,
  };

  return customFetchNoAuth(`${API}/session/signup`, config);
}

export const sendEmailRecovery = async (email) => {
  const bodyForm = JSON.stringify(email);
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: bodyForm,
  };
  const response = await fetch(`${API}/forgot-password/request`, config);
  return response;
}

export const changePassword = async (formChange) => {
  const bodyForm = JSON.stringify(formChange);
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: bodyForm,
  };
  const response = await fetch(`${API}/forgot-password/validate`, config);
  return response;
}