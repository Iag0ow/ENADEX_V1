import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faSave,
  faTrashAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./SimulatedDetails.css";
import NavBar from "../../components/NavBar/NavBar";
import {
  getAllSimulatedQuestions,
  getAllSimulated,
  editSimulated,
  provideSimulated,
  finishSimulated,
  editSimulatedQuestion,
  deleteSimulatedQuestion,
  createSimulatedQuestion,
} from "../../config/config";
import { formatTime } from "../../Hooks/formatTime";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const capitalize = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const convertLineBreaksToBr = (text) => {
  return text.replace(/\n/g, "<br>");
};

const convertBrToLineBreaks = (text) => {
  return text.replace(/<br>/g, "\n");
};

export default function SimulatedDetails() {
  const { id } = useParams();
  const [simulated, setSimulated] = useState(null);
  const [allSimulateds, setAllSimulateds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disponibilizar, setDisponibilizar] = useState(false);
  const [switchDisabled, setSwitchDisabled] = useState(false);
  const [simulatedInfo, setSimulatedInfo] = useState({
    name: "",
    duration: "00:00",
    course: "",
  });
  const [questions, setQuestions] = useState([]);
  const [newOptions, setNewOptions] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingSaveQuestion, setLoadingSaveQuestion] = useState(false);
  const [allQuestionsSaved, setAllQuestionsSaved] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchSimulatedDetails() {
      const [allData, simulatedQuestions] = await Promise.all([
        getAllSimulated(),
        getAllSimulatedQuestions(id),
      ]);
      setAllSimulateds(allData);

      const specificSimulated = allData.find((item) => item._id === id);
      if (specificSimulated) {
        specificSimulated.questions = simulatedQuestions;
        setSimulatedInfo({
          name: specificSimulated.name,
          duration: formatTime(specificSimulated.duration),
          course: specificSimulated.course,
        });
        setQuestions(
          simulatedQuestions.map((question) => ({
            ...question,
            statements: question.statements.map((statement) => ({
              ...statement,
              description: convertBrToLineBreaks(statement.description),
            })),
            options: question.options.map((option) => ({
              ...option,
              description: convertBrToLineBreaks(option.description),
            })),
          }))
        );

        if (specificSimulated.finished || specificSimulated.available) {
          setEditDisabled(true);
        }

        if (specificSimulated.finished) {
          setDisponibilizar(false);
          setSwitchDisabled(true);
        } else if (specificSimulated.available && !specificSimulated.finished) {
          setDisponibilizar(true);
          setSwitchDisabled(false);
        } else if (
          !specificSimulated.available &&
          !specificSimulated.finished
        ) {
          setDisponibilizar(false);
          setSwitchDisabled(false);
        }
      }
      setLoading(false);
      setSimulated(specificSimulated);
    }
    fetchSimulatedDetails();
  }, [id, refreshData]);

  const handleEditClick = () => {
    if (isEditing) {
      Swal.fire({
        title: "Deseja realmente salvar as alterações?",
        text: "Isso enviará suas alterações e atualizará o simulado.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Sair sem salvar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await handleSave();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setIsEditing(false);
        }
      });
    } else {
      setIsEditing(true);
    }
  };

  const handleDisponibilizarChange = async () => {
    setSubmitting(true);
    if (!disponibilizar) {
      Swal.fire({
        title: "Deseja disponibilizar este simulado?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await provideSimulated(id);
          setDisponibilizar(true);
          setSwitchDisabled(false);
        }
        setSubmitting(false);
      });
    } else {
      Swal.fire({
        title: "Deseja finalizar este simulado?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await finishSimulated(id);
          setDisponibilizar(false);
          setSwitchDisabled(true);
        }
        setSubmitting(false);
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSimulatedInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuestionChange = (e, questionIndex, statementIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].statements[statementIndex][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { name, value, checked, type } = e.target;
    const updatedQuestions = [...questions];

    if (type === "checkbox" && checked) {
      updatedQuestions[questionIndex].options.forEach((option, idx) => {
        if (idx !== optionIndex) {
          option.correctOption = false;
        }
      });
    }
    updatedQuestions[questionIndex].options[optionIndex][name] =
      type === "checkbox" ? checked : value;
    setQuestions(updatedQuestions);
  };

  const handleTimerChange = (e) => {
    const value = e.target.value;
    setSimulatedInfo((prevState) => ({
      ...prevState,
      duration: value,
    }));
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length >= 5) {
      Swal.fire({
        title: "Limite de alternativas alcançado",
        text: "Cada questão pode ter no máximo 5 alternativas.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }
    const newOption = {
      _id: Date.now().toString(),
      description: "",
      correctOption: false,
    };
    updatedQuestions[questionIndex].options.push(newOption);
    setQuestions(updatedQuestions);
    setNewOptions({
      ...newOptions,
      [questionIndex]: true,
    });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      _id: `temp-${Date.now()}`,
      statements: [
        {
          _id: Date.now().toString(),
          description: "",
        },
      ],
      options: [
        {
          _id: Date.now().toString(),
          description: "",
          correctOption: false,
        },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleSaveQuestion = async (questionIndex) => {
    const question = questions[questionIndex];

    const statementEmpty = question.statements.some(
      (statement) => statement.description.trim() === ""
    );
    if (statementEmpty) {
      Swal.fire({
        title: "Erro",
        text: "O enunciado da questão não pode estar vazio.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (question.options.length < 2) {
      Swal.fire({
        title: "Erro",
        text: "Cada questão deve ter pelo menos 2 alternativas.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const correctOptionExists = question.options.some(
      (option) => option.correctOption
    );
    if (!correctOptionExists) {
      Swal.fire({
        title: "Erro",
        text: "Cada questão deve ter pelo menos uma alternativa correta.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const updatedData = {
      statements: question.statements.map((statement) => ({
        description: convertLineBreaksToBr(statement.description),
      })),
      options: question.options
        .filter((option) => option.description.trim() !== "")
        .map((option) => ({
          description: convertLineBreaksToBr(option.description),
          correctOption: option.correctOption,
        })),
    };

    try {
      if (question._id.startsWith("temp-")) {
        await createSimulatedQuestion(id, updatedData);
      } else {
        await editSimulatedQuestion(id, question._id, updatedData);
      }
      setIsEditing(false);
      return true; // Retorna true se a questão foi salva com sucesso
    } catch (error) {
      console.error("Erro ao salvar a questão:", error);
      return false; // Retorna false se houve um erro ao salvar a questão
    }
  };

  const handleSave = async () => {
    setLoadingSave(true);

    // Loop através de cada questão e salve-a
    const allQuestionsSavedSuccessfully = await Promise.all(
      questions.map(async (question, index) => await handleSaveQuestion(index))
    );

    // Verifique se todas as questões foram salvas com sucesso
    const allQuestionsSaved = allQuestionsSavedSuccessfully.every(
      (saved) => saved === true
    );

    if (allQuestionsSaved) {
      try {
        const [hours, minutes] = simulatedInfo.duration.split(":").map(Number);
        const totalSeconds = hours * 3600 + minutes * 60;

        const updatedData = {
          name: simulatedInfo.name,
          duration: totalSeconds,
        };

        await editSimulated(id, updatedData);

        // Força o recarregamento dos detalhes do simulado
        setRefreshData(true);

        Swal.fire({
          title: "Sucesso",
          text: "Simulado e questões salvas com sucesso!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } catch (error) {
        console.error("Erro ao salvar o simulado:", error);
        Swal.fire({
          title: "Erro",
          text: "Ocorreu um erro ao salvar o simulado.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }

    setLoadingSave(false);
  };

  const handleDeleteQuestion = async (questionID) => {
    try {
      const result = await Swal.fire({
        title: "Deseja realmente excluir esta questão?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      });

      if (result.isConfirmed) {
        await deleteSimulatedQuestion(id, questionID);
        const updatedQuestions = questions.filter(
          (question) => question._id !== questionID
        );
        setQuestions(updatedQuestions);

        Swal.fire({
          title: "Sucesso",
          text: "Questão deletada com sucesso.",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {}
  };

  const getHeaderTitle = () => {
    if (simulated) {
      if (simulated.finished) {
        return `Simulado finalizado`;
      } else if (simulated.available) {
        return `Simulado disponível`;
      } else {
        return `Simulado em construção`;
      }
    }
    return `Detalhes do Simulado`;
  };

  return (
    <div>
      <NavBar />
      <div className="simulatedDetailsWrapper">
        <div className="header">
          <Link to="/editar-simulado" className="back-button">
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ marginRight: "5px" }}
            />{" "}
            Voltar
          </Link>
          <h1 className="simulated-title">{getHeaderTitle()}</h1>

          <div className="icons">
            <FontAwesomeIcon
              className={`edit-icon ${editDisabled ? "disabled" : ""}`}
              icon={isEditing ? faSave : faEdit}
              size="xl"
              style={{ marginRight: "10px" }}
              onClick={handleEditClick}
              disabled={editDisabled}
            />
            <label
              className="switch"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: "16px",
                gap: "10px",
                marginRight: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={disponibilizar}
                onChange={handleDisponibilizarChange}
                disabled={switchDisabled}
              />
              <span className="slider round"></span>
            </label>
            <span className="text-disponibilizar">Disponibilizar</span>
          </div>
        </div>
        {loading && (
          <h1 className="text-center mt-5 color-text bold-weight">
            Carregando...
          </h1>
        )}
        {simulated && (
          <div className="simulatedDetail">
            <h2>
              <b>Título: </b>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={simulatedInfo.name}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                capitalize(simulated.name)
              )}
            </h2>
            <p>
              <b> Duração: </b>{" "}
              {isEditing ? (
                <input
                  type="time"
                  name="duration"
                  value={simulatedInfo.duration}
                  onChange={handleTimerChange}
                  step="60"
                  className="editTime-input"
                />
              ) : (
                formatTime(simulated.duration)
              )}
            </p>
            <p>
              <b>Data de criação:</b> {formatDate(simulated.createdAt)}
            </p>

            <p>
              <b>Curso: </b> {capitalize(simulated.course_id.name)}
            </p>

            <h3>Questões:</h3>
            <ul>
              {questions.map((question, questionIndex) => (
                <li key={question._id} className="question-item">
                  <div className="question-header">
                    <span className="question-index">
                      Questão {questionIndex + 1}
                    </span>
                    {isEditing && (
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        size="lg"
                        className="delete-icon"
                        onClick={() => handleDeleteQuestion(question._id)}
                      />
                    )}
                  </div>
                  {question.statements.map((statement, statementIndex) => (
                    <div key={statement._id}>
                      <b>Enunciado:</b>{" "}
                      {isEditing ? (
                        <textarea
                          name="description"
                          value={statement.description}
                          onChange={(e) =>
                            handleQuestionChange(
                              e,
                              questionIndex,
                              statementIndex
                            )
                          }
                          className="edit-input"
                          rows="4"
                          cols="50"
                        />
                      ) : (
                        <div
                          className="question-description"
                          dangerouslySetInnerHTML={{
                            __html: convertLineBreaksToBr(
                              statement.description
                            ),
                          }}
                        />
                      )}
                    </div>
                  ))}
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <li key={option._id} className="option-item">
                        {isEditing ? (
                          <div className="option-edit-container">
                            <textarea
                              name="description"
                              value={option.description}
                              onChange={(e) =>
                                handleOptionChange(
                                  e,
                                  questionIndex,
                                  optionIndex
                                )
                              }
                              className="edit-input"
                              rows="2"
                              cols="50"
                            />
                            <label className="option-checkbox-label">
                              <input
                                type="checkbox"
                                name="correctOption"
                                checked={option.correctOption}
                                onChange={(e) =>
                                  handleOptionChange(
                                    e,
                                    questionIndex,
                                    optionIndex
                                  )
                                }
                                className="option-checkbox"
                              />
                              Opção correta
                            </label>
                          </div>
                        ) : (
                          <div className="option-view-container">
                            <div
                              className="option-text"
                              dangerouslySetInnerHTML={{
                                __html: convertLineBreaksToBr(
                                  option.description
                                ),
                              }}
                            />
                            {option.correctOption && (
                              <span className="correct-option-text">
                                Opção correta
                              </span>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                  {isEditing && question.options.length < 5 && (
                    <div className="buttons-container">
                      <button
                        onClick={() => handleAddOption(questionIndex)}
                        className="add-option-button"
                      >
                        Adicionar alternativa
                      </button>
                      <button
                        onClick={() => handleSave(questionIndex)}
                        className={`save-question-button ${
                          loadingSaveQuestion ? "loading" : ""
                        }`}
                        disabled={loadingSaveQuestion}
                      >
                        {loadingSaveQuestion ? (
                          <>
                            <FontAwesomeIcon icon={faSpinner} spin />
                            &nbsp; Salvando...
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faSave} /> Salvar Questão
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {isEditing && (
              <div className="buttons-container">
                <button
                  onClick={handleAddQuestion}
                  className="addQuestion-button"
                >
                  Adicionar questão
                </button>
                <button
                  onClick={handleSave}
                  className="save-button"
                  disabled={loadingSave}
                >
                  {loadingSave ? "Salvando..." : "Salvar"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
