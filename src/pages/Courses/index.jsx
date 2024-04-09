import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import "./style.css";

const Courses = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-5">
            <Link to="/" className="btn-voltar btn-white">
              Voltar
            </Link>
          </div>
          <div className="col-7">
            <h3 className="title-itens text-white">Cursos Participantes</h3>
          </div>
        </div>
        <div className="row mt-5 background-transparent text-white">
          <div className="col-12">
            <p className="text-box-itens">Ano I</p>
            <ul>
              <li>Cursos de bacharelado nas áreas de conhecimento de Ciências Agrárias, Ciências da Saúde e áreas afins;</li>
              <li> Cursos de bacharelado nas áreas de conhecimento de Engenharias e Arquitetura e Urbanismo;</li>
              <li>Cursos Superiores de Tecnologia nas áreas de Ambiente e Saúde, Produção Alimentícia, Recursos Naturais, Militar e Segurança.</li>
            </ul>
            <p className="text-box-itens">Ano II</p>
            <ul>
              <li>Cursos de bacharelado nas áreas de conhecimento de Ciências Biológicas; Ciências Exatas e da Terra; Linguística, Letras e Artes e áreas afins;</li>
              <li>Cursos de licenciatura nas áreas de conhecimento de Ciências da Saúde; Ciências Humanas; Ciências Biológicas; Ciências Exatas e da Terra; Linguística, Letras e Artes;</li>
              <li>Cursos de bacharelado nas áreas de conhecimento de Ciências Humanas e Ciências da Saúde, com cursos avaliados no âmbito das licenciaturas;</li>
              <li>Cursos Superiores de Tecnologia nas áreas de Controle e Processos Industriais, Informação e Comunicação, Infraestrutura e Produção Industrial.</li>
            </ul>
            <p className="text-box-itens">Ano III</p>
            <ul>
              <li>Cursos de bacharelado nas Áreas de Conhecimento Ciências Sociais Aplicadas e áreas afins;</li>
              <li>Cursos de bacharelado nas Áreas de Conhecimento Ciências Humanas e áreas afins que não tenham cursos também avaliados no âmbito das licenciaturas;</li>
              <li>Cursos Superiores de Tecnologia nas áreas de Gestão e Negócios, Apoio Escolar, Hospitalidade e Lazer, Produção Cultural e Design.</li>
            </ul>
            <p className="text-box-itens">Os resultados das provas e as respostas ao questionário são importantes para os Indicadores de Qualidade da Educação Superior do País. Os cursos e instituições de educação superior recebem notas de 1 a 5 no Enadex.</p>
          </div> 
        </div>
      </div>
    </>
  );
};

export default Courses;
