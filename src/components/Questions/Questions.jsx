import React from "react";
import QuestionsLetters from "../../assets/mock/QuestionsLetters.json";

export default function Questions({ title, options, handleChange, disabled, selectedOptionId }) {
  return (
    <div className="question-container">
      <h5 className="question-title color-text"
      dangerouslySetInnerHTML={{ __html: title }}
      ></h5>
      {options &&
        options.map((option, index) => (
          <div key={index} className="option d-flex align-items-center justify-content-start flex-wrap">
            <input
              type="radio"
              name={title}
              id={option._id}
              className="checkbox"
              onClick={handleChange}
              disabled={disabled}
              value={QuestionsLetters[index].letter}
              {...(selectedOptionId === null ? {} : { checked: selectedOptionId === option._id })}
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

