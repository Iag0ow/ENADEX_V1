import React from "react";
import "./QuestionsMarkedBox.css";

function QuestionsMarkedBox({ lengthQuestions, questionsMarked, responseUserAnswers }) {
  const questions = Array.from({ length: lengthQuestions }, (_, index) => index + 1);

  return (
    <div>
      <div className="question-queue">
        <div className="">
          <div className="d-flex flex-wrap">
            {questions.map((questionNumber) => (
              <div key={questionNumber} className="question-circle">
                <div
                  className={`circle ${
                    questionsMarked.includes(questionNumber) ? "bg-success" : ""
                  }`}
                  style={{
                    backgroundColor: responseUserAnswers.includes(questionNumber) ? "#d9d9d9" : ""
                  }}
                >
                  {questionNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsMarkedBox;
