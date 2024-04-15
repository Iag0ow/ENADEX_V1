import React from "react";
import NavBarNoAuth from "../../components/NavBarNoAuth/NavBarNoAuth";
import { Link } from "react-router-dom";
import "./style.css";

const Itens = () => {
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
            <h3 className="title-itens text-white">Itens Obrigatórios</h3>
          </div>
        </div>
        <div className="row mt-5 background-transparent text-white">
          <div className="col-12">
            <h4 className="text-white">Cadastro do estudante concluinte</h4>
            <p className="text-box-itens">A primeira etapa que o estudante concluinte habilitado deverá realizar é o seu cadastro de informações pessoais na página do Sistema ENADE (https://enade.inep.gov.br/enade), do dia 27 de junho até o dia 31 de julho de 2024. Este cadastro é obrigatório.</p>
            <p className="text-box-itens">Antes de preencher o cadastro, o estudante deverá criar senha de acesso para o Sistema Enade no portal gov.br, no endereço https://servicos.acesso.gov.br/.</p>
            <p className="text-box-itens">Questionario do Estudante</p>
            <p className="text-box-itens">Uma das etapas obrigatórias ao estudante concluinte inscrito é o preenchimento do Questionário do Estudante, que tem por objetivo o levantamento de informações sobre os processos formativos que ajudem a compreender o resultado dos estudantes no ENADE.</p>
            <p className="text-box-itens">O estudante deverá preenchê-lo no Sistema Enade, no site do INEP, no período de 1º de setembro a 25 de novembro.</p>
            <p className="text-box-itens">Essa etapa é imprescindível para que o estudante tenha acesso ao local da prova, que será divulgado posteriormente.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Itens;
