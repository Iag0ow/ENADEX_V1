import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import FaqData from "../../assets/mock/FaqQuestions.json";
import "./Faq.css";

const Faq = () => {
  return (
    <>
      <NavBar search={true} />
      <div className="container">
        <h1 className="text-white text-center mb-5 pb-5 pt-3">FAQ - Perguntas frequentes</h1>
        <div class="accordion accordion-flush" id="accordionFlushExample">   
          {FaqData.map((item) => (
            <div key={item.id} className="accordion-item mb-5">
              <h2 className="accordion-header" id={`flush-heading${item.id}`}>
                <button
                  className="accordion-button collapsed person-text-faq"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${item.id}`}
                  aria-expanded="false"
                  aria-controls={`flush-heading${item.id}`}
                >
                  {item.question}
                </button>
              </h2>
              <div
                id={`flush-collapse${item.id}`}
                class="accordion-collapse collapse"
                aria-labelledby={`flush-heading${item.id}`}
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Faq;
