import React, { useState, useEffect } from "react";
import "./RecuperacaoSenha.css";
import { Link } from 'react-router-dom';


export default function RecuperacaoSenha() {
  const [email, setEmail] = useState();
  function RecuperarSenha() {
    console.log(email);
  }

  return (
    <>
      <section>
        <div className="containerRecuperacao">
          <div className="itemsRecuperacao">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="code">
            <a className="recoverCode">Já possuo um codigo</a>
            </div>
            <button
              className="buttonRecuperar"
              onClick={() => RecuperarSenha()}
            >
              Recuperar Senha
            </button>
            <Link to={"/login"} className="linkVoltar">
              Voltar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
