import React from 'react'
import Spinner from '../../assets/gif/spinner.svg'
import logo from '../../assets/LogoEnadexX.png'
import './Loading.css'

const Loading = () => {
  return (
    <>
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center  vh-100">
        <img className="logoSpinner" src={logo} alt="logo Enadex" />
        <img src={Spinner} alt="Carregando..." />
        </div>
      </div>
    </>
  )
}

export default Loading