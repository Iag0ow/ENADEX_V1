
import "./App.css";
import Header from "./components/Header/header";
import Login from "./pages/Login/LoginPage";
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
      <Header />
      <BrowserRouter>
       <Routes>
        <Route path="/login" element={<Login />} />
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
