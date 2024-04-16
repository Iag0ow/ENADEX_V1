import "./provaSimulado.css";
import NavBar from "../../components/NavBar/NavBar";
const provaSimulado = () => {
  return (
    <div className="bg-simulado">
      <NavBar/>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="questoes ps-5 d-flex justify-content-center">
              <a href="">IBMEC - 2022 - ENADE Simulado - Direito</a>
            </div>
            <div className=" bg-white radius-simulado">
              <h3 className="text-left ps-5 pt-3 mb-4 enunciado-simulado">
                (SECIO - 2020) perere e parara um pergunta completamente
                enviasada e com base de conhecimento solido no assunto super
                interessante e nos conformes da faculdade e bla bla bla?
              </h3>

              <div class="ps-5">
                <form action="">
                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta1"
                      name="resposta"
                      value="resposta1"
                    />
                    <label className="label-resposta" for="resposta1"><span>A ) </span>resposta 1</label>
                  </div>

                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta2"
                      name="resposta"
                      value="resposta2"
                    />
                    <label className="label-resposta" for="resposta2"><span>B ) </span>resposta 2</label>
                  </div>

                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta3"
                      name="resposta"
                      value="resposta3"
                    />

                    <label className="label-resposta" for="resposta3"><span>C ) </span>resposta 3</label>
                  </div>

                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta4"
                      name="resposta"
                      value="resposta4"
                    />
                    <label className="label-resposta" for="resposta4 "><span>D ) </span>resposta 4</label>
                  </div>
                </form>
              </div>
              <hr />
              <h3 className="text-left ps-5 pt-3 mb-4 enunciado-simulado">
                (SECIO - 2020) perere e parara um pergunta completamente
                enviasada e com base de conhecimento solido no assunto super
                interessante e nos conformes da faculdade e bla bla bla?
              </h3>
              
              <div class="ps-5">
                <form action="">
                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta1"
                      name="resposta"
                      value="resposta1"
                    />
                    <label className="label-resposta" for="resposta1"><span>A ) </span>resposta 1</label>
                  </div>

                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta2"
                      name="resposta"
                      value="resposta2"
                    />
                    <label className="label-resposta" for="resposta2"><span>B ) </span>Resposta 2</label>
                  </div>

                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta3"
                      name="resposta"
                      value="resposta3"
                    />

                    <label className="label-resposta" for="resposta3"><span>C ) </span>Resposta 3</label>
                  </div>

                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta4"
                      name="resposta"
                      value="resposta4"
                    />
                    <label className="label-resposta" for="resposta4 "><span>D ) </span>Resposta 4</label>
                  </div>
                </form>
              </div>
              <hr /> 
              <h3 className="text-left ps-5 pt-3 mb-4 enunciado-simulado">
                (SECIO - 2020) perere e parara um pergunta completamente
                enviasada e com base de conhecimento solido no assunto super
                interessante e nos conformes da faculdade e bla bla bla?
              </h3>
              <div class="ps-5">
                <form action="">
                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta1"
                      name="resposta"
                      value="resposta1"
                    />
                    <label className="label-resposta" for="resposta1"><span>A ) </span>Resposta 1</label>
                  </div>

                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta2"
                      name="resposta"
                      value="resposta2"
                    />
                    <label className="label-resposta" for="resposta2"><span>B ) </span>Resposta 2</label>
                  </div>

                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta3"
                      name="resposta"
                      value="resposta3"
                    />

                    <label className="label-resposta" for="resposta3"><span>C ) </span>Resposta 3</label>
                  </div>

                  <div className="radio-container">
                    <input
                      type="radio"
                      id="resposta4"
                      name="resposta"
                      value="resposta4"
                    />
                    <label className="label-resposta" for="resposta4 "><span>D ) </span>Resposta 4</label>
                  </div>
                </form>
              </div>
            </div>
            

          </div>
        </div>
       
        
       <div className="w-100 d-flex justify-content-center m-5 "><button className="buttonLogin">Finalizar</button></div>
      </div>
    </div>

  );
};

export default provaSimulado;
