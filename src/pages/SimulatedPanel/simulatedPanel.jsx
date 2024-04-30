import "./simulatedPanel.css";
import NavBar from "../../components/NavBar/NavBar";
import profilePic from "./assets/images/psicopato_profile.svg";
import search_icon from "./assets/images/search_icon.svg";

export default function SimulatedPanel() {
  return (
    <div className="pageWrapperSimulatedPanel">
      <NavBar />
      <div className="userInfo">
        <img className="profilePic" src={profilePic} alt="foto de perfil" />
        <div className="userProfile">
          <p className="userName">Jhon Doe</p>
          <label className="mediaAcertos">Média de acertos: 85%</label>
          <label className="simulatedsRealized">Simulados realizados: 4</label>
        </div>
        <div className="generateSimulated">
          <button className="btnSimulated">Gerar simulado</button>
        </div>
      </div>
      <div className="searchBarWrapper">
        <div className="searchBar">
          <img className="searchIcon" src={search_icon} alt="" />
          <input type="text" className="searchInput" placeholder="Buscar" />
        </div>
      </div>

      <div className="simulatedWrapper">
        {/* Aqui estão os quatro botões */}
        <button className="btnRealizedSimulated">
          <div className="simulatedText">
            IBMEC - 2022 - ENADE Simulado - Direito
          </div>
          <div className="simulatedInfo">
            <span className="simulatedDate">Data de realização: </span>
            <label className="labelDateAndQuestions">20/04/2024</label>
            <span className="simulatedQuestions">Questões:</span>
            <label className="labelDateAndQuestions"> 40</label>
          </div>
        </button>

        <button className="btnRealizedSimulated">
          <div className="simulatedText">
            IBMEC - 2022 - ENADE Simulado - Direito
          </div>
          <div className="simulatedInfo">
            <span className="simulatedDate">Data de realização: </span>
            <label className="labelDateAndQuestions">22/04/2024</label>
            <span className="simulatedQuestions">Questões:</span>
            <label className="labelDateAndQuestions"> 10</label>
          </div>
        </button>
        <button className="btnRealizedSimulated">
          <div className="simulatedText">
            IBMEC - 2022 - ENADE Simulado - Direito
          </div>
          <div className="simulatedInfo">
            <span className="simulatedDate">Data de realização: </span>
            <label className="labelDateAndQuestions">23/04/2024</label>
            <span className="simulatedQuestions">Questões:</span>
            <label className="labelDateAndQuestions"> 25</label>
          </div>
        </button>
        <button className="btnRealizedSimulated">
          <div className="simulatedText">
            IBMEC - 2022 - ENADE Simulado - Direito
          </div>
          <div className="simulatedInfo">
            <span className="simulatedDate">Data de realização: </span>
            <label className="labelDateAndQuestions">25/04/2024</label>
            <span className="simulatedQuestions">Questões:</span>
            <label className="labelDateAndQuestions"> 30</label>
          </div>
        </button>
      </div>
    </div>
  );
}
