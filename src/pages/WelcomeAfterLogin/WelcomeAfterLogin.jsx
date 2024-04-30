import "./WelcomeAfterLogin.css";
import SimuladoIcon from "./assets/images/simuladoIcon.svg";
import DiamondIcon from "./assets/images/diamondIcon.svg";
import FAQicon from "./assets/images/FAQicon.svg";
import enfeiteLateral from "./assets/images/enfeiteLateral.svg";
import NavBar from "../../components/NavBar/NavBar";


export default function WelcomeAfterLogin() {
  return (
    <div className="pageWrapperWelcome">
      <NavBar />
      <div className="buttonsHolder">
        <button className="twoButtons">Conhecimento</button>
        <button className="twoButtons">Atualize-se</button>
      </div>

      <div className="textsHolder">
        <div class="textLeft">
          <span>Bem</span>
          <span>Vindo(a) às</span>
          <span>suas</span>
          <span>informações</span>
        </div>

        <div className="textRight">
          A plataforma oferece uma preparação abrangente e personalizada para
          exames, com uma extensa variedade de questões e simulações realistas.
          Receba feedback personalizado, análises detalhadas de desempenho e
          acesso a materiais de estudo complementares. Junte-se a uma comunidade
          de usuários que confiam em nossa plataforma para alcançar resultados
          excepcionais. Inicie sua jornada rumo ao sucesso hoje mesmo!
        </div>
      </div>

      <div className="enadexContent">
        <p className="enadexContentText">
          Aqui você vai
          <span>acessar</span>
        </p>
        <button className="enadexContentButton">
          <img src={SimuladoIcon} alt="Hexágono" className="buttonIcon" />
          Simulados
        </button>
        <button className="enadexContentButton">
          <img src={DiamondIcon} alt="Hexágono" className="buttonIcon" />
          Rank
        </button>
        <button className="enadexContentButton">
          <img src={FAQicon} alt="Hexágono" className="buttonIcon" />
          FAQ Interno
        </button>
        <div className="enfeiteLateral"></div> {/* Adiciona o elemento enfeiteLateral */}
      </div>
    </div>
  );
}
