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
import { RegisterAdminTeacher } from "../pages/RegisterAdminTeacher";
import SimulatedPanel from "./../pages/SimulatedPanel/simulatedPanel";
import { CompletedSimulations } from "../pages/CompletedSimulations";
function AppRoutes() {
  const { signed } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ signed ? <WelcomeAfterLogin /> : <Login />} />
          <Route path="/register" element={signed ? <WelcomeAfterLogin /> : <Register />} />
          <Route path="/orientacoes-do-simulado" element={<Simulated_Guideline />} />
          <Route path="/home" element={signed ? <WelcomeAfterLogin /> : <Login />} />
          <Route path="/simulados" element={signed ? <SimulatedPanel /> : <Login />} />
          <Route path="/simulados-concluidos" element={signed ? <CompletedSimulations /> : <Login />} />
          <Route path="/esqueci-minha-senha" element={signed ? <WelcomeAfterLogin /> : <RecuperacaoSenha />} />
          {/* <Route path="/register-admin-teacher" element={signed ? <RegisterAdminTeacher /> : <Login />} /> */}
          <Route path="/register-admin-teacher" element={<RegisterAdminTeacher />} />
          <Route path="/" element={signed ? <WelcomeAfterLogin /> : <LadingPage />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/itens-obrigatorios" element={<Itens />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="*" element={<LadingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
