const API = "https://enadex-api-v2.vercel.app";

export const login = async (loginForm) => {
  const bodyForm = JSON.stringify(loginForm);

  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: bodyForm,
  };

  const response = await fetch(`${API}/session`, config);

  const auth = await response.json();

  return {...auth, status: response.status};
};
