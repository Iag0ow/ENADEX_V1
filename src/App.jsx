
import "./App.css";
import Login from "./pages/Login/LoginPage";
import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Faq from './pages/faq/Faq'
import Home from "./pages/Home/Home";
import RecuperacaoSenha from "./pages/Recuperacao/RecuperacaoSenha";

function App() {
  const user = localStorage.getItem("token");
  const [auth, setAuth] = useState(false);
  const handleUpdateAuth = () => {
    setAuth(true);
  };
  useEffect(() => {
    if (user) {
      setAuth();
    }
  }, []);

  return (
    <>
      <BrowserRouter>
       <Routes>
       <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/faq" element={<Faq/>} />
        <Route path="/esqueci-minha-senha" element={<RecuperacaoSenha/>} />
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
