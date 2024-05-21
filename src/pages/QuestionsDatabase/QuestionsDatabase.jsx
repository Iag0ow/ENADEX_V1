import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./QuestionsDatabase.css";
import { getQuestions } from "../../config/config";
import Questions from "../../components/Questions/Questions";

const QuestionsDatabase = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [makedQuestions, setMakedQuestions] = useState();
  const [idQuestion, setIdQuestion] = useState();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const response = await getQuestions();
      setLoading(false);
      setQuestions(response.data);
    };

    fetchQuestions();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(makedQuestions);
  }

  return (
    <div className="bg pb-3">
      <NavBar />
      <div className="container QuestionsDatabase">
        <h1 className="bold-weight p-3 mt-3">Banco de Questões</h1>
        <div className="mt-2 mb-5 d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Pesquisar"
            className="height-input form-control form-control-color w-25"
          />
          <select
            name="lastTenYears"
            className="form-control form-control-color QuestionsDatabase w-25"
            id=""
          >
            <option value="2024">Programação Web</option>
            <option value="2023">Algoritmos</option>
            <option value="2022">Matemática</option>
            <option value="2021">Dark Web</option>
          </select>
          <select
            name="lastTenYears"
            className="form-control form-control-color QuestionsDatabase w-25"
            id=""
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
          </select>
          <button className="btn btn-primary">Cadastrar Questão</button>
        </div>
        {loading && (
          <h1 className="text-center mt-5 color-text bold-weight">
            Carregando...
          </h1>
        )}
        {questions &&
          questions.map((question, index) => (
            <div key={index} className="mb-5">
              <p className="color-text p-0 m-0 mb-2">#ENADXQ0001</p>
              <div className="bg-questions-database-box">
                <form onSubmit={handleSubmit} >
                  <Questions
                    key={question._id}
                    title={question.statements.map(
                      (statement) => statement.description
                    )}
                    options={question.options}
                    handleChange={setMakedQuestions}
                  />
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <p className="me-3 color-text bold-weight">Fonte: UNEX</p>
                      <p className="color-text bold-weight">Ano: 2024</p>
                    </div>
                    <div className="d-flex justify-content-end me-5">
                      <button className="btn btn-primary" type="submit">
                        Responder
                      </button>
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
