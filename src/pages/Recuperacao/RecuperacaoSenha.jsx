import { useState } from "react";
import "./RecuperacaoSenha.css";
import { Link } from 'react-router-dom';
import Cadeado from "../../assets/Images/RecuperacaoSenha-Img/Cadeado.png";
import Sucesso from "../../assets/Images/RecuperacaoSenha-Img/Sucesso.png";
import Erro from "../../assets/Images/RecuperacaoSenha-Img/Erro.png";
import { sendEmailRecovery } from "../../config/config";
import { changePassword } from "../../config/config";


export default function RecuperacaoSenha() {
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [displayCodigo, setDisplayCodigo] = useState('none');
  const [displaySenha, setDisplaySenha] = useState('none');
  const [displayAlterado, setDisplayAlterado] = useState('none');
  const [displayErro, setDisplayErro] = useState('none');
  const [imagemRetorno, setImagemRetorno] = useState('');
  const [textoRetorno, setTextoRetorno] = useState('');
  const iCodigo = document.getElementById("inputCodigo");
  const iSenha = document.getElementById("inputSenha");
  const iConfirmaSenha = document.getElementById("inputConfirmacaoSenha");
  const iEmail = document.getElementById("inputEmail");
  const [mensagemErro, setMensagemErro] = useState('');

  async function enviarCodigo(){
    setDisplaySenha('none');
    if (email == ''){
      iEmail.style.backgroundColor = "#E9A6A6";
      iEmail.placeholder = "Campo Obrigatório"
    } else {
      iEmail.style.backgroundColor = "white";
      iEmail.placeholder = "Email"
      const sendEmail = {
        email: email
      };
      const result = await sendEmailRecovery(sendEmail);
      if (result.status === 204) {
        setDisplayCodigo('flex');
      } else {
        setEmail('');
        iEmail.style.backgroundColor = "#E9A6A6";
        iEmail.placeholder = "Email inválido"
      }
    }
  }
  async function ReenviarCodigo(){
    const sendEmail = {
      email: email
    };
    await sendEmailRecovery(sendEmail);
  }
  function confirmarCodigo() {
    setDisplayCodigo('none');
    setDisplaySenha('flex');
    setDisplayErro('none');
    iCodigo.style.backgroundColor = "white";
    iSenha.style.backgroundColor = "white";
    iConfirmaSenha.style.backgroundColor = "white";
    setCodigo("")
    setSenha("")
    setConfirmacaoSenha("")
  }
  function verificaForm() {
    var retornoErro = false;
    if (senha != confirmacaoSenha){
      iConfirmaSenha.style.backgroundColor = "#E9A6A6";
      setMensagemErro("Senhas não conferem!");
      retornoErro = true;
    } else {
      iConfirmaSenha.style.backgroundColor = "white";
    }
    if (confirmacaoSenha == ""){
      iConfirmaSenha.style.backgroundColor = "#E9A6A6";
      setMensagemErro("Confirmação de Senha Obrigatória!");
      retornoErro = true;
    } else {
      iConfirmaSenha.style.backgroundColor = "white";
    }
    if (senha == ""){
      iSenha.style.backgroundColor = "#E9A6A6";
      setMensagemErro("Senha Obrigatória!");
      retornoErro = true;
    } else {
      iSenha.style.backgroundColor = "white";
    }
    if (codigo == ""){
      iCodigo.style.backgroundColor = "#E9A6A6";
      setMensagemErro("Código Obrigatório!");
      retornoErro = true;
    } else {
      iCodigo.style.backgroundColor = "white";
    }
    return retornoErro
  }
  async function recuperarSenha() {
    const critica = verificaForm();
    if (critica == false) {
      setDisplayErro('none');
      const formChange = {
        otgCode: codigo,
        email: email,
        password: senha
      };
      if (senha === confirmacaoSenha){
        if (codigo != "") {
          const result = await changePassword(formChange);
          setDisplaySenha('none');
          if (result.status === 204) {
            setImagemRetorno(Sucesso);
            setTextoRetorno('Senha alterada com sucesso!');
            setDisplayAlterado('flex');
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          } else {
            setImagemRetorno(Erro);
            setTextoRetorno('Não foi possível alterar a senha!');
            setDisplayAlterado('flex');
            setTimeout(() => {
              setDisplayAlterado('none');
            }, 2000);
          }
        }
      }
    } else {
      setDisplayErro('flex');
    }
  }
  function fecharRedefinicao() {
    setDisplaySenha('none')
  }
  return (
    <>
      <section>
        <div className="containerRecuperacao">
          <div className="modal" style={{display: displayCodigo}}>
            <div className="modalconteudo">
              <span className="tituloModal">Código de confirmação enviado!</span>
              <button
              className="buttonRecuperar"
              onClick={() => confirmarCodigo()}
            >
              Redefinir Senha
            </button>
            </div>
          </div>
          <div className="modal" style={{display: displaySenha}}>
            <div className="modalCaixa">
            <div className="modalFechar">
              <a onClick={fecharRedefinicao} className="fechar">X</a>
            </div>
            <div className="modalRedefinir">
            <img href="/" className="cadeado" src={Cadeado} alt="" />
              <div className="modalForm">
              <span className="tituloRedefinir" style={{textAlign: 'left'}}>Redefinir Senha</span>
                <input
                id="inputCodigo"
                type="text"
                placeholder="Código"
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value);
                }}
              />
              <input
              id="inputSenha"
              type="password"
              placeholder="Nova Senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
            />
            <input
              id="inputConfirmacaoSenha"
              type="password"
              placeholder="Confirmar Senha"
              value={confirmacaoSenha}
              onChange={(e) => {
                setConfirmacaoSenha(e.target.value);
              }}
            />
            <div className="modalConfirmar">
                <span id="textoErro" className="textoErro" style={{display: displayErro}}>{mensagemErro}</span>
                <a onClick={() => ReenviarCodigo()} style={{textDecoration: "underline", cursor: "pointer"}}>Reenviar Código</a>
                  <button
                  className="buttonRedefinir"
                  onClick={() => recuperarSenha()}
                >
                  Confirmar
                </button>
              </div>
            </div>
            </div>
            </div>
          </div>
          <div className="modal" style={{display: displayAlterado}}>
            <div className="modalAlterado">
              <img href="/" className="retorno" src={imagemRetorno} alt="" />
              <span className="tituloModal">{textoRetorno}</span>
            </div>
          </div>
          <div className="itemsRecuperacao">
            <input
              id="inputEmail"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
              <a onClick={() => setDisplaySenha('flex')} className="recoverCode">Já possuo um código</a>
            <button
              className="buttonRecuperar"
              onClick={() => enviarCodigo()}
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