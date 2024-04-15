import React from "react";
import NavBarNoAuth from "../../components/NavBarNoAuth/NavBarNoAuth";
import { Link } from "react-router-dom";
import "./style.css";

const Courses = () => {
  return (
    <>
        <NavBarNoAuth />
      <div className="container">
        <div className="row mt-5">
          <div className="col-5">
            <Link to="/index" className="btn-voltar btn-white">
              Voltar
            </Link>
          </div>
          <div className="col-7">
            <h3 className="title-itens text-white">Sobre a Prova</h3>
          </div>
        </div>
        <div className="row mt-5 background-transparent text-white">
          <div className="col-12">
            <p className="text-box-itens">A prova do Enade é constituída por uma parte de Formação Geral, comum aos cursos de todas as áreas, e uma de Componente Específico, próprio de cada área de avaliação, conforme as portarias que estabelecem as diretrizes e conteúdos das provas de cada área avaliada no Enade elaborados com base nas Diretrizes Curriculares Nacionais (DCN) de cada área, legislação associada e de profissionais.</p>
            <p className="text-box-itens">As diretrizes de provas de cada área de avaliação do Enade são definidas pelas Comissões Assessoras de Área e estabelecem o perfil, as competências e os objetos de conhecimento que serão avaliados.</p>
            <p className="text-box-itens">A parte de Formação Geral terá 10 (dez) questões, sendo 02 (duas) discursivas e 08 (oito) de múltipla escolha, envolvendo situações-problema e estudos de casos. </p>
            <p className="text-box-itens">A parte de Componente Específico de cada área de avaliação terá 30 (trinta) questões, sendo 03 (três) discursivas e 27 (vinte e sete) de múltipla escolha, envolvendo situações-problema e estudos de casos. O estudante terá quatro horas para resolver toda a prova.</p>
            <p className="text-box-itens">A prova de Formação Geral tem a concepção dos seus itens balizada pelos princípios dos Direitos Humanos. Suas questões discursivas avaliam aspectos como clareza, coerência, coesão, estratégias argumentativas, utilização de vocabulário adequado e correção gramatical do texto.</p>
          </div> 
        </div>
      </div>
    </>
  );
};

export default Courses;
