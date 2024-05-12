import React from "react";
import FaqData from "../../assets/mock/FaqQuestions.json";
import { Accordion } from "react-bootstrap";
import "./Faq.css";

const Faq = () => {
  return (
    <>
        {FaqData.map((item) => (
          <Accordion key={item.id} defaultActiveKey="1">
            <Accordion.Item className="mb-3" eventKey="0">
              <Accordion.Header>{item.question}</Accordion.Header>
              <Accordion.Body>{item.answer}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
    </>
  );
};

export default Faq;
