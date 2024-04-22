import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContextProvider";
import { useAuth } from "../context/AuthContextProvider";
import LadingPage from "../pages/LandingPage/LadingPage";
import Login from "../pages/Login/LoginPage";
import { Register } from "../pages/Register";
import RecuperacaoSenha from "../pages/Recuperacao/RecuperacaoSenha";
import Faq from "../pages/faq/Faq";
import Itens from "../pages/Itens";
import Courses from "../pages/Courses";
import Home from "../pages/Home/Home";
import { RegisterAdminTeacher } from "../pages/RegisterAdminTeacher";


function AppRoutes() {
  const { signed } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={signed ? <Home /> : <Login />} />
          <Route path="/register" element={signed ? <Home /> : <Register />} />
          <Route path="/home" element={signed ? <Home /> : <Login />} />
          <Route path="/esqueci-minha-senha" element={signed ? <Home /> : <RecuperacaoSenha />} />
          {/* <Route path="/register-admin-teacher" element={signed ? <RegisterAdminTeacher /> : <Login />} /> */}
          <Route path="/register-admin-teacher" element={<RegisterAdminTeacher />} />
          <Route path="/" element={signed ? <Home /> : <LadingPage />} />
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
