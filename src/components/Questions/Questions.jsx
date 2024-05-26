import React from "react";
import QuestionsLetters from "../../assets/mock/QuestionsLetters.json";

export default function Questions({ title, options, handleChange }) {
  return (
    <div className="question-container">
      <h5 className="question-title color-text">{title}</h5>
      {options &&
        options.map((option, index) => (
          <div key={index} className="option d-flex align-items-center justify-content-start flex-wrap">
            <input
              type="radio"
              value={option.correctOption}
              name={title}
              id={option._id}
              className="checkbox"
              onClick={handleChange}
            />
             &nbsp;
            &nbsp;
            {QuestionsLetters[index].letter})
            &nbsp;
            <label htmlFor={option._id} className="option-label">{option.description}</label>
          </div>
        ))}
    </div>
  );
}
