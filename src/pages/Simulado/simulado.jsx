import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./simulado.css";
const simulado = () => {
  return (
    <div className="bg-simulado">
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="questoes ps-5">
              <Link to={`/prova-simulado/1`}>IBMEC - 2022 - ENADE Simulado - Direito</Link>
            </div>
            <div className=" bg-white radius-simulado">
              <h2 className="text-center">Todas as 35 questões da prova</h2>
              <div className="d-flex justify-content-evenly pt-3">
                <ul className="list-style">
                  <li>1. Direitos Humanos - 4 questões</li>
                  <li>2. Conhecimentos Gerais - 3 questões</li>
                  <li>3. Direito Constitucional - 8 questões</li>
                  <li>4. Direito Processual Penal - 2 questões</li>
                  <li>5. Sociologia - 2 questões</li>
                  <li>6. Direito Civil - 3 questões</li>
                  <li>7. Direito Empresarial (Comercial) - 1 questão</li>
                </ul>
                <ul className="list-style">
                  <li>8. Direito Penal - 3 questões</li>
                  <li>9. Direito Processual Civil - 2 questões</li>
                  <li>10. Geografia - 1 questão</li>
                  <li>11. Português - 1 questão</li>
                  <li>12. Direito do Trabalho - 1 questão</li>
                  <li>13. Direito Administrativo - 1 questão</li>
                  <li>14. Controle Externo - 1 questão</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
          <div className="questoes ps-5">
              <a href="">IBMEC - 2022 - ENADE Simulado - Direito</a>
            </div>
            <div className=" bg-white radius-simulado">
              <h2 className="text-center">Todas as 35 questões da prova</h2>
              <div className="d-flex justify-content-evenly pt-3">
                <ul className="list-style">
                <li>1. Direitos Humanos - 4 questões</li>
                  <li>2. Conhecimentos Gerais - 3 questões</li>
                  <li>3. Direito Constitucional - 8 questões</li>
                  <li>4. Direito Processual Penal - 2 questões</li>
                  <li>5. Sociologia - 2 questões</li>
                  <li>6. Direito Civil - 3 questões</li>
                  <li>7. Direito Empresarial (Comercial) - 1 questão</li>
                </ul>
                <ul className="list-style">
                <li>8. Direito Penal - 3 questões</li>
                  <li>9. Direito Processual Civil - 2 questões</li>
                  <li>10. Geografia - 1 questão</li>
                  <li>11. Português - 1 questão</li>
                  <li>12. Direito do Trabalho - 1 questão</li>
                  <li>13. Direito Administrativo - 1 questão</li>
                  <li>14. Controle Externo - 1 questão</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
          <div className="questoes ps-5">
              <a href="">IBMEC - 2022 - ENADE Simulado - Direito</a>
            </div>
            <div className=" bg-white radius-simulado">
              <h2 className="text-center">Todas as 35 questões da prova</h2>
              <div className="d-flex justify-content-evenly pt-3">
                <ul className="list-style">
                <li>1. Direitos Humanos - 4 questões</li>
                  <li>2. Conhecimentos Gerais - 3 questões</li>
                  <li>3. Direito Constitucional - 8 questões</li>
                  <li>4. Direito Processual Penal - 2 questões</li>
                  <li>5. Sociologia - 2 questões</li>
                  <li>6. Direito Civil - 3 questões</li>
                  <li>7. Direito Empresarial (Comercial) - 1 questão</li>
                </ul>
                <ul className="list-style">
                <li>8. Direito Penal - 3 questões</li>
                  <li>9. Direito Processual Civil - 2 questões</li>
                  <li>10. Geografia - 1 questão</li>
                  <li>11. Português - 1 questão</li>
                  <li>12. Direito do Trabalho - 1 questão</li>
                  <li>13. Direito Administrativo - 1 questão</li>
                  <li>14. Controle Externo - 1 questão</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="lista-questao ">
          <h2 className="text-center">Todas as 35 questões da prova</h2>
          
            <ol className="flex-wrap d-flex flex-column h-100 li-style">
              <li>Direitos Humanos</li>
              <li>Direitos da Mulher</li>
              <li>Direitos da Mulher</li>
              <li>Direitos Humanos</li>
              <li>Direitos da Mulher</li>
              <li>Direitos da Mulher</li>
              <li>Direitos Humanos</li>
              <li>Direitos da Mulher</li>
              <li>Direitos da Mulher</li>
              <li>Direitos Humanos</li>
              <li>Direitos da Mulher</li>
              <li>Direitos da Mulher</li>
              <li>Direitos Humanos</li>
              <li>Direitos da Mulher</li>
              <li>Direitos da Mulher</li>
            </ol>
          
        </div> */}
      </div>
    </div>
  );
};

export default simulado;
