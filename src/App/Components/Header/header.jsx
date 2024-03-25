import Logo from "../../../assets/Images/Header-Img/logo.png";
import "../Header/header.css"
function Header() {
    return (
        <div className='header-topo'>
            
            <header className="header">
      <img className="logo" src={Logo} alt="" />
            <ul className='menu'>
                <li><a href="/">Home</a></li>
                <li><a href="/FAQ">FAQ</a></li>
                <li><a href="/Rank">Rank</a></li>
                <li><a href="/Login">Login</a></li>
            </ul>
    </header>
        </div>
    )
}

export default Header;