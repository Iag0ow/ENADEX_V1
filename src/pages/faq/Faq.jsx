import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import NavBarNoAuth from "../../components/NavBarNoAuth/NavBarNoAuth";
import FaqData from "../../assets/mock/FaqQuestions.json";
import { Accordion } from "react-bootstrap";
import "./Faq.css";
import { useAuth } from "../../context/AuthContextProvider";

const Faq = () => {
  const { signed } = useAuth();

  return (
    <>
      {signed  ? <NavBar /> : <NavBarNoAuth />}
      {/* <NavBarNoAuth search={true} /> */}
      <div className="container">
        <h1 className="text-white text-center mb-5 pb-5 pt-3">
          FAQ - Perguntas frequentes
        </h1>
        {FaqData.map((item) => (
          <Accordion key={item.id} defaultActiveKey="1">
            <Accordion.Item className="mb-5" eventKey="0">
              <Accordion.Header>{item.question}</Accordion.Header>
              <Accordion.Body>{item.answer}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default Faq;
