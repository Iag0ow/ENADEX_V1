import React, { useState, useEffect } from "react";
import "./QuestionRegistration.css";
import { getCourses } from "../../config/config";
import SimulatedRegisterComponent from "./components/SimulatedRegisterComponent";
import { createQuestion } from "../../config/config";

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
    alternatives: [],
    correctOption: null,
  });
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o indicador de carregamento

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
      setQuestionData({ ...questionData, correctOption: null });
    } else {
      setCorrectOption(id);
      setQuestionData({ ...questionData, correctOption: id });
    }
  };

  const handleQuestionRegistration = async () => {
    setIsLoading(true); // Defina isLoading para true quando o processo de envio começar
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
  
    // Obtenha o ID correto do curso selecionado
    const selectedCourseObject = courses.find(
      (course) => course.name === selectedCourse
    );
    const courseId = selectedCourseObject ? selectedCourseObject._id : "";
  
    if (!courseId) {
      console.error("O ID do curso selecionado não é válido.");
      setIsLoading(false); // Defina isLoading para false quando ocorrer um erro
      return;
    }
  
    const questionData = {
      statements: statements,
      options: optionsData,
      isSpecific: true, // Defina conforme necessário
      course_id: courseId, // Use o id do curso selecionado
      active: true, // Defina conforme necessário
    };
  
    try {
      const response = await createQuestion(questionData);
      if (response.status === 201) {
        console.log("Pergunta cadastrada com sucesso!");
        // Limpar os campos após o sucesso do cadastro
        setSelectedCourse("");
        setQuestionData(null);
        // Limpar campos de texto das opções e da pergunta
        options.forEach((option) => {
          document.getElementById(`optionText_${option.id}`).value = "";
        });
        document.getElementById("questionInput").value = "";
        setCorrectOption(null); // Limpar o estado correctOption
      } else {
        console.error("Erro ao cadastrar pergunta:", response.status);
      }
    } catch (error) {
      console.error("Erro ao cadastrar pergunta:", error);
    } finally {
      setIsLoading(false); // Defina isLoading para false após a conclusão, seja bem-sucedida ou não
    }
  };
  
  // Adicione um novo estado para controlar a exibição da mensagem de sucesso
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Crie um componente de mensagem de sucesso
  const SuccessMessage = () => {
    return (
      <div className="successMessage">Pergunta cadastrada com sucesso!</div>
    );
  };

  // Adicione lógica para mostrar ou ocultar a mensagem de sucesso
  {
    showSuccessMessage && <SuccessMessage />;
  }

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
                  const alternatives = [...questionData.alternatives];
                  alternatives[index].text = e.target.value;
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
          >
            Cadastrar Questão
          </button>
        </div>
      </div>
    </div>
  );
}
