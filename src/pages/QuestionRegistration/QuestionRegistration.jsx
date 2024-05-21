import React, { useState, useEffect } from "react";
import "./QuestionRegistration.css";
import { getCourses } from "../../config/config";
import SimulatedRegisterComponent from "./components/SimulatedRegisterComponent";
import { createQuestion } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function QuestionRegistration() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [options, setOptions] = useState([{ label: "A)", id: 0 }]);
  const [deletedOptions, setDeletedOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
  const [isSimulated, setIsSimulated] = useState(false);
  const [questionData, setQuestionData] = useState({
    course: "",
    question: "",
    alternatives: [{ text: "" }],
    correctOption: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        if (response.status === 200) {
          const capitalizedCourses = response.data.map((course) => ({
            ...course,
            name: capitalizeWords(course.name),
          }));
          setCourses(capitalizedCourses);
        } else {
          console.error("Erro ao buscar cursos:", response.status);
        }
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setQuestionData({ ...questionData, course: event.target.value });
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

  const handleCheckboxChange = (id) => {
    if (correctOption === id) {
      setCorrectOption(null);
      setQuestionData({ ...questionData, correctOption: null });
    } else {
      setCorrectOption(id);
      setQuestionData({ ...questionData, correctOption: id });
    }
  };

  const handleQuestionRegistration = async () => {
    setIsLoading(true);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
    const statements = [
      {
        description: document.getElementById("questionInput").value,
      },
    ];

    const optionsData = options.map((option, index) => ({
      description: document.getElementById(`optionText_${option.id}`).value,
      correctOption: correctOption === option.id,
    }));

    const selectedCourseObject = courses.find(
      (course) => course.name === selectedCourse
    );
    const courseId = selectedCourseObject ? selectedCourseObject._id : "";

    if (!courseId) {
      console.error("O ID do curso selecionado não é válido.");
      setIsLoading(false);
      return;
    }

    const questionData = {
      statements: statements,
      options: optionsData,
      isSpecific: true,
      course_id: courseId,
      active: true,
    };

    try {
      const response = await createQuestion(questionData);
      if (response.status === 201) {
        toast.success("Pergunta cadastrada com sucesso!", {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSelectedCourse("");
        setQuestionData(null);

        options.forEach((option) => {
          document.getElementById(`optionText_${option.id}`).value = "";
        });
        document.getElementById("questionInput").value = "";
        setCorrectOption(null);
        document.getElementById("questionInput").value = "";
      } else {
        toast.error("Erro ao cadastrar pergunta: " + response.status, {
          autoClose: false,
        });
      }
    } catch (error) {
      toast.error("Erro ao cadastrar pergunta: " + error.message, {
        autoClose: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="QuestionRegistrationContainer">
      <div className="QuestionRegistrationTitle">
        <h1>
          {isSimulated ? "Cadastro de simulados" : "Cadastro de perguntas"}
        </h1>
      </div>

      <div className="QuestionRegistrationSelectsAndCheckboxes">
        <select
          className="selectCourse"
          id="courseSelect"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="" disabled>
            Curso
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <label className="checkboxLabelSimulated">
          <input
            className="checkboxSimulated"
            type="checkbox"
            checked={isSimulated}
            onChange={(e) => setIsSimulated(e.target.checked)}
          />
          Simulado
        </label>
      </div>
      {isSimulated && <SimulatedRegisterComponent />}

      <div className="QuestionRegistrationInputs">
        <textarea
          id="questionInput"
          className="inputQuestion"
          placeholder="Pergunta"
          rows={1}
          onChange={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
            setQuestionData({ ...questionData, question: e.target.value });
          }}
        />
      </div>
      <div className="QuestionRegistrationAlternatives">
        {options.map((option, index) => (
          <div key={option.id} className="optionContainer">
            <div className="optionInputContainer">
              <span>{option.label}</span>
              <textarea
                id={`optionText_${option.id}`}
                className="inputOption"
                placeholder={`Questão ${option.label}`}
                rows={1}
                onChange={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                  const alternatives = questionData.alternatives
                    ? [...questionData.alternatives]
                    : [];
                  alternatives[index] = { text: e.target.value };
                  setQuestionData({ ...questionData, alternatives });
                }}
              />
              <input
                className="correctOptionCheckbox"
                type="checkbox"
                checked={correctOption === option.id}
                onChange={() => handleCheckboxChange(option.id)}
              />
              <button
                className="removeOptionButton"
                onClick={() => removeOption(option.id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <div className="QuestionRegistrationButtonsHolder">
          <button className="addOptionButton" onClick={addOption}>
            Adicionar opção
          </button>
          <button
            className="registerQuestionButton"
            onClick={handleQuestionRegistration}
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Cadastrar Questão"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
