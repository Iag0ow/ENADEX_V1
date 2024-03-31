import React from "react";
import "./LoginPage.css";
import Logo from "../../assets/Images/Header-Img/Logo.png";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <section>
        <div className="containerLogin">
          <div className="imageLeft">
            <img href="/" className="logo" src={Logo} alt="" />
          </div>
          <div className="inputsRight">
            <div className="inputsContainer">
              <input type="text" placeholder="Email" />
              <div className="passwordInput">
                <input type="password" placeholder="Senha" />
                <div className="d-flex justify-content-end">
                  <Link
                    to={"/esqueci-minha-senha"}
                    className="forgotPasswordLink"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
              </div>
            </div>
            <button className="buttonLogin">Login</button>
            <div className="d-flex justify-content-center">
              <Link to={"/register"} className="createAccount">
                Cadastrar-se
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
