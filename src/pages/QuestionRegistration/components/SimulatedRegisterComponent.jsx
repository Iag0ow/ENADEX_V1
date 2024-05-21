import React, { useState } from "react";
import "./SimulatedRegisterComponent.css";
import { createSimulated } from "../../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SimulatedRegisterComponent({ selectedCourse }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(0);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTimerChange = (event) => {
    let value = parseInt(event.target.value);
    value = Math.min(value, 14400);
    setTimerSeconds(value);
  };

  const registerSimulated = async () => {
    const simulatedData = {
      name: title,
      course_id: selectedCourse, // Corrigido para usar selectedCourse
      duration: timerSeconds,
    };

    try {
      const response = await createSimulated(simulatedData);
      if (response.ok) {
        toast.success("Simulado cadastrado com sucesso!", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // Limpar os campos de input
        setTitle("");
        setDescription("");
        setTimerSeconds(0);
      } else {
        console.error("Failed to register simulated");
        toast.error("Erro ao cadastrar simulado", {
          autoClose: false,
        });
      }
    } catch (error) {
      console.error("Error occurred while registering simulated:", error);
      toast.error("Erro ao cadastrar simulado: " + error.message, {
        autoClose: false,
      });
    }
  };

  return (
    <>
      <div className="SimulatedRegistrationContainer">
        <div className="SimulatedRegistrationTitle">
          <input
            type="text"
            className="title-input"
            placeholder="Digite o título do simulado aqui"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
      </div>

      <div className="SimulatedRegistrationDescriptionContainer">
        <div className="leftContainer">
          <textarea
            className="description-input"
            placeholder="Digite a descrição do simulado aqui"
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
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
            <button
              className="simulatedRegisterButton"
              onClick={registerSimulated}
            >
              Registrar Simulado
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
