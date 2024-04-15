
import "./App.css";
import Login from "./pages/Login/LoginPage";
import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Faq from './pages/faq/Faq'
import Home from "./pages/Home/Home";
import RecuperacaoSenha from "./pages/Recuperacao/RecuperacaoSenha";
import { Register } from "./pages/Register";
import Itens from "./pages/Itens";
import Courses from "./pages/Courses";
import LadingPage from "./pages/LandingPage/LadingPage";

function App() {
  const user = localStorage.getItem("token");
  const [auth, setAuth] = useState(false);
  const handleUpdateAuth = (value) => {
    setAuth(value);
  };
  useEffect(() => {
    if (user) {
      setAuth(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path="/login" element={!auth?(<Login onUpdateAuth={handleUpdateAuth}/>) : (<Navigate to="/"/>)} />
        <Route path="/" element={auth?(<Home/>) : (<Navigate to="/login"/>)} />
        <Route path="/register" element={!auth?(<Register/>) : (<Navigate to="/"/>)} />
        <Route path="/esqueci-minha-senha" element={!auth?(<RecuperacaoSenha/>) : (<Navigate to="/"/>)} />
        <Route path="/faq" element={<Faq/>}/>
        <Route path="/itens-obrigatorios" element={<Itens />} />
        <Route path="/cursos" element={<Courses />} />
        <Route path="/index" element={<LadingPage/>} />
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
