import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';
import Logo from './images/LogoEnadex.svg';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../context/AuthContextProvider";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
  const { logOut, authRole } = useAuth();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      if (menuOpen && ref.current && !ref.current.contains(event.target) && !event.target.closest('.navbar-toggler')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className={`navbar ${isMobile ? 'mobile' : ''}`} ref={ref}>
      <Navbar.Brand>
        <Link to="/"><img className="logoNav" src={Logo} alt="" /></Link>
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleMenu} />
             <Navbar.Collapse id="responsive-navbar-nav" className={`justify-content-end ${menuOpen ? 'show-menu' : 'hide-menu'}`}>
              <Nav id='' className={`mr-auto ${isMobile && !menuOpen ? 'd-none' : ''}`}>
              <NavLink  className={`navLinks`} to="/" onClick={closeMenu}>Home</NavLink>
              <NavLink className={`navLinks`} to="/simulados" onClick={closeMenu}>Simulado</NavLink>
              <NavLink className={`navLinks`} to="/banco-de-questoes" onClick={closeMenu}>Questões</NavLink>
              {( authRole === "ADMINISTRATOR" || authRole === "COORDINATORS") &&
                <NavLink className="navLinks" to={"/register-admin-teacher"} >Cadastro </NavLink>
                }
               {!isMobile && (
              <NavDropdown title="Recursos" id="collasible-nav-dropdown" className="dropdown-text-white">
                <NavDropdown.Item className='disabled' href="/simulados" onClick={closeMenu}>Apostila</NavDropdown.Item>
               <NavDropdown.Item as={Link} to="/faq-interno" onClick={closeMenu}>Faq (Interno)</NavDropdown.Item>
               {( authRole === "COORDINATORS" || authRole === "TEACHERS" || authRole === "ADMINISTRATOR") && 
                    <NavDropdown.Item href="/register-student" onClick={closeMenu}>Aluno</NavDropdown.Item> 
                }
               <NavDropdown.Item className='disabled' href="/material" onClick={closeMenu}>Material</NavDropdown.Item>
               <NavDropdown.Item as={Link} to="/cadastrar-perguntas" onClick={closeMenu}>Simulado/Perguntas</NavDropdown.Item>
              </NavDropdown>
                   )}
             {isMobile && (
              <div className="grid-container">
                <Nav title="Recursos" id="collasible-nav-dropdown" className="dropdown-text-white" style={{paddingLeft: '50px'}}>
                  <NavDropdown.Item href="/simulados" onClick={closeMenu}>Simulado</NavDropdown.Item>
                  <NavDropdown.Item href="/register-student" onClick={closeMenu}>Faq (Interno)</NavDropdown.Item>
                  {( authRole === "COORDINATORS" || authRole === "TEACHER" || authRole === "ADMINISTRATOR") && 
                    <NavDropdown.Item href="/register-student" onClick={closeMenu}>Aluno</NavDropdown.Item> 
                  }
                  <NavDropdown.Item className='disabled' href="/material" onClick={closeMenu}>Material</NavDropdown.Item>
                </Nav>
              </div>
                  )}
                <Nav className={`mr-auto ${isMobile && !menuOpen ? 'd-none' : ''}`}>
                 <span className="navLinks" style={{ cursor: 'pointer' }} onClick={logOut}>Sair</span>
                </Nav>
             </Nav>
            
         </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
