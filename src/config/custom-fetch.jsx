export const customFetch = async (url, options) => {
  const token = localStorage.getItem("token");
  if (!token) return redirectToLogin();

  try {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) return redirectToLogin();

    return response;
  } catch (error) {
    return null;
  }
};

export const customFetchNoAuth = async (url, options) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
  
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();
      return { ...data, status: response.status };
      
    } catch (error) {
      return null;
    }
  };

  export const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
    // return true;
  };
