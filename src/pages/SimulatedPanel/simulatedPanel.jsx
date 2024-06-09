import React, { useEffect, useState } from "react";
import "./simulatedPanel.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import profilePic from "./assets/images/psicopato_profile.svg";
import search_icon from "./assets/images/search_icon.svg";
import { useAuth } from "../../context/AuthContextProvider";
import { getAvaiableSimulated } from "../../config/config";

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function SimulatedPanel() {
  const { user } = useAuth();
  const [simulateds, setSimulateds] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSimulateds() {
      setLoading(true);
      const data = await getAvaiableSimulated();
      setSimulateds(data);
      setLoading(false);
    }
    fetchSimulateds();
  }, []);

  const handleSimulatedClick = (id, name, duration) => {
    // console.log("Selected simulated ID:", id);
    // console.log(name)
    navigate('/orientacoes-do-simulado', { state: { simulatedId: id, simulatedName: name, simulatedDuration: duration } });
  };

  return (
    <>
      <div className="pageWrapperSimulatedPanel">
        <NavBar />
        <div className="userInfo">
          <img className="profilePic" src={profilePic} alt="foto de perfil" />
          <div className="userProfile">
            <p className="userName">{user.toUpperCase()}</p>
            <label className="mediaAcertos">Média de acertos: 85%</label>
            <label className="simulatedsRealized">Simulados realizados: 4</label>
          </div>
        </div>

        {/* <div className="searchBarWrapper">
          <div className="searchBar">
            <img className="searchIcon" src={search_icon} alt="" />
            <input type="text" className="searchInput" placeholder="Buscar" />
          </div>
        </div> */}

        <div className="simulatedWrapper">
          {loading ? (
            <h1 className="text-center mt-5 color-text bold-weight">Carregando...</h1>
          ) : (
            simulateds.map((simulated) => (
              <div
                className="btnRealizedSimulated"
                key={simulated._id}
                onClick={() => handleSimulatedClick(simulated._id, simulated.name, simulated.duration)}
              >
                <div className="simulatedText">{simulated.name.toUpperCase()}</div>
                <div className="simulatedInfo">
                  <span className="simulatedDate">Data de criação: </span>
                  <label className="labelDateAndQuestions">{formatDate(simulated.createdAt)}</label>
                  <span className="simulatedQuestions">Duração:</span>
                  <label className="labelDateAndQuestions">{formatDuration(simulated.duration)}</label>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
