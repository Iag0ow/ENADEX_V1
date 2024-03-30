import React from 'react'
import './NavBar.css'
import Logo  from '../../assets/Images/Header-Img/Logo.png'
import glass from '../../assets/Images/SVG/magnifyng_glass.svg'
import { Link,NavLink } from 'react-router-dom'
const NavBar = ({search}) => {
  return (
    <>
      <nav>
        <ul>
          <div className='d-flex align-items-center w-25'>
          <Link to={"/"}><img className='logoNav' src={Logo} alt="" style={{width: 64, height: 64}} /></Link>
            <div className="input-group">
            {search &&  
            <>
              <span className="d-none d-md-block input-group-text" id="basic-addon1"><img src={glass} alt="" /></span>
              <input type="text" className="d-none d-md-block form-control" placeholder="Buscar" aria-label="Buscar" aria-describedby="basic-addon1" />
            </> 
            }
            </div>
          </div>
          <div className='links'>
            <NavLink className="navLinks" exact to="/">Home</NavLink>
            <NavLink className="navLinks" to="/faq">FAQ</NavLink>
            <NavLink className="navLinks disabled" to="/rank">Rank</NavLink>
          </div>
        </ul>
      </nav>
    </>
  )
}

export default NavBar