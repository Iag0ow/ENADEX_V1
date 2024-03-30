import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Logo from "../../assets/Images/Header-Img/Logo.png";
import "./Home.css";
const Home = () => {
  return (
    <>
      <NavBar search={false} />
      <div className="container-fluid mt-5">
        <div
          className="row"
        >
          <h4 className="col-md-8 ps-5 pt-3 text-white">
            Bem-vindo(a) à Enadex - Sua Plataforma Online de Preparação para o
            ENADE!
          </h4>
          <div className="col-md-9 mb-5 ps-5 pt-3">
            <p className="text-home pt-4">
              É com grande entusiasmo que lhe damos as boas-vindas à Enadex!
              Nossa plataforma web foi desenvolvida para ser sua aliada na
              jornada de preparação para o ENADE, oferecendo uma gama completa
              de recursos e ferramentas para ajudá-lo(a) a alcançar seus
              objetivos acadêmicos.
            </p>
            <p className="text-home">
              Na Enadex, você encontrará uma vasta coleção de questões de
              concursos, simulados e materiais de estudo cuidadosamente
              selecionados para refletir o conteúdo e o formato do ENADE. Além
              disso, oferecemos um recurso de classificação (rank) para
              acompanhar seu progresso e compará-lo com outros estudantes,
              incentivando uma preparação ainda mais motivadora e engajadora.
            </p>
            <p className="text-home">
              Explore nossa plataforma, navegue pelas diferentes seções e
              mergulhe nos recursos que preparamos especialmente para você.
              Esteja certo(a) de que estamos aqui para apoiá-lo(a) em cada etapa
              do caminho, fornecendo orientação personalizada e suporte
              dedicado.
            </p>
          </div>
          <div className="col-md-12 col-lg-3 logoHomeDiv">
            <img className="logoHome" src={Logo} alt="Logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
