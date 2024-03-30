import React from "react";
import "./LoginPage.css";
import Logo from "../../assets/Images/Header-Img/Logo.png";

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
                <a href="/esqueci-minha-senha" className="forgotPasswordLink">
                  Esqueci minha senha
                </a>
              </div>
            </div>
            <button className="buttonLogin">Login</button>
          </div>
        </div>
      </section>
    </>
  );
}
