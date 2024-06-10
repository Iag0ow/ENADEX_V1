import React, { useEffect, useState } from "react";
import "./simulatedPanel.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import profilePic from "./assets/images/psicopato_profile.svg";
import search_icon from "./assets/images/search_icon.svg";
import { useAuth } from "../../context/AuthContextProvider";
import { getAvaiableSimulated, getFinishedSimulated } from "../../config/config";

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function SimulatedPanel() {
  const { user } = useAuth();
  const [simulateds, setSimulateds] = useState([]);
  const [finishedSimulateds, setFinishedSimulateds] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Novo estado para a query de busca
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSimulateds() {
      setLoading(true);
      const availableSimulateds = await getAvaiableSimulated();
      const finishedSimulateds = await getFinishedSimulated();
      setSimulateds(availableSimulateds);
      setFinishedSimulateds(finishedSimulateds);
      setLoading(false);
    }
    fetchSimulateds();
  }, []);

  const handleSimulatedClick = (id, name, duration) => {
    navigate("/orientacoes-do-simulado", {
      state: {
        simulatedId: id,
        simulatedName: name,
        simulatedDuration: duration,
      },
    });
  };

  const filteredSimulateds = (showFinished ? finishedSimulateds : simulateds).filter(simulated =>
    (showFinished ? simulated.mock_exam_id.name : simulated.name)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="pageWrapperSimulatedPanel">
        <NavBar />
        <div className="userInfo">
          <img className="profilePic" src={profilePic} alt="foto de perfil" />
          <div className="userProfile">
            <p className="userName">{user ? user.toUpperCase() : "Usuário"}</p>
            <label className="mediaAcertos">Média de acertos: 85%</label>
            <label className="simulatedsRealized">Simulados realizados: 4</label>
          </div>
        </div>

        <div className="actionBarWrapper">
          <div className="searchBar">
            <div className="searchInputWrapper">
              <img className="searchIcon" src={search_icon} alt="" />
              <input 
                type="text" 
                className="searchInput" 
                placeholder="Buscar" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} // Atualizar searchQuery conforme o usuário digita
              />
            </div>
          </div>
          <div className="checkboxContainer">
            <input
              type="checkbox"
              id="showSimulados"
              checked={showFinished}
              onChange={() => setShowFinished(!showFinished)}
            />
            <label htmlFor="showSimulados">Exibir simulados já feitos</label>
          </div>
        </div>

        <div className="simulatedWrapper">
          {loading ? (
            <h1 className="text-center mt-5 color-text bold-weight">Carregando...</h1>
          ) : (
            filteredSimulateds.map((simulated) => (
              <div
                className="btnRealizedSimulated"
                key={simulated._id}
                onClick={() =>
                  handleSimulatedClick(
                    simulated._id, 
                    showFinished ? simulated.mock_exam_id.name : simulated.name, 
                    showFinished ? simulated.mock_exam_id.duration : simulated.duration
                  )
                }
              >
                <div className="simulatedText">{(showFinished ? simulated.mock_exam_id.name : simulated.name).toUpperCase()}</div>
                <div className="simulatedInfo">
                  <span className="simulatedDate">{showFinished ? "Data de finalização: " : "Data de criação: "}</span>
                  <label className="labelDateAndQuestions">
                    {formatDate(showFinished ? simulated.finishedAt : simulated.createdAt)}
                  </label>
                  <span className="simulatedQuestions">Duração:</span>
                  <label className="labelDateAndQuestions">
                    {formatDuration(showFinished ? simulated.mock_exam_id.duration : simulated.duration)}
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
