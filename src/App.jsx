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
      <BrowserRouter>
       <Routes>
        <Route path="/login" element={<div>Home</div>} />
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
