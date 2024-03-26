import "./style.css";

export function FormRegister() {
  return (
    <form className="mt-2">
      <div className="row">
        <div className="col-md-6 d-flex flex-column">
          <div className="form-group mb-3 mx-auto">
            <input
              type="text"
              className="form-control form-control-lg custom-width largure-input text-center"
              id="nameComplet"
              placeholder="Nome Completo"
            />
          </div>

          <div className="form-group mb-3 mx-auto">
            <input
              type="text"
              className="form-control form-control-lg custom-width largure-input text-center"
              id=""
              placeholder="Número de matrícula"
            />
          </div>

          <div className="form-group mb-3 mx-auto">
            <input
              type="password"
              className="form-control form-control-lg custom-width largure-input text-center"
              id="password"
              placeholder="Senha"
            />
          </div>

          <div className="form-group mb-3 mx-auto">
            <input
              type="password"
              className="form-control form-control-lg custom-width largure-input text-center"
              id="ConfirmPassword"
              placeholder="Confirmar senha"
            />
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column">
          <div className="form-group mb-3 mx-auto">
            <input
              type="email"
              className="form-control form-control-lg custom-width largure-input text-center"
              id="email"
              placeholder="E-mail"
            />
          </div>

          <div className="form-group mb-3 mx-auto">
            <input
              type="text"
              className="form-control form-control-lg custom-width largure-input text-center"
              id="course"
              placeholder="Curso"
            />
          </div>

          <div className="form-group mb-3 mx-auto">
            <input
              type="text"
              className="form-control form-control-lg custom-width largure-input text-center"
              id="currentSemester"
              placeholder="Semestre atual"
            />
          </div>

          <div className="form-group mb-3 mx-auto">
            <select
              className="form-control form-control-lg largure-input text-center"
              id="selectUnit"
              placeholder="Selecione sua unidade"
            >
              <option value="">Selecione sua unidade</option>
              <option value="Itabuna">Itabuna</option>
              <option value="Feira de Santana">Feira de Santana</option>
              <option value="Jequié">Jequié</option>
              <option value="Vitória da Conquista">Vitória da Conquista</option>
              <option value="Salvador">Salvador</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-success">
        Cadastrar
      </button>
    </form>
  );
}
