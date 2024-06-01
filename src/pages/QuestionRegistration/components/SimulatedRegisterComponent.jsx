import React, { useState } from "react";
import "./SimulatedRegisterComponent.css";
import { createSimulated, createSimulatedQuestion } from "../../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SimulatedRegisterComponent({ selectedCourse }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState("00:00");
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [deletedOptions, setDeletedOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
  const [isSimulated, setIsSimulated] = useState(false);
  const [isLoadingSimulated, setIsLoadingSimulated] = useState(false);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [simulatedId, setSimulatedId] = useState("");
  const questionDataInitialValues = {
    statements: "",
    question: "",
    alternatives: [{ text: "" }],
    correctOption: null,
  };
  const optionsInitialValues = [{ label: "A)", id: 0 }];
  const [options, setOptions] = useState(optionsInitialValues);
  const [questionData, setQuestionData] = useState(questionDataInitialValues);
  const [simulatedSucess, setSimulatedSucess] = useState(false);

  const handleCheckboxChange = (id) => {
    if (correctOption === id) {
      setCorrectOption(null);
      setQuestionData({ ...questionData, correctOption: null });
    } else {
      setCorrectOption(id);
      setQuestionData({ ...questionData, correctOption: id });
    }
  };

  const removeOption = (idToRemove) => {
    if (idToRemove === 0) {
      return;
    }

    const deletedOption = options.find((option) => option.id === idToRemove);
    setDeletedOptions([...deletedOptions, deletedOption.label.trim()]);

    const updatedOptions = options.filter((option) => option.id !== idToRemove);

    const reorderedOptions = updatedOptions.map((option, index) => ({
      ...option,
      id: index,
    }));

    setOptions(reorderedOptions);

    if (correctOption === idToRemove) {
      setCorrectOption(null);
      setQuestionData({ ...questionData, correctOption: null });
    }
  };

  const addOption = () => {
    if (options.length >= 5) {
      return;
    }

    let nextLetter;
    if (deletedOptions.length > 0) {
      const lastDeletedOption = deletedOptions.pop();
      nextLetter = lastDeletedOption.replace(/[()]/g, "");
    } else {
      const lastOptionLetter = options[options.length - 1].label
        .trim()
        .charAt(0);
      nextLetter = String.fromCharCode(lastOptionLetter.charCodeAt(0) + 1);
    }

    const newOption = { label: ` ${nextLetter})`, id: options.length };

    const indexToInsert = options.findIndex(
      (option) => option.label.trim() > ` ${nextLetter})`.trim()
    );

    const newOptions =
      indexToInsert === -1
        ? [...options, newOption]
        : [
            ...options.slice(0, indexToInsert),
            newOption,
            ...options.slice(indexToInsert),
          ];

    setOptions(newOptions);
    setQuestionData({
      ...questionData,
      alternatives: [...questionData.alternatives, { text: "" }],
    });
  };

  const registerSimulated = async () => {
    if (timer === "00:00" || timerSeconds === 0) {
      toast.error("O tempo do simulado não pode ser 00:00.", {
        autoClose: 2000,
      });
      return;
    }

    setIsLoadingSimulated(true);

    const simulatedData = {
      name: title,
      course_id: selectedCourse,
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
        setIsLoadingSimulated(false);

        const responseData = await response.json();
        setSimulatedId(responseData._id);
        setSimulatedSucess(true);
      } else {
        setIsLoadingSimulated(false);
        const errorData = await response.json();
        console.error("Failed to create simulated:", errorData);
        toast.error("Erro: " + (errorData.error.message[0] || response.statusText), {
          autoClose: 2000,
        });
      }
    } catch (error) {
      setIsLoadingSimulated(false);
      console.error("Error occurred while creating simulated:", error);
      toast.error("Erro: " + error.message, {
        autoClose: 2000,
      });
    }
  };

  const handleQuestionRegistration = async (simulatedId) => {
    setIsLoadingQuestion(true);

    const statements = [
      {
        description: document.getElementById("questionInput").value,
      },
    ];

    const optionsData = options.map((option, index) => ({
      description: document.getElementById(`optionText_${option.id}`).value,
      correctOption: correctOption === option.id,
    }));

    const questionData = {
      statements: statements,
      options: optionsData,
    };

    try {
      const response = await createSimulatedQuestion(simulatedId, questionData);
      if (response.ok) {
        toast.success("Questão criada com sucesso!", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        clearFieldsQuestions();
      } else {
        const errorData = await response.json();
        toast.error("Erro ao criar questão: ", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Erro ao criar questão:", {
        autoClose: 1000,
      });
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTimerChange = (event) => {
    const value = event.target.value;
    setTimer(value);

    const [hours, minutes] = value.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60;
    setTimerSeconds(totalSeconds);
  };

  const clearFieldsQuestions = () => {
    setCorrectOption(null);
    setOptions(optionsInitialValues);
    const optionText0 = document.getElementById("optionText_0");
    const questionInput = document.getElementById("questionInput");
    if (optionText0 || questionInput) {
      optionText0.value = "";
      questionInput.value = "";
    }
  };
  
  const clearFields = () => {
    setTitle("");
    setDescription("");
    setTimer("00:00");
    setTimerSeconds(0);
    setSimulatedId(null);
    clearFieldsQuestions();
    setSimulatedSucess(false);
    setIsLoadingSimulated(false);
    setIsLoadingQuestion(false);
  };

  return (
    <>
      <div className="SimulatedRegistrationContainer">
        <label className="SimulatedTitle">Titulo</label>
        <div className="SimulatedRegistrationTitle">
          <input
            disabled={simulatedSucess}
            type="text"
            className="title-input"
            placeholder="Digite o título do simulado aqui"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
      </div>
      <label className="SimulatedDescription">Descrição</label>
      <div className="d-flex justify-content-center md-justify-content-between flex-wrap mb-5">
        <div className="leftContainer">
          <textarea
            disabled={simulatedSucess}
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
              Tempo do Simulado (hh:mm)
            </label>
            <input
              disabled={simulatedSucess}
              type="time"
              className="simulatedTimer"
              value={timer}
              onChange={handleTimerChange}
              step="60"
            />
          </div>
          <div className="simulatedRegisterButtonContainer">
            <button
              disabled={simulatedSucess || isLoadingSimulated}
              className="simulatedRegisterButton"
              onClick={registerSimulated}
            >
              {isLoadingSimulated ? "Carregando..." : "Registrar Simulado"}
            </button>
          </div>
          <div className="simulatedRegisterButtonContainer">
            <button
              className="createAnotherSimulatedButton"
              onClick={clearFields}
            >
              Criar Outro Simulado
            </button>
          </div>
        </div>
      </div>

      {!isSimulated && (
        <div className="QuestionRegistrationInputsSimulated">
          <label className="questionLabelSimulated">Enunciado</label>
          <textarea
            disabled={!simulatedSucess}
            id="questionInput"
            className="inputQuestion"
            placeholder="Pergunta"
            rows={1}
            onChange={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
        </div>
      )}

      {!isSimulated && (
        <div className="QuestionRegistrationAlternatives">
          <label className="alternativesLabelSimulated">Alternativas</label>

          {options.map((option, index) => (
            <div key={option.id} className="optionContainer">
              <div className="optionInputContainer">
                <span>{option.label}</span>
                <textarea
                  disabled={!simulatedSucess}
                  id={`optionText_${option.id}`}
                  className="inputOption"
                  placeholder={`Questão ${option.label}`}
                  rows={1}
                  onChange={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
                <input
                  disabled={!simulatedSucess}
                  className="correctOptionCheckbox"
                  type="checkbox"
                  checked={correctOption === option.id}
                  onChange={() => handleCheckboxChange(option.id)}
                />
                <button
                  disabled={!simulatedSucess}
                  className="removeOptionButton"
                  onClick={() => removeOption(option.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
          <div className="QuestionRegistrationButtonsHolder flex-wrap">
            <button
              className="SimulatedQuestionButton"
              disabled={!simulatedSucess}
              onClick={addOption}
            >
              Adicionar opção
            </button>
            <button
              disabled={!simulatedSucess}
              className="SimulatedQuestionButton"
              onClick={() => handleQuestionRegistration(simulatedId)}
            >
              {isLoadingQuestion ? "Carregando..." : "Cadastrar Questão"}
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
}
