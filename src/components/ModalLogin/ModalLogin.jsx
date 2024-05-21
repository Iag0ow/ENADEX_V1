import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import facebook from "../../assets/icons/facebook.png";
import google from "../../assets/icons/google.png";
import LogoEnadex from "../../assets/LogoEnadexX.png";
import { Link, useNavigate } from "react-router-dom";
import "./ModalLogin.css";
import ModalRegister from "../ModalRegister/ModalRegister";
import { useAuth } from "../../context/AuthContextProvider";
import ModalPasswordRecover from "../ModalPasswordRecover/ModalPasswordRecover";

const ModalLogin = (props) => {
  const { modalShow, setModalShow, login, verifySigned } = useAuth();
  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalPasswordRecoverShow, setModalPasswordRecoverShow] =
    useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    if (modalShow) {
      setModalShow(false);
      setModalRegisterShow(true);
    }
  };

  const handleClickPasswordRecover = () => {
    if (modalShow) {
      setModalShow(false);
      setModalPasswordRecoverShow(true);
    }
  };

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    const loginForm = {
      email: email,
      password: senha,
    };
    const data = await login(loginForm);
    if (data.status === 201) {
      localStorage.setItem("token", data.access_token);
      verifySigned(true);
      setModalShow(false);
      navigate("/home");
    } else {
      setError(data.status != 201 ? "Credenciais inválidas" : data.message);
      setLoad(false);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="p-5">
          <div className="d-flex justify-content-center mb-4">
            <img src={LogoEnadex} alt="" className="logo-enadex" />
          </div>
          <h5 className="text-center mb-4">Para continuar, acesse sua conta</h5>
          <div className="d-flex justify-content-evenly">
            {/* Botões para login com Facebook e Google podem ser descomentados se necessário */}
          </div>
          <div className="container-login">
            <div className="line"></div>
            <div className="text">ou acesse com e-mail e senha</div>
            <div className="line"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <h5 className={`text-danger text-center mt-3`}>
              {error ? error : ""}
            </h5>
            <div className="mb-3">
              <label htmlFor="email" className="form-label mb-0 fs-7">
                E-mail
              </label>
              <input
                type="email"
                className="form-control background-input-modal-login"
                id="email"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label mb-0 fs-7">
                Senha
              </label>
              <input
                type="password"
                className="form-control background-input-modal-login"
                id="password"
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  MANTER CONECTADO
                </label>
              </div>
              <Link
                className="links-modal-forgot"
                onClick={handleClickPasswordRecover}
              >
                ESQUECEU A SENHA?
              </Link>
            </div>
            <p className="text-center">
              Ao continuar, declaro que estou ciente dos
              <Link className="links-modal-login " to={"termos-uso"}>
                Termos de Uso
              </Link>
              e <span className="me-1">da</span>
              <Link className="links-modal-login" to={"politica-privacidade"}>
                Política de Privacidade
              </Link>
              da ENADEX
            </p>
            <div className="d-flex justify-content-center pb-3">
              <Button
                variant="primary"
                className={`${load && "disabled"}`}
                type="submit"
              >
                {load ? "Carregando..." : "ENTRAR"}
              </Button>
            </div>
          </form>
          <p className="text-center">
            Não tenho uma conta?
            <Link className="links-modal-login" onClick={handleClick}>
              <span className="ms-1">Crie sua conta aqui</span>
            </Link>
          </p>
        </Modal.Body>
      </Modal>

      <ModalRegister
        show={modalRegisterShow}
        onHide={() => setModalRegisterShow(false)}
      />
      <ModalPasswordRecover
        show={modalPasswordRecoverShow}
        onHide={() => setModalPasswordRecoverShow(false)}
      />
    </>
  );
};

export default ModalLogin;
