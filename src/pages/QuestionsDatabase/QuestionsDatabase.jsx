import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./QuestionsDatabase.css";
import { getQuestions, getBankQuestionsResponseByStudent, postBankQuestionResponse } from "../../config/config";
import Questions from "../../components/Questions/Questions";
import { useAuth } from "../../context/AuthContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const QuestionsDatabase = () => {
  const { filtersLoad } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingShowQuestions, setIsLoadingShowQuestions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [studentResponses, setStudentResponses] = useState([]);
  const [showReponseQuestions, setShowReponseQuestions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [submiting, setSubmitting] = useState(false);
  const [submitingQuestionId, setSubmitingQuestionId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState({
    course_id: '',
    searchText: '',
    year: '',
    isSpecific: ''
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      setQuestions([]);
      setLoading(true);
      const response = await getQuestions(selectedFilter);
      const responseStudent = await getBankQuestionsResponseByStudent();
      const questionsForResponse = response['data'].filter(question => !responseStudent['data'].some(studentsQuestions => studentsQuestions.question._id === question._id));
      setQuestions(questionsForResponse);
      setStudentResponses(responseStudent['data']);
      setLoading(false);
    };
    if (!showReponseQuestions){
      fetchQuestions();
    }
  }, [selectedFilter]);


  const handleSubmit = async (questionId, selectedOptionId) => {
    if (showReponseQuestions !== true){
      const submitResponse = {
        question_id: questionId,
        selected_option_id: selectedOptionId
      };
      
      try {
        setSubmitting(true);
        setSubmitingQuestionId(questionId);
        const response = await postBankQuestionResponse(submitResponse);
  
        if (response.status === 201) {
          const rightAnswer = response.data.question.options.find((option) => option.correctOption === true);
          const question = questions.find(q => q._id === questionId);
          const correctOptionIndex = question.options.findIndex(option => option._id === rightAnswer._id);
          const letterMapping = ['A', 'B', 'C', 'D', 'E'];
          const correctOptionValue = letterMapping[correctOptionIndex];
          // Atualizar as opções selecionadas
          setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: selectedOptionId
          }));
          //const correct_option_id = response.data.question.options.find((option) => option._id === correctOptionId);
          // Atualizar as questões com a resposta correta ou incorreta
          setQuestions(prevQuestions => prevQuestions.map(question => {
            if (question._id === questionId) {
              return {
                ...question,
                
                isCorrect: rightAnswer._id === selectedOptionId,
                correctOptionValue 
              };
            }
            return question;
          }));
        }
      } catch (error) {
        console.error("Erro ao enviar resposta:", error);
      } finally {
        setSubmitting(false);
        setSubmitingQuestionId(null);
      }
    }
  };

  const handleOptionChange = (questionId, value) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionId]: value
    }));
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  useEffect(() => {
    if (showReponseQuestions){
      handleChange(true);
    }
  }, [selectedFilter]);

  const handleChange = async (value) => {
    setIsLoadingShowQuestions(true);
    setShowReponseQuestions(value);
    if (value == true) {
      setLoading(true);
      setQuestions([]);
    
      try {
        const response = await getQuestions(selectedFilter);
        const responseStudent = await getBankQuestionsResponseByStudent();
    
        const questionsForResponse = response.data.filter(question =>
          responseStudent.data.some(studentsQuestions => studentsQuestions.question._id === question._id)
        );
    
        const letterMapping = ['A', 'B', 'C', 'D', 'E'];
    
        const result = responseStudent.data.map(studentResponse => {
          const question = questionsForResponse.find(q => q._id === studentResponse.question._id);
    
          if (!question) {
            return {
              ...studentResponse,
              isCorrect: false,
              correctOptionValue: null
            };
          }
    
          const selectedOption = question.options.find(option => option._id === studentResponse.selected_option_id);
          const correctOption = question.options.find(option => option.correctOption === true);
          const correctOptionIndex = question.options.findIndex(option => option._id === correctOption._id);
          const correctOptionValue = letterMapping[correctOptionIndex];

          return {
            ...studentResponse,
            isCorrect: selectedOption ? selectedOption.correctOption : false,
            correctOptionValue: correctOptionValue
          };
        }).filter(studentResponse => studentResponse.correctOptionValue !== null); // Filtra questões com correctOptionValue null
    
        setQuestions(result);
      } catch (error) {
        console.error("Error fetching questions or responses:", error);
      } finally {
        setLoading(false);
      }
    }
     else {
      setLoading(true);
      setQuestions([]);
      const response = await getQuestions(selectedFilter);
      const responseStudent = await getBankQuestionsResponseByStudent();
      const questionsForResponse = response['data'].filter(question => !responseStudent['data'].some(studentsQuestions => studentsQuestions.question._id === question._id));
      setQuestions(questionsForResponse);
      setLoading(false);
    }
    setIsLoadingShowQuestions(false);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSelectedFilter({ ...selectedFilter, searchText });
  };

  return (
    <div className="bg pb-3">
      <NavBar />
      <div className="container QuestionsDatabase">
        <h1 className="bold-weight p-3 mt-3">Banco de Questões</h1>
        <div className="mt-2 mb-5 d-flex justify-content-center gap-3 flex-wrap">
          <div>
            <form onSubmit={handleSubmitSearch} className="search-form">
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Pesquisar"
                  className="height-input form-control form-control-color w-100 cursor-auto"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="button" onClick={handleSubmitSearch} className="search-button">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="search-icon"
                    size="xl"
                  />
                </button>
              </div>
            </form>
            <div className="form-check mt-3">
              <input onChange={(e) => handleChange(e.target.checked)} type="checkbox" disabled={isLoadingShowQuestions} className="form-check-input" />
              <label className="text-center">Exibir questões já feitas</label>
            </div>
          </div>
          <select
            name="course"
            className="form-control form-control-color QuestionsDatabase w-25"
            defaultValue={''}
            onChange={(e) => setSelectedFilter({ ...selectedFilter, course_id: e.target.value })}
          >
            <option value={''}>Todos os Cursos</option>
            {
              filtersLoad.length > 0 && filtersLoad[0]['values'].map((value, index) => (
                <option key={index} value={value._id}>{capitalizeFirstLetter(value.name)}</option>
              )) 
            }
          </select>
          <select
            name="especificOrGeneral"
            className="form-control form-control-color QuestionsDatabase w-25"
            defaultValue={true}
            onChange={(e) => setSelectedFilter({ ...selectedFilter, isSpecific: e.target.value })}
          >
             <option value={true}>Curso específico</option>
             <option value={false}>Não específico</option>
          </select>
          <select
            name="lastTenYears"
            className="form-control form-control-color QuestionsDatabase w-7"
            onChange={(e) => setSelectedFilter({ ...selectedFilter, year: e.target.value })}
          >
            <option selected value={''}>Selecionar ano</option>
          {
  
              filtersLoad.length > 0 && filtersLoad[1]['values'].map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))
          }
          </select>
        </div>
        {loading && (
          <h1 className="text-center mt-5 color-text bold-weight">
            Carregando...
          </h1>
        )}
        {!loading && questions.length === 0 && (
          <h1 className="text-center mt-5 color-text bold-weight">
            Nenhuma questão encontrada
          </h1>
        )}
        { !showReponseQuestions && questions.map((question, index) => (
          <div key={index} className="mb-5">
            <div className="bg-questions-database-box">
              <form>
                <Questions
                  key={question._id}
                  title={question.statements.map(
                    (statement) => statement.description
                  )}
                  options={question.options}
                  handleChange={(e) => handleOptionChange(question._id, e.target.id)}
                  disabled={question.isCorrect !== undefined || showReponseQuestions}
                  selectedOptionId={null}
                />
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-wrap">
                    <p className="me-3 color-text bold-weight mb-0 height-min-content">Fonte: UNEX</p>
                    <p className="color-text bold-weight mb-0 height-min-content">Ano: 2024</p>
                  </div>
                  <div className="d-flex justify-content-end me-5 align-items-baseline flex-wrap">
                  {question.isCorrect !== undefined && (
                      <p className={question.isCorrect ? "color-text-correct-answer-bank me-5" : "color-text-incorrect-answer-bank me-5"}>
                        {question.isCorrect ? "Parabéns! você acertou!" : `Infelizmente, você errou! A resposta correta é: ${question.correctOptionValue}`}
                      </p>
                    )}
                    <button onClick={() => handleSubmit(question._id, selectedOptions[question._id])} className={`btn btn-primary me-3`} disabled={question.isCorrect !== undefined || showReponseQuestions || submiting && submitingQuestionId === question._id } type="button">{ submiting && submitingQuestionId === question._id ? 'Enviando...' : 'Responder'}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ))}
        {showReponseQuestions && questions.map((question, index) => (
          <div key={index} className="mb-5">
            <div className="bg-questions-database-box">
              <form>
                <Questions
                  key={question.question._id}
                  title={question.question.statements.map(
                    (statement) => statement.description
                  )}
                  options={question.question.options}
                  selectedOptionId={question.selected_option_id} // passando a opção selecionada
                  handleChange={(e) => handleOptionChange(question.question._id, e.target.id)}
                  disabled={question.isCorrect !== undefined || showReponseQuestions}
                />
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-wrap">
                    <p className="me-3 color-text bold-weight mb-0 height-min-content">Fonte: UNEX</p>
                    <p className="color-text bold-weight mb-0 height-min-content">Ano: 2024</p>
                  </div>
                  <div className="d-flex justify-content-end me-5 align-items-baseline flex-wrap">
                  {question.isCorrect !== undefined && (
                      <p className={question.isCorrect ? "color-text-correct-answer-bank me-5" : "color-text-incorrect-answer-bank me-5"}>
                        {question.isCorrect ? "Parabéns! você acertou!" : `Infelizmente, você errou! A resposta correta é: ${question.correctOptionValue}`}
                      </p>
                    )}
                    <button onClick={() => handleSubmit(question._id, selectedOptions[question._id])} className={`btn btn-primary me-3`} disabled={question.isCorrect !== undefined || showReponseQuestions} type="button">Responder</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsDatabase;