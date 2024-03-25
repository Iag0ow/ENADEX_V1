import Logo from "../../../../assets/Images/Header-Img/Logo.png";
import "./LoginPage.css";
import BackGroundIMG from "../../../../assets/Images/LandingPage-Img/LandingPageWeb.png";

export default function LoginPage() {
  return (
    <>
      <img className="BGimage" src={BackGroundIMG} alt="" />
      <section className="containerLogin row">
        <div className="divContainerLogo col-md-6">
          <img className="LogoLeftLogin" src={Logo} alt="" />
        </div>

        <div className="rightSideLogin col-md-6">
          <form className="inputsLogin" action="">
            <input className="inputEmail" type="email" placeholder="Email" />
            <input className="inputPassword" type="password" placeholder="Password" />
          </form>
          <div>
              <a className="forgotPass" href="./recuperar">Esqueci a senha</a>
              </div>
        </div>
      </section>
    </>
  );
}
