import './NavBar.css'
import Logo  from './images/LogoEnadex.svg'
import glass from '../../assets/Images/SVG/magnifyng_glass.svg'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from "../../context/AuthContextProvider";

const NavBar = ({ search }) => {
  const { logOut, authRole, user } = useAuth();
// console.log(user)
  return (
    <nav>
      <ul>
        <div className='d-flex align-items-center'>
          <Link to={"/home"}><img className='logoNav' src={Logo} alt="" style={{ width: 64, height: 64 }} /></Link>
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
          <NavLink className="navLinks" to="/home">Home</NavLink>
          <NavLink className="navLinks disabled" to="/teste">Faq(Interno)</NavLink>
          <NavLink className="navLinks" to="/simulados">Simulado</NavLink>
          <NavLink className="navLinks disabled" to="/material">Material</NavLink>
          {( authRole === "COORDINATORS" ) &&
            <NavLink className="navLinks" to={"/register-admin-teacher"} >Cadastro </NavLink>
          }
          <Link className="navLinks" onClick={logOut} >Sair</Link>
        </div>
      </ul>
    </nav>
  )
}

export default NavBar;
