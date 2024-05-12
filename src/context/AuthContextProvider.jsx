import { createContext, useState,useContext, useEffect } from 'react';
import { getProfile } from '../config/config';
const API = "https://enadex-api-v2.vercel.app";

export const AuthContext = createContext({})

export const AuthContextProvider = ({children}) => {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [authRole, setAuthRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingReaload, setLoadingReload] = useState(false);

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
      localStorage.setItem("userName", auth.name);
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
    // return true;
  }

  async function verifySigned() {
    const token = localStorage.getItem("token");
    const authRole = localStorage.getItem("authRole");
    const userName = localStorage.getItem("userName");
    setLoadingReload(true);
    const response = await getProfile();
    if (token && response.status == 200) {
      setSigned(true);
      setAuthRole(authRole)
      setUser(userName)
    } else {
      setSigned(false);
    }
    setLoadingReload(false);
  }

  useEffect(() => {
    verifySigned();
  }, []);
  

  return (
    <AuthContext.Provider value={{signed:signed,user:user,email:email, token:token, login,logOut, loading, verifySigned, authRole, modalShow, setModalShow, loadingReaload}}>
    {children}
   </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}