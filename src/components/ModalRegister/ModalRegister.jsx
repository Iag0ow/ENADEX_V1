import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import facebook from "../../assets/icons/facebook.png";
import google from "../../assets/icons/google.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";
import "./ModalRegister.css";
import { studentRegister, getCourses } from "../../config/config";
import LogoEnadex from "../../assets/LogoEnadexX.png";

// Função utilitária para capitalizar a primeira letra de cada palavra
const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ModalRegister = (props) => {
  const { modalShow, setModalShow } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [registration, setRegistration] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        if (response.status === 200) {
          const capitalizedCourses = response.data.map((course) => ({
            ...course,
            name: capitalizeWords(course.name),
          }));
          setCourses(capitalizedCourses);
        } else {
          console.error("Erro ao buscar cursos:", response.status);
        }
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleClick = () => {
    if (!modalShow) {
      props.onHide();
      setModalShow(true);
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setSelectedCourseId("");
    setSelectedUnit("");
    setSelectedSemester("");
    setRegistration("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccessMessage("");

    // Fechar o modal
    props.onHide();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (!name) throw new Error("É necessário informar o nome do usuário.");
      if (!registration)
        throw new Error(
          "É necessário informar o número da matrícula do usuário."
        );
      if (!password)
        throw new Error("É necessário informar a senha do usuário.");
      if (!selectedSemester)
        throw new Error("É necessário informar o semestre do usuário.");
      if (!selectedCourseId)
        throw new Error("É necessário informar o curso do usuário.");
      if (!selectedUnit)
        throw new Error("É necessário informar a unidade do usuário.");
      if (password !== confirmPassword)
        throw new Error(
          "As senhas não correspondem. Por favor, digite novamente."
        );

      const registerForm = {
        name,
        email,
        registration,
        password,
        semester: selectedSemester,
        course_id: selectedCourseId,
        unity: selectedUnit,
      };
      const response = await studentRegister(registerForm);

      if (response.status === 201) {
        setError(null);
        setSuccessMessage("Registro realizado com sucesso!");
        setTimeout(() => {
          setSuccessMessage("");
          props.onHide();
          window.location.reload();
        }, 3000);
      } else {
        setError(
          "Ocorreu um erro ao registrar o usuário. Por favor, tente novamente."
        );
        setError(response.error.message);
      }
    } catch (error) {
      setError(error.message);
      console.error("Erro ao registrar o usuário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Body className="p-5">
          <div className="d-flex justify-content-center mb-4">
            <img src={LogoEnadex} alt="" className="logo-enadex" />
          </div>
          <h5 className="text-center mb-4">Para continuar, acesse sua conta</h5>
          {/* <div className="d-flex justify-content-evenly">
            <Button variant="primary" className="me-2" onClick={props.onHide}>
              <span className="me-2">
                <img src={facebook} alt="" />
              </span>
              Continuar com o Facebook
            </Button>
            <Button
              variant="white"
              className="text-black border button-google"
              onClick={props.onHide}
            >
              <span className="me-2">
                <img src={google} alt="" />
              </span>
              Continuar com o Google
            </Button>
          </div> */}
          <div className="container-login mb-3">
            <div className="line"></div>
            <div className="text">ou acesse com e-mail e senha</div>
            <div className="line"></div>
          </div>
          <form onSubmit={handleSubmit}>
            {error && (
              <h5 className="error-message text-danger text-center mt-3">
                {error}
              </h5>
            )}
            {successMessage && (
              <h5 className="success-message text-success text-center mt-3">
                {successMessage}
              </h5>
            )}
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="name" className="form-label mb-0 fs-7">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control background-input-modal-login"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="email" className="form-label mb-0 fs-7">
                  E-mail *
                </label>
                <input
                  type="email"
                  className="form-control background-input-modal-login"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="curso" className="form-label mb-0 fs-7">
                  Curso
                </label>
                <FormControl
                  id="cursoSelect"
                  as="select"
                  className="background-input-modal-login p-2 w-100 h-auto"
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  value={selectedCourseId}
                >
                  <option key="" value="">
                    Selecione o Curso
                  </option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </FormControl>
              </div>
              <div className="col">
                <label htmlFor="unidade" className="form-label mb-0 fs-7">
                  Unidade
                </label>
                <FormControl
                  as="select"
                  className="background-input-modal-login p-2 w-100 h-auto"
                  id="unidade"
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  value={selectedUnit}
                >
                  <option value="">Selecione a Unidade</option>
                  <option value="ITABUNA">Itabuna</option>
                  <option value="FEIRA_DE_SANTANA">Feira de Santana</option>
                  <option value="VITORIA_DA_CONQUISTA">
                    Vitória da Conquista
                  </option>
                  <option value="JEQUIÉ">Jequié</option>
                  <option value="SALVADOR">Salvador</option>
                </FormControl>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="matricula" className="form-label mb-0 fs-7">
                  Matrícula
                </label>
                <input
                  type="text"
                  className="form-control background-input-modal-login"
                  id="matricula"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="semestre" className="form-label mb-0 fs-7">
                  Semestre
                </label>
                <FormControl
                  as="select"
                  className="background-input-modal-login p-2 w-100 h-auto"
                  id="semestre"
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  value={selectedSemester}
                >
                  <option value="">Selecione o Semestre</option>
                  <option value="1">1º Semestre</option>
                  <option value="2">2º Semestre</option>
                  <option value="3">3º Semestre</option>
                  <option value="4">4º Semestre</option>
                  <option value="5">5º Semestre</option>
                  <option value="6">6º Semestre</option>
                  <option value="7">7º Semestre</option>
                  <option value="8">8º Semestre</option>
                  <option value="9">9º Semestre</option>
                  <option value="10">10º Semestre</option>
                </FormControl>
              </div>
            </div>
            <div className="mb-1">
              <label htmlFor="password" className="form-label mb-0 fs-7">
                Senha
              </label>
              <input
                type="password"
                className="form-control background-input-modal-login"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label mb-0 fs-7">
                Confirmar Senha
              </label>
              <input
                type="password"
                className="form-control background-input-modal-login"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <p className="text-center">
              Ao continuar, declaro que estou ciente dos{" "}
              <Link className="links-modal-login" to={"termos-uso"}>
                Termos de Uso
              </Link>{" "}
              e <span className="me-1">da</span>
              <Link className="links-modal-login" to={"politica-privacidade"}>
                Política de Privacidade
              </Link>{" "}
              da ENADEX
            </p>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Carregando..." : "CRIAR CONTA"}
              </Button>
            </div>
          </form>
          <p className="text-center mt-2">
            Já possui uma conta?
            <Link className="links-modal-login" onClick={handleClick}>
              <span className="ms-1">Faça login aqui</span>
            </Link>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalRegister;
