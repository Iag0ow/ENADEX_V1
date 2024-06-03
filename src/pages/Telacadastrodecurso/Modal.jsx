import React from 'react';
import './Modal.css';

const Modal = ({ showModal, onClose, onSubmit, courseName, setCourseName, courseDesc, setCourseDesc, onDeleteCourse }) => {
  if (!showModal) {
    return null;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  const handleDelete = () => {
    onDeleteCourse();
    onClose();
  };

  return (
    <div id="courseModal" className="modalCo">
      <div className="modal-contentCo">
        <span className="closeCo" onClick={onClose}>&times;</span>
        <div className="content-header1">
          <h1>
            <img src="https://img.icons8.com/ios/50/000000/open-book.png" alt="Cursos Icon" /> Cadastro de Cursos
          </h1>
        </div>
        <form id="courseForm" onSubmit={handleFormSubmit}>
          <div className="form-groupCo">
            <div className="input-groupCo">
              <label htmlFor="courseName">Nome do Curso</label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                placeholder="Insira o curso"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>
            <div className="input-groupCo">
              <label htmlFor="courseDesc">Descrição</label>
              <input
                type="text"
                id="courseDesc"
                name="courseDesc"
                placeholder="Insira a descrição"
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-buttonsCo">
            <button type="submit" className="add-btnmodalCo">
              Cadastrar
            </button>
            <button type="button" className="remove-btnmodalCo" onClick={handleDelete}>
              Remover
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
