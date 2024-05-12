import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import facebook from "../../assets/icons/facebook.png";
import google from "../../assets/icons/google.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";

const ModalRegister = (props) => {
  const { modalShow, setModalShow } = useAuth();

  const handleClick = () => {
    if (!modalShow) {
      props.onHide();
      setModalShow(true);
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
          <div className="container-login mb-3">
            <div className="line"></div>
            <div className="text">ou acesse com e-mail e senha</div>
            <div className="line"></div>
          </div>

          {/* Inputs */}
          <form>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="name" className="form-label mb-0 fs-7">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control background-input-modal-login"
                  id="name"
                />
              </div>
              <div className="col">
                <label htmlFor="email" className="form-label mb-0 fs-7">
                  Email *
                </label>
                <input
                  type="email"
                  className="form-control background-input-modal-login"
                  id="email"
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="curso" className="form-label mb-0 fs-7">
                  Curso
                </label>
                <input
                  type="text"
                  className="form-control background-input-modal-login"
                  id="curso"
                />
              </div>
              <div className="col">
                <label htmlFor="unidade" className="form-label mb-0 fs-7">
                  Unidade
                </label>
                <input
                  type="text"
                  className="form-control background-input-modal-login"
                  id="unidade"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="matricula" className="form-label mb-0 fs-7">
                  Matrícula
                </label>
                <input
                  type="text"
                  className="form-control background-input-modal-login"
                  id="matricula"
                />
              </div>
              <div className="col">
                <label htmlFor="semestre" className="form-label mb-0 fs-7">
                  Semestre
                </label>
                <input
                  type="text"
                  className="form-control background-input-modal-login"
                  id="semestre"
                />
              </div>
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label mb-0 fs-7">
                Confirmar Senha
              </label>
              <input
                type="password"
                className="form-control background-input-modal-login"
                id="confirmPassword"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="keepConnected"
                />
                <label className="form-check-label" htmlFor="keepConnected">
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
                Política de Privacidade
              </Link>{" "}
              da ENADEX
            </p>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                CRIAR CONTA
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Link className="links-modal-login" onClick={handleClick}>
          <span className="ms-1">Crie sua conta aqui</span>
        </Link>
      </Modal>
    </>
  );
};

export default ModalRegister;
