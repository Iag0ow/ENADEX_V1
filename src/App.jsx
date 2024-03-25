import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
      <NavBar/>
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Faq/>} />
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
