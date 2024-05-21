import React, { useState, useEffect } from "react";
import "./QuestionRegistration.css";
import { getCourses } from "../../config/config";
import SimulatedRegisterComponent from "./components/SimulatedRegisterComponent";

export default function QuestionRegistration() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [options, setOptions] = useState([{ label: "A)", id: 0 }]);
  const [deletedOptions, setDeletedOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
  const [isSimulated, setIsSimulated] = useState(false);

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

    if (indexToInsert === -1) {
      setOptions([...options, newOption]);
    } else {
      const newOptions = [
        ...options.slice(0, indexToInsert),
        newOption,
        ...options.slice(indexToInsert),
      ];
      setOptions(newOptions);
    }
  };

  const handleCheckboxChange = (id) => {
    if (correctOption === id) {
      setCorrectOption(null);
    } else {
      setCorrectOption(id);
    }
  };

  const handleQuestionRegistration = () => {
    const alternatives = options.map((option) => ({
      label: option.label,
      text: document.getElementById(`optionText_${option.id}`).value,
    }));

    let correctOptionLetter = null;
    options.forEach((option) => {
      if (option.id === correctOption) {
        correctOptionLetter = option.label.trim().charAt(0);
      }
    });

    const questionData = {
      course: selectedCourse,
      question: document.getElementById("questionInput").value,
      alternatives: alternatives,
      correctOption: correctOptionLetter,
    };

    console.log("Dados da pergunta:", questionData);

    // Enviar dados para API
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
        <label class="checkboxLabelSimulated">
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
          >
            Cadastrar Questão
          </button>
        </div>
      </div>
    </div>
  );
}
