import React from "react";
import "./NavBarNoAuth.css";
import Logo from "../NavBar/images/LogoEnadex.svg";
import glass from "../../assets/Images/SVG/magnifyng_glass.svg";
import { Link } from "react-router-dom";
import ModalLogin from "../../components/ModalLogin/ModalLogin";
import ModalRegister from "../../components/ModalRegister/ModalRegister";
import { useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";

const NavBarNoAuth = ({ search }) => {
  const { modalShow, setModalShow } = useAuth();
  const [modalRegisterShow, setModalRegisterShow] = useState(false);

  return (
    <nav>
      <ul>
        <div className="d-flex align-items-center">
          <Link to={"/"}>
            <img
              className="logoNav"
              src={Logo}
              alt=""
            />
          </Link>
          <div className="input-group">
            {search && (
              <>
                <span className="input-group-text">
                  <img src={glass} alt="" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar"
                  aria-label="Buscar"
                />
              </>
            )}
          </div>
        </div>
        <div className="links">
          <a className="navLinksNoAuth" href="#perguntas">
            Perguntas frequentes
          </a>
          <Link onClick={() => setModalShow(true)} className="navLinks" id="navLinksEntrar">
            Entrar
          </Link>
          <Link
            onClick={() => setModalRegisterShow(true)}
            className="navLinkPrepareButton"
          >
            Quero me preparar
          </Link>
        </div>
      </ul>
      <ModalLogin show={modalShow} onHide={() => setModalShow(false)} />
      <ModalRegister
        show={modalRegisterShow}
        onHide={() => setModalRegisterShow(false)}
      />
    </nav>
  );
};

export default NavBarNoAuth;