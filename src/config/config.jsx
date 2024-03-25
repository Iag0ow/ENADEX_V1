const API = process.env.BASE_URL;

export const login = async (loginForm) => {
    const bodyForm = JSON.stringify(loginForm);
  
    const config = {
      method: "POST",
      body: bodyForm,
    };
  
    const auth = await customFetchNoAuth(`${API}/session/login`, config);
  
    if (auth?.error) {
      return {
        auth: false,
        message: auth.error.message,
      };
    } else {
      localStorage.setItem("user_id", auth?.id);
      localStorage.setItem("token", auth?.access_token);
  
      return true;
    }
  };