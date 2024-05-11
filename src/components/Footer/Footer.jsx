import React from "react";
import "./Footer.css";
import marca from "../../assets/marca-dagua.png";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container d-flex justify-content-between align-items-center mt-5">
          <div className="text-white mt-4">
            <p className="m-0 p-0">Copyright © {new Date().getFullYear()}.</p>
            <p>Todos os direitos reservados.</p>
          </div>
          <img src={marca} className="marca" alt="Logo" />
        </div>
      </div>
    </>
  );
};

export default Footer;
