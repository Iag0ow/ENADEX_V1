import { createContext, useState,useContext, useEffect } from 'react';
const API = "https://enadex-api-v2.vercel.app";

export const AuthContext = createContext({})

export const AuthContextProvider = ({children}) => {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [authRole, setAuthRole] = useState('');
  const [loading, setLoading] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  

  async function login(loginForm){
    setLoading(true);
    const bodyForm = JSON.stringify(loginForm);
  
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: bodyForm,
    };
  
    const response = await fetch(`${API}/session/signin`, config);
  
    const auth = await response.json();

    if (response.status === 201) {
    //   localStorage.setItem("token", auth.access_token);  ia colocar aqui mas kadmo já faz isso na tela de login então tenho que ver dps
      localStorage.setItem("authRole", auth.role);
      setUser(auth.name);
      setToken(auth.access_token);
      setEmail(auth.email);
      setAuthRole(auth.role)
      setSigned(true);
    }

    setLoading(false);

    return {...auth, status: response.status};
  }

  async function logOut(){
    localStorage.removeItem("token");
    setSigned(false);
    setToken('');
    setEmail('');
    setUser('');
    window.location.href = '/';
    // return true;
  }

  function verifySigned() {
    const token = localStorage.getItem("token");
    const authRole = localStorage.getItem("authRole");
    if (token) {
      setSigned(true);
      setAuthRole(authRole)
    }
  }

  useEffect(() => {
    verifySigned();
  }, []);
  

  return (
    <AuthContext.Provider value={{signed:signed,user:user,email:email, token:token, login,logOut, loading, verifySigned, authRole, modalShow, setModalShow}}>
    {children}
   </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}