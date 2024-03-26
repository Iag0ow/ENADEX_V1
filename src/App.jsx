
import "./App.css";
import Header from "./components/Header/header";
import Login from "./pages/Login/LoginPage";
import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Faq from './pages/faq/Faq'
import NavBar from './components/NavBar'

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
        <Route path="/login" element={<div>Home</div>} />
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
