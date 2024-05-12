import React from "react";
import women from "../../assets/landing-page-women.png";
import exclamation from "../../assets/exclamacao.png";
import list from "../../assets/list-img.png";
import Notes from "../../assets/icons/Notes.png";
import Diploma from "../../assets/icons/Diploma.png";
import Student from "../../assets/icons/Student.png";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./LadingPage.css";
import { useAuth } from "../../context/AuthContextProvider";
import Faq from "../faq/Faq";
import NavBarNoAuth from "../../components/NavBarNoAuth/NavBarNoAuth";

const LadingPage = () => {
  const { signed } = useAuth();
  return (
    <>
      {signed ? <Navbar /> : <NavBarNoAuth />}
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
            <h1 className="text-black-landing title-landing mb-4">
              Sua grande
              <span className="title-landing-span"> oportunidade</span> de se
              preparar para o<span className="title-landing-span"> Enade</span>.
            </h1>
            <Link to="/login">
              <button className="btn-acessar">Comece agora!</button>
            </Link>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
            <img className="img-landing" src={women} alt="Imagem de pessoas" />
          </div>
        </div>
        <div className="row mt-5 pt-5">
          <div className="d-none d-md-block col-md-6">
            <img
              className="img-exclamation"
              src={exclamation}
              alt="Imagem de uma seta"
            />
          </div>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center justify-content-md-center">
            <h3 className="text-black-landing">Informações sobre a prova</h3>
            <p>
              Tenha acesso a informações essenciais sobre o exame ENADE. Fique
              por dentro das datas importantes, estrutura da prova e como se
              preparar adequadamente.
            </p>
            <p>
              Calendário do ENADE: Consulte as datas e prazos importantes para
              inscrição e realização do exame. Formato da Prova: Conheça a
              estrutura e o tipo de questões que serão abordadas no exame.
              Orientações para o Dia da Prova: Saiba o que esperar no dia do
              exame e como se preparar psicologicamente.
            </p>
          </div>
        </div>
        <div className="row mt-5 mb-5 pt-5 pb-5">
          <div className="col-12 col-md-6">
            <h3 className="text-black-landing">
              Informações gerais sobre a prova.
            </h3>
            <p>Dados gerais sobre a aplicação da prova</p>
          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col-md-3">
                    <img src={Notes} alt="" />
                  </div>
                  <div className="col-md-6">
                    <h5 className="text-black-landing">1 a 5</h5>
                    <p className="text-subtitle-landing">Notas Atribuidas</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-md-3">
                    <img src={Diploma} alt="" />
                  </div>
                  <div className="col-md-8">
                    <h5 className="text-black-landing">40%</h5>
                    <p className="text-subtitle-landing">
                      Dos cursos presenciais
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="col-md-3">
                    <img src={Diploma} alt="" />
                  </div>
                  <div className="col-md-8">
                    <h5 className="text-black-landing">48,7%</h5>
                    <p className="text-subtitle-landing">Dos cursos EAD</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-md-3">
                    <img src={Student} alt="" />
                  </div>
                  <div className="col-md-8">
                    <h5 className="text-black-landing">26</h5>
                    <p className="text-subtitle-landing">Áreas participantes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5 pt-5">
          <div className="d-none d-md-block col-md-6">
            <img
              className="img-exclamation-list"
              src={list}
              alt="Imagem de uma seta"
            />
          </div>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center justify-content-md-center">
            <h3 className="text-black-landing">Simulado da prova</h3>
            <p>
              Prepare-se para o exame com nossos simulados interativos. Teste
              seus conhecimentos com questões similares às do ENADE e receba um
              feedback imediato para melhorar seu desempenho.
            </p>
            <p>
              Acesse uma extensa biblioteca de questões abrangendo todos os
              tópicos do ENADE. Estude com questões passadas e amplie seu
              conhecimento sobre os temas mais relevantes.
            </p>
          </div>
        </div>
        <div className="row mt-5 body-common-questions">
          <div id="perguntas" className="d-flex justify-content-center">
            <h2 className="frequetes-landing mt-2">Perguntas Frequentes</h2>
          </div>
        </div>
        <Faq />
        <div className="row mt-5">
          <div className="d-flex justify-content-center">
            <h1 className="title-food">Faça parte dessa jornada!</h1>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Link to="/login">
              <button className="btn-acessar-2">Acessar</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LadingPage;
