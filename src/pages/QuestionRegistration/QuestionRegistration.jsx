import React, { useState, useEffect } from "react";
import "./QuestionRegistration.css";
import { getCourses } from "../../config/config";
import SimulatedRegisterComponent from "./components/SimulatedRegisterComponent";
import { createQuestion } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../components/NavBar/NavBar";

export default function QuestionRegistration() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [questionYear, setQuestionYear] = useState("");
  const [deletedOptions, setDeletedOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
  const [isSimulated, setIsSimulated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [simulatedId, setSimulatedId] = useState("");
  const optionsInitialValues = [{ label: "A)", id: 0 }];

  const [options, setOptions] = useState(optionsInitialValues);
  const questionDataInitialValues = {
    statements: "",
    question: "",
    alternatives: [{ text: "" }],
    correctOption: null,
  };

  const [questionData, setQuestionData] = useState(questionDataInitialValues);
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
          console.error("Error fetching courses:", response.status);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
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
    const selectedCourseId = event.target.value;
    setSelectedCourse(selectedCourseId);
    setQuestionData({ ...questionData, course: selectedCourseId });
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    if (/^\d{0,4}$/.test(year)) {
      setQuestionYear(year);
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
    const statements = [
      {
        description: document
          .getElementById("questionInput")
          .value.replace(/\n/g, "<br />"),
      },
    ];

    const optionsData = options.map((option, index) => ({
      description: document
        .getElementById(`optionText_${option.id}`)
        .value.replace(/\n/g, "<br />"),
      correctOption: correctOption === option.id,
    }));

    const selectedCourseObject = courses.find(
      (course) => course._id === selectedCourse
    );
    const courseId = selectedCourseObject ? selectedCourseObject._id : "";

    if (!courseId) {
      console.error("The selected course ID is not valid.");
      setIsLoading(false);
      return;
    }

    const questionData = {
      statements: statements,
      options: optionsData,
      isSpecific: true,
      course_id: courseId,
      active: true,
      year: questionYear,
    };

    setCorrectOption(null);
    setOptions(optionsInitialValues);
    const optionText0 = document.getElementById("optionText_0");
    const questionInput = document.getElementById("questionInput");
    if (optionText0 || questionInput) {
      optionText0.value = "";
      questionInput.value = "";
    }
    setQuestionYear("");
    setSelectedCourse("");
    try {
      const response = await createQuestion(questionData);
      if (response.ok) {
        toast.success("Question created successfully!", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
      } else {
        console.error("Failed to create question");
        toast.error("Error creating question", {
          autoClose: 1000,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating question", {
        autoClose: 1000,
      });
      setIsLoading(false);
    }
  };

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2004; year < currentYear; year++) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return years;
  };
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="QuestionRegistrationTitle">
          <h1>{isSimulated ? "Registrar Simulado" : "Registrar Questão"}</h1>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-5 flex-wrap">
          <select
            className="form-control w-7"
            id="courseSelect"
            value={selectedCourse}
            onChange={handleCourseChange}
          >
            <option value="" disabled>
              Curso
            </option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
          <select
            disabled={isSimulated}
            value={questionYear}
            onChange={handleYearChange}
            className="form-control w-7"
          >
            <option value="" disabled>
              Ano
            </option>
            {renderYearOptions()}
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
        {isSimulated && (
          <SimulatedRegisterComponent
            selectedCourse={selectedCourse}
            simulatedId={simulatedId}
          />
        )}

        {!isSimulated && (
          <div className="QuestionRegistrationInputs">
            <label className="questionLabel">Enunciado</label>
            <textarea
              id="questionInput"
              className="inputQuestion"
              placeholder="Ex: Quanto é 2+2?"
              rows={1}
              onChange={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
                setQuestionData({ ...questionData, question: e.target.value });
              }}
            />
          </div>
        )}

        {!isSimulated && (
          <div className="QuestionRegistrationAlternatives">
            <label className="alternativesLabel">Alternativas</label>
            {options.map((option, index) => (
              <div key={option.id} className="optionContainer">
                <div className="optionInputContainer">
                  <span>{option.label}</span>
                  <textarea
                    id={`optionText_${option.id}`}
                    className="inputOption"
                    placeholder={`Alternativa ${option.label}`}
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
                    required
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
            <div className="QuestionRegistrationButtonsHolder flex-wrap">
              <button className="QuestionButton" onClick={addOption}>
                Adicionar
              </button>
              <button
                className="QuestionButton"
                onClick={handleQuestionRegistration}
                disabled={
                  isLoading ||
                  !selectedCourse ||
                  !questionYear ||
                  !questionData.question ||
                  !{ label: "A)", id: 0 } ||
                  !{ label: "B)", id: 1 } ||
                  correctOption === null
                } 
              >
                {isLoading ? "Carregando..." : "Registrar Questão"}
              </button>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}
