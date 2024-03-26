import React, { useState, useEffect } from "react";
import "./RecuperacaoSenha.css";

export default function RecuperacaoSenha() {
    const [email, setEmail] = useState();
    function RecuperarSenha() {
        console.log(email)
    }
  return (
    <>
      <section>
        <div className="containerRecuperacao">
            <div className="itemsRecuperacao">
                <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                <button className="buttonRecuperar" onClick={() => RecuperarSenha()}>Recuperar Senha</button>
                <a href="/login" className="linkVoltar">Voltar</a>
            </div>
        </div>
      </section>
    </>
  );
}
