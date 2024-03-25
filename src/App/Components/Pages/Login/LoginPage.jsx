import React from 'react';
import "./LoginPage.css";
import Logo from "../../../../assets/Images/Header-Img/Logo.png";
import BackGroundIMG from "../../../../assets/Images/LandingPage-Img/LandingPageWeb.png";

export default function LoginPage() {
  return (
    <>
      <img className="backgroundLogin" src={BackGroundIMG} alt="" />
      <section>
        <div className="containerLogin">
          <div className="imageLeft">
            <img className="logo" src={Logo} alt="" />
          </div>
          <div className="inputsRight">
            <div className="inputsContainer">
              <input type="text" placeholder="Email" />
              <div className="passwordInput">
                <input type="password" placeholder="Senha" />
                <a href="/esqueci-minha-senha" className="forgotPasswordLink">Esqueci minha senha</a>
              </div>
            </div>
            <button className="buttonLogin">Login</button>
          </div>
        </div>
      </section>
    </>
  );
}
