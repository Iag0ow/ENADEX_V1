import React from 'react'
import './NavBar.css'
import Logo  from '../../assets/Images/Header-Img/Logo.png'
import glass from '../../assets/Images/SVG/magnifyng_glass.svg'
import { NavLink } from 'react-router-dom'
const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <div className='d-flex align-items-center w-25'>
            <img className='logoNav' src={Logo} alt="" style={{width: 64, height: 64}} />
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1"><img src={glass} alt="" /></span>
              <input type="text" className="form-control" placeholder="Buscar" aria-label="Buscar" aria-describedby="basic-addon1" />
            </div>
          </div>
          <div className='links'>
            <li><a href="/">Home</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/rank">Rank</a></li>
            <li><a href="/login">Login</a></li>
          </div>
        </ul>
      </nav>
    </>
  )
}

export default NavBar