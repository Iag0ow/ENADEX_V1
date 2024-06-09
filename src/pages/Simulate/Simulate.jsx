import React, { useEffect, useState } from "react";
import "./Simulate.css";
import QuestionsMarkedBox from "../../components/QuestionsMarkedBox/QuestionsMarkedBox";
import { getQuestionsAndMockById, putExamAnswers, getExamAnswers, finishExam } from "../../config/config";
import Loading from "../Loading/Loading";
import { formatTime } from "../../Hooks/formatTime";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";

export default function Simulate() {
  const [mock, setMock] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(null);
  const [mockName, setMockName] = useState(null);
  const { id } = useParams();
  const [idMock, setIdMock] = useState(id);
  const [questionsMarked, setQuestionsMarked] = useState([]);
  const [responseUserAnswers, setResponseUserAnswers] = useState([]);
  const [savingQuestion, setSavingQuestion] = useState(false);

  const navigate = useNavigate();
  const letterMapping = ['A', 'B', 'C', 'D', 'E'];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, status, dataMock } = await getQuestionsAndMockById(idMock);
      const responseExamAnswers = await getExamAnswers(idMock);
      if (status !== 200) return navigate('/simulados');

      const sortedAnswers = new Array(data.length).fill(null);
      responseExamAnswers.data.forEach(answer => {
        const questionIndex = data.findIndex(question => question._id === answer.question_id);
        if (questionIndex !== -1) {
          sortedAnswers[questionIndex] = answer.selected_option_id;
        }
      });

      setMock(data);
      const duration = dataMock.duration;
      setMockName(dataMock.mockName);
      setResponseUserAnswers(responseExamAnswers.data);
      setQuestionsMarked(sortedAnswers);
      setCounter(duration);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (counter === 0) {
      Swal.fire({
        icon: 'success',
        title: 'Tempo esgotado!',
        text: 'Simulado encerrado e enviado !',
      }).finally(async () => {
        await finishExam(idMock);
        navigate('/simulados');
      });
    }
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [counter]);

  const handleNext = async () => {
    const body = {
      question_id: mock[page]._id,
      selected_option_id: questionsMarked[page]
    }
    setSavingQuestion(true);
    const selectedOptionId = questionsMarked[page] !== null ? body : { ...body, selected_option_id: null };
    await putExamAnswers(selectedOptionId, idMock);
    setSavingQuestion(false);
    if (page < mock.length - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleQuestionClick = (questionIndex, selectedOptionId) => {
    const newQuestionsMarked = [...questionsMarked];
    if (newQuestionsMarked[page] === selectedOptionId) {
      newQuestionsMarked[page] = null;
    } else {
      newQuestionsMarked[page] = selectedOptionId;
    }
    setQuestionsMarked(newQuestionsMarked);
  };

  const handleFinish = async () => {
    const body = {
      question_id: mock[page]._id,
      selected_option_id: questionsMarked[page]
    }
    if (questionsMarked[page] !== null) {
      setSavingQuestion(true);
      await putExamAnswers(body, idMock);
      setSavingQuestion(false);
    }
    Swal.fire({
      title: 'Deseja realmente finalizar o simulado?',
      text: 'Isso enviará suas respostas e encerrará o simulado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await finishExam(idMock);
        navigate('/simulados');
      }
    });
  };

  return (
    <>
      <header className="headerGuideline">
        {loading ? (
          <h1 className="simulatedName">Carregando Título...</h1>
        ) : (
          <h1 className="simulatedName">
            {mockName && mockName.toUpperCase()}
          </h1>
        )}
      </header>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-5">
          <QuestionsMarkedBox
            lengthQuestions={mock.length}
            questionsMarked={questionsMarked.map((selectedOptionId, index) => selectedOptionId !== null && selectedOptionId !== 'null' ? index + 1 : null)}
            responseUserAnswers={responseUserAnswers.map(answer => answer.question_id)}
          />
          <div>
            <b style={{ fontSize: "24px", marginRight: "10px" }}>Tempo restante</b> <span className="text-Date">{formatTime(counter)}</span>
          </div>
        </div>
        {loading && (
          <h1 className="text-center mt-5 color-text bold-weight">
            Carregando...
          </h1>
        )}
        {mock.length > 0 && (
          <div key={page}>
            <h3 className="mt-4">
              <b>Questão {page + 1}</b>
            </h3>
            <div className="borderSimulate">
              <h5
                dangerouslySetInnerHTML={{
                  __html: mock[page]["statements"][0]["description"],
                }}
              ></h5>
            </div>
            <div className="QuestionRegistrationAlternatives">
              <div className="optionsQuestion">
                {mock[page]["options"].map((alternative, index) => (
                  <div
                    key={index}
                    className={`optionInputContainer`}
                    onClick={() => handleQuestionClick(index, alternative._id)}
                  >
                    <label
                      className={`inputOptionSimulate not-selected mt-3 ${
                        questionsMarked[page] === alternative._id ? 'selected' : ''
                      }`}
                    >
                      {letterMapping[index]}) {alternative.description}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-end">
          {page > 0 && (
            <button className="btnSimulate" onClick={handlePrevious}>
              Voltar
            </button>
          )}
          {page < mock.length - 1 && (
            <button className="btnSimulate" onClick={handleNext} disabled={savingQuestion}>
              Próximo
            </button>
          )}
          {page === mock.length - 1 && (
            <button 
              className="btnSimulateFinalize" 
              onClick={handleFinish} 
              disabled={savingQuestion}
            >
              Finalizar
            </button>
          )}
        </div>
      </div>
    </>
  );
}
