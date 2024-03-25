import { useState } from 'react'

import './App.css'
import Header from "./App/Components/Header/header"
import LandingPage from './App/Components/Pages/LandingPage/LandingPage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>     
       <Header/> 
       <LandingPage/>        
    </>
  )
}

export default App;
