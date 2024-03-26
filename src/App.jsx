
import "./App.css";
import Login from "./pages/Login/LoginPage";
import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Faq from './pages/faq/Faq'
import Home from "./pages/Home/Home";
import { Register } from "./pages/Register";

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
        <Route path="/register" element={<Register/>} />
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
