import React, { useState } from "react";
import "./SimulatedRegisterComponent.css";

export default function SimulatedRegisterComponent() {
  const [timerSeconds, setTimerSeconds] = useState(0);

  const handleTimerChange = (event) => {
    let value = parseInt(event.target.value);
    value = Math.min(value, 14400);
    setTimerSeconds(value);
  };

  return (
    <>
      <div className="SimulatedRegistrationContainer">
        <div className="SimulatedRegistrationTitle">
          <input
            type="text"
            className="title-input"
            placeholder="Digite o título do simulado aqui"
          />
        </div>
      </div>

      <div className="SimulatedRegistrationDescriptionContainer">
        <div className="leftContainer">
          <textarea
            className="description-input"
            placeholder="Digite a descrição do simulado aqui"
            rows={4}
          />
        </div>
        <div>
          <div className="timerContainer">
            <label className="simulatedTimerLabel">
              Tempo do Simulado (em segundos)
            </label>
            <input
              type="number"
              className="simulatedTimer"
              value={timerSeconds}
              onChange={handleTimerChange}
              max={14400}
            />
          </div>
          <div className="simulatedRegisterButtonContainer">
            <button className="simulatedRegisterButton">
              Registrar Simulado
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
