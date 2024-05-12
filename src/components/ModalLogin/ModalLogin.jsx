import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import facebook from "../../assets/icons/facebook.png";
import google from "../../assets/icons/google.png";
import { Link } from "react-router-dom";
import "./ModalLogin.css";

const ModalLogin = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="p-5">
          <h5 className="text-center mb-4">Para continuar, acesse sua conta</h5>
          <div className="d-flex justify-content-evenly">
            <Button variant="primary" className="me-2" onClick={props.onHide}>
              <span className="me-2">
                <img src={facebook} alt="" />
              </span>
              Continuar com o facebook
            </Button>
            <Button
              variant="white"
              className="text-black border button-google"
              onClick={props.onHide}
            >
              <span className="me-2">
                <img src={google} alt="" />
              </span>
              Continuar com o google
            </Button>
          </div>
          <div class="container-login">
            <div class="line"></div>
            <div class="text">ou acesse com e-mail e senha</div>
            <div class="line"></div>
          </div>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label mb-0 fs-7">
                Email
              </label>
              <input
                type="email"
                className="form-control background-input-modal-login"
                id="email"
                aria-describedby="emailHelp"
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
              <Link className="links-modal-forgot" to={"esqueci-senha"}>
                ESQUECEU A SENHA?
              </Link>
            </div>
            <p className="text-center">
              Ao continuar, declaro que estou ciente dos{" "}
              <Link className="links-modal-login" to={"termos-uso"}>
                Termos de Uso
              </Link>{" "}
              e <span className="me-1">da</span>
              <Link className="links-modal-login" to={"politica-privacidade"}>
                Política de Privacidade
              </Link>{" "}
              da ENADEX
            </p>
            <div className="d-flex justify-content-center pb-3">
              <Button variant="primary" type="submit">
                ENTRAR
              </Button>
            </div>
          </form>
          <p className="text-center">
            Não tenho uma conta?
            <Link className="links-modal-login" to={"criar-conta"}>
              <span className="ms-1">Crie sua conta aqui</span>
            </Link>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalLogin;
