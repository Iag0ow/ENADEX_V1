import React from 'react'
import './NavBar.css'
const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <div>
            <img src="https://picsum.photos/64/64" alt="" />
            <input type="text" name="" id="" placeholder='Busca'/>
          </div>
          <li><a className='' href="/">Home</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/register">Rank</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
    </>
  )
}

export default NavBar