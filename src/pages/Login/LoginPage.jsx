import React, { useState } from "react";
import "./LoginPage.css";
import Logo from "../../assets/Images/LoginPage-Img/LogoEnadexLogin.png";
import { Link } from "react-router-dom";
// import { login } from "../../config/config";
import { useAuth } from "../../context/AuthContextProvider";
import BGlogin from "../../assets/Images/LoginPage-Img/BGloginPage.png";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);

  const { login,verifySigned } = useAuth();

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    const loginForm = {
      email: email,
      password: senha,
    };
    const data = await login(loginForm);
    if (data.status === 201) {
      localStorage.setItem("token", data.access_token);
      verifySigned(true);
      // window.location.href = "/teste"; // redirecionar para a Rota correta
    } else {
      setError(data.status === 401 ? "Credenciais inválidas" : data.message);
      setLoad(false);
    }
  };
  return (
    <div className="pageWrapper">
      <section className="loginSection">
        <div className="containerLogin">
          <div className="imageLeft">
            <img href="/" className="logo" src={Logo} alt="" />
          </div>
          <div className="inputsRight">
            <form className="formInputs" onSubmit={handleSubmit}>
              <div className="inputsContainer">
                <h5 className={`text-danger text-center`}>
                  {error ? error : ""}
                </h5>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                />
                <div className="passwordInput">
                  <input
                    onChange={(e) => setSenha(e.target.value)}
                    value={senha}
                    required
                    type="password"
                    placeholder="Senha"
                  />
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
              <button
                type="submit"
                className={` buttonLogin ${load && "disabled"}`}
                id="criarButton"
              >
                {load ? "Carregando..." : "Entrar"}
              </button>
              <div className="d-flex justify-content-center">
                <Link to={"/register"} className="createAccount">
                  Cadastrar-se
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
      </div>
  );
}
