import React, { useState, useEffect } from "react";
import "./QuestionRegistration.css";
import { getCourses } from "../../config/config";
import { useDropzone } from "react-dropzone";
import closeIcon from "./img/close.png";
import fileIcon from "./img/file.png";

export default function QuestionRegistration() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showFileInput, setShowFileInput] = useState(true);
  const [options, setOptions] = useState([{ label: "A)", id: 0 }]);
  const [deletedOptions, setDeletedOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
  const [questionData, setQuestionData] = useState({
    course: "",
    question: "",
    alternatives: [],
  });

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

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpeg, image/jpg",
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setIsDragging(false);
      setShowFileInput(false);
    },
    onDragEnter: () => {
      setIsDragging(true);
    },
    onDragLeave: () => {
      setIsDragging(false);
    },
  });

  const removeFile = (indexToRemove) => {
    setUploadedFiles(
      uploadedFiles.filter((file, index) => index !== indexToRemove)
    );
  };

  const renderUploadedFiles = () => {
    return uploadedFiles.map((file, index) => (
      <div key={index} className="uploadedFileContainer">
        <img src={file.preview} alt={file.name} className="uploadedFileImage" />
        <img
          src={closeIcon}
          alt="Close"
          className="closeIcon"
          onClick={() => removeFile(index)}
        />
      </div>
    ));
  };
  const removeOption = (idToRemove) => {
    // Impede a remoção da primeira opção
    if (idToRemove === 0) {
      return;
    }

    // Guarda a letra da opção excluída
    const deletedOption = options.find((option) => option.id === idToRemove);
    setDeletedOptions([...deletedOptions, deletedOption.label.trim()]);

    // Remove a opção
    const updatedOptions = options.filter((option) => option.id !== idToRemove);

    // Atualiza os IDs das opções
    const reorderedOptions = updatedOptions.map((option, index) => ({
      ...option,
      id: index,
    }));

    // Atualiza as opções
    setOptions(reorderedOptions);

    // Remove a marcação da opção correta se a opção removida era a correta
    if (correctOption === idToRemove) {
      setCorrectOption(null);
    }
  };

  const addOption = () => {
    if (options.length >= 5) {
      return;
    }

    // Usa a letra da opção excluída, se houver
    let nextLetter;
    if (deletedOptions.length > 0) {
      // Removemos a última letra da lista de opções excluídas
      const lastDeletedOption = deletedOptions.pop();
      // Removemos os parênteses extras, se houver
      nextLetter = lastDeletedOption.replace(/[()]/g, "");
    } else {
      // Caso contrário, determinamos a próxima letra disponível
      const lastOptionLetter = options[options.length - 1].label
        .trim()
        .charAt(0);
      nextLetter = String.fromCharCode(lastOptionLetter.charCodeAt(0) + 1);
    }

    // Insere a nova opção com a letra obtida
    const newOption = { label: ` ${nextLetter})`, id: options.length };

    // Insere a nova opção na posição correta para manter a ordem alfabética
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
    // Mapeia o ID para a letra correspondente
    // const optionLetter = String.fromCharCode(65 + id);

    if (correctOption === id) {
      setCorrectOption(null);
      // console.log("Opção correta desmarcada.");
    } else {
      setCorrectOption(id);
      // console.log(`Alternativa correta: ${optionLetter}`);
    }
  };

  const handleQuestionRegistration = () => {
    // Construir objeto com dados da pergunta
    const alternatives = options.map((option) => ({
      label: option.label,
      text: document.getElementById(`optionText_${option.id}`).value,
    }));

    // Encontrar a letra da alternativa correta
    let correctOptionLetter = null;
    options.forEach((option) => {
      if (option.id === correctOption) {
        correctOptionLetter = option.label.trim().charAt(0); // Obtém a letra da alternativa correta
      }
    });

    const questionData = {
      course: selectedCourse,
      question: document.getElementById("questionInput").value,
      alternatives: alternatives,
      correctOption: correctOptionLetter, // Definindo a letra da alternativa correta
    };

    // Exibir dados da pergunta no console
    console.log("Dados da pergunta:", questionData);

    // Enviar dados para API
    // Aqui você deve fazer a chamada para a API com os dados da pergunta, incluindo o correctOption
  };

  return (
    <div className="QuestionRegistrationContainer">
      <div className="QuestionRegistrationTitle">
        <h1>Cadastro de perguntas</h1>
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

        <select className="selectNaoSei" id="NaoSeiOqueIssoFaz">
          <option value="">Programação Orientada a Objetos (POO)</option>
          <option>???</option>
        </select>
      </div>

      <div className="QuestionRegistrationInputs">
        <textarea
          id="questionInput" // Adicionei um ID para identificar o textarea da pergunta
          className="inputQuestion"
          placeholder="Pergunta"
          rows={1}
          onChange={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
      </div>
      <div className="QuestionRegistrationImages">
        <div
          className={`QuestionRegistrationImageInput ${
            isDragging ? "dragging" : ""
          }`}
          style={{ height: uploadedFiles.length ? "auto" : "168px" }}
          {...getRootProps()}
        >
          {showFileInput && <input {...getInputProps()} />}
          {isDragging ? (
            <div>
              <img src={fileIcon} alt="File" className="fileIcon" />
              <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
            </div>
          ) : (
            <div onClick={() => setShowFileInput(true)}>
              <img src={fileIcon} alt="File" className="fileIcon" />
              <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
            </div>
          )}
          <div className="uploadedFilesGrid">{renderUploadedFiles()}</div>
        </div>
      </div>
      <div className="QuestionRegistrationAlternatives">
        {options.map((option, index) => (
          <div key={option.id} className="optionContainer">
            <div className="optionInputContainer">
              <span>{option.label}</span>
              <textarea
                id={`optionText_${option.id}`} // Adicionei um ID para identificar o textarea da opção
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
                Remover
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
