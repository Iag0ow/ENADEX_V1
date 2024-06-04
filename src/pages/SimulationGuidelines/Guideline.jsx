import React, { useState } from "react";
import "./Guideline.css";
import Footer from "../../components/Footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { startSimulated } from "../../config/config";

export default function Simulated_Guideline() {
  const location = useLocation();
  const { simulatedId, simulatedName, simulatedDuration } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 

  const handleStartSimulated = async () => {
    try {
      setError(null);
      if (!simulatedId) {
        throw new Error("Simulated ID not found!"); 
      }
      setIsLoading(true);
      const result = await startSimulated(simulatedId); 
      // console.log("Generated mock_id:", result.mock_id);
      window.location.reload();
    } catch (error) {
      // console.error("Failed to start simulated:", error);
      setError(error.message); 
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <header className="headerGuideline">
        <h1 className="simulatedName">
         {simulatedName}
        </h1>
      </header>

      <div className="contentGuideline">
        <div className="guidelineContent">
          <div className="guidelineListContainer">
            <p className="guidelineTitle">Orientações para o Simulado</p>
            <div className="conclusionTime">
              Tempo de conclusão do simulado:{" "}
              <span className="timerSimulated">{formatDuration(simulatedDuration)}</span>
            </div>
            <p className="largerText">Duração do simulado</p>
            <ul className="bulletList">
              <li>
                O tempo de realização do simulado pelo discente deverá ocorrer
                no prazo de {formatDuration(simulatedDuration)} horas;
              </li>
            </ul>

            <p className="largerText">Visualizando o enunciado</p>
            <ul className="bulletList">
              <li>
                Ao iniciar o simulado, no centro da tela, o aluno verá o
                enunciado da questão; abaixo das questões, será apresentado as
                alternativas;{" "}
              </li>
              <li>
                No canto superior direito da tela, será apresentado o timer
                contando o tempo restante;
              </li>
              <li>
                Ao clicar em uma das alternativas, a resposta será computada
                automaticamente no gabarito, ao lado esquerdo da tela na parte
                superior;
              </li>
              <li>
                Selecione a alternativa que julgar correta e clique em próxima
                questão para ter acesso a questão seguinte;
              </li>
            </ul>

            <p className="largerText">Respondendo as questões</p>
            <ul className="bulletList">
              <li>
                É possível voltar para questões anteriores clicando no número da
                questão no gabarito à esquerda. Ao usar esse mesmo recurso, é
                possível selecionar qualquer questão da prova. Não é necessário
                resolvê-las de forma linear;{" "}
              </li>
              <li>
                Ao terminar as questões, selecione a opção finalizar e enviar
                simulado;
              </li>
            </ul>

            <p className="largerText">Finalizando o simulado</p>
            <ul className="bulletList">
              <li>
                Em seguida, um pop-up será exibido para que confirme a
                finalização. Confira se todas as questões disponíveis no
                simulado foram respondidas em seguida clique em SIM, e FINALIZAR
                SIMULADO. Caso queira modificar alguma das alternativas
                disponíveis na questão, clique em CANCELAR;{" "}
              </li>
              <li>
                ATENÇÃO: Após finalizar a prova não será possível retornar;
              </li>
            </ul>

            <p className="largerText">Resultado prévio</p>
            <ul className="bulletList">
              <li>
                Após finalizar, a plataforma exibirá o percentual e a quantidade
                de acertos, bem como o tempo dedicado pelo aluno na realização
                do simulado. Mas atenção, essa tela será apresentada somente ao
                finalizar o simulado e não será possível retornar.{" "}
              </li>
              <li>
                Caso deseje consultar posteriormente, o histórico de realização
                do respectivo simulado ficará registrado na plataforma.
              </li>
              <li>
                O gabarito e seus resultados serão disponibilizados somente após
                o término do período de execução da realização do simulado.{" "}
              </li>
            </ul>
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          className="btnStartSimulated"
          onClick={handleStartSimulated}
          disabled={isLoading}
        >
          {isLoading ? <div className="spinner"></div> : "Iniciar Simulado"}
        </button>
        <Link style={{ textDecoration: "underline", marginTop: "5px" }} onClick={handleBackClick}>Voltar</Link>
      </div>
      <Footer />
    </div>
  );
}
