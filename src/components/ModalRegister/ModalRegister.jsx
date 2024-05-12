import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const ModalRegister = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Para continuar, acesse sua conta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Botões do Facebook lado a lado */}
          <div className="d-flex justify-content-between mb-3">
            <Button variant="primary" onClick={props.onHide}>
              Continuar com o Facebook
            </Button>
            <Button variant="primary" onClick={props.onHide}>
              Continuar com o Facebook
            </Button>
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
                ENTRAR
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onHide}>
            Entrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalRegister;
