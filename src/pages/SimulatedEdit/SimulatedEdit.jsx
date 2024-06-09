import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SimulatedEdit.css";
import NavBar from "../../components/NavBar/NavBar";
import { getAllSimulated } from "../../config/config";

export default function SimulatedEdit() {
  const [simulateds, setSimulateds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSimulateds() {
      const data = await getAllSimulated();
      setSimulateds(data);
      setLoading(false);
    }
    fetchSimulateds();
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className="title text-center mt-3">Simulados</h1>
      <div className="simulatedWrapper">
        {loading ? (
          <h1 className="text-center mt-5 color-text bold-weight">Carregando...</h1>
        ) : (
          simulateds.map((simulated) => (
            <div
              className="btnEditSimulated"
              key={simulated._id}
              onClick={() => navigate(`/detalhes-do-simulado/${simulated._id}`)}
            >
              <span>{simulated.name.toUpperCase()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
