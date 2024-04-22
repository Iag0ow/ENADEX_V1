import React from "react";
import peopleImg from "../../assets/people.png";
import arrow from "../../assets/arrow.png";
import { Link } from "react-router-dom";
import "./LadingPage.css";

const LadingPage = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-5">
            <h1 className="text-white title-landing"> Bem vindo(a) á Enadex</h1>
            <p className="text-white mt-5 mb-5" style={{ fontWeight: "bold", fontSize: "1.3em" }}>
              Sua Plataforma Online de Preparação para o ENADE!
            </p>
            <p className="text-white mb-4" style={{ fontSize: "1.2em" }}>
              Na Enadex, você encontrará uma vasta coleção de questões de
              concursos, simulados e materiais de estudo cuidadosamente
              selecionados para refletir o conteúdo e o formato do ENADE. Além
              disso, oferecemos um recurso de classificação (rank) para
              acompanhar seu progresso e compará-lo com outros estudantes,
              incentivando uma preparação ainda mais motivadora e engajadora.
            </p>
            <Link to={"/login"} className="btn-acessar">
              Acessar
            </Link>
          </div>
          <div className="col-md-7">
            <img className="img-fluid" src={peopleImg} alt="Enadex" />
          </div>
          <div className="bg-box-landing-page col-12 col-md-10 mt-5">
            <div className="d-flex p-3 justify-content-between flex-wrap">
              <Link to="/faq" className="d-flex align-items-center">
                <div
                  style={{
                    backgroundColor: "#C4C4C4",
                    borderRadius: 10,
                    width: 45,
                    height: 45,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img style={{ width: 25, height: 25 }} src={arrow} alt="" />
                </div>
                <div className="ms-3 mt-3">
                  <p className="pb-0 mb-0 text-white">Ir para</p>
                  <p className="text-white">Perguntas Frequentes</p>
                </div>
              </Link>
              <Link to="/itens-obrigatorios" className="d-flex align-items-center">
                <div
                  style={{
                    backgroundColor: "#C4C4C4",
                    borderRadius: 10,
                    width: 45,
                    height: 45,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img style={{ width: 25, height: 25 }} src={arrow} alt="" />
                </div>
                <div className="ms-3 mt-3">
                  <p className="pb-0 mb-0 text-white">Ir para</p>
                  <p className="text-white">Itens obrigatórios</p>
                </div>
              </Link>
              <Link to={"/cursos"} className="d-flex align-items-center">
                <div
                  style={{
                    backgroundColor: "#C4C4C4",
                    borderRadius: 10,
                    width: 45,
                    height: 45,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img style={{ width: 25, height: 25 }} src={arrow} alt="" />
                </div>
                <div className="ms-3 mt-3">
                  <p className="pb-0 mb-0 text-white">Ir para</p>
                  <p className="text-white">Sobre a prova</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LadingPage;
