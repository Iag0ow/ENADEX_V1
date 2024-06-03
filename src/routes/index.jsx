import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContextProvider";
import { useAuth } from "../context/AuthContextProvider";
import LadingPage from "../pages/LandingPage/LadingPage";
import Login from "../pages/Login/LoginPage";
import RecuperacaoSenha from "../pages/Recuperacao/RecuperacaoSenha";
import Faq from "../pages/faq/Faq";
import Simulated_Guideline from "../pages/SimulationGuidelines/Guideline";
import Itens from "../pages/Itens";
import Courses from "../pages/Courses";
import Home from "../pages/Home/Home";
import WelcomeAfterLogin from "../pages/WelcomeAfterLogin/WelcomeAfterLogin";
import { Register } from "../pages/Register";
import QuestionRegistration from "../pages/QuestionRegistration/QuestionRegistration";
import SimulatedPanel from "./../pages/SimulatedPanel/simulatedPanel";
import { CompletedSimulations } from "../pages/CompletedSimulations";
import Loading from "../pages/Loading/Loading";
import { ManagerUsers } from "../pages/ManagerUsers";
import QuestionsDatabase from "../pages/QuestionsDatabase/QuestionsDatabase";
import { FaqInterno } from "../pages/FaqInterno";
import { ManagerStudent } from "../pages/ManagerStudent";
import Simulate from "../pages/Simulate/Simulate";
import CourseManagement from "../pages/Telacadastrodecurso/CourseManagement";
function AppRoutes() {
  const { signed,loadingReaload,authRole } = useAuth();
  return (
    <>
          { loadingReaload ? 
          <>
            <Loading />
          </> 
          : 
          <>
            <BrowserRouter>
              <Routes>
                  {/* <Route path="/login" element={ signed ? <WelcomeAfterLogin /> : <Login />} /> */}
                  <Route path="/register" element={signed ? <WelcomeAfterLogin /> : <Register />} />
                  <Route path="/" element={signed ? <WelcomeAfterLogin /> : <LadingPage />} />
                  <Route 
                    path="/cadastrar-perguntas" 
                    element={signed ? (authRole === "undefined" ? <WelcomeAfterLogin /> : <QuestionRegistration />) : <LadingPage />} 
                  />
                  {/* <Route path="/cadastrar-perguntas" element={signed ? <QuestionRegistration /> : <LadingPage />} /> */}
                  <Route path="/simulados" element={signed ? (authRole === "undefined" ? <SimulatedPanel /> : <WelcomeAfterLogin />) : <LadingPage />} />
                  <Route path="/orientacoes-do-simulado" element={<Simulated_Guideline />} />
                  <Route path="/simulados-concluidos" element={signed ? <CompletedSimulations /> : <LadingPage />} />
                  {/* <Route path="/esqueci-minha-senha" element={signed ? <WelcomeAfterLogin /> : <RecuperacaoSenha />} /> */}
                  <Route path="/register-admin-teacher" element={signed ? <ManagerUsers /> : <LadingPage />} />
                  <Route path="/register-student" element={signed ? <ManagerStudent /> : <LadingPage />} />
                  <Route 
                    path="/banco-de-questoes" 
                    element={signed ? (authRole === "undefined" ? <QuestionsDatabase /> : <WelcomeAfterLogin />) : <LadingPage />} 
                  />
                  <Route 
                    path="/cadastrar-curso" 
                    element={signed ? (authRole !== "undefined" ? <CourseManagement />: <WelcomeAfterLogin />) : <LadingPage />} 
                  />
                  <Route path="/faq-interno" element={signed ? <FaqInterno /> : <LadingPage />} />
                  <Route path="/simulado/:id" element={signed ? <Simulate /> : <LadingPage />} />
                  {/* <Route path="/" element={signed ? <WelcomeAfterLogin /> : <LadingPage />} /> */}
                  {/* <Route path="/itens-obrigatorios" element={<Itens />} /> */}
                  {/* <Route path="/cursos" element={<Courses />} /> */}
                  <Route path="*" element={ signed ? <WelcomeAfterLogin /> : <LadingPage />} />
              </Routes>
            </BrowserRouter>
          </> }
    </>
  );
}

export default AppRoutes;
