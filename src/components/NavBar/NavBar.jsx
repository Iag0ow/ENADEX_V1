import React from 'react'
import './NavBar.css'
import Logo  from '../../assets/Images/Header-Img/Logo.png'
const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <div>
            <img className='logoNav' src={Logo} alt="" style={{width: 64, height: 64}} />
            <input type="text" name="" id="" placeholder='Busca'/>
          </div>
          <div className='links'>
            <li><a className='' href="/">Home</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/register">Rank</a></li>
            <li><a href="/login">Login</a></li>
          </div>
        </ul>
      </nav>
    </>
  )
}

export default NavBar